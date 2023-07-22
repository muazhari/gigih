import chai from 'chai'
import chaiHttp from 'chai-http'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../src/outers/datastores/OneDatastore'
import app from '../../../src/App'
import VideoCommentMapMock from '../../mocks/VideoCommentMapMock'
import VideoCommentMapSchema from '../../../src/outers/schemas/VideoCommentMapSchema'
import { Types } from 'mongoose'
import VideoCommentMap from '../../../src/inners/models/entities/VideoCommentMap'
import type VideoCommentMapAggregate
  from '../../../src/inners/models/value_objects/responses/aggregates/VideoCommentMapAggregate'
import VideoSchema from '../../../src/outers/schemas/VideoSchema'
import CommentSchema from '../../../src/outers/schemas/CommentSchema'
import VideoMock from '../../mocks/VideoMock'
import type Video from '../../../src/inners/models/entities/Video'
import type Comment from '../../../src/inners/models/entities/Comment'

chai.use(chaiHttp)
chai.should()

// create integration test for videoCommentMap controller
describe('VideoCommentMapController', () => {
  const videoCommentMapMock: VideoCommentMapMock = new VideoCommentMapMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await VideoSchema.insertMany(videoCommentMapMock.videoMock.data)
    await CommentSchema.insertMany(videoCommentMapMock.commentMock.data)
    await VideoCommentMapSchema.insertMany(videoCommentMapMock.data)
  })

  afterEach(async () => {
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
  })

  describe('GET /api/v1/video-comment-maps', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/video-comment-maps')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoCommentMapMock.data.map((videoCommentMapMock: any) => {
          return JSON.parse(JSON.stringify(videoCommentMapMock))
        })
      )
    })
  })

  describe('GET /api/v1/video-comment-maps/aggregated', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/video-comment-maps/aggregated')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoCommentMapMock.aggregatedData.map((videoCommentMapMockAggregated: any) => {
          return JSON.parse(JSON.stringify(videoCommentMapMockAggregated))
        })
      )
    })
  })

  describe('GET /api/v1/video-comment-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMock: VideoCommentMap = videoCommentMapMock.data[0]
      if (selectedVideoCommentMapMock._id === undefined) {
        throw new Error('Selected videoCommentMap mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.data.map((videoCommentMapMock: any) => {
        return JSON.parse(JSON.stringify(videoCommentMapMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('GET /api/v1/video-comment-maps/:id/aggregated', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMockAggregated: VideoCommentMapAggregate = videoCommentMapMock.aggregatedData[0]
      if (selectedVideoCommentMapMockAggregated._id === undefined) {
        throw new Error('Selected videoCommentMap mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/video-comment-maps/${selectedVideoCommentMapMockAggregated._id}/aggregated`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.aggregatedData.map((videoCommentMapMockAggregated: any) => {
        return JSON.parse(JSON.stringify(videoCommentMapMockAggregated))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/video-comment-maps', () => {
    it('should return 201 CREATED', async () => {
      const selectedVideoCommentMapMock: VideoCommentMap = new VideoCommentMap(videoCommentMapMock.videoMock.data[0]._id, videoCommentMapMock.commentMock.data[0]._id, new Types.ObjectId().toString())
      videoCommentMapMock.data.push(selectedVideoCommentMapMock)
      const response = await chai.request(app).post('/api/v1/video-comment-maps').send(selectedVideoCommentMapMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.data.map((videoCommentMapMock: any) => {
        return JSON.parse(JSON.stringify(videoCommentMapMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/video-comment-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMock = videoCommentMapMock.data[0]
      selectedVideoCommentMapMock.videoId = videoCommentMapMock.videoMock.data[1]._id
      selectedVideoCommentMapMock.commentId = videoCommentMapMock.commentMock.data[1]._id
      if (selectedVideoCommentMapMock._id === undefined) {
        throw new Error('Selected videoCommentMap mock id is undefined.')
      }
      const response = await chai.request(app).patch(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`).send(selectedVideoCommentMapMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.data.map((videoCommentMapMock: any) => {
        return JSON.parse(JSON.stringify(videoCommentMapMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/video-comment-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoCommentMapMock = videoCommentMapMock.data[0]
      videoCommentMapMock.data.splice(videoCommentMapMock.data.indexOf(selectedVideoCommentMapMock), 1)
      if (selectedVideoCommentMapMock._id === undefined) {
        throw new Error('Selected videoCommentMap mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoCommentMapMock.data.map((videoCommentMapMock: any) => {
        return JSON.parse(JSON.stringify(videoCommentMapMock))
      }).should.not.deep.include(response.body.data)
    })
  })
})
