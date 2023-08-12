import { type Request, type Response, type Router } from 'express'

import type Comment from '../../../inners/models/entities/Comment'
import type Result from '../../../inners/models/value_objects/Result'
import type CommentManagement from '../../../inners/use_cases/managements/CommentManagement'
import type CommentAggregate from '../../../inners/models/aggregates/CommentAggregate'
import SubmitCommentRequest from '../../../inners/models/value_objects/requests/comments/SubmitCommentRequest'

export default class CommentControllerRest {
  router: Router
  commentManagement: CommentManagement

  constructor (router: Router, commentManagement: CommentManagement) {
    this.router = router
    this.commentManagement = commentManagement
  }

  registerRoutes = (): void => {
    this.router.get('', this.readAll)
    this.router.get('/videos/:videoId', this.readAllByVideoId)
    this.router.get('/:id', this.readOneById)
    this.router.post('', this.createOne)
    this.router.post('/submissions', this.submit)
    this.router.patch('/:id', this.patchOneById)
    this.router.delete('/:id', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    const {
      isAggregated,
      search
    } = request.query
    const parsedIsAggregated: boolean | undefined = isAggregated !== undefined ? Boolean(isAggregated) : undefined
    const parsedSearch: any | undefined = search !== undefined ? JSON.parse(decodeURIComponent(String(search))) : undefined
    this.commentManagement
      .readAll(parsedIsAggregated, parsedSearch)
      .then((result: Result<Comment[] | CommentAggregate[]>) => {
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
    const { isAggregated } = request.query
    const parsedIsAggregated: boolean | undefined = isAggregated !== undefined ? Boolean(isAggregated) : undefined
    this.commentManagement
      .readAllByVideoId(videoId, parsedIsAggregated)
      .then((result: Result<Comment[] | CommentAggregate[]>) => {
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
    const { isAggregated } = request.query
    this.commentManagement
      .readOneById(id, Boolean(isAggregated))
      .then((result: Result<Comment | CommentAggregate>) => {
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

  submit = (request: Request, response: Response): void => {
    const { isAggregated } = request.query
    const {
      videoId,
      username,
      content
    } = request.body
    const submitComment: SubmitCommentRequest = new SubmitCommentRequest(videoId, username, content)
    this.commentManagement
      .submit(submitComment, Boolean(isAggregated))
      .then((result: Result<Comment | CommentAggregate>) => {
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
