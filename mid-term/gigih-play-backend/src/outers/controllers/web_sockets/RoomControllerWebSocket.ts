import type CommentManagement from '../../../inners/use_cases/managements/CommentManagement'
import type socketIo from 'socket.io'
import type Result from '../../../inners/models/value_objects/Result'
import type CommentAggregate from '../../../inners/models/aggregates/CommentAggregate'
import type SubmitCommentRequest from '../../../inners/models/value_objects/requests/comments/SubmitCommentRequest'
import Comment from '../../../inners/models/entities/Comment'
import type JoinRoomRequest from '../../../inners/models/value_objects/requests/rooms/JoinRoomRequest'
import type UserManagement from '../../../inners/use_cases/managements/UserManagement'

export default class RoomControllerWebSocket {
  io: socketIo.Server
  commentManagement: CommentManagement
  userManagement: UserManagement

  constructor (
    io: socketIo.Server,
    commentManagement: CommentManagement,
    userManagement: UserManagement
  ) {
    this.io = io
    this.commentManagement = commentManagement
    this.userManagement = userManagement
  }

  registerSockets = (): void => {
    this.io.on('connection', (socket: socketIo.Socket) => {
      socket.on('joinRoom', this.joinRoom(socket))
      socket.on('leaveRoom', this.leaveRoom(socket))
      socket.on('submitComment', this.submitComment(socket))
    })
  }

  joinRoom = (socket: socketIo.Socket) => async (joinRoomRequest: JoinRoomRequest): Promise<void> => {
    if (joinRoomRequest.videoId === undefined) {
      throw new Error('JoinRoomRequest videoId is undefined')
    }
    await socket.join(joinRoomRequest.videoId)
    const result: Result<Comment[] | CommentAggregate[]> = await this.commentManagement.readAllByVideoId(joinRoomRequest.videoId, joinRoomRequest.isAggregated)
    socket.emit('joinedRoom', result)
  }

  leaveRoom = (socket: socketIo.Socket) => async (videoId: string): Promise<void> => {
    await socket.leave(videoId)
    socket.emit('leftRoom', videoId)
  }

  submitComment = (socket: socketIo.Socket) => async (submitCommentRequest: SubmitCommentRequest): Promise<void> => {
    if (submitCommentRequest.videoId === undefined) {
      throw new Error('SubmitCommentRequest videoId is undefined')
    }
    if (submitCommentRequest.username === undefined) {
      throw new Error('SubmitCommentRequest username is undefined')
    }
    const foundUser = await this.userManagement.readOneByUsername(submitCommentRequest.username)
    const toCreateComment: Comment = new Comment(
      foundUser.data._id,
      submitCommentRequest.content,
      new Date()
    )
    const result: Result<Comment> = await this.commentManagement.createOne(toCreateComment)
    socket.to(submitCommentRequest.videoId).emit('commentSubmitted', result)
  }
}
