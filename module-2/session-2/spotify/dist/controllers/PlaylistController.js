"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistRepository_1 = __importDefault(require("../repositories/PlaylistRepository"));
const SongRepository_1 = __importDefault(require("../repositories/SongRepository"));
class PlaylistController {
    constructor() {
        this.playlistRepository = new PlaylistRepository_1.default();
        this.songRepository = new SongRepository_1.default();
    }
    readAll() {
        return this.playlistRepository.readAll();
    }
    readOneById(id) {
        return this.playlistRepository.readOneById(id);
    }
    createOne(item) {
        return this.playlistRepository.createOne(item);
    }
    patchOneById(id, item) {
        return this.playlistRepository.patchOneById(id, item);
    }
    deleteOneById(id) {
        return this.playlistRepository.deleteOneById(id);
    }
    addSongsToPlaylist(playlistId, songIds) {
        const playlist = this.playlistRepository.readOneById(playlistId);
        if (playlist) {
            playlist.songIds.push(...songIds);
            return playlist;
        }
        return undefined;
    }
    readSongsFromPlaylist(playlistId) {
        const playlist = this.playlistRepository.readOneById(playlistId);
        if (playlist) {
            return playlist.songIds.map((item) => this.songRepository.readOneById(item));
        }
        return undefined;
    }
    playSongFromPlayList(playlistId, songId) {
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
exports.default = PlaylistController;
