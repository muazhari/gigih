import BaseModel from './BaseModel'

export default class PlaylistSong extends BaseModel {
  id: string | undefined
  playlistId: string | undefined
  songId: string | undefined
  playCount: number | undefined

  constructor (
    id: string | undefined,
    playlistId: string | undefined,
    songId: string | undefined,
    playCount: number | undefined
  ) {
    super()
    this.id = id
    this.playlistId = playlistId
    this.songId = songId
    this.playCount = playCount
  }
}
