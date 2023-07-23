import type User from '../entities/User'
export default class CommentAggregate {
  _id: string | undefined
  user: User | undefined
  content: string | undefined
  timestamp: Date | undefined

  constructor (
    user: User | undefined,
    content: string | undefined,
    timestamp: Date | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.user = user
    this.content = content
    this.timestamp = timestamp
  }
}
