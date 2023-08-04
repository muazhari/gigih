import Artist from "./Artist.ts";

export default class Track {
    trackId: string | undefined
    trackName: string | undefined
    trackUri: string | undefined
    imageUrl: string | undefined
    previewUrl: string | undefined
    artists: Artist[]
    genres: string[]

    constructor(
        trackId: string | undefined,
        trackName: string | undefined,
        trackUrl: string | undefined,
        imageUrl: string | undefined,
        previewUrl: string | undefined,
        artists: Artist[],
        genres: string[]
    ) {
        this.trackId = trackId
        this.trackName = trackName
        this.trackUri = trackUrl
        this.imageUrl = imageUrl
        this.previewUrl = previewUrl
        this.artists = artists
        this.genres = genres
    }

    static constructFromApi(track: any): Track {
        return new Track(
            track.id,
            track.name,
            track.uri,
            track.album.images[0].url,
            track.preview_url,
            track.artists.map((artist: any) => {
                return new Artist(
                    artist.id,
                    artist.name
                )
            }),
            track.genres
        )
    }
}
