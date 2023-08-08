import chai from 'chai'
import chaiHttp from 'chai-http'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import { app } from '../../../../src/App'
import ProductSchema from '../../../../src/outers/schemas/ProductSchema'
import { Types } from 'mongoose'
import Product from '../../../../src/inners/models/entities/Product'
import VideoProductMapMock from '../../../mocks/VideoProductMapMock'
import VideoSchema from '../../../../src/outers/schemas/VideoSchema'
import VideoProductMapSchema from '../../../../src/outers/schemas/VideoProductMapSchema'
import type VideoProductMap from '../../../../src/inners/models/entities/VideoProductMap'
import type Video from '../../../../src/inners/models/entities/Video'
import humps from 'humps'

chai.use(chaiHttp)
chai.should()

describe('ProductControllerRest', () => {
  const videoProductMapMock: VideoProductMapMock = new VideoProductMapMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await VideoSchema.insertMany(videoProductMapMock.videoMock.data)
    await ProductSchema.insertMany(videoProductMapMock.productMock.data)
    await VideoProductMapSchema.insertMany(videoProductMapMock.data)
  })

  afterEach(async () => {
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
    await VideoProductMapSchema.deleteMany({
      _id: {
        $in: videoProductMapMock.data.map((videoProductMapMock: VideoProductMap) => videoProductMapMock._id)
      }
    })
    await oneDatastore.disconnect()
  })

  describe('GET /api/v1/products', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/api/v1/products')
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include.members(
        videoProductMapMock.productMock.data.map((productMock: any) => {
          return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
        })
      )
    })
  })

  describe('GET /api/v1/products?search=encoded', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = videoProductMapMock.productMock.data[0]
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const encodedSearch = encodeURIComponent(JSON.stringify({
        _id: selectedProductMock._id
      }))
      const response = await chai.request(app).get(`/api/v1/products?search=${encodedSearch}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      response.body.data.should.deep.include(
        humps.decamelizeKeys(JSON.parse(JSON.stringify(selectedProductMock)))
      )
    })
  })

  describe('GET /api/v1/products/videos/:videoId', () => {
    it('should return 200 OK', async () => {
      const selectedVideoProductMapMock = videoProductMapMock.data[0]
      if (selectedVideoProductMapMock.videoId === undefined) {
        throw new Error('Selected video product map mock videoId is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/products/videos/${selectedVideoProductMapMock.videoId}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('array')
      videoProductMapMock.productMock.data.map((productMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
      }).should.deep.include.members(response.body.data)
    })
  })

  describe('GET /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = videoProductMapMock.productMock.data[0]
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/products/${selectedProductMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.productMock.data.map((productMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/products', () => {
    it('should return 201 CREATED', async () => {
      const selectedProductMock = new Product('title2', 2, 'linkUrl2', new Types.ObjectId().toString())
      videoProductMapMock.productMock.data.push(selectedProductMock)
      const response = await chai.request(app).post('/api/v1/products').send(selectedProductMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.productMock.data.map((productMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = videoProductMapMock.productMock.data[0]
      selectedProductMock.title = 'title0 patched'
      selectedProductMock.price = 1
      selectedProductMock.linkUrl = 'linkUrl0 patched'
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const response = await chai.request(app).patch(`/api/v1/products/${selectedProductMock._id}`).send(selectedProductMock)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.productMock.data.map((productMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = videoProductMapMock.productMock.data[0]
      videoProductMapMock.productMock.data.splice(videoProductMapMock.productMock.data.indexOf(selectedProductMock), 1)
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/products/${selectedProductMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      videoProductMapMock.productMock.data.map((productMock: any) => {
        return humps.decamelizeKeys(JSON.parse(JSON.stringify(productMock)))
      }).should.not.deep.include(response.body.data)
    })
  })
})
