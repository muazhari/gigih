export default class User {
  _id: string | undefined
  username: string | undefined
  password: string | undefined
  pictureUrl: string | undefined

  constructor (
    username: string | undefined,
    password: string | undefined,
    pictureUrl: string | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.username = username
    this.password = password
    this.pictureUrl = pictureUrl
  }
}
