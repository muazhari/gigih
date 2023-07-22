import chai from 'chai'
import chaiHttp from 'chai-http'
import { beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../src/outers/datastores/OneDatastore'
import app from '../../../src/App'
import VideoMock from '../../mocks/VideoMock'
import VideoSchema from '../../../src/outers/schemas/VideoSchema'
import { Types } from 'mongoose'
import Video from '../../../src/inners/models/entities/Video'

chai.use(chaiHttp)
chai.should()

// create integration test for video controller
describe('VideoController', () => {
  const videoMock: VideoMock = new VideoMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await VideoSchema.insertMany(videoMock.data)
  })

  afterEach(async () => {
    await VideoSchema.deleteMany({
      _id: {
        $in: videoMock.data.map((videoMock: Video) => videoMock._id)
      }
    })
  })

  describe('GET /api/v1/videos', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/videos')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoMock.data.map((videoMock: any) => {
          return JSON.parse(JSON.stringify(videoMock))
        })
      )
    })
  })

  describe('GET /api/v1/videos/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoMock = videoMock.data[0]
      if (selectedVideoMock._id === undefined) {
        throw new Error('Selected video mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/videos/${selectedVideoMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoMock.data.map((videoMock: any) => {
        return JSON.parse(JSON.stringify(videoMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/videos', () => {
    it('should return 201 CREATED', async () => {
      const selectedVideoMock = new Video('thumbnailUrl2', 'contentUrl2', new Types.ObjectId().toString())
      videoMock.data.push(selectedVideoMock)
      const response = await chai.request(app).post('/api/v1/videos').send(selectedVideoMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoMock.data.map((videoMock: any) => {
        return JSON.parse(JSON.stringify(videoMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/videos/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoMock = videoMock.data[0]
      selectedVideoMock.thumbnailUrl = 'thumbnailUrl0 patched'
      selectedVideoMock.contentUrl = 'contentUrl0 patched'
      if (selectedVideoMock._id === undefined) {
        throw new Error('Selected video mock id is undefined.')
      }
      const response = await chai.request(app).patch(`/api/v1/videos/${selectedVideoMock._id}`).send(selectedVideoMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoMock.data.map((videoMock: any) => {
        return JSON.parse(JSON.stringify(videoMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/videos/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoMock = videoMock.data[0]
      videoMock.data.splice(videoMock.data.indexOf(selectedVideoMock), 1)
      if (selectedVideoMock._id === undefined) {
        throw new Error('Selected video mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/videos/${selectedVideoMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoMock.data.map((videoMock: any) => {
        return JSON.parse(JSON.stringify(videoMock))
      }).should.not.deep.include(response.body.data)
    })
  })
})
