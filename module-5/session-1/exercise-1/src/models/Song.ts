import Artist from "./Artist.ts";

export default class Song {
    songId: string | undefined
    songName: string | undefined
    songUrl: string | undefined
    imageUrl: string | undefined
    artists: Artist[]
    genres: string[]

    constructor(
        songId: string | undefined,
        songName: string | undefined,
        songUrl: string | undefined,
        imageUrl: string | undefined,
        artists: Artist[],
        genres: string[]
    ) {
        this.songId = songId
        this.songName = songName
        this.songUrl = songUrl
        this.imageUrl = imageUrl
        this.artists = artists
        this.genres = genres
    }
}
