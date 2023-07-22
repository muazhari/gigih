import { model, Schema } from 'mongoose'
import type Video from '../../inners/models/entities/Video'

const videoSchema = new Schema<Video>({
  thumbnailUrl: {
    type: Schema.Types.String
  },
  contentUrl: {
    type: Schema.Types.String
  }
},
{
  versionKey: false
})

export default model<Video>('videos', videoSchema)
