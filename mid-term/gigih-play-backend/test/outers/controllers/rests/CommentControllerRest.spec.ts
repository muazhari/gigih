import chai from 'chai'
import chaiHttp from 'chai-http'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import { app } from '../../../../src/App'
import CommentSchema from '../../../../src/outers/schemas/CommentSchema'
import { Types } from 'mongoose'
import Comment from '../../../../src/inners/models/entities/Comment'
import UserSchema from '../../../../src/outers/schemas/UserSchema'
import type CommentAggregate from '../../../../src/inners/models/aggregates/CommentAggregate'
import type User from '../../../../src/inners/models/entities/User'
import VideoCommentMapMock from '../../../mocks/VideoCommentMapMock'
import VideoSchema from '../../../../src/outers/schemas/VideoSchema'
import type Video from '../../../../src/inners/models/entities/Video'
import VideoCommentMapSchema from '../../../../src/outers/schemas/VideoCommentMapSchema'
import type VideoCommentMap from '../../../../src/inners/models/entities/VideoCommentMap'
import humps from 'humps'
import SubmitCommentRequest from '../../../../src/inners/models/value_objects/requests/comments/SubmitCommentRequest'

chai.use(chaiHttp)
chai.should()

describe('CommentControllerRest', () => {
  const videoCommentMapMock: VideoCommentMapMock = new VideoCommentMapMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await UserSchema.insertMany(videoCommentMapMock.commentMock.userMock.data)
    await VideoSchema.insertMany(videoCommentMapMock.videoMock.data)
    await CommentSchema.insertMany(videoCommentMapMock.commentMock.data)
    await VideoCommentMapSchema.insertMany(videoCommentMapMock.data)
  })

  afterEach(async () => {
    await UserSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.commentMock.userMock.data.map((userMock: User) => userMock._id)
      }
    })
    await VideoSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.videoMock.data.map((videoMock: Video) => videoMock._id)
      }
    })
    await CommentSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.commentMock.data.map((commentMock: Comment) => commentMock._id)
      }
    })
    await VideoCommentMapSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.data.map((videoCommentMapMock: VideoCommentMap) => videoCommentMapMock._id)
      }
    })
    await oneDatastore.disconnect()
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
        videoCommentMapMock.commentMock.data.map((commentMock: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)))
        })
      )
    })
  })

  describe('GET /api/v1/comments?is_aggregated=true', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/comments?is_aggregated=true')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)))
        })
      )
    })
  })

  describe('GET /api/v1/comments?search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = videoCommentMapMock.commentMock.data[0]
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const encodedSearch = encodeURI(JSON.stringify({
        _id: selectedCommentMock._id
      }))
      const response = await chai.request(app).get(`/api/v1/comments?search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedCommentMock)))
      )
    })
  })

  describe('GET /api/v1/comments?is_aggregated=true&search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMockAggregated: CommentAggregate = videoCommentMapMock.commentMock.aggregatedData[0]
      if (selectedCommentMockAggregated._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const encodedSearch = encodeURI(JSON.stringify({
        _id: selectedCommentMockAggregated._id
      }))
      const response = await chai.request(app).get(`/api/v1/comments?is_aggregated=true&search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedCommentMockAggregated)))
      )
    })
  })

  describe('GET /api/v1/comments/videos/:videoId', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMock = videoCommentMapMock.data[0]
      if (selectedVideoCommentMapMock.videoId === undefined) {
        throw new Error('Selected video comment map mock video id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/videos/${selectedVideoCommentMapMock.videoId}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      videoCommentMapMock.commentMock.data.map((commentMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)))
      }).should.deep.include.members(response.body.data)
    })
  })

  describe('GET /api/v1/comments/videos/:videoId?is_aggregated=true', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMock = videoCommentMapMock.data[0]
      if (selectedVideoCommentMapMock.videoId === undefined) {
        throw new Error('Selected video comment map mock video id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/videos/${selectedVideoCommentMapMock.videoId}?is_aggregated=true`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)))
      }).should.deep.include.members(response.body.data)
    })
  })

  describe('GET /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = videoCommentMapMock.commentMock.data[0]
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/${selectedCommentMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.commentMock.data.map((commentMockAggregated: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('GET /api/v1/comments/:id?is_aggregated=true', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMockAggregated: CommentAggregate = videoCommentMapMock.commentMock.aggregatedData[0]
      if (selectedCommentMockAggregated._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/comments/${selectedCommentMockAggregated._id}?is_aggregated=true`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/comments/submissions', () => {
    it('should return 201 CREATED', async () => {
      const selectedVideoMock = videoCommentMapMock.videoMock.data[0]
      const selectedUserMock = videoCommentMapMock.commentMock.userMock.data[0]
      if (selectedVideoMock._id === undefined) {
        throw new Error('Selected video mock id is undefined.')
      }
      const submitCommentRequest = new SubmitCommentRequest(
        selectedVideoMock._id.toString(),
        selectedUserMock.username,
        'content submit'
      )
      const response = await chai.request(app).post('/api/v1/comments/submissions').send(submitCommentRequest)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      response.body.data.should.have.property('user_id').eq(selectedUserMock._id.toString())
      response.body.data.should.have.property('content').eq(submitCommentRequest.content)
      response.body.data.should.have.property('timestamp')
    })
  })

  describe('POST /api/v1/comments/submissions?is_aggregated=true', () => {
    it('should return 201 CREATED', async () => {
      const selectedVideoMock = videoCommentMapMock.videoMock.data[0]
      const selectedUserMock = videoCommentMapMock.commentMock.userMock.data[0]
      if (selectedVideoMock._id === undefined) {
        throw new Error('Selected video mock id is undefined.')
      }
      const submitCommentRequest = new SubmitCommentRequest(
        selectedVideoMock._id.toString(),
        selectedUserMock.username,
        'content submit'
      )
      const response = await chai.request(app).post('/api/v1/comments/submissions?is_aggregated=true').send(submitCommentRequest)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      if (selectedUserMock._id === undefined) {
        throw new Error('Selected user mock id is undefined.')
      }
      response.body.data.should.have.property('user').a('object').deep.eq(humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock))))
      response.body.data.should.have.property('content').eq(submitCommentRequest.content)
      response.body.data.should.have.property('timestamp')
    })
  })

  describe('POST /api/v1/comments', () => {
    it('should return 201 CREATED', async () => {
      const selectedCommentMock = new Comment(videoCommentMapMock.commentMock.userMock.data[0]._id, 'content2', new Date(), new Types.ObjectId().toString())
      videoCommentMapMock.commentMock.data.push(selectedCommentMock)
      const response = await chai.request(app).post('/api/v1/comments').send(selectedCommentMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.commentMock.data.map((commentMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = videoCommentMapMock.commentMock.data[0]
      selectedCommentMock.userId = videoCommentMapMock.commentMock.userMock.data[1]._id
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
      videoCommentMapMock.commentMock.data.map((commentMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/comments/:id', () => {
    it('should return 200 OK', async () => {
      const selectedCommentMock = videoCommentMapMock.commentMock.data[0]
      videoCommentMapMock.commentMock.data.splice(videoCommentMapMock.commentMock.data.indexOf(selectedCommentMock), 1)
      if (selectedCommentMock._id === undefined) {
        throw new Error('Selected comment mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/comments/${selectedCommentMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.commentMock.data.map((commentMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)))
      }).should.not.deep.include(response.body.data)
    })
  })
})
