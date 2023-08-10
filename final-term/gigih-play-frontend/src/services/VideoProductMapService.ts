import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import VideoProductMap from "../models/entities/VideoProductMap.ts";
import VideoProductMapAggregate from "../models/aggregates/VideoProductMapAggregate.ts";

export default class VideoProductMapService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (isAggregated: boolean = false, search?: any): Promise<AxiosResponse<Result<VideoProductMap[] | VideoProductMapAggregate[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `video-product-maps?search=${encodeURIComponent(JSON.stringify(search))}&is_aggregated=${isAggregated}`
            )
        }
        return this.oneClient.instance.get(
            `video-product-maps?is_aggregated=${isAggregated}`
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<VideoProductMap>>> => {
        return this.oneClient.instance.get(
            `video-product-maps/${id}`
        )
    }

    createOne = (request: VideoProductMap): Promise<AxiosResponse<Result<VideoProductMap>>> => {
        return this.oneClient.instance.post(
            'video-product-maps',
            request
        )
    }

    patchOneById = (id: string, request: VideoProductMap): Promise<AxiosResponse<Result<VideoProductMap>>> => {
        return this.oneClient.instance.patch(
            `video-product-maps/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<VideoProductMap>>> => {
        return this.oneClient.instance.delete(
            `video-product-maps/${id}`
        )
    }

}
