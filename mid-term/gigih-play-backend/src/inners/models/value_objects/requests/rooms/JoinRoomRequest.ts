export default class JoinRoomRequest {
  videoId: string | undefined
  isAggregated?: boolean | undefined

  constructor (
    videoId: string | undefined,
    isAggregated?: boolean | undefined
  ) {
    this.videoId = videoId
    this.isAggregated = isAggregated
  }
}
