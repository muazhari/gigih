import OneClient from "../clients/OneClient.ts";
import User from "../models/entities/User.ts";
import LoginByUsernameAndPasswordRequest
    from "../models/value_objects/requests/authentications/LoginByUsernameAndPasswordRequest.ts";
import RegisterByUsernameAndPasswordRequest
    from "../models/value_objects/requests/authentications/RegisterByUsernameAndPasswordRequest.ts";
import {AxiosResponse} from "axios";
import Result from "../models/value_objects/Result.ts";

export default class AuthenticationService {

    oneClient: OneClient

    constructor(
        oneClient: OneClient = new OneClient()
    ) {
        this.oneClient = oneClient
    }

    login = (request: LoginByUsernameAndPasswordRequest): Promise<AxiosResponse<Result<User>>>  =>  {
        return this.oneClient.instance.post(
            'authentications/logins?method=username_and_password',
            request
        )
    }

    register = (request: RegisterByUsernameAndPasswordRequest): Promise<AxiosResponse<Result<User>>> => {
        return this.oneClient.instance.post(
            'authentications/registers?method=username_and_password',
            request
        )
    }

}
