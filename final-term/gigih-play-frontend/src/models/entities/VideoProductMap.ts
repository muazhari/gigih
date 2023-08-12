export default class VideoProductMap {
    _id: string | undefined
    videoId: string | undefined
    productId: string | undefined

    constructor(
        videoId: string | undefined,
        productId: string | undefined,
        _id?: string | undefined
    ) {
        this._id = _id
        this.videoId = videoId
        this.productId = productId
    }
}
