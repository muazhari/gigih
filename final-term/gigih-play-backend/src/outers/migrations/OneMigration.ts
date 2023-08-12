import type OneDatastore from '../datastores/OneDatastore'
import ProductSchema from '../schemas/ProductSchema'
import CommentMock from '../../../test/mocks/CommentMock'
import ProductMock from '../../../test/mocks/ProductMock'
import UserMock from '../../../test/mocks/UserMock'
import VideoCommentMapSchema from '../schemas/VideoCommentMapSchema'
import VideoCommentMapMock from '../../../test/mocks/VideoCommentMapMock'
import VideoMock from '../../../test/mocks/VideoMock'
import VideoProductMapMock from '../../../test/mocks/VideoProductMapMock'
import UserSchema from '../schemas/UserSchema'
import CommentSchema from '../schemas/CommentSchema'
import VideoProductMapSchema from '../schemas/VideoProductMapSchema'
import VideoSchema from '../schemas/VideoSchema'
import VideoProductMap from '../../inners/models/entities/VideoProductMap'
import _ from 'underscore'
import type Video from '../../inners/models/entities/Video'
import type Product from '../../inners/models/entities/Product'
import User from '../../inners/models/entities/User'
import { Types } from 'mongoose'

export default class OneMigration {
  oneDatastore: OneDatastore
  commentMock: CommentMock
  productMock: ProductMock
  userMock: UserMock
  videoCommentMapMock: VideoCommentMapMock
  videoMock: VideoMock
  videoProductMapMock: VideoProductMapMock

  constructor (oneDatastore: OneDatastore) {
    this.oneDatastore = oneDatastore
    this.commentMock = new CommentMock()
    this.productMock = new ProductMock()
    this.userMock = new UserMock()
    this.videoCommentMapMock = new VideoCommentMapMock()
    this.videoMock = new VideoMock()
    this.videoProductMapMock = new VideoProductMapMock()
  }

  up = async (): Promise<void> => {
    await UserSchema.insertMany(this.videoCommentMapMock.commentMock.userMock.data)
    await CommentSchema.insertMany(this.videoCommentMapMock.commentMock.data)
    await VideoSchema.insertMany(this.videoCommentMapMock.videoMock.data)
    await VideoCommentMapSchema.insertMany(this.videoCommentMapMock.data)

    await VideoSchema.insertMany(this.videoProductMapMock.videoMock.data)
    await ProductSchema.insertMany(this.videoProductMapMock.productMock.data)
    await VideoProductMapSchema.insertMany(this.videoProductMapMock.data)

    await VideoProductMapSchema.insertMany(
      _.zip(this.videoCommentMapMock.videoMock.data, this.videoProductMapMock.productMock.data)
        .map((videoProductMap: [Video, Product]) => {
          return new VideoProductMap(videoProductMap[0]._id, videoProductMap[1]._id)
        })
    )

    await UserSchema.insertMany([
      new User(
        'admin',
        'admin',
        'https://placehold.co/400x400?text=pictureUrlAdmin',
        new Types.ObjectId().toString()
      )
    ])

    console.log('One migration up.')
  }

  down = async (): Promise<void> => {
    await ProductSchema.deleteMany({})
    await VideoProductMapSchema.deleteMany({})
    await VideoSchema.deleteMany({})
    await VideoCommentMapSchema.deleteMany({})
    await CommentSchema.deleteMany({})
    await UserSchema.deleteMany({})

    console.log('One migration down.')
  }
}
