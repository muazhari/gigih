import chai from 'chai'
import chaiHttp from 'chai-http'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../src/outers/datastores/OneDatastore'
import app from '../../../src/App'
import ProductMock from '../../mocks/ProductMock'
import ProductSchema from '../../../src/outers/schemas/ProductSchema'
import { Types } from 'mongoose'
import Product from '../../../src/inners/models/entities/Product'

chai.use(chaiHttp)
chai.should()

// create integration test for product controller
describe('ProductController', () => {
  const productMock: ProductMock = new ProductMock()
  const oneDatastore = new OneDatastore()

  beforeEach(async () => {
    await oneDatastore.connect()
    await ProductSchema.insertMany(productMock.data)
  })

  afterEach(async () => {
    await ProductSchema.deleteMany({
      _id: {
        $in: productMock.data.map((productMock: Product) => productMock._id)
      }
    })
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
        productMock.data.map((productMock: any) => {
          return JSON.parse(JSON.stringify(productMock))
        })
      )
    })
  })

  describe('GET /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = productMock.data[0]
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const response = await chai.request(app).get(`/api/v1/products/${selectedProductMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      productMock.data.map((productMock: any) => {
        return JSON.parse(JSON.stringify(productMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('POST /api/v1/products', () => {
    it('should return 201 CREATED', async () => {
      const selectedProductMock = new Product('title2', 2, 'linkUrl2', new Types.ObjectId().toString())
      productMock.data.push(selectedProductMock)
      const response = await chai.request(app).post('/api/v1/products').send(selectedProductMock)
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(201)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      productMock.data.map((productMock: any) => {
        return JSON.parse(JSON.stringify(productMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('PATCH /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = productMock.data[0]
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
      productMock.data.map((productMock: any) => {
        return JSON.parse(JSON.stringify(productMock))
      }).should.deep.include(response.body.data)
    })
  })

  describe('DELETE /api/v1/products/:id', () => {
    it('should return 200 OK', async () => {
      const selectedProductMock = productMock.data[0]
      productMock.data.splice(productMock.data.indexOf(selectedProductMock), 1)
      if (selectedProductMock._id === undefined) {
        throw new Error('Selected product mock id is undefined.')
      }
      const response = await chai.request(app).delete(`/api/v1/products/${selectedProductMock._id}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.should.have.property('status').eq(200)
      response.body.should.have.property('message')
      response.body.should.have.property('data').a('object')
      productMock.data.map((productMock: any) => {
        return JSON.parse(JSON.stringify(productMock))
      }).should.not.deep.include(response.body.data)
    })
  })
})
