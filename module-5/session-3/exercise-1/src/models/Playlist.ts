export default class Playlist {
    playlistId: string | undefined
    playlistName: string | undefined
    imageUrl: string | undefined

    constructor(
        playlistId: string | undefined,
        playlistName: string | undefined,
        imageUrl: string | undefined
    ) {
        this.playlistId = playlistId
        this.playlistName = playlistName
        this.imageUrl = imageUrl
    }

    static constructFromApi(playlist: any): Playlist {
        return new Playlist(
            playlist.id,
            playlist.name,
            playlist.images.length > 0? playlist.images[0].url : undefined
        )
    }
}
