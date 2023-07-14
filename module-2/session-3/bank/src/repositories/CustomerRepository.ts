import Customer from '../models/Customer'

export default class CustomerRepository {
  data: Customer[] = [
    new Customer('0', 'name0', 'email0', 'password0', 0),
    new Customer('1', 'name1', 'email1', 'password1', 1000)
  ]

  readAll = (): Customer[] => {
    return this.data
  }

  readOneById = (id: string): Customer | undefined => {
    return this.data.find((item) => item.id === id)
  }

  createOne = (item: Customer): Customer => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: Customer): Customer | undefined => {
    const foundItem: Customer | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Customer | undefined => {
    const foundItem: Customer | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }

    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
