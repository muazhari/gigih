import { randomUUID } from 'crypto'
import Playlist from '../models/Playlist'
import SongRepository from './SongRepository'

export default class PlaylistRepository {
  songRepository: SongRepository = new SongRepository()

  data: Playlist[] = [
    new Playlist('0'),
    new Playlist('1')
  ]

  readAll = (): Playlist[] => {
    return this.data
  }

  readOneById = (id: string): Playlist | undefined => {
    return this.data.find((item) => item.id === id)
  }

  createOne = (item: Playlist): Playlist => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: Playlist): Playlist | undefined => {
    const foundItem: Playlist | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Playlist | undefined => {
    const foundItem: Playlist | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
