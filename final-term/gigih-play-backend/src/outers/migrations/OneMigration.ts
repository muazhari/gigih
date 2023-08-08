import type OneDatastore from '../datastores/OneDatastore'
import ProductSchema from '../schemas/ProductSchema'
import Product from '../../inners/models/entities/Product'

export default class OneMigration {
  oneDatastore: OneDatastore

  constructor (oneDatastore: OneDatastore) {
    this.oneDatastore = oneDatastore
  }

  up = async (): Promise<void> => {
    const products: Product[] = await ProductSchema.create([
      new Product('title0', 0, 'linkUrl0'),
      new Product('title1', 1, 'linkUrl1')
    ])
    console.log(products)

    console.log('One migration up.')
  }

  down = async (): Promise<void> => {
    await ProductSchema.deleteMany({})

    console.log('One migration down.')
  }
}
