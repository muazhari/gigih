import User from '../../src/inners/models/entities/User'
import { Types } from 'mongoose'

export default class UserMock {
  data: User[]
  constructor () {
    this.data = [
      new User('username0', 'pictureUrl0', new Types.ObjectId().toString()),
      new User('username1', 'pictureUrl1', new Types.ObjectId().toString())
    ]
  }
}
