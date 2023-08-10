import chai from 'chai'
import chaiHttp from 'chai-http'
import { beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import { server } from '../../../../src/App'
import UserMock from '../../../mocks/UserMock'
import UserSchema from '../../../../src/outers/schemas/UserSchema'
import { Types } from 'mongoose'
import User from '../../../../src/inners/models/entities/User'
import humps from 'humps'
import { randomUUID } from 'crypto'

chai.use(chaiHttp)
chai.should()

describe('UserControllerRest', () => {
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

  describe('GET /api/v1/users', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(server).get('/api/v1/users')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        userMock.data.map((userMock: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(userMock)))
        })
      )
    })
  })

  describe('GET /api/v1/users?search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedUserMock = userMock.data[0]
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      const encodedSearch = encodeURIComponent(JSON.stringify({
        _id: selectedUserMock._id
      }))
      const response = await chai.request(server).get(`/api/v1/users?search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock)))
      )
    })
  })

  describe('GET /api/v1/users/:id', () => {
    it('should return 200 OK', async () => {
      const selectedUserMock = userMock.data[0]
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      const response = await chai.request(server).get(`/api/v1/users/${selectedUserMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      userMock.data.map((userMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(userMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/users', () => {
    it('should return 201 CREATED', async () => {
      const selectedUserMock = new User(`username${randomUUID()}`, 'password2', 'pictureUrl2', new Types.ObjectId().toString())
      userMock.data.push(selectedUserMock)
      const response = await chai.request(server).post('/api/v1/users').send(selectedUserMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      userMock.data.map((userMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(userMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/users/:id', () => {
    it('should return 200 OK', async () => {
      const selectedUserMock = userMock.data[0]
      selectedUserMock.username = `username${randomUUID()} patched`
      selectedUserMock.password = 'password0 patched'
      selectedUserMock.pictureUrl = 'pictureUrl0 patched'
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      const response = await chai.request(server).patch(`/api/v1/users/${selectedUserMock._id}`).send(selectedUserMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      userMock.data.map((userMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(userMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/users/:id', () => {
    it('should return 200 OK', async () => {
      const selectedUserMock = userMock.data[0]
      userMock.data.splice(userMock.data.indexOf(selectedUserMock), 1)
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      const response = await chai.request(server).delete(`/api/v1/users/${selectedUserMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      userMock.data.map((userMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(userMock)))
      }).should.not.deep.include(response.body.data)
    })
  })
})
