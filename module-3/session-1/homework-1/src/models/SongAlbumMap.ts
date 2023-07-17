

export default class SongAlbumMap {
    _id: string | undefined
    songId: string | undefined
    albumId: string | undefined

    constructor(songId: string, albumId: string) {
        this.songId = songId
        this.albumId = albumId
    }
}
