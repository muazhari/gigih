export default class Comment {
  _id: string | undefined
  username: string | undefined
  pictureUrl: string | undefined

  constructor (
    username: string | undefined,
    pictureUrl: string | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.username = username
    this.pictureUrl = pictureUrl
  }
}
