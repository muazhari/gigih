import type UserManagement from '../managements/UserManagement'
import type LoginByUsernameAndPasswordRequest
  from '../../models/value_objects/requests/authentications/LoginByUsernameAndPasswordRequest'

import type User from '../../models/entities/User'
import Result from '../../models/value_objects/Result'
import { Error } from 'mongoose'

export default class LoginAuthentication {
  userManagement: UserManagement

  constructor (userManagement: UserManagement) {
    this.userManagement = userManagement
  }

  loginByUsernameAndPassword = async (request: LoginByUsernameAndPasswordRequest): Promise<Result<User | null>> => {
    if (request.username === undefined) {
      throw new Error('Username is undefined.')
    }
    if (request.password === undefined) {
      throw new Error('Password is undefined.')
    }

    try {
      await this.userManagement.readOneByUsername(request.username)
    } catch (error) {
      return new Result<null>(
        404,
        `Login by username failed, unknown username: ${(error as Error).message}`,
        null
      )
    }

    let foundUserByUsernameAndPassword: Result<User | null>
    try {
      foundUserByUsernameAndPassword = await this.userManagement.readOneByUsernameAndPassword(request.username, request.password)
    } catch (error) {
      return new Result<null>(
        404,
            `Login by username and password failed, unknown username or password: ${(error as Error).message}`,
            null
      )
    }

    return new Result<User>(
      200,
      'Login by username and password succeed.',
      foundUserByUsernameAndPassword.data as User
    )
  }
}
