import type Product from '../../inners/models/entities/Product'
import type OneDatastore from '../datastores/OneDatastore'
import ProductSchema from '../schemas/ProductSchema'
import { Types } from 'mongoose'

export default class ProductRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<Product[]> => {
    const foundProducts: Product[] | null = await ProductSchema.find()
    if (foundProducts === null) {
      throw new Error('Found products is null.')
    }
    return foundProducts
  }

  readAllByVideoId = async (videoId: string): Promise<Product[]> => {
    const foundProductsByVideoId: Product[] | null = await ProductSchema.aggregate([
      {
        $lookup: {
          from: 'video_product_maps',
          localField: '_id',
          foreignField: 'productId',
          as: 'videoProductMaps'
        }
      },
      {
        $match: {
          'videoProductMaps.videoId': new Types.ObjectId(videoId)
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          linkUrl: 1
        }
      }
    ])
    if (foundProductsByVideoId === null) {
      throw new Error('Found products by video id is null.')
    }
    return foundProductsByVideoId
  }

  readOneById = async (id: string): Promise<Product> => {
    const foundProduct: Product | null = await ProductSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundProduct === null) {
      throw new Error('Found product is null.')
    }
    return foundProduct
  }

  createOne = async (product: Product): Promise<Product> => {
    return await ProductSchema.create(product)
  }

  patchOneById = async (id: string, product: Product): Promise<Product> => {
    const patchedProduct: Product | null = await ProductSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: product }, { new: true })
    if (patchedProduct === null) {
      throw new Error('Patched product is null.')
    }
    return patchedProduct
  }

  deleteOneById = async (id: string): Promise<Product> => {
    const deletedProduct: Product | null = await ProductSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedProduct === null) {
      throw new Error('Deleted product is null.')
    }
    return deletedProduct
  }
}
