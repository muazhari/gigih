import Transaction from '../models/Transaction'

import Result from '../models/Result'
import TransactionRepository from '../repositories/TransactionRepository'
import type Customer from '../models/Customer'
import CustomerService from './CustomerService'
import { randomUUID } from 'crypto'

export default class TransactionService {
  transactionRepository: TransactionRepository = new TransactionRepository()
  customerService: CustomerService = new CustomerService()

  transfer = (sourceId: string, destinationId: string, amount: number): Result<Transaction | undefined> => {
    const sourceCustomer: Result<Customer | undefined> = this.customerService.readOneById(sourceId)
    const destinationCustomer: Result<Customer | undefined> = this.customerService.readOneById(destinationId)

    if (sourceCustomer.data === undefined) {
      return new Result<Transaction | undefined>(
        400,
            `Transaction transfer failed: source customer with id ${sourceId} is undefined.`,
            undefined
      )
    }

    if (destinationCustomer.data === undefined) {
      return new Result<Transaction | undefined>(
        400,
            `Transaction transfer failed: destination customer with id ${destinationId} is undefined.`,
            undefined
      )
    }

    if (sourceCustomer.data?.balance === undefined) {
      return new Result<Transaction | undefined>(
        500,
                `Transaction transfer failed: source customer with id ${sourceId} has undefined balance.`,
                undefined
      )
    }

    if (sourceCustomer.data.balance < amount) {
      return new Result<Transaction | undefined>(
        400,
            `Transaction transfer failed: source customer with id ${sourceId} has insufficient balance.`,
            undefined
      )
    }

    const sourceCustomerPatched: Result<Customer | undefined> = this.customerService.patchOneById(
      sourceId,
      { balance: sourceCustomer.data.balance - amount }
    )

    console.log(JSON.stringify(sourceCustomerPatched))

    if (sourceCustomerPatched.data === undefined) {
      return new Result<Transaction | undefined>(
        500,
                    `Transaction transfer failed: source customer with id ${sourceId} patch failed.`,
                    undefined
      )
    }

    if (destinationCustomer.data?.balance === undefined) {
      return new Result<Transaction | undefined>(
        500,
                    `Transaction transfer failed: destination customer with id ${destinationId} has undefined balance.`,
                    undefined
      )
    }
    const destinationCustomerPatched: Result<Customer | undefined> = this.customerService.patchOneById(
      destinationId,
      { balance: destinationCustomer.data.balance + amount }
    )

    console.log(JSON.stringify(destinationCustomerPatched))

    if (destinationCustomerPatched.data === undefined) {
      return new Result<Transaction | undefined>(
        500,
                        `Transaction transfer failed: destination customer with id ${destinationId} patch failed.`,
                        undefined
      )
    }

    const transaction: Transaction = new Transaction(
      randomUUID(),
      sourceId,
      destinationId,
      amount,
      new Date()
    )

    const createdTransaction: Transaction = this.transactionRepository.createOne(transaction)

    return new Result<Transaction | undefined>(
      200,
      'Transaction transfer succeed.',
      createdTransaction
    )
  }

  readAll = (): Result<Transaction[]> => {
    const foundTransactions: Transaction[] = this.transactionRepository.readAll()
    return new Result<Transaction[]>(
      200,
      'Transaction read all succeed.',
      foundTransactions
    )
  }

  readOneById = (id: string): Result<Transaction | undefined> => {
    const foundTransaction: Transaction | undefined = this.transactionRepository.readOneById(id)

    if (foundTransaction === undefined) {
      return new Result<Transaction | undefined>(
        400,
          `Transaction read one by id failed: transaction with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Transaction | undefined>(
      200,
      'Transaction read one by id succeed.',
      foundTransaction
    )
  }

  createOne = (item: any): Result<Transaction> => {
    return new Result<Transaction>(
      201,
      'Transaction create one succeed.',
      this.transactionRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Transaction | undefined> => {
    const patchedTransaction: Transaction | undefined = this.transactionRepository.patchOneById(id, item)

    if (patchedTransaction === undefined) {
      return new Result<Transaction | undefined>(
        400,
          `Transaction patch one by id failed: transaction with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Transaction | undefined>(
      200,
      'Transaction patch one by id succeed.',
      patchedTransaction
    )
  }

  deleteOneById = (id: string): Result<Transaction | undefined> => {
    const deletedTransaction: Transaction | undefined = this.transactionRepository.deleteOneById(id)

    if (deletedTransaction === undefined) {
      return new Result<Transaction | undefined>(
        400,
          `Transaction delete one by id failed: transaction with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Transaction | undefined>(
      200,
      'Transaction delete one by id succeed.',
      deletedTransaction
    )
  }
}
