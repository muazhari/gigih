import Comment from '../../src/inners/models/entities/Comment'
import { Types } from 'mongoose'
import UserMock from './UserMock'
import CommentAggregate from '../../src/inners/models/value_objects/responses/aggregates/CommentAggregate'

export default class CommentMock {
  userMock: UserMock
  data: Comment[]
  aggregatedData: any[]
  constructor () {
    this.userMock = new UserMock()
    this.data = [
      new Comment(this.userMock.data[0]._id, 'content0', new Date(), new Types.ObjectId().toString()),
      new Comment(this.userMock.data[1]._id, 'content1', new Date(), new Types.ObjectId().toString())
    ]
    this.aggregatedData = [
      new CommentAggregate(this.userMock.data[0], this.data[0].content, this.data[0].timestamp, this.data[0]._id),
      new CommentAggregate(this.userMock.data[1], this.data[1].content, this.data[1].timestamp, this.data[1]._id)
    ]
  }
}
