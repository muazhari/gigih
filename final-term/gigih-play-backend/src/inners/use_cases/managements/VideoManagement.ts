import type VideoRepository from '../../../outers/repositories/VideoRepository'
import Result from '../../models/value_objects/Result'
import type Video from '../../models/entities/Video'

export default class VideoManagement {
  videoRepository: VideoRepository

  constructor (videoRepository: VideoRepository) {
    this.videoRepository = videoRepository
  }

  readAll = async (search?: any): Promise<Result<Video[]>> => {
    const foundVideos: Video[] = await this.videoRepository.readAll(search)
    return new Result<Video[]>(
      200,
      'Video read all succeed.',
      foundVideos
    )
  }

  readOneById = async (id: string): Promise<Result<Video>> => {
    const foundVideo: Video = await this.videoRepository.readOneById(id)
    return new Result<Video>(
      200,
      'Video read one by id succeed.',
      foundVideo
    )
  }

  createOne = async (item: any): Promise<Result<Video>> => {
    const createdVideo: Video = await this.videoRepository.createOne(item)
    return new Result<Video>(
      201,
      'Video create one succeed.',
      createdVideo
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<Video>> => {
    const patchedVideo: Video = await this.videoRepository.patchOneById(id, item)
    return new Result<Video>(
      200,
      'Video patch one by id succeed.',
      patchedVideo
    )
  }

  deleteOneById = async (id: string): Promise<Result<Video>> => {
    const deletedVideo: Video = await this.videoRepository.deleteOneById(id)
    return new Result<Video>(
      200,
      'Video delete one by id succeed.',
      deletedVideo
    )
  }
}
