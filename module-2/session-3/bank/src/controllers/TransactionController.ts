import TransactionService from '../services/TransactionService'
import express, { type Request, type Response, type Router } from 'express'
import type Result from '../models/Result'
import type Transaction from '../models/Transaction'

export default class TransactionController {
  transactionService: TransactionService = new TransactionService()
  router: Router = express.Router()

  constructor () {
    this.router.get('/', this.readAll)
    this.router.get('/:transactionId', this.readOneById)
    this.router.post('/', this.createOne)
    this.router.patch('/:transactionId', this.patchOneById)
    this.router.delete('/:transactionId', this.deleteOneById)
    this.router.post('/transfer', this.transfer)
  }

  transfer = (request: Request, response: Response): void => {
    const { sourceId, destinationId, amount } = request.body
    const result: Result<Transaction | undefined> = this.transactionService.transfer(
      sourceId,
      destinationId,
      amount
    )
    response.status(result.status).json(result)
  }

  readAll = (request: Request, response: Response): void => {
    const result: Result<Transaction[] | undefined> = this.transactionService.readAll()
    response.status(result.status).json(result)
  }

  readOneById = (request: Request, response: Response): void => {
    const transactionId: string = request.params.transactionId
    const result: Result<Transaction | undefined> = this.transactionService.readOneById(transactionId)
    response.status(result.status).json(result)
  }

  createOne = (request: Request, response: Response): void => {
    const result: Result<Transaction> = this.transactionService.createOne(request.body)
    response.status(result.status).json(result)
  }

  patchOneById = (request: Request, response: Response): void => {
    const transactionId: string = request.params.transactionId
    const result: Result<Transaction | undefined> = this.transactionService.patchOneById(transactionId, request.body)
    response.status(result.status).json(result)
  }

  deleteOneById = (request: Request, response: Response): void => {
    const transactionId: string = request.params.transactionId
    const result: Result<Transaction | undefined> = this.transactionService.deleteOneById(transactionId)
    response.status(result.status).json(result)
  }
}
