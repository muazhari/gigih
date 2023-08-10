import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import Comment from "../models/entities/Comment.ts";
import CommentAggregate from "../models/aggregates/CommentAggregate.ts";

export default class CommentService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (isAggregated: boolean = false, search?: any): Promise<AxiosResponse<Result<Comment[] | CommentAggregate[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `comments?search=${encodeURIComponent(JSON.stringify(search))}&is_aggregated=${isAggregated}`
            )
        }
        return this.oneClient.instance.get(
            `comments?is_aggregated=${isAggregated}`
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<Comment>>> => {
        return this.oneClient.instance.get(
            `comments/${id}`
        )
    }

    createOne = (request: Comment): Promise<AxiosResponse<Result<Comment>>> => {
        return this.oneClient.instance.post(
            'comments',
            request
        )
    }

    patchOneById = (id: string, request: Comment): Promise<AxiosResponse<Result<Comment>>> => {
        return this.oneClient.instance.patch(
            `comments/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<Comment>>> => {
        return this.oneClient.instance.delete(
            `comments/${id}`
        )
    }

}
