import Video from '../../src/inners/models/entities/Video'
import { Types } from 'mongoose'

export default class VideoMock {
  data: Video[]

  constructor () {
    this.data = [
      new Video('https://placehold.co/400x400?text=thumbnailUrl0', 'https://placehold.co/1366x768.mp4?text=contentUrl0', new Types.ObjectId().toString()),
      new Video('https://placehold.co/400x400?text=thumbnailUrl1', 'https://placehold.co/1366x768.mp4?text=contentUrl1', new Types.ObjectId().toString())
    ]
  }
}
