import chai from 'chai'
import chaiHttp from 'chai-http'
import { beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import { app } from '../../../../src/App'
import VideoProductMapMock from '../../../mocks/VideoProductMapMock'
import VideoProductMapSchema from '../../../../src/outers/schemas/VideoProductMapSchema'
import { Types } from 'mongoose'
import VideoProductMap from '../../../../src/inners/models/entities/VideoProductMap'
import VideoSchema from '../../../../src/outers/schemas/VideoSchema'
import ProductSchema from '../../../../src/outers/schemas/ProductSchema'
import type Video from '../../../../src/inners/models/entities/Video'
import type Product from '../../../../src/inners/models/entities/Product'
import humps from 'humps'

chai.use(chaiHttp)
chai.should()

describe('VideoProductMapControllerRest', () => {
  const videoProductMapMock: VideoProductMapMock = new VideoProductMapMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await VideoSchema.insertMany(videoProductMapMock.videoMock.data)
    await ProductSchema.insertMany(videoProductMapMock.productMock.data)
    await VideoProductMapSchema.insertMany(videoProductMapMock.data)
  })

  afterEach(async () => {
    await VideoProductMapSchema.deleteMany({
      _id: {
        $in: videoProductMapMock.data.map((videoProductMapMock: VideoProductMap) => videoProductMapMock._id)
      }
    })
    await VideoSchema.deleteMany({
      _id: {
        $in: videoProductMapMock.videoMock.data.map((videoMock: Video) => videoMock._id)
      }
    })
    await ProductSchema.deleteMany({
      _id: {
        $in: videoProductMapMock.productMock.data.map((productMock: Product) => productMock._id)
      }
    })
    await oneDatastore.disconnect()
  })

  describe('GET /api/v1/video-product-maps', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/video-product-maps')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoProductMapMock.data.map((videoProductMapMock: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)))
        })
      )
    })
  })

  describe('GET /api/v1/video-product-maps?is_aggregated=true', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/video-product-maps?is_aggregated=true')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoProductMapMock.aggregatedData.map((videoProductMapMockAggregated: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMockAggregated)))
        })
      )
    })
  })

  describe('GET /api/v1/video-product-maps?search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      if (selectedVideoProductMapMock._id === undefined) {
        throw new Error('Selected videoProductMap mock id is undefined.')
      }
      const encodedSearch = encodeURI(JSON.stringify({
        _id: selectedVideoProductMapMock._id
      }))
      const response = await chai.request(app).get(`/api/v1/video-product-maps?search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedVideoProductMapMock)))
      )
    })
  })

  describe('GET /api/v1/video-product-maps?is_aggregated=true&search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapAggregateMock = videoProductMapMock.aggregatedData[0]
      if (selectedVideoProductMapAggregateMock._id === undefined) {
        throw new Error('Selected videoProductMapAggregate mock id is undefined.')
      }
      const encodedSearch = encodeURI(JSON.stringify({
        _id: selectedVideoProductMapAggregateMock._id
      }))
      const response = await chai.request(app).get(`/api/v1/video-product-maps?is_aggregated=true&search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedVideoProductMapAggregateMock)))
      )
    })
  })

  describe('GET /api/v1/video-product-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      if (selectedVideoProductMapMock._id === undefined) {
        throw new Error('Selected videoProductMap mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.data.map((videoProductMapMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('GET /api/v1/video-product-maps/:id?is_aggregated=true', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      if (selectedVideoProductMapMock._id === undefined) {
        throw new Error('Selected videoProductMap mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}?is_aggregated=true`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.aggregatedData.map((videoProductMapMockAggregated: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMockAggregated)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/video-product-maps', () => {
    it('should return 201 CREATED', async () => {
      const selectedVideoProductMapMock = new VideoProductMap(videoProductMapMock.videoMock.data[0]._id, videoProductMapMock.productMock.data[0]._id, new Types.ObjectId().toString())
      videoProductMapMock.data.push(selectedVideoProductMapMock)
      const response = await chai.request(app).post('/api/v1/video-product-maps').send(selectedVideoProductMapMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.data.map((videoProductMapMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/video-product-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      selectedVideoProductMapMock.videoId = videoProductMapMock.videoMock.data[1]._id
      selectedVideoProductMapMock.productId = videoProductMapMock.productMock.data[1]._id
      if (selectedVideoProductMapMock._id === undefined) {
        throw new Error('Selected videoProductMap mock id is undefined.')
      }
      const response = await chai.request(app).patch(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`).send(selectedVideoProductMapMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.data.map((videoProductMapMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/video-product-maps/:id', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      videoProductMapMock.data.splice(videoProductMapMock.data.indexOf(selectedVideoProductMapMock), 1)
      if (selectedVideoProductMapMock._id === undefined) {
        throw new Error('Selected videoProductMap mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.data.map((videoProductMapMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)))
      }).should.not.deep.include(response.body.data)
    })
  })
})
