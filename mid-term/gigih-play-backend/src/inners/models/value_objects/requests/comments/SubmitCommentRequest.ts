export default class SubmitCommentRequest {
  videoId: string | undefined
  username: string | undefined
  content: string | undefined

  constructor (
    videoId: string | undefined,
    username: string | undefined,
    content: string | undefined
  ) {
    this.videoId = videoId
    this.username = username
    this.content = content
  }
}
