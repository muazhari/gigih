import CustomerRepository from '../repositories/CustomerRepository'
import type Customer from '../models/Customer'
import Result from '../models/Result'

export default class CustomerService {
  customerRepository: CustomerRepository = new CustomerRepository()

  readAll = (): Result<Customer[]> => {
    const foundCustomers: Customer[] = this.customerRepository.readAll()
    return new Result<Customer[]>(
      200,
      'Customer read all succeed.',
      foundCustomers
    )
  }

  readOneById = (id: string): Result<Customer | undefined> => {
    const foundCustomer: Customer | undefined = this.customerRepository.readOneById(id)

    if (foundCustomer === undefined) {
      return new Result<Customer | undefined>(
        400,
            `Customer read one by id failed: customer with id ${id} is undefined.`,
            undefined
      )
    }

    return new Result<Customer | undefined>(
      200,
      'Customer read one by id succeed.',
      foundCustomer
    )
  }

  createOne = (item: any): Result<Customer> => {
    return new Result<Customer>(
      201,
      'Customer create one succeed.',
      this.customerRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Customer | undefined> => {
    const patchedCustomer: Customer | undefined = this.customerRepository.patchOneById(id, item)

    if (patchedCustomer === undefined) {
      return new Result<Customer | undefined>(
        400,
          `Customer patch one by id failed: customer with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Customer | undefined>(
      200,
      'Customer patch one by id succeed.',
      patchedCustomer
    )
  }

  deleteOneById = (id: string): Result<Customer | undefined> => {
    const deletedCustomer: Customer | undefined = this.customerRepository.deleteOneById(id)

    if (deletedCustomer === undefined) {
      return new Result<Customer | undefined>(
        400,
          `Customer delete one by id failed: customer with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Customer | undefined>(
      200,
      'Customer delete one by id succeed.',
      deletedCustomer
    )
  }
}
