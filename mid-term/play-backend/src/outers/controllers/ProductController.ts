import { type Request, type Response, type Router } from 'express'

import type Product from '../../inners/models/entities/Product'
import type Result from '../../inners/models/value_objects/Result'
import type ProductManagement from '../../inners/use_cases/managements/ProductManagement'

export default class ProductController {
  router: Router
  productManagement: ProductManagement

  constructor (router: Router, productManagement: ProductManagement) {
    this.router = router
    this.productManagement = productManagement
  }

  registerRoutes = (): void => {
    this.router.get('', this.readAll)
    this.router.get('/videos/:videoId', this.readAllByVideoId)
    this.router.get('/:id', this.readOneById)
    this.router.post('', this.createOne)
    this.router.patch('/:id', this.patchOneById)
    this.router.delete('/:id', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    this.productManagement
      .readAll()
      .then((result: Result<Product[]>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }

  readAllByVideoId = (request: Request, response: Response): void => {
    const { videoId } = request.params
    this.productManagement
      .readAllByVideoId(videoId)
      .then((result: Result<Product[]>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }

  readOneById = (request: Request, response: Response): void => {
    const { id } = request.params
    this.productManagement
      .readOneById(id)
      .then((result: Result<Product>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }

  createOne = (request: Request, response: Response): void => {
    this.productManagement
      .createOne(request.body)
      .then((result: Result<Product>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }

  patchOneById = (request: Request, response: Response): void => {
    const { id } = request.params
    this.productManagement
      .patchOneById(id, request.body)
      .then((result: Result<Product>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }

  deleteOneById = (request: Request, response: Response): void => {
    const { id } = request.params
    this.productManagement
      .deleteOneById(id)
      .then((result: Result<Product>) => {
        response.status(result.status).json(result)
      })
      .catch((error: Error) => {
        response.status(500).json({
          status: 500,
          message: error.message,
          data: null
        })
      })
  }
}
