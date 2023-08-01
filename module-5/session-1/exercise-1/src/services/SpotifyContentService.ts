import axios from "axios";

export default class SpotifyContentService {
    contentUrl: string
    accessToken: string

    constructor(
        contentUrl: string = "https://api.spotify.com/v1"
    ) {
        this.contentUrl = contentUrl
        this.accessToken = localStorage.getItem("accessToken") as string
    }

    getProfile = (): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: "/me",
                method: "GET"
            })
    }
}

