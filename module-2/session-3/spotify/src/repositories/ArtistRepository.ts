import type Artist from '../models/Artist'
import type DatastoreOne from '../datastores/DatastoreOne'

export default class ArtistRepository {
  datastoreOne: DatastoreOne

  constructor (datastoreOne: DatastoreOne) {
    this.datastoreOne = datastoreOne
  }

  readAll = (): Artist[] => {
    return this.datastoreOne.artists
  }

  readOneById = (id: string): Artist => {
    const foundItem: Artist | undefined = this.datastoreOne.artists.find((item) => item.id === id)
    if (foundItem === undefined) {
      throw new Error(`Artist with id ${id} is not found.`)
    }
    return foundItem
  }

  createOne = (item: Artist): Artist => {
    this.datastoreOne.artists.push(item)
    return item
  }

  patchOneById = (id: string, item: Artist): Artist => {
    const foundItem: Artist = this.readOneById(id)
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Artist => {
    const foundItem: Artist = this.readOneById(id)
    this.datastoreOne.artists = this.datastoreOne.artists.filter((item) => item.id !== id)
    return foundItem
  }
}
