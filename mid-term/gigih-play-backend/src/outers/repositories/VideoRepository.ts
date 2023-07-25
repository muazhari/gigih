import type Video from '../../inners/models/entities/Video'
import type OneDatastore from '../datastores/OneDatastore'
import VideoSchema from '../schemas/VideoSchema'
import { Types } from 'mongoose'

export default class VideoRepository {
  oneDatastore: OneDatastore

  constructor (datastoreOne: OneDatastore) {
    this.oneDatastore = datastoreOne
  }

  readAll = async (search?: any): Promise<Video[]> => {
    if (search !== undefined) {
      if (search._id !== null) {
        search._id = new Types.ObjectId(search._id)
      }
    }
    const foundVideos: Video[] | null = await VideoSchema.find(search)
    if (foundVideos === null) {
      throw new Error('Found videos is null.')
    }
    return foundVideos
  }

  readOneById = async (id: string): Promise<Video> => {
    const foundVideo: Video | null = await VideoSchema.findOne({ _id: new Types.ObjectId(id) })
    if (foundVideo === null) {
      throw new Error('Found video is null.')
    }
    return foundVideo
  }

  createOne = async (video: Video): Promise<Video> => {
    return await VideoSchema.create(video)
  }

  patchOneById = async (id: string, video: Video): Promise<Video> => {
    const patchedVideo: Video | null = await VideoSchema.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: video }, { new: true })
    if (patchedVideo === null) {
      throw new Error('Patched video is null.')
    }
    return patchedVideo
  }

  deleteOneById = async (id: string): Promise<Video> => {
    const deletedVideo: Video | null = await VideoSchema.findOneAndDelete({ _id: new Types.ObjectId(id) })
    if (deletedVideo === null) {
      throw new Error('Deleted video is null.')
    }
    return deletedVideo
  }
}
