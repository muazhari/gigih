import type User from '../../inners/models/entities/User'
import type OneDatastore from '../datastores/OneDatastore'
import UserSchema from '../schemas/UserSchema'

export default class UserRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<User[]> => {
    const foundEntities: User[] | null = await UserSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneById = async (id: string): Promise<User> => {
    const foundEntity: User | null = await UserSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: User): Promise<User> => {
    return await UserSchema.create(entity)
  }

  patchOneById = async (id: string, entity: User): Promise<User> => {
    const patchedEntity: User | null = await UserSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<User> => {
    const deletedEntity: User | null = await UserSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }
}
