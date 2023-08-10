export default class Comment {
  _id: string | undefined
  userId: string | undefined
  content: string | undefined
  timestamp: string | undefined

  constructor (
    userId: string | undefined,
    content: string | undefined,
    timestamp: string | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.userId = userId
    this.content = content
    this.timestamp = timestamp
  }
}
