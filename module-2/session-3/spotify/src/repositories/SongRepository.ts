import type Song from '../models/Song'
import type DatastoreOne from '../datastores/DatastoreOne'

export default class SongRepository {
  datastoreOne: DatastoreOne

  constructor (datastoreOne: DatastoreOne) {
    this.datastoreOne = datastoreOne
  }

  readAll = (): Song[] => {
    return this.datastoreOne.songs
  }

  readOneById = (id: string): Song => {
    const foundItem: Song | undefined = this.datastoreOne.songs.find((item) => item.id === id)
    if (foundItem === undefined) {
      throw new Error(`Song with id ${id} is not found.`)
    }
    return foundItem
  }

  createOne = (item: Song): Song => {
    this.datastoreOne.songs.push(item)
    return item
  }

  patchOneById = (id: string, item: Song): Song => {
    const foundItem: Song = this.readOneById(id)
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Song => {
    const foundItem: Song = this.readOneById(id)
    this.datastoreOne.songs = this.datastoreOne.songs.filter((item) => item.id !== id)
    return foundItem
  }
}
