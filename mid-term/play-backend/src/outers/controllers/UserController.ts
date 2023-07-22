import { type Request, type Response, type Router } from 'express'

import type User from '../../inners/models/entities/User'
import type Result from '../../inners/models/value_objects/Result'
import type UserManagement from '../../inners/use_cases/managements/UserManagement'

export default class UserController {
  router: Router
  userManagement: UserManagement

  constructor (router: Router, userManagement: UserManagement) {
    this.router = router
    this.userManagement = userManagement
  }

  registerRoutes = (): void => {
    this.router.get('', this.readAll)
    this.router.get('/:id', this.readOneById)
    this.router.post('', this.createOne)
    this.router.patch('/:id', this.patchOneById)
    this.router.delete('/:id', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    this.userManagement
      .readAll()
      .then((result: Result<User[]>) => {
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
    this.userManagement
      .readOneById(id)
      .then((result: Result<User>) => {
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
    this.userManagement
      .createOne(request.body)
      .then((result: Result<User>) => {
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
    this.userManagement
      .patchOneById(id, request.body)
      .then((result: Result<User>) => {
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
    this.userManagement
      .deleteOneById(id)
      .then((result: Result<User>) => {
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
