import type VideoProductMap from '../../inners/models/entities/VideoProductMap'
import type OneDatastore from '../datastores/OneDatastore'
import VideoProductMapSchema from '../schemas/VideoProductMapSchema'
import type VideoProductMapAggregate from '../../inners/models/aggregates/VideoProductMapAggregate'
import { Types } from 'mongoose'

export default class VideoProductMapRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<VideoProductMap[]> => {
    const foundVideoProductMaps: VideoProductMap[] | null = await VideoProductMapSchema.find()
    if (foundVideoProductMaps === null) {
      throw new Error('Found videoProductMaps is null.')
    }
    return foundVideoProductMaps
  }

  readAllAggregated = async (): Promise<VideoProductMapAggregate[]> => {
    const foundVideoProductMaps: VideoProductMapAggregate[] | null = await VideoProductMapSchema.aggregate([
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
    if (foundVideoProductMaps === null) {
      throw new Error('Found videoProductMaps is null.')
    }
    return foundVideoProductMaps
  }

  readOneById = async (id: string): Promise<VideoProductMap> => {
    const foundVideoProductMap: VideoProductMap | null = await VideoProductMapSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundVideoProductMap === null) {
      throw new Error('Found videoProductMap is null.')
    }
    return foundVideoProductMap
  }

  readOneByIdAggregated = async (id: string): Promise<VideoProductMapAggregate> => {
    const foundVideoProductMaps: VideoProductMapAggregate[] | null = await VideoProductMapSchema.aggregate([
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
    if (foundVideoProductMaps === null) {
      throw new Error('Found videoProductMaps is null.')
    }
    const foundVideoProductMap: VideoProductMapAggregate = foundVideoProductMaps[0]
    if (foundVideoProductMap === null) {
      throw new Error('Found videoProductMap is null.')
    }
    return foundVideoProductMap
  }

  createOne = async (videoProductMap: VideoProductMap): Promise<VideoProductMap> => {
    return await VideoProductMapSchema.create(videoProductMap)
  }

  patchOneById = async (id: string, videoProductMap: VideoProductMap): Promise<VideoProductMap> => {
    const patchedVideoProductMap: VideoProductMap | null = await VideoProductMapSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: videoProductMap }, { new: true })
    if (patchedVideoProductMap === null) {
      throw new Error('Patched videoProductMap is null.')
    }
    return patchedVideoProductMap
  }

  deleteOneById = async (id: string): Promise<VideoProductMap> => {
    const deletedVideoProductMap: VideoProductMap | null = await VideoProductMapSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedVideoProductMap === null) {
      throw new Error('Deleted videoProductMap is null.')
    }
    return deletedVideoProductMap
  }
}
