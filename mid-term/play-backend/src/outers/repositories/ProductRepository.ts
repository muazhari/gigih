import type Product from '../../inners/models/entities/Product'
import type OneDatastore from '../datastores/OneDatastore'
import ProductSchema from '../schemas/ProductSchema'

export default class ProductRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<Product[]> => {
    const foundEntities: Product[] | null = await ProductSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readAllByVideoId = async (videoId: string): Promise<Product[]> => {
    const foundEntitiesByVideoId: Product[] | null = await ProductSchema.aggregate([
      {
        $lookup: {
          from: 'aggregates',
          localField: '_id',
          foreignField: 'productId',
          as: 'videoProductMaps'
        }
      },
      {
        $match: {
          'videoProductMaps.videoId': videoId
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
    if (foundEntitiesByVideoId === null) {
      throw new Error('Found entities by video id is null.')
    }
    return foundEntitiesByVideoId
  }

  readOneById = async (id: string): Promise<Product> => {
    const foundEntity: Product | null = await ProductSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: Product): Promise<Product> => {
    return await ProductSchema.create(entity)
  }

  patchOneById = async (id: string, entity: Product): Promise<Product> => {
    const patchedEntity: Product | null = await ProductSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<Product> => {
    const deletedEntity: Product | null = await ProductSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }
}
