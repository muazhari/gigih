import BaseModel from './BaseModel'

export default class Song extends BaseModel {
  id: string | undefined
  title: string | undefined
  artistIds: string[] | undefined
  url: string | undefined

  constructor (
    id: string | undefined,
    title: string | undefined,
    artistIds: string[] | undefined,
    url: string | undefined
  ) {
    super()
    this.id = id
    this.title = title
    this.artistIds = artistIds
    this.url = url
  }
}
