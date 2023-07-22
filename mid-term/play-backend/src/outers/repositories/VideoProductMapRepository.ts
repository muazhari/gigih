import type VideoProductMap from '../../inners/models/entities/VideoProductMap'
import type OneDatastore from '../datastores/OneDatastore'
import VideoProductMapSchema from '../schemas/VideoProductMapSchema'
import type VideoProductMapAggregate from '../../inners/models/value_objects/responses/aggregates/VideoProductMapAggregate'
import { Types } from 'mongoose'

export default class VideoProductMapRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<VideoProductMap[]> => {
    const foundEntities: VideoProductMap[] | null = await VideoProductMapSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readAllAggregated = async (): Promise<VideoProductMapAggregate[]> => {
    const foundEntities: VideoProductMapAggregate[] | null = await VideoProductMapSchema.aggregate([
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'video'
        }
      },
      {
        $unwind: {
          path: '$video'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product'
        }
      },
      {
        $project: {
          _id: 1,
          video: 1,
          product: 1
        }
      }
    ])
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneById = async (id: string): Promise<VideoProductMap> => {
    const foundEntity: VideoProductMap | null = await VideoProductMapSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  readOneByIdAggregated = async (id: string): Promise<VideoProductMapAggregate> => {
    const foundEntities: VideoProductMapAggregate[] | null = await VideoProductMapSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'video'
        }
      },
      {
        $unwind: {
          path: '$video'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product'
        }
      },
      {
        $project: {
          _id: 1,
          video: 1,
          product: 1
        }
      }
    ])
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    const foundEntity: VideoProductMapAggregate = foundEntities[0]
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: VideoProductMap): Promise<VideoProductMap> => {
    return await VideoProductMapSchema.create(entity)
  }

  patchOneById = async (id: string, entity: VideoProductMap): Promise<VideoProductMap> => {
    const patchedEntity: VideoProductMap | null = await VideoProductMapSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<VideoProductMap> => {
    const deletedEntity: VideoProductMap | null = await VideoProductMapSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }
}
