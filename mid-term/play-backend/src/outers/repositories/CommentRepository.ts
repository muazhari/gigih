import type Comment from '../../inners/models/entities/Comment'
import type OneDatastore from '../datastores/OneDatastore'
import CommentSchema from '../schemas/CommentSchema'
import type CommentAggregate from '../../inners/models/value_objects/responses/aggregates/CommentAggregate'
import { SchemaTypes, Types } from 'mongoose'

export default class CommentRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<Comment[]> => {
    const foundEntities: Comment[] | null = await CommentSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneById = async (id: string): Promise<Comment> => {
    const foundEntity: Comment | null = await CommentSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: Comment): Promise<Comment> => {
    return await CommentSchema.create(entity)
  }

  patchOneById = async (id: string, entity: Comment): Promise<Comment> => {
    const patchedEntity: Comment | null = await CommentSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<Comment> => {
    const deletedEntity: Comment | null = await CommentSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }

  readAllAggregated = async (): Promise<CommentAggregate[]> => {
    const foundEntities: CommentAggregate[] | null = await CommentSchema.aggregate([
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
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneByIdAggregated = async (id: string): Promise<CommentAggregate> => {
    const foundEntities: CommentAggregate[] | null = await CommentSchema.aggregate([
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
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    const foundEntity: CommentAggregate | null = foundEntities[0] ?? null
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }
}
