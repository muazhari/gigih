"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistRepository_1 = __importDefault(require("../repositories/PlaylistRepository"));
const Result_1 = __importDefault(require("../models/Result"));
const SongRepository_1 = __importDefault(require("../repositories/SongRepository"));
const PlaylistSongRepository_1 = __importDefault(require("../repositories/PlaylistSongRepository"));
const crypto_1 = require("crypto");
const PlaylistSong_1 = __importDefault(require("../models/PlaylistSong"));
class PlaylistService {
    constructor() {
        this.playlistRepository = new PlaylistRepository_1.default();
        this.songRepository = new SongRepository_1.default();
        this.playlistSongRepository = new PlaylistSongRepository_1.default();
        this.readAll = () => {
            const foundPlaylists = this.playlistRepository.readAll();
            return new Result_1.default(200, 'Transaction read all succeed.', foundPlaylists);
        };
        this.readOneById = (id) => {
            const foundPlaylist = this.playlistRepository.readOneById(id);
            if (foundPlaylist === undefined) {
                return new Result_1.default(400, `Playlist read one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction read one by id succeed.', foundPlaylist);
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Transaction create one succeed.', this.playlistRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            const patchedPlaylist = this.playlistRepository.patchOneById(id, item);
            if (patchedPlaylist === undefined) {
                return new Result_1.default(400, `Playlist patch one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction patch one by id succeed.', patchedPlaylist);
        };
        this.deleteOneById = (id) => {
            const deletedPlaylist = this.playlistRepository.deleteOneById(id);
            if (deletedPlaylist === undefined) {
                return new Result_1.default(400, `Playlist delete one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction delete one by id succeed.', deletedPlaylist);
        };
        this.addManySongToPlaylist = (playlistId, songIds) => {
            const playlist = this.playlistRepository.readOneById(playlistId);
            if (playlist === undefined) {
                return new Result_1.default(400, `Playlist add many song to playlist failed: playlist with playlistId ${playlistId} is undefined.`, undefined);
            }
            for (const songId of songIds) {
                const song = this.songRepository.readOneById(songId);
                if (song === undefined) {
                    return new Result_1.default(400, `Playlist add many song to playlist failed: song with songId ${songId} is undefined.`, undefined);
                }
            }
            songIds.forEach((songId) => {
                this.playlistSongRepository.createOne(new PlaylistSong_1.default((0, crypto_1.randomUUID)(), playlistId, songId, 0));
            });
            return new Result_1.default(200, 'Transaction add many song to playlist succeed.', playlist);
        };
        this.readAllSongFromPlaylist = (playlistId) => {
            const playlist = this.playlistRepository.readOneById(playlistId);
            if (playlist === undefined) {
                return new Result_1.default(400, 'Transaction read all song from playlist failed: playlist undefined.', undefined);
            }
            const playlistSongs = this.playlistSongRepository.readAllByPlaylistId(playlistId);
            const songs = [];
            for (const playlistSong of playlistSongs) {
                if (playlistSong.songId === undefined) {
                    return new Result_1.default(400, 'Transaction read all song from playlist failed: songId from playlistSong is undefined.', undefined);
                }
                const song = this.songRepository.readOneById(playlistSong.songId);
                if (song === undefined) {
                    return new Result_1.default(400, `Playlist read all song from playlist failed: song with songId ${playlistSong.songId} is undefined.`, undefined);
                }
                songs.push(song);
            }
            return new Result_1.default(200, 'Transaction read all song from playlist succeed.', songs);
        };
        this.playOneSongFromPlaylist = (playlistId, songId) => {
            const playlist = this.playlistRepository.readOneById(playlistId);
            if (playlist === undefined) {
                return new Result_1.default(400, `Playlist play one song from playlist failed: playlist with playlistId ${playlistId} is undefined.`, undefined);
            }
            const song = this.songRepository.readOneById(songId);
            if (song === undefined) {
                return new Result_1.default(400, `Playlist play one song from playlist failed: song with songId ${songId} is undefined.`, undefined);
            }
            const playlistSongs = this.playlistSongRepository.readAllByPlaylistId(playlistId);
            const playlistSong = playlistSongs.filter((playlistSong) => {
                if (playlistSong.songId === undefined) {
                    return new Result_1.default(400, 'Transaction play one song from playlist failed: songId from playlistSong is undefined.', undefined);
                }
                return playlistSong.songId === songId;
            })[0];
            if (playlistSong === undefined) {
                return new Result_1.default(400, `Playlist play one song from playlist failed: playlistSong with songId ${songId} is undefined.`, undefined);
            }
            if (playlistSong.id === undefined) {
                return new Result_1.default(400, 'Transaction play one song from playlist failed: id from playlistSong is undefined.', undefined);
            }
            if (playlistSong.playCount === undefined) {
                playlistSong.playCount = 0;
            }
            if (playlistSong.songId === songId) {
                playlistSong.playCount += 1;
                this.playlistSongRepository.patchOneById(playlistSong.id, playlistSong);
            }
            return new Result_1.default(200, 'Transaction play one song from playlist succeed.', song);
        };
    }
}
exports.default = PlaylistService;
