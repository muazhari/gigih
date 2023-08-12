import type Video from '../entities/Video'
import type Product from '../entities/Product'

export default class VideoProductMapAggregate {
    _id: string | undefined
    video: Video | undefined
    product: Product | undefined

    constructor(
        video: Video | undefined,
        product: Product | undefined,
        _id?: string | undefined
    ) {
        this._id = _id
        this.video = video
        this.product = product
    }
}
