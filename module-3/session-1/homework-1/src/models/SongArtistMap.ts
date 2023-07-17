

export default class SongArtistMap {
    _id: string | undefined
    artistId: string | undefined
    songId: string | undefined

    constructor(artistId: string, songId: string) {
        this.artistId = artistId
        this.songId = songId
    }
}
