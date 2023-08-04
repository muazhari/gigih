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

    getTrack = (trackId: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/tracks/${trackId}`,
                method: "GET"
            })
    }

    getRecommendations = (seedTracks: string[], seedArtists: string[]): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/recommendations?seed_tracks=${seedTracks.join(",")}&seed_artists=${seedArtists.join(",")}`,
                method: "GET"
            })
    }

    getPlaylistsByUserId = (userId: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/users/${userId}/playlists`,
                method: "GET"
            })
    }

    getPlaylistTracks = (playlistId: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/playlists/${playlistId}/tracks`,
                method: "GET"
            })
    }

    getPlaylist = (playlistId: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .request({
                url: `/playlists/${playlistId}`,
                method: "GET"
            })
    }

    createPlaylist = (userId: string, playlistName: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .request({
                url: `/users/${userId}/playlists`,
                method: "POST",
                data: {
                    name: playlistName
                }
            })
    }

    addTracksToPlaylist = (playlistId: string, trackUris: string[]): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .request({
                url: `/playlists/${playlistId}/tracks`,
                method: "POST",
                data: {
                    uris: trackUris
                }
            })
    }

    removeTracksFromPlaylist = (playlistId: string, trackUris: string[]): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .request({
                url: `/playlists/${playlistId}/tracks`,
                method: "DELETE",
                data: {
                    tracks: trackUris.map(uri => ({uri}))
                }
            })
    }

    unfollowPlaylist = (playlistId: string): Promise<any> => {
        return axios
            .create({
                baseURL: this.contentUrl,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .request({
                url: `/playlists/${playlistId}/followers`,
                method: "DELETE"
            })
    }
}

