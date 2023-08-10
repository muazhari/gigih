export default class VideoCommentMap {
  _id: string | undefined
  videoId: string | undefined
  commentId: string | undefined

  constructor (
    videoId: string | undefined,
    commentId: string | undefined,
    _id?: string | undefined
  ) {
    this._id = _id
    this.videoId = videoId
    this.commentId = commentId
  }
}
