import type VideoCommentMap from '../../inners/models/entities/VideoCommentMap'
import type OneDatastore from '../datastores/OneDatastore'
import VideoCommentMapSchema from '../schemas/VideoCommentMapSchema'
import type VideoCommentMapAggregate from '../../inners/models/aggregates/VideoCommentMapAggregate'
import { Types } from 'mongoose'

export default class VideoCommentMapRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (search?: any): Promise<VideoCommentMap[]> => {
    if (search !== undefined) {
      if (search._id !== null) {
        search._id = new Types.ObjectId(search._id)
      }
    }
    const foundVideoCommentMaps: VideoCommentMap[] | null = await VideoCommentMapSchema.find(search)
    if (foundVideoCommentMaps === null) {
      throw new Error('Found videoCommentMaps is null.')
    }
    return foundVideoCommentMaps
  }

  readAllAggregated = async (search?: any): Promise<VideoCommentMapAggregate[]> => {
    const pipeline: any[] = [
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
    ]
    if (search !== undefined) {
      if (search._id !== null) {
        search._id = new Types.ObjectId(search._id)
      }
      pipeline.push({
        $match: search
      })
    }
    const foundVideoCommentMaps: VideoCommentMapAggregate[] | null = await VideoCommentMapSchema.aggregate(pipeline)
    if (foundVideoCommentMaps === null) {
      throw new Error('Found videoCommentMaps is null.')
    }
    return foundVideoCommentMaps
  }

  readOneById = async (id: string): Promise<VideoCommentMap> => {
    const foundVideoCommentMap: VideoCommentMap | null = await VideoCommentMapSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundVideoCommentMap === null) {
      throw new Error('Found videoCommentMap is null.')
    }
    return foundVideoCommentMap
  }

  readOneByIdAggregated = async (id: string): Promise<VideoCommentMapAggregate> => {
    const foundVideoCommentMaps: VideoCommentMapAggregate[] | null = await VideoCommentMapSchema.aggregate([
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
    if (foundVideoCommentMaps === null) {
      throw new Error('Found videoCommentMaps is null.')
    }
    const foundVideoCommentMap: VideoCommentMapAggregate | null = foundVideoCommentMaps[0]
    if (foundVideoCommentMap === null) {
      throw new Error('Found videoCommentMap is null.')
    }
    return foundVideoCommentMap
  }

  createOne = async (videoCommentMap: VideoCommentMap): Promise<VideoCommentMap> => {
    return await VideoCommentMapSchema.create(videoCommentMap)
  }

  patchOneById = async (id: string, videoCommentMap: VideoCommentMap): Promise<VideoCommentMap> => {
    const patchedVideoCommentMap: VideoCommentMap | null = await VideoCommentMapSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: videoCommentMap }, { new: true })
    if (patchedVideoCommentMap === null) {
      throw new Error('Patched videoCommentMap is null.')
    }
    return patchedVideoCommentMap
  }

  deleteOneById = async (id: string): Promise<VideoCommentMap> => {
    const deletedVideoCommentMap: VideoCommentMap | null = await VideoCommentMapSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedVideoCommentMap === null) {
      throw new Error('Deleted videoCommentMap is null.')
    }
    return deletedVideoCommentMap
  }
}
