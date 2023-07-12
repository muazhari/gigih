import Playlist from "../models/Playlist";
import Song from "../models/Song";
import PlaylistRepository from "../repositories/PlaylistRepository";
import SongRepository from "../repositories/SongRepository";


export default class PlaylistController {
    playlistRepository: PlaylistRepository = new PlaylistRepository();
    songRepository: SongRepository = new SongRepository();

    readAll() {
        return this.playlistRepository.readAll();
    }

    readOneById(id: string) {
        return this.playlistRepository.readOneById(id);
    }

    createOne(item: any) {
        return this.playlistRepository.createOne(item);
    }

    patchOneById(id: string, item: any) {
        return this.playlistRepository.patchOneById(id, item);
    }

    deleteOneById(id: string) {
        return this.playlistRepository.deleteOneById(id);
    }

    addSongsToPlaylist(playlistId: string, songIds: string[]): Playlist | undefined {
        const playlist = this.playlistRepository.readOneById(playlistId);

        if (playlist) {
            playlist.songIds!.push(...songIds);
            return playlist;
        }

        return undefined;
    }

    readSongsFromPlaylist(playlistId: string): Song[] | undefined {
        const playlist = this.playlistRepository.readOneById(playlistId);

        if (playlist) {
            return playlist.songIds!.map((item) => this.songRepository.readOneById(item)!);
        }

        return undefined;
    }

    playSongFromPlayList(playlistId: string, songId: string): Song | undefined {
        const playlist = this.playlistRepository.readOneById(playlistId);

        if (playlist) {
            const song = this.songRepository.readOneById(songId);
            if (song) {
                return song;
            }
        }

        return undefined;
    }

}