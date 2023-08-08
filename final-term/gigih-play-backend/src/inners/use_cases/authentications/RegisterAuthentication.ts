import type UserManagement from '../managements/UserManagement'
import type RegisterByUsernameAndPasswordRequest
  from '../../models/value_objects/requests/authentications/RegisterByUsernameAndPasswordRequest'

import User from '../../models/entities/User'
import Result from '../../models/value_objects/Result'
import { Error } from 'mongoose'

export default class RegisterAuthentication {
  userManagement: UserManagement

  constructor (userManagement: UserManagement) {
    this.userManagement = userManagement
  }

  registerByUsernameAndPassword = async (request: RegisterByUsernameAndPasswordRequest): Promise<Result<User | null>> => {
    if (request.username === undefined) {
      throw new Error('Username is undefined.')
    }
    if (request.password === undefined) {
      throw new Error('Password is undefined.')
    }

    let isUserFound: boolean
    try {
      await this.userManagement.readOneByUsername(request.username)
      isUserFound = true
    } catch (error) {
      isUserFound = false
    }

    if (isUserFound) {
      return new Result<null>(
        409,
        'Register by username and password failed, username already exists.',
        null
      )
    }

    const toCreateUser: User = new User(
      request.username,
      request.password,
      ''
    )
    const createdUser: Result<User> = await this.userManagement.createOne(toCreateUser)

    return new Result<User>(
      201,
      'Register by username and password succeed.',
      createdUser.data
    )
  }
}
