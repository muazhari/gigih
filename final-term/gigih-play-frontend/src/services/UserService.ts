import OneClient from "../clients/OneClient.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";
import User from "../models/entities/User.ts";

export default class UserService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    readAll = (search?: any): Promise<AxiosResponse<Result<User[]>>> => {
        if (search) {
            return this.oneClient.instance.get(
                `users?search=${encodeURIComponent(JSON.stringify(search))}`
            )
        }
        return this.oneClient.instance.get(
            'users'
        )
    }

    readOneById = (id: string): Promise<AxiosResponse<Result<User>>> => {
        return this.oneClient.instance.get(
            `users/${id}`
        )
    }

    createOne = (request: User): Promise<AxiosResponse<Result<User>>> => {
        return this.oneClient.instance.post(
            'users',
            request
        )
    }

    patchOneById = (id: string, request: User): Promise<AxiosResponse<Result<User>>> => {
        return this.oneClient.instance.patch(
            `users/${id}`,
            request
        )
    }

    deleteOneById = (id: string): Promise<AxiosResponse<Result<User>>> => {
        return this.oneClient.instance.delete(
            `users/${id}`
        )
    }

}
