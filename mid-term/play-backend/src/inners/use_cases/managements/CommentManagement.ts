import type CommentRepository from '../../../outers/repositories/CommentRepository'
import Result from '../../models/value_objects/Result'
import type Comment from '../../models/entities/Comment'
import type CommentAggregate from '../../models/value_objects/responses/aggregates/CommentAggregate'

export default class CommentManagement {
  commentRepository: CommentRepository

  constructor (commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
  }

  readAll = async (): Promise<Result<Comment[]>> => {
    const foundComments: Comment[] = await this.commentRepository.readAll()
    return new Result<Comment[]>(
      200,
      'Comment read all succeed.',
      foundComments
    )
  }

  readAllAggregated = async (): Promise<Result<CommentAggregate[]>> => {
    const foundCommentsAggregated: CommentAggregate[] = await this.commentRepository.readAllAggregated()
    return new Result<CommentAggregate[]>(
      200,
      'Comment read all aggregated succeed.',
      foundCommentsAggregated
    )
  }

  readOneById = async (id: string): Promise<Result<Comment>> => {
    const foundComment: Comment = await this.commentRepository.readOneById(id)
    return new Result<Comment >(
      200,
      'Comment read one by id succeed.',
      foundComment
    )
  }

  readOneByIdAggregated = async (id: string): Promise<Result<CommentAggregate >> => {
    const foundCommentAggregated: CommentAggregate = await this.commentRepository.readOneByIdAggregated(id)
    return new Result<CommentAggregate >(
      200,
      'Comment read one by id aggregated succeed.',
      foundCommentAggregated
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
}
