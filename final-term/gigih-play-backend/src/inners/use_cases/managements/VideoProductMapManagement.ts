import type VideoProductMapRepository from '../../../outers/repositories/VideoProductMapRepository'
import Result from '../../models/value_objects/Result'
import type VideoProductMap from '../../models/entities/VideoProductMap'
import type VideoProductMapAggregate from '../../models/aggregates/VideoProductMapAggregate'

export default class VideoProductMapManagement {
  videoProductMapRepository: VideoProductMapRepository

  constructor (videoProductMapRepository: VideoProductMapRepository) {
    this.videoProductMapRepository = videoProductMapRepository
  }

  readAll = async (isAggregated?: boolean, search?: any): Promise<Result<VideoProductMap[] | VideoProductMapAggregate[]>> => {
    let foundVideoProductMaps: VideoProductMap[] | VideoProductMapAggregate[]
    if (isAggregated === true) {
      foundVideoProductMaps = await this.videoProductMapRepository.readAllAggregated(search)
    } else {
      foundVideoProductMaps = await this.videoProductMapRepository.readAll(search)
    }
    return new Result<VideoProductMap[] | VideoProductMapAggregate[]>(
      200,
      'VideoProductMap read all succeed.',
      foundVideoProductMaps
    )
  }

  readOneById = async (id: string, isAggregated?: boolean): Promise<Result<VideoProductMap | VideoProductMapAggregate>> => {
    let foundVideoProductMap: VideoProductMap | VideoProductMapAggregate
    if (isAggregated === true) {
      foundVideoProductMap = await this.videoProductMapRepository.readOneByIdAggregated(id)
    } else {
      foundVideoProductMap = await this.videoProductMapRepository.readOneById(id)
    }
    return new Result<VideoProductMap | VideoProductMapAggregate>(
      200,
      'VideoProductMap read one by id succeed.',
      foundVideoProductMap
    )
  }

  readOneByIdAggregated = async (id: string): Promise<Result<VideoProductMapAggregate>> => {
    const foundVideoProductMap: VideoProductMapAggregate = await this.videoProductMapRepository.readOneByIdAggregated(id)
    return new Result<VideoProductMapAggregate>(
      200,
      'VideoProductMap read one by id aggregated succeed.',
      foundVideoProductMap
    )
  }

  createOne = async (item: any): Promise<Result<VideoProductMap>> => {
    const createdVideoProductMap: VideoProductMap = await this.videoProductMapRepository.createOne(item)
    return new Result<VideoProductMap>(
      201,
      'VideoProductMap create one succeed.',
      createdVideoProductMap
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<VideoProductMap>> => {
    const patchedVideoProductMap: VideoProductMap = await this.videoProductMapRepository.patchOneById(id, item)
    return new Result<VideoProductMap>(
      200,
      'VideoProductMap patch one by id succeed.',
      patchedVideoProductMap
    )
  }

  deleteOneById = async (id: string): Promise<Result<VideoProductMap>> => {
    const deletedVideoProductMap: VideoProductMap = await this.videoProductMapRepository.deleteOneById(id)
    return new Result<VideoProductMap>(
      200,
      'VideoProductMap delete one by id succeed.',
      deletedVideoProductMap
    )
  }
}
