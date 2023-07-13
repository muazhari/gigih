import { randomUUID } from 'crypto'
import Song from '../models/Song'

export default class SongRepository {
  data: Song[] = [
    new Song('0', 'title0', ['0'], 'url0'),
    new Song('1', 'title1', ['0', '1'], 'url1')
  ]

  readAll = (): Song[] => {
    return this.data
  }

  readOneById = (id: string): Song | undefined => {
    return this.data.find((item) => item.id === id)
  }

  createOne = (item: Song): Song => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: Song): Song | undefined => {
    const foundItem: Song | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Song | undefined => {
    const foundItem: Song | undefined = this.readOneById(id)
    if (foundItem === undefined) {
      return undefined
    }
    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
