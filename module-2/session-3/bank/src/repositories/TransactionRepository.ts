import Transaction from '../models/Transaction'

export default class TransactionRepository {
  data: Transaction[] = [
    new Transaction('0', '0', '1', 100, new Date()),
    new Transaction('1', '1', '0', 200, new Date())
  ]

  readAll = (): Transaction[] => {
    return this.data
  }

  readOneById = (id: string): Transaction | undefined => {
    return this.data.find((item) => item.id === id)
  }

  createOne = (item: Transaction): Transaction => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: Transaction): Transaction | undefined => {
    const foundItem: Transaction | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Transaction | undefined => {
    const foundItem: Transaction | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
