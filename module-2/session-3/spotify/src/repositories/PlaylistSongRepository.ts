import { randomUUID } from 'crypto'
import PlaylistSong from '../models/PlaylistSong'
import SongRepository from './SongRepository'

export default class PlaylistSongRepository {
  songRepository: SongRepository = new SongRepository()

  data: PlaylistSong[] = [
    new PlaylistSong('0', '0', '0', 0),
    new PlaylistSong('1', '0', '1', 1),
    new PlaylistSong('2', '1', '0', 2)
  ]

  readAll = (): PlaylistSong[] => {
    return this.data
  }

  readAllByPlaylistId = (playlistId: string): PlaylistSong[] => {
    return this.data.filter((item) => item.playlistId === playlistId)
  }

  readOneById = (id: string): PlaylistSong | undefined => {
    return this.data.find((item) => item.id === id)
  }

  createOne = (item: PlaylistSong): PlaylistSong => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: PlaylistSong): PlaylistSong | undefined => {
    const foundItem: PlaylistSong | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): PlaylistSong | undefined => {
    const foundItem: PlaylistSong | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
