import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import VideoCommentMap from "../models/entities/VideoCommentMap.ts";
import VideoCommentMapAggregate from "../models/aggregates/VideoCommentMapAggregate.ts";

export default class VideoCommentMapService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (isAggregated: boolean = false, search?: any): Promise<AxiosResponse<Result<VideoCommentMap[] | VideoCommentMapAggregate[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `video-comment-maps?search=${encodeURIComponent(JSON.stringify(search))}&is_aggregated=${isAggregated}`
            )
        }
        return this.oneClient.instance.get(
            `video-comment-maps?is_aggregated=${isAggregated}`
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<VideoCommentMap>>> => {
        return this.oneClient.instance.get(
            `video-comment-maps/${id}`
        )
    }

    createOne = (request: VideoCommentMap): Promise<AxiosResponse<Result<VideoCommentMap>>> => {
        return this.oneClient.instance.post(
            'video-comment-maps',
            request
        )
    }

    patchOneById = (id: string, request: VideoCommentMap): Promise<AxiosResponse<Result<VideoCommentMap>>> => {
        return this.oneClient.instance.patch(
            `video-comment-maps/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<VideoCommentMap>>> => {
        return this.oneClient.instance.delete(
            `video-comment-maps/${id}`
        )
    }

}
