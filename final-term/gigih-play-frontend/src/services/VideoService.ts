import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import Video from "../models/entities/Video.ts";

export default class VideoService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (search?: any): Promise<AxiosResponse<Result<Video[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `videos?search=${encodeURIComponent(JSON.stringify(search))}`
            )
        }
        return this.oneClient.instance.get(
            'videos'
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<Video>>> => {
        return this.oneClient.instance.get(
            `videos/${id}`
        )
    }

    createOne = (request: Video): Promise<AxiosResponse<Result<Video>>> => {
        return this.oneClient.instance.post(
            'videos',
            request
        )
    }

    patchOneById = (id: string, request: Video): Promise<AxiosResponse<Result<Video>>> => {
        return this.oneClient.instance.patch(
            `videos/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<Video>>> => {
        return this.oneClient.instance.delete(
            `videos/${id}`
        )
    }

}
