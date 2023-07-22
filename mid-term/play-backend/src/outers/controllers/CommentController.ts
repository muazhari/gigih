import { type Request, type Response, type Router } from 'express'

import type Comment from '../../inners/models/entities/Comment'
import type Result from '../../inners/models/value_objects/Result'
import type CommentManagement from '../../inners/use_cases/managements/CommentManagement'
import type CommentAggregate from '../../inners/models/value_objects/responses/aggregates/CommentAggregate'

export default class CommentController {
  router: Router
  commentManagement: CommentManagement

  constructor (router: Router, commentManagement: CommentManagement) {
    this.router = router
    this.commentManagement = commentManagement
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
    this.commentManagement
      .readAll()
      .then((result: Result<Comment[]>) => {
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
    this.commentManagement
      .readAllAggregated()
      .then((result: Result<CommentAggregate[]>) => {
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
    this.commentManagement
      .readOneById(id)
      .then((result: Result<Comment>) => {
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
    this.commentManagement
      .readOneByIdAggregated(id)
      .then((result: Result<CommentAggregate>) => {
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
    this.commentManagement
      .createOne(request.body)
      .then((result: Result<Comment>) => {
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
    this.commentManagement
      .patchOneById(id, request.body)
      .then((result: Result<Comment>) => {
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
    this.commentManagement
      .deleteOneById(id)
      .then((result: Result<Comment>) => {
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
