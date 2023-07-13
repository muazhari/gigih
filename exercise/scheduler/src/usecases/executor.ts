import axios from "axios";
import Process from "../models/process";

export default class Executor {
    data: Process[] | undefined;

    constructor(data: Process[] | undefined) {
        this.data = data;
    }

    execute() {
        this.data!.forEach((item, index) => {
            console.log("Checking: ", item);
            const executeAt = new Date(item.executeAt!);
            const currentDate = new Date();
            if (executeAt.getMilliseconds() <= currentDate.getMilliseconds()) {
                console.log("Executing: ", item);
                const httpClient = this.prepareHttpClient(item.method, item.url, item.query, item.body);
                httpClient.then((response) => {
                    console.log("Response: ", response.status, response.data);
                }).catch((error) => {
                    console.log("Error: ", error);
                });

                if (item.isRepeated) {
                    item.executeAt = new Date(new Date().getMilliseconds() + item.repeatDelay!);
                    item.repeatCount = item.repeatCount! - 1;
                    if (item.repeatCount === 0) {
                        this.data!.splice(index, 1);
                    }
                } else {
                    this.data!.splice(index, 1);
                }
            }
        });
    }


    prepareHttpClient(method: string | undefined, url: string | undefined, query: string | undefined, body: string | undefined) {
        switch (method) {
            case "get":
                return axios.get(url!, {
                    params: query
                })
            case "post":
                return axios.post(url!, body, {
                    params: query
                })
            case "put":
                return axios.put(url!, body, {
                    params: query
                })
            case "patch":
                return axios.patch(url!, body, {
                    params: query
                })
            case "delete":
                return axios.delete(url!, {
                    params: query
                })
            default:
                throw Error("Method not supported.");
        }
    }
}