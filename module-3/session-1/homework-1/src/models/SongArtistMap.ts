

export default class SongArtistMap {
    _id: string | undefined
    songId: string | undefined
    artistId: string | undefined

    constructor(songId: string, artistId: string) {
        this.songId = songId
        this.artistId = artistId
    }
}
