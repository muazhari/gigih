import chai from 'chai'
import chaiHttp from 'chai-http'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../src/outers/datastores/OneDatastore'
import app from '../../../src/App'
import CommentMock from '../../mocks/CommentMock'
import CommentSchema from '../../../src/outers/schemas/CommentSchema'
import { Types } from 'mongoose'
import Comment from '../../../src/inners/models/entities/Comment'
import UserSchema from '../../../src/outers/schemas/UserSchema'
import type CommentAggregate from '../../../src/inners/models/value_objects/responses/aggregates/CommentAggregate'
import type User from '../../../src/inners/models/entities/User'

chai.use(chaiHttp)
chai.should()

// create integration test for comment controller
describe('CommentController', () => {
  const commentMock: CommentMock = new CommentMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await UserSchema.insertMany(commentMock.userMock.data)
    await CommentSchema.insertMany(commentMock.data)
  })

  afterEach(async () => {
    await UserSchema.deleteMany({
      _id: {
        $in: commentMock.userMock.data.map((userMock: User) => userMock._id)
      }
    })
    await CommentSchema.deleteMany({
      _id: {
        $in: commentMock.data.map((commentMock: Comment) => commentMock._id)
      }
    })
  })

  describe('GET /api/v1/comments', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/comments')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        commentMock.data.map((commentMock: any) => {
          return JSON.parse(JSON.stringify(commentMock))
        })
      )
    })
  })

  describe('GET /api/v1/comments/aggregated', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/comments/aggregated')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        commentMock.aggregatedData.map((commentMockAggregated: any) => {
          return JSON.parse(JSON.stringify(commentMockAggregated))
        })
      )
    })
  })

  describe('GET /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = commentMock.data[0]
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/${selectedCommentMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      commentMock.data.map((commentMockAggregated: any) => {
        return JSON.parse(JSON.stringify(commentMockAggregated))
      }).should.deep.include(response.body.data)
    })
  })

  describe('GET /api/v1/comments/:id/aggregated', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMockAggregated: CommentAggregate = commentMock.aggregatedData[0]
      if (selectedCommentMockAggregated._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/${selectedCommentMockAggregated._id}/aggregated`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      commentMock.aggregatedData.map((commentMockAggregated: any) => {
        return JSON.parse(JSON.stringify(commentMockAggregated))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/comments', () => {
    it('should return 201 CREATED', async () => {
      const selectedCommentMock = new Comment(commentMock.userMock.data[0]._id, 'content2', new Date(), new Types.ObjectId().toString())
      commentMock.data.push(selectedCommentMock)
      const response = await chai.request(app).post('/api/v1/comments').send(selectedCommentMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      commentMock.data.map((commentMock: any) => {
        return JSON.parse(JSON.stringify(commentMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = commentMock.data[0]
      selectedCommentMock.userId = commentMock.userMock.data[1]._id
      selectedCommentMock.content = 'content0 patched'
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).patch(`/api/v1/comments/${selectedCommentMock._id}`).send(selectedCommentMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      commentMock.data.map((commentMock: any) => {
        return JSON.parse(JSON.stringify(commentMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = commentMock.data[0]
      commentMock.data.splice(commentMock.data.indexOf(selectedCommentMock), 1)
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/comments/${selectedCommentMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      commentMock.data.map((commentMock: any) => {
        return JSON.parse(JSON.stringify(commentMock))
      }).should.not.deep.include(response.body.data)
    })
  })
})
