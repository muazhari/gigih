import chai from 'chai'
import chaiHttp from 'chai-http'
import { beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import { server } from '../../../../src/App'
import UserMock from '../../../mocks/UserMock'
import UserSchema from '../../../../src/outers/schemas/UserSchema'
import type User from '../../../../src/inners/models/entities/User'
import humps from 'humps'
import { randomUUID } from 'crypto'
import LoginByUsernameAndPasswordRequest
  from '../../../../src/inners/models/value_objects/requests/authentications/LoginByUsernameAndPasswordRequest'
import RegisterByUsernameAndPasswordRequest
  from '../../../../src/inners/models/value_objects/requests/authentications/RegisterByUsernameAndPasswordRequest'

chai.use(chaiHttp)
chai.should()

describe('AuthenticationControllerRest', () => {
  const userMock: UserMock = new UserMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await UserSchema.insertMany(userMock.data)
  })

  afterEach(async () => {
    await UserSchema.deleteMany({
      _id: {
        $in: userMock.data.map((userMock: User) => userMock._id)
      }
    })
    await oneDatastore.disconnect()
  })

  describe('POST /api/v1/authentications/logins?method=username_and_password', () => {
    it('should return 200 OK', async () => {
      const selectedUserMock = userMock.data[0]
      if (selectedUserMock.username === undefined) {
        throw new Error('Selected user mock username is undefined.')
      }
      if (selectedUserMock.password === undefined) {
        throw new Error('Selected user mock password is undefined.')
      }
      const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest(
        selectedUserMock.username,
        selectedUserMock.password
      )
      const response = await chai.request(server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      response.body.data.should.deep.equal(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock)))
      )
    })

    it('should return 404 NOT FOUND: Unknown username', async () => {
      const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest(
            `username${randomUUID()}`,
            'password login'
      )
      const response = await chai.request(server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest)
      response.should.have.status(404)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(404)
      response.body.should.have.property('message')
      response.body.should.have.property('data').eq(null)
    })

    it('should return 404 NOT FOUND: Unknown username or password', async () => {
      const selectedUserMock = userMock.data[0]
      if (selectedUserMock.username === undefined) {
        throw new Error('Selected user mock username is undefined.')
      }
      const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest(
        selectedUserMock.username,
            `password${randomUUID()}`
      )
      const response = await chai.request(server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest)
      response.should.have.status(404)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(404)
      response.body.should.have.property('message')
      response.body.should.have.property('data').eq(null)
    })
  })

  describe('POST /api/v1/authentications/registers?method=username_and_password', () => {
    it('should return 201 CREATED', async () => {
      const registerByUsernameAndPasswordRequest: RegisterByUsernameAndPasswordRequest = new RegisterByUsernameAndPasswordRequest(
        `username${randomUUID()}`,
        'password register'
      )
      const response = await chai.request(server).post('/api/v1/authentications/registers?method=username_and_password').send(registerByUsernameAndPasswordRequest)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      response.body.data.should.have.property('_id')
      response.body.data.should.have.property('username').eq(registerByUsernameAndPasswordRequest.username)
      response.body.data.should.have.property('password').eq(registerByUsernameAndPasswordRequest.password)
      response.body.data.should.have.property('picture_url')
    })

    it('should return 409 CONFLICT: Username already exists', async () => {
      const selectedUserMock = userMock.data[0]
      if (selectedUserMock.username === undefined) {
        throw new Error('Selected user mock username is undefined.')
      }
      const registerByUsernameAndPasswordRequest: RegisterByUsernameAndPasswordRequest = new RegisterByUsernameAndPasswordRequest(
        selectedUserMock.username,
        'password register'
      )
      const response = await chai.request(server).post('/api/v1/authentications/registers?method=username_and_password').send(registerByUsernameAndPasswordRequest)
      response.should.have.status(409)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(409)
      response.body.should.have.property('message')
      response.body.should.have.property('data').eq(null)
    })
  })
})
