import { model, Schema } from 'mongoose'
import type Comment from '../../inners/models/entities/Comment'

const commentSchema = new Schema<Comment>({
  userId: {
    type: Schema.Types.ObjectId
  },
  content: {
    type: Schema.Types.String
  },
  timestamp: {
    type: Schema.Types.Date
  }
},
{
  versionKey: false
})

export default model<Comment>('comments', commentSchema)
