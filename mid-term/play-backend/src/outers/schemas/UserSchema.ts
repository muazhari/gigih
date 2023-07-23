import { model, Schema } from 'mongoose'
import type User from '../../inners/models/entities/User'

const userSchema = new Schema<User>({
  username: {
    type: Schema.Types.String,
    unique: true
  },
  pictureUrl: {
    type: Schema.Types.String
  }
},
{
  versionKey: false
})

export default model<User>('users', userSchema)
