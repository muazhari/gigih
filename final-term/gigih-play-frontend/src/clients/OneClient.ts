import axios, {AxiosInstance} from "axios";
import applyCaseMiddleware from "axios-case-converter";

export default class OneClient {
    instance: AxiosInstance

    constructor(
        instance: AxiosInstance = applyCaseMiddleware(axios.create({
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                baseURL: import.meta.env.VITE_ONE_CLIENT_URL,
            }),
            {
                preservedKeys: ["_id"]
            }
        )
    ) {
        this.instance = instance
    }
}
