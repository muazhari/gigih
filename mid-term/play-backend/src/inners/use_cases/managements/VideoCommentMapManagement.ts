import type VideoCommentMapRepository from '../../../outers/repositories/VideoCommentMapRepository'
import Result from '../../models/value_objects/Result'
import type VideoCommentMap from '../../models/entities/VideoCommentMap'
import type VideoCommentMapAggregate from '../../models/aggregates/VideoCommentMapAggregate'

export default class VideoCommentMapManagement {
  videoCommentMapRepository: VideoCommentMapRepository

  constructor (videoCommentMapRepository: VideoCommentMapRepository) {
    this.videoCommentMapRepository = videoCommentMapRepository
  }

  readAll = async (): Promise<Result<VideoCommentMap[]>> => {
    const foundVideoCommentMaps: VideoCommentMap[] = await this.videoCommentMapRepository.readAll()
    return new Result<VideoCommentMap[]>(
      200,
      'VideoCommentMap read all succeed.',
      foundVideoCommentMaps
    )
  }

  readAllAggregated = async (): Promise<Result<VideoCommentMapAggregate[]>> => {
    const foundVideoCommentMapsAggregated: VideoCommentMapAggregate[] = await this.videoCommentMapRepository.readAllAggregated()
    return new Result<VideoCommentMapAggregate[]>(
      200,
      'VideoCommentMap read all aggregated succeed.',
      foundVideoCommentMapsAggregated
    )
  }

  readOneById = async (id: string): Promise<Result<VideoCommentMap>> => {
    const foundVideoCommentMap: VideoCommentMap = await this.videoCommentMapRepository.readOneById(id)
    return new Result<VideoCommentMap >(
      200,
      'VideoCommentMap read one by id succeed.',
      foundVideoCommentMap
    )
  }

  readOneByIdAggregated = async (id: string): Promise<Result<VideoCommentMapAggregate>> => {
    const foundVideoCommentMapAggregated: VideoCommentMapAggregate = await this.videoCommentMapRepository.readOneByIdAggregated(id)
    return new Result<VideoCommentMapAggregate>(
      200,
      'VideoCommentMap read one by id aggregated succeed.',
      foundVideoCommentMapAggregated
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
