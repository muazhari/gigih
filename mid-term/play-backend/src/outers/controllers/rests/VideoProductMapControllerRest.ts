import { type Request, type Response, type Router } from 'express'

import type VideoProductMap from '../../../inners/models/entities/VideoProductMap'
import type Result from '../../../inners/models/value_objects/Result'
import type VideoProductMapManagement from '../../../inners/use_cases/managements/VideoProductMapManagement'
import type Product from '../../../inners/models/entities/Product'
import type VideoProductMapAggregate from '../../../inners/models/aggregates/VideoProductMapAggregate'

export default class VideoProductMapControllerRest {
  router: Router
  videoProductMapManagement: VideoProductMapManagement

  constructor (router: Router, videoProductMapManagement: VideoProductMapManagement) {
    this.router = router
    this.videoProductMapManagement = videoProductMapManagement
  }

  registerRoutes = (): void => {
    this.router.get('', this.readAll)
    this.router.get('/aggregated', this.readAllAggregated)
    this.router.get('/:id', this.readOneById)
    this.router.get('/:id/aggregated', this.readOneByIdAggregated)
    this.router.post('', this.createOne)
    this.router.patch('/:id', this.patchOneById)
    this.router.delete('/:id', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    this.videoProductMapManagement
      .readAll()
      .then((result: Result<VideoProductMap[]>) => {
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

  readAllAggregated = (request: Request, response: Response): void => {
    this.videoProductMapManagement
      .readAllAggregated()
      .then((result: Result<VideoProductMapAggregate[]>) => {
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
    this.videoProductMapManagement
      .readOneById(id)
      .then((result: Result<VideoProductMap>) => {
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

  readOneByIdAggregated = (request: Request, response: Response): void => {
    const { id } = request.params
    this.videoProductMapManagement
      .readOneByIdAggregated(id)
      .then((result: Result<VideoProductMapAggregate>) => {
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
    this.videoProductMapManagement
      .createOne(request.body)
      .then((result: Result<VideoProductMap>) => {
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
    this.videoProductMapManagement
      .patchOneById(id, request.body)
      .then((result: Result<VideoProductMap>) => {
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
    this.videoProductMapManagement
      .deleteOneById(id)
      .then((result: Result<VideoProductMap>) => {
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
