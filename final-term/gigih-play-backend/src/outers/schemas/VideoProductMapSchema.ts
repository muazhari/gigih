import { model, Schema } from 'mongoose'
import type VideoProductMap from '../../inners/models/entities/VideoProductMap'

const videoProductMapSchema = new Schema<VideoProductMap>({
  videoId: {
    type: Schema.Types.ObjectId
  },
  productId: {
    type: Schema.Types.ObjectId
  }
},
{
  versionKey: false
})

export default model<VideoProductMap>('video_product_maps', videoProductMapSchema)
