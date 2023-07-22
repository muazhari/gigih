import type Video from '../../inners/models/entities/Video'
import type OneDatastore from '../datastores/OneDatastore'
import VideoSchema from '../schemas/VideoSchema'

export default class VideoRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (): Promise<Video[]> => {
    const foundEntities: Video[] | null = await VideoSchema.find()
    if (foundEntities === null) {
      throw new Error('Found entities is null.')
    }
    return foundEntities
  }

  readOneById = async (id: string): Promise<Video> => {
    const foundEntity: Video | null = await VideoSchema.findOne({ _id: id })
    if (foundEntity === null) {
      throw new Error('Found entity is null.')
    }
    return foundEntity
  }

  createOne = async (entity: Video): Promise<Video> => {
    return await VideoSchema.create(entity)
  }

  patchOneById = async (id: string, entity: Video): Promise<Video> => {
    const patchedEntity: Video | null = await VideoSchema.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true })
    if (patchedEntity === null) {
      throw new Error('Patched entity is null.')
    }
    return patchedEntity
  }

  deleteOneById = async (id: string): Promise<Video> => {
    const deletedEntity: Video | null = await VideoSchema.findOneAndDelete({ _id: id })
    if (deletedEntity === null) {
      throw new Error('Deleted entity is null.')
    }
    return deletedEntity
  }
}
