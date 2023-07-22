import type UserRepository from '../../../outers/repositories/UserRepository'
import Result from '../../models/value_objects/Result'
import type User from '../../models/entities/User'

export default class UserManagement {
  userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  readAll = async (): Promise<Result<User[]>> => {
    const foundUsers: User[] = await this.userRepository.readAll()
    return new Result<User[]>(
      200,
      'User read all succeed.',
      foundUsers
    )
  }

  readOneById = async (id: string): Promise<Result<User >> => {
    const foundUser: User = await this.userRepository.readOneById(id)
    return new Result<User >(
      200,
      'User read one by id succeed.',
      foundUser
    )
  }

  createOne = async (item: any): Promise<Result<User>> => {
    const createdUser: User = await this.userRepository.createOne(item)
    return new Result<User>(
      201,
      'User create one succeed.',
      createdUser
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<User>> => {
    const patchedUser: User = await this.userRepository.patchOneById(id, item)
    return new Result<User >(
      200,
      'User patch one by id succeed.',
      patchedUser
    )
  }

  deleteOneById = async (id: string): Promise<Result<User>> => {
    const deletedUser: User = await this.userRepository.deleteOneById(id)
    return new Result<User>(
      200,
      'User delete one by id succeed.',
      deletedUser
    )
  }
}
