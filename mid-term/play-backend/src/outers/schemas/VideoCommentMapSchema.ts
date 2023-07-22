import { model, Schema } from 'mongoose'
import type VideoCommentMap from '../../inners/models/entities/VideoCommentMap'

const videoCommentMapSchema = new Schema<VideoCommentMap>({
  videoId: {
    type: Schema.Types.ObjectId
  },
  commentId: {
    type: Schema.Types.ObjectId
  }
},
{
  versionKey: false
})

export default model<VideoCommentMap>('video_comment_maps', videoCommentMapSchema)
