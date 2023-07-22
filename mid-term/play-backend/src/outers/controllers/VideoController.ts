import { type Request, type Response, type Router } from 'express'

import type Video from '../../inners/models/entities/Video'
import type Result from '../../inners/models/value_objects/Result'
import type VideoManagement from '../../inners/use_cases/managements/VideoManagement'

export default class VideoController {
  router: Router
  videoManagement: VideoManagement

  constructor (router: Router, videoManagement: VideoManagement) {
    this.router = router
    this.videoManagement = videoManagement
  }

  registerRoutes = (): void => {
    this.router.get('', this.readAll)
    this.router.get('/:id', this.readOneById)
    this.router.post('', this.createOne)
    this.router.patch('/:id', this.patchOneById)
    this.router.delete('/:id', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    this.videoManagement
      .readAll()
      .then((result: Result<Video[]>) => {
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
    this.videoManagement
      .readOneById(id)
      .then((result: Result<Video>) => {
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
    this.videoManagement
      .createOne(request.body)
      .then((result: Result<Video>) => {
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
    this.videoManagement
      .patchOneById(id, request.body)
      .then((result: Result<Video>) => {
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
    this.videoManagement
      .deleteOneById(id)
      .then((result: Result<Video>) => {
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
