import Product from '../../src/inners/models/entities/Product'
import { Types } from 'mongoose'

export default class ProductMock {
  data: Product[]
  constructor () {
    this.data = [
      new Product('title0', 0, 'linkUrl0', new Types.ObjectId().toString()),
      new Product('title1', 1, 'linkUrl1', new Types.ObjectId().toString())
    ]
  }
}
