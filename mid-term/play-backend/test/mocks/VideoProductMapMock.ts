import VideoProductMap from '../../src/inners/models/entities/VideoProductMap'
import { Types } from 'mongoose'
import VideoMock from './VideoMock'
import ProductMock from './ProductMock'
import VideoProductMapAggregate
  from '../../src/inners/models/value_objects/responses/aggregates/VideoProductMapAggregate'

export default class VideoProductMapMock {
  videoMock: VideoMock
  productMock: ProductMock
  data: VideoProductMap[]
  aggregatedData: VideoProductMapAggregate[]
  constructor () {
    this.videoMock = new VideoMock()
    this.productMock = new ProductMock()
    this.data = [
      new VideoProductMap(this.videoMock.data[0]._id, this.productMock.data[0]._id, new Types.ObjectId().toString()),
      new VideoProductMap(this.videoMock.data[1]._id, this.productMock.data[1]._id, new Types.ObjectId().toString())
    ]
    this.aggregatedData = [
      new VideoProductMapAggregate(this.videoMock.data[0], this.productMock.data[0], this.data[0]._id),
      new VideoProductMapAggregate(this.videoMock.data[1], this.productMock.data[1], this.data[1]._id)
    ]
  }
}
