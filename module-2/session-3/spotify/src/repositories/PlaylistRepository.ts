import type Playlist from '../models/Playlist'
import type DatastoreOne from '../datastores/DatastoreOne'

export default class PlaylistRepository {
  datastoreOne: DatastoreOne

  constructor (datastoreOne: DatastoreOne) {
    this.datastoreOne = datastoreOne
  }

  readAll = (): Playlist[] => {
    return this.datastoreOne.playlists
  }

  readOneById = (id: string): Playlist => {
    const foundItem: Playlist | undefined = this.datastoreOne.playlists.find((item) => item.id === id)
    if (foundItem === undefined) {
      throw new Error(`Playlist with id ${id} is not found.`)
    }
    return foundItem
  }

  createOne = (item: Playlist): Playlist => {
    this.datastoreOne.playlists.push(item)
    return item
  }

  patchOneById = (id: string, item: Playlist): Playlist => {
    const foundItem: Playlist = this.readOneById(id)
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Playlist => {
    const foundItem: Playlist = this.readOneById(id)
    this.datastoreOne.playlists = this.datastoreOne.playlists.filter((item) => item.id !== id)
    return foundItem
  }
}
