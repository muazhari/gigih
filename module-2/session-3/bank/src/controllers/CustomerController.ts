import express, { type Request, type Response, type Router } from 'express'
import CustomerService from '../services/CustomerService'
import type Customer from '../models/Customer'
import type Result from '../models/Result'

export default class CustomerController {
  customerService: CustomerService = new CustomerService()
  router: Router = express.Router()

  constructor () {
    this.router.get('/', this.readAll)
    this.router.get('/:customerId', this.readOneById)
    this.router.post('/', this.createOne)
    this.router.patch('/:customerId', this.patchOneById)
    this.router.delete('/:customerId', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    const result: Result<Customer[] | undefined> = this.customerService.readAll()
    response.status(result.status).json(result)
  }

  readOneById = (request: Request, response: Response): void => {
    const customerId: string = request.params.customerId
    const result: Result<Customer | undefined> = this.customerService.readOneById(customerId)
    response.status(result.status).json(result)
  }

  createOne = (request: Request, response: Response): void => {
    const result: Result<Customer> = this.customerService.createOne(request.body)
    response.status(result.status).json(result)
  }

  patchOneById = (request: Request, response: Response): void => {
    const customerId: string = request.params.customerId
    const result: Result<Customer | undefined> = this.customerService.patchOneById(customerId, request.body)
    response.status(result.status).json(result)
  }

  deleteOneById = (request: Request, response: Response): void => {
    const customerId: string = request.params.customerId
    const result: Result<Customer | undefined> = this.customerService.deleteOneById(customerId)
    response.status(result.status).json(result)
  }
}
