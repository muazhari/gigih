import type Video from '../../../entities/Video'
import type Comment from '../../../entities/Comment'

export default class VideoCommentMapAggregate {
  _id: string | undefined
  video: Video | undefined
  comment: Comment | undefined

  constructor (
    video: Video | undefined,
    comment: Comment | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.video = video
    this.comment = comment
  }
}
