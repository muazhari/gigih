import BaseModel from './BaseModel'

export default class Playlist extends BaseModel {
  id: string | undefined

  constructor (
    id: string | undefined
  ) {
    super()
    this.id = id
  }
}
