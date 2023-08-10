import User from '../../src/inners/models/entities/User'
import { Types } from 'mongoose'
import { randomUUID } from 'crypto'

export default class UserMock {
  data: User[]
  constructor () {
    this.data = [
      new User(`username${randomUUID()}`, 'password0', 'https://placehold.co/400x400?text=pictureUrl0', new Types.ObjectId().toString()),
      new User(`username${randomUUID()}`, 'password1', 'https://placehold.co/400x400?text=pictureUrl0', new Types.ObjectId().toString())
    ]
  }
}
