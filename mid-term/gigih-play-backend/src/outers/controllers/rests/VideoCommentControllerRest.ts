import { type Request, type Response, type Router } from 'express'

import type VideoCommentMap from '../../../inners/models/entities/VideoCommentMap'
import type Result from '../../../inners/models/value_objects/Result'
import type VideoCommentMapManagement from '../../../inners/use_cases/managements/VideoCommentMapManagement'
import type VideoCommentMapAggregate from '../../../inners/models/aggregates/VideoCommentMapAggregate'

export default class VideoCommentMapController {
  router: Router
  videoCommentMapManagement: VideoCommentMapManagement

  constructor (router: Router, videoCommentMapManagement: VideoCommentMapManagement) {
    this.router = router
    this.videoCommentMapManagement = videoCommentMapManagement
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
    this.videoCommentMapManagement
      .readAll()
      .then((result: Result<VideoCommentMap[]>) => {
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
    this.videoCommentMapManagement
      .readAllAggregated()
      .then((result: Result<VideoCommentMapAggregate[]>) => {
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
    this.videoCommentMapManagement
      .readOneById(id)
      .then((result: Result<VideoCommentMap>) => {
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
    this.videoCommentMapManagement
      .readOneByIdAggregated(id)
      .then((result: Result<VideoCommentMapAggregate>) => {
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
    this.videoCommentMapManagement
      .createOne(request.body)
      .then((result: Result<VideoCommentMap>) => {
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
    this.videoCommentMapManagement
      .patchOneById(id, request.body)
      .then((result: Result<VideoCommentMap>) => {
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
    this.videoCommentMapManagement
      .deleteOneById(id)
      .then((result: Result<VideoCommentMap>) => {
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