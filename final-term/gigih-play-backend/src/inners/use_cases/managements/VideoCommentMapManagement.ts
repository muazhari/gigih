import type VideoCommentMapRepository from '../../../outers/repositories/VideoCommentMapRepository'
import Result from '../../models/value_objects/Result'
import type VideoCommentMap from '../../models/entities/VideoCommentMap'
import type VideoCommentMapAggregate from '../../models/aggregates/VideoCommentMapAggregate'

export default class VideoCommentMapManagement {
  videoCommentMapRepository: VideoCommentMapRepository

  constructor (videoCommentMapRepository: VideoCommentMapRepository) {
    this.videoCommentMapRepository = videoCommentMapRepository
  }

  readAll = async (isAggregated?: boolean, search?: any): Promise<Result<VideoCommentMap[] | VideoCommentMapAggregate[]>> => {
    let foundVideoCommentMaps: VideoCommentMap[] | VideoCommentMapAggregate[]
    if (isAggregated === true) {
      foundVideoCommentMaps = await this.videoCommentMapRepository.readAllAggregated(search)
    } else {
      foundVideoCommentMaps = await this.videoCommentMapRepository.readAll(search)
    }

    return new Result<VideoCommentMap[] | VideoCommentMapAggregate[]>(
      200,
      'VideoCommentMap read all succeed.',
      foundVideoCommentMaps
    )
  }

  readOneById = async (id: string, isAggregated?: boolean): Promise<Result<VideoCommentMap | VideoCommentMapAggregate>> => {
    let foundVideoCommentMap: VideoCommentMap | VideoCommentMapAggregate
    if (isAggregated === true) {
      foundVideoCommentMap = await this.videoCommentMapRepository.readOneByIdAggregated(id)
    } else {
      foundVideoCommentMap = await this.videoCommentMapRepository.readOneById(id)
    }
    return new Result<VideoCommentMap | VideoCommentMapAggregate>(
      200,
      'VideoCommentMap read one by id succeed.',
      foundVideoCommentMap
    )
  }

  createOne = async (item: any): Promise<Result<VideoCommentMap>> => {
    const createdVideoCommentMap: VideoCommentMap = await this.videoCommentMapRepository.createOne(item)
    return new Result<VideoCommentMap>(
      201,
      'VideoCommentMap create one succeed.',
      createdVideoCommentMap
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<VideoCommentMap>> => {
    const patchedVideoCommentMap: VideoCommentMap = await this.videoCommentMapRepository.patchOneById(id, item)
    return new Result<VideoCommentMap >(
      200,
      'VideoCommentMap patch one by id succeed.',
      patchedVideoCommentMap
    )
  }

  deleteOneById = async (id: string): Promise<Result<VideoCommentMap >> => {
    const deletedVideoCommentMap: VideoCommentMap = await this.videoCommentMapRepository.deleteOneById(id)
    return new Result<VideoCommentMap>(
      200,
      'VideoCommentMap delete one by id succeed.',
      deletedVideoCommentMap
    )
  }
}
