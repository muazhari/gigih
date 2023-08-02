export default class Artist {
    artistId: string | undefined
    artistName: string | undefined

    constructor(
        artistId: string | undefined,
        artistName: string | undefined
    ) {
        this.artistId = artistId
        this.artistName = artistName
    }
}
