import type UserRepository from '../../../outers/repositories/UserRepository'
import Result from '../../models/value_objects/Result'
import type User from '../../models/entities/User'

export default class UserManagement {
  userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  readAll = async (search?: any): Promise<Result<User[]>> => {
    const foundUsers: User[] = await this.userRepository.readAll(search)
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

  readOneByUsername = async (username: string): Promise<Result<User >> => {
    const foundUser: User = await this.userRepository.readOneByUsername(username)
    return new Result<User >(
      200,
      'User read one by username succeed.',
      foundUser
    )
  }

  readOneByUsernameAndPassword = async (username: string, password: string): Promise<Result<User | null>> => {
    const foundUser: User | null = await this.userRepository.readOneByUsernameAndPassword(username, password)
    return new Result<User | null>(
      200,
      'User read one by username and password succeed.',
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
