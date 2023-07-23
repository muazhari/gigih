import type CommentRepository from '../../../outers/repositories/CommentRepository'
import Result from '../../models/value_objects/Result'
import Comment from '../../models/entities/Comment'
import type CommentAggregate from '../../models/aggregates/CommentAggregate'
import type SubmitCommentRequest from '../../models/value_objects/requests/comments/SubmitCommentRequest'
import type UserRepository from '../../../outers/repositories/UserRepository'
import type User from '../../models/entities/User'

export default class CommentManagement {
  commentRepository: CommentRepository
  userRepository: UserRepository

  constructor (commentRepository: CommentRepository, userRepository: UserRepository) {
    this.commentRepository = commentRepository
    this.userRepository = userRepository
  }

  readAll = async (isAggregated?: boolean): Promise<Result<Comment[] | CommentAggregate[]>> => {
    let foundComments: Comment[] | CommentAggregate[]
    if (isAggregated === true) {
      foundComments = await this.commentRepository.readAllAggregated()
    } else {
      foundComments = await this.commentRepository.readAll()
    }
    return new Result<Comment[] | CommentAggregate[]>(
      200,
      'Comment read all succeed.',
      foundComments
    )
  }

  readAllByVideoId = async (videoId: string, isAggregated?: boolean): Promise<Result<Comment[] | CommentAggregate[]>> => {
    let foundComments: Comment[] | CommentAggregate[]
    if (isAggregated === true) {
      foundComments = await this.commentRepository.readAllByVideoIdAggregated(videoId)
    } else {
      foundComments = await this.commentRepository.readAllByVideoId(videoId)
    }
    return new Result<Comment[] | CommentAggregate[]>(
      200,
      'Comment read all by video id succeed.',
      foundComments
    )
  }

  readOneById = async (id: string, isAggregated?: boolean): Promise<Result<Comment | CommentAggregate>> => {
    let foundComment: Comment | CommentAggregate
    if (isAggregated === true) {
      foundComment = await this.commentRepository.readOneByIdAggregated(id)
    } else {
      foundComment = await this.commentRepository.readOneById(id)
    }
    return new Result<Comment | CommentAggregate >(
      200,
      'Comment read one by id succeed.',
      foundComment
    )
  }

  createOne = async (item: any): Promise<Result<Comment>> => {
    const createdComment: Comment = await this.commentRepository.createOne(item)
    return new Result<Comment>(
      201,
      'Comment create one succeed.',
      createdComment
    )
  }

  patchOneById = async (id: string, item: any): Promise<Result<Comment>> => {
    const patchedComment: Comment = await this.commentRepository.patchOneById(id, item)
    return new Result<Comment >(
      200,
      'Comment patch one by id succeed.',
      patchedComment
    )
  }

  deleteOneById = async (id: string): Promise<Result<Comment>> => {
    const deletedComment: Comment = await this.commentRepository.deleteOneById(id)
    return new Result<Comment>(
      200,
      'Comment delete one by id succeed.',
      deletedComment
    )
  }

  submit = async (submitComment: SubmitCommentRequest): Promise<Result<Comment>> => {
    if (submitComment.username === undefined) {
      throw new Error('Username is undefined.')
    }
    const foundUser: User = await this.userRepository.readOneByUsername(submitComment.username)
    const toCreateComment: Comment = new Comment(
      foundUser._id,
      submitComment.content,
      new Date()
    )
    const createdComment: Comment = await this.commentRepository.createOne(toCreateComment)
    return new Result<Comment>(
      201,
      'Comment submit succeed.',
      createdComment
    )
  }
}
