export default class ArtistGenreMap {
    _id: string | undefined
    artistId: string | undefined
    genreId: string | undefined

    constructor(artistId: string, genreId: string) {
        this.artistId = artistId
        this.genreId = genreId
    }

}
