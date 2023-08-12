export default class Video {
    _id: string | undefined
    thumbnailUrl: string | undefined
    contentUrl: string | undefined

    constructor(
        thumbnailUrl: string | undefined,
        contentUrl: string | undefined,
        _id?: string | undefined
    ) {
        this._id = _id
        this.thumbnailUrl = thumbnailUrl
        this.contentUrl = contentUrl
    }
}
