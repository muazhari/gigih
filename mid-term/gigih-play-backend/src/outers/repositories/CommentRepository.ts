import type Comment from '../../inners/models/entities/Comment'
import type OneDatastore from '../datastores/OneDatastore'
import CommentSchema from '../schemas/CommentSchema'
import type CommentAggregate from '../../inners/models/aggregates/CommentAggregate'
import { Types } from 'mongoose'

export default class CommentRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<Comment[]> => {
    const foundComment: Comment[] | null = await CommentSchema.find()
    if (foundComment === null) {
      throw new Error('Found comments is null.')
    }
    return foundComment
  }

  readAllAggregated = async (): Promise<CommentAggregate[]> => {
    const foundComment: CommentAggregate[] | null = await CommentSchema.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user'
        }
      },
      {
        $project: {
          _id: 1,
          user: 1,
          content: 1,
          timestamp: 1
        }
      }
    ])
    if (foundComment === null) {
      throw new Error('Found comments is null.')
    }
    return foundComment
  }

  readAllByVideoId = async (videoId: string): Promise<Comment[]> => {
    const foundCommentByVideoId: Comment[] | null = await CommentSchema.aggregate([
      {
        $lookup: {
          from: 'video_comment_maps',
          localField: '_id',
          foreignField: 'commentId',
          as: 'videoCommentMaps'
        }
      },
      {
        $match: {
          'videoCommentMaps.videoId': new Types.ObjectId(videoId)
        }
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          content: 1,
          timestamp: 1
        }
      }
    ])
    if (foundCommentByVideoId === null) {
      throw new Error('Found comments by video id is null.')
    }
    return foundCommentByVideoId
  }

  readAllByVideoIdAggregated = async (videoId: string): Promise<CommentAggregate[]> => {
    const foundCommentByVideoId: CommentAggregate[] | null = await CommentSchema.aggregate([
      {
        $lookup: {
          from: 'video_comment_maps',
          localField: '_id',
          foreignField: 'commentId',
          as: 'videoCommentMaps'
        }
      },
      {
        $match: {
          'videoCommentMaps.videoId': new Types.ObjectId(videoId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user'
        }
      },
      {
        $project: {
          _id: 1,
          user: 1,
          content: 1,
          timestamp: 1
        }
      }
    ])
    if (foundCommentByVideoId === null) {
      throw new Error('Found comments by video id is null.')
    }
    return foundCommentByVideoId
  }

  readOneById = async (id: string): Promise<Comment> => {
    const foundComment: Comment | null = await CommentSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundComment === null) {
      throw new Error('Found comment is null.')
    }
    return foundComment
  }

  readOneByIdAggregated = async (id: string): Promise<CommentAggregate> => {
    const foundComments: CommentAggregate[] | null = await CommentSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user'
        }
      },
      {
        $project: {
          _id: 1,
          user: 1,
          content: 1,
          timestamp: 1
        }
      },
      {
        $limit: 1
      }
    ])
    if (foundComments === null) {
      throw new Error('Found comments is null.')
    }
    const foundComment: CommentAggregate | null = foundComments[0] ?? null
    if (foundComment === null) {
      throw new Error('Found comment is null.')
    }
    return foundComment
  }

  createOne = async (comment: Comment): Promise<Comment> => {
    return await CommentSchema.create(comment)
  }

  patchOneById = async (id: string, comment: Comment): Promise<Comment> => {
    const patchedComment: Comment | null = await CommentSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: comment }, { new: true })
    if (patchedComment === null) {
      throw new Error('Patched comment is null.')
    }
    return patchedComment
  }

  deleteOneById = async (id: string): Promise<Comment> => {
    const deletedComment: Comment | null = await CommentSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedComment === null) {
      throw new Error('Deleted comment is null.')
    }
    return deletedComment
  }
}
