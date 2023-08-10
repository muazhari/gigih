import type Video from '../entities/Video'
import CommentAggregate from "./CommentAggregate.ts";

export default class VideoCommentMapAggregate {
  _id: string | undefined
  video: Video | undefined
  comment: CommentAggregate | undefined

  constructor (
    video: Video | undefined,
    comment: CommentAggregate | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.video = video
    this.comment = comment
  }
}
