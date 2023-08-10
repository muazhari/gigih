import VideoCommentMap from '../../src/inners/models/entities/VideoCommentMap'
import { Types } from 'mongoose'
import VideoMock from './VideoMock'
import CommentMock from './CommentMock'
import VideoCommentMapAggregate from '../../src/inners/models/aggregates/VideoCommentMapAggregate'

export default class VideoCommentMapMock {
  videoMock: VideoMock
  commentMock: CommentMock
  data: VideoCommentMap[]
  aggregatedData: VideoCommentMapAggregate[]
  constructor () {
    this.videoMock = new VideoMock()
    this.commentMock = new CommentMock()
    this.data = [
      new VideoCommentMap(this.videoMock.data[0]._id, this.commentMock.data[0]._id, new Types.ObjectId().toString()),
      new VideoCommentMap(this.videoMock.data[1]._id, this.commentMock.data[1]._id, new Types.ObjectId().toString())
    ]
    this.aggregatedData = [
      new VideoCommentMapAggregate(this.videoMock.data[0], this.commentMock.aggregatedData[0], this.data[0]._id),
      new VideoCommentMapAggregate(this.videoMock.data[1], this.commentMock.aggregatedData[1], this.data[1]._id)
    ]
  }
}
