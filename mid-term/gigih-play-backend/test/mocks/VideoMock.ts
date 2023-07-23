import Video from '../../src/inners/models/entities/Video'
import { Types } from 'mongoose'

export default class VideoMock {
  data: Video[]
  constructor () {
    this.data = [
      new Video('thumbnailUrl0', 'contentUrl0', new Types.ObjectId().toString()),
      new Video('thumbnailUrl1', 'contentUrl1', new Types.ObjectId().toString())
    ]
  }
}
