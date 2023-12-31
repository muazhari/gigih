import axios from "axios";

export default class SpotifyContentService {
    accessToken: string | undefined
    contentUrl: string

    constructor(
        accessToken: string | undefined,
        contentUrl: string = "https://api.spotify.com/v1",
    ) {
        this.accessToken = accessToken
        this.contentUrl = contentUrl

        if (this.accessToken === undefined) {
            throw new Error("Access token is undefined.")
        }
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

    search = (query: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: "/search?q=" + encodeURIComponent(query) + "&type=track",
                method: "GET",
            })
    }

    playSongs = (urls: string[]): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: "/me/player/play",
                method: "PUT",
                data: {
                    uris: urls
                }
            })
    }

    getRecommendations = (seedTracks: string[], seedArtists: string[], seedGenres: string[]): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/recommendations?seed_tracks=${seedTracks.join(",")}&seed_artists=${seedArtists.join(",")}&seed_genres=${seedGenres.join(",")}`,
                method: "GET"
            })
    }
}

