import type User from '../../inners/models/entities/User'
import type OneDatastore from '../datastores/OneDatastore'
import UserSchema from '../schemas/UserSchema'
import { Types } from 'mongoose'

export default class UserRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<User[]> => {
    const foundUsers: User[] | null = await UserSchema.find()
    if (foundUsers === null) {
      throw new Error('Found users is null.')
    }
    return foundUsers
  }

  readOneById = async (id: string): Promise<User> => {
    const foundUser: User | null = await UserSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundUser === null) {
      throw new Error('Found user is null.')
    }
    return foundUser
  }

  readOneByUsername = async (username: string): Promise<User> => {
    const foundUser: User | null = await UserSchema.findOne({ username })
    if (foundUser === null) {
      throw new Error('Found user is null.')
    }
    return foundUser
  }

  readOneByUsernameAndPassword = async (username: string, password: string): Promise<User> => {
    const foundUser: User | null = await UserSchema.findOne({ username, password })
    if (foundUser === null) {
      throw new Error('Found user is null.')
    }
    return foundUser
  }

  createOne = async (user: User): Promise<User> => {
    return await UserSchema.create(user)
  }

  patchOneById = async (id: string, user: User): Promise<User> => {
    const patchedUser: User | null = await UserSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: user }, { new: true })
    if (patchedUser === null) {
      throw new Error('Patched user is null.')
    }
    return patchedUser
  }

  deleteOneById = async (id: string): Promise<User> => {
    const deletedUser: User | null = await UserSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedUser === null) {
      throw new Error('Deleted user is null.')
    }
    return deletedUser
  }
}
