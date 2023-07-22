import type VideoCommentMap from '../../inners/models/entities/VideoCommentMap'
import type OneDatastore from '../datastores/OneDatastore'
import VideoCommentMapSchema from '../schemas/VideoCommentMapSchema'
import type VideoCommentMapAggregate from '../../inners/models/value_objects/responses/aggregates/VideoCommentMapAggregate'
import { Types } from 'mongoose'

export default class VideoCommentMapRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<VideoCommentMap[]> => {
    const foundEntities: VideoCommentMap[] | null = await VideoCommentMapSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readAllAggregated = async (): Promise<VideoCommentMapAggregate[]> => {
    const foundEntities: VideoCommentMapAggregate[] | null = await VideoCommentMapSchema.aggregate([
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
          from: 'comments',
          localField: 'commentId',
          foreignField: '_id',
          as: 'comment'
        }
      },
      {
        $unwind: {
          path: '$comment'
        }
      },
      {
        $project: {
          _id: 1,
          video: 1,
          comment: 1
        }
      }
    ])
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneById = async (id: string): Promise<VideoCommentMap> => {
    const foundEntity: VideoCommentMap | null = await VideoCommentMapSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  readOneByIdAggregated = async (id: string): Promise<VideoCommentMapAggregate> => {
    const foundEntities: VideoCommentMapAggregate[] | null = await VideoCommentMapSchema.aggregate([
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
          from: 'comments',
          localField: 'commentId',
          foreignField: '_id',
          as: 'comment'
        }
      },
      {
        $unwind: {
          path: '$comment'
        }
      },
      {
        $project: {
          _id: 1,
          video: 1,
          comment: 1
        }
      },
      {
        $limit: 1
      }
    ])
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    const foundEntity: VideoCommentMapAggregate | null = foundEntities[0]
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: VideoCommentMap): Promise<VideoCommentMap> => {
    return await VideoCommentMapSchema.create(entity)
  }

  patchOneById = async (id: string, entity: VideoCommentMap): Promise<VideoCommentMap> => {
    const patchedEntity: VideoCommentMap | null = await VideoCommentMapSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<VideoCommentMap> => {
    const deletedEntity: VideoCommentMap | null = await VideoCommentMapSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }
}
