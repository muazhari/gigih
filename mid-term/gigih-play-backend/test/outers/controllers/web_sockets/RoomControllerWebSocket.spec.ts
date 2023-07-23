import chai from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import OneDatastore from '../../../../src/outers/datastores/OneDatastore'
import CommentSchema from '../../../../src/outers/schemas/CommentSchema'
import type Comment from '../../../../src/inners/models/entities/Comment'
import UserSchema from '../../../../src/outers/schemas/UserSchema'
import type User from '../../../../src/inners/models/entities/User'
import VideoCommentMapMock from '../../../mocks/VideoCommentMapMock'
import VideoSchema from '../../../../src/outers/schemas/VideoSchema'
import type Video from '../../../../src/inners/models/entities/Video'
import VideoCommentMapSchema from '../../../../src/outers/schemas/VideoCommentMapSchema'
import type VideoCommentMap from '../../../../src/inners/models/entities/VideoCommentMap'
import socketIoClient, { type Socket } from 'socket.io-client'
import type Result from '../../../../src/inners/models/value_objects/Result'
import JoinRoomRequest from '../../../../src/inners/models/value_objects/requests/rooms/JoinRoomRequest'
import { server } from '../../../../src/App'
import SubmitCommentRequest from '../../../../src/inners/models/value_objects/requests/comments/SubmitCommentRequest'
import { type AddressInfo } from 'net'
import waitUntil from 'async-wait-until'

chai.should()

describe('RoomControllerWebSocket', () => {
  const videoCommentMapMock: VideoCommentMapMock = new VideoCommentMapMock()
  const oneDatastore = new OneDatastore()
  let addressInfo: AddressInfo
  let clientOne: Socket
  let clientTwo: Socket

  beforeEach(async () => {
    await waitUntil(() => server?.listening)
    addressInfo = server?.address() as AddressInfo
    clientOne = socketIoClient(`http://localhost:${addressInfo.port}`)
    clientTwo = socketIoClient(`http://localhost:${addressInfo.port}`)
    await oneDatastore.connect()
    await UserSchema.insertMany(videoCommentMapMock.commentMock.userMock.data)
    await VideoSchema.insertMany(videoCommentMapMock.videoMock.data)
    await CommentSchema.insertMany(videoCommentMapMock.commentMock.data)
    await VideoCommentMapSchema.insertMany(videoCommentMapMock.data)
  })

  afterEach(async () => {
    await UserSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.commentMock.userMock.data.map((userMock: User) => userMock._id)
      }
    })
    await VideoSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.videoMock.data.map((videoMock: Video) => videoMock._id)
      }
    })
    await CommentSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.commentMock.data.map((commentMock: Comment) => commentMock._id)
      }
    })
    await VideoCommentMapSchema.deleteMany({
      _id: {
        $in: videoCommentMapMock.data.map((videoCommentMapMock: VideoCommentMap) => videoCommentMapMock._id)
      }
    })
    await oneDatastore.disconnect()
    clientOne.disconnect()
    clientTwo.disconnect()
  })

  describe('join', () => {
    it('should client joined', (done) => {
      const selectedVideoMock: Video = videoCommentMapMock.videoMock.data[0]
      const joinRoomRequest: JoinRoomRequest = new JoinRoomRequest(selectedVideoMock._id)
      clientOne.on('joinedRoom', (result: Result<Comment[]>) => {
        result.should.be.a('object')
        result.should.have.property('status').eq(200)
        result.should.have.property('message')
        result.should.have.property('data').a('array')
        videoCommentMapMock.commentMock.data.map((commentMock: any) => {
          return JSON.parse(JSON.stringify(commentMock))
        }).should.deep.include.members(result.data)
        done()
      })
      clientOne.emit('joinRoom', joinRoomRequest)
    })
  })

  describe('leave', () => {
    it('should client left', (done) => {
      const selectedVideoMock: Video = videoCommentMapMock.videoMock.data[0]
      const joinRoomRequest: JoinRoomRequest = new JoinRoomRequest(selectedVideoMock._id)
      clientOne.on('leftRoom', (videoId: string) => {
        videoId.should.be.a('string')
        videoId.should.eq(joinRoomRequest.videoId)
        done()
      })
      clientOne.on('joinedRoom', (result: Result<Comment[]>) => {
        result.should.be.a('object')
        result.should.have.property('status').eq(200)
        result.should.have.property('message')
        result.should.have.property('data').a('array')
        videoCommentMapMock.commentMock.data.map((commentMock: any) => {
          return JSON.parse(JSON.stringify(commentMock))
        }).should.deep.include.members(result.data)
        clientOne.emit('leaveRoom', joinRoomRequest.videoId)
      })
      clientOne.emit('joinRoom', joinRoomRequest)
    })
  })

  describe('comment', () => {
    it('should client submitted comment', (done) => {
      const selectedVideoMock: Video = videoCommentMapMock.videoMock.data[0]
      const joinRoomRequest: JoinRoomRequest = new JoinRoomRequest(selectedVideoMock._id)
      const selectedUserMock: User = videoCommentMapMock.commentMock.userMock.data[0]
      const submitCommentRequest: SubmitCommentRequest = new SubmitCommentRequest(
        selectedVideoMock._id,
        selectedUserMock.username,
        'content test'
      )
      clientTwo.on('commentSubmitted', (result: Result<Comment>) => {
        result.should.be.a('object')
        result.should.have.property('status').eq(201)
        result.should.have.property('message')
        result.should.have.property('data').a('object')
        result.data.should.have.property('_id')
        result.data.should.have.property('userId').eq(selectedUserMock._id)
        result.data.should.have.property('content').eq(submitCommentRequest.content)
        result.data.should.have.property('timestamp')
        done()
      })
      clientOne.on('joinedRoom', (result: Result<Comment[]>) => {
        result.should.be.a('object')
        result.should.have.property('status').eq(200)
        result.should.have.property('message')
        result.should.have.property('data').a('array')
        videoCommentMapMock.commentMock.data.map((commentMock: any) => {
          return JSON.parse(JSON.stringify(commentMock))
        }).should.deep.include.members(result.data)
        clientOne.emit('submitComment', submitCommentRequest)
      })
      clientOne.emit('joinRoom', joinRoomRequest)
      clientTwo.emit('joinRoom', joinRoomRequest)
    })
  })
})
