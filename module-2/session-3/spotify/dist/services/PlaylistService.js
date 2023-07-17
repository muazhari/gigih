"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = __importDefault(require("../models/Result"));
const crypto_1 = require("crypto");
const PlaylistSong_1 = __importDefault(require("../models/PlaylistSong"));
class PlaylistService {
    constructor(playlistRepository, songRepository, playlistSongRepository) {
        this.readAll = () => {
            const foundPlaylists = this.playlistRepository.readAll();
            return new Result_1.default(200, 'Transaction read all succeed.', foundPlaylists);
        };
        this.readOneById = (id) => {
            try {
                const foundPlaylist = this.playlistRepository.readOneById(id);
                return new Result_1.default(200, 'Playlist read one by id succeed.', foundPlaylist);
            }
            catch (error) {
                return new Result_1.default(400, `Playlist read one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Playlist create one succeed.', this.playlistRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            try {
                const patchedPlaylist = this.playlistRepository.patchOneById(id, item);
                return new Result_1.default(200, 'Playlist patch one by id succeed.', patchedPlaylist);
            }
            catch (error) {
                return new Result_1.default(400, `Playlist patch one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
        };
        this.deleteOneById = (id) => {
            try {
                const deletedPlaylist = this.playlistRepository.deleteOneById(id);
                return new Result_1.default(200, 'Playlist delete one by id succeed.', deletedPlaylist);
            }
            catch (error) {
                return new Result_1.default(400, `Playlist delete one by id failed: playlist with id ${id} is undefined.`, undefined);
            }
        };
        this.addManySongToPlaylist = (playlistId, songIds) => {
            try {
                const playlist = this.playlistRepository.readOneById(playlistId);
                for (const songId of songIds) {
                    try {
                        this.songRepository.readOneById(songId);
                    }
                    catch (error) {
                        return new Result_1.default(400, `Playlist add many song to playlist failed: song with songId ${songId} is undefined.`, undefined);
                    }
                }
                songIds.forEach((songId) => {
                    this.playlistSongRepository.createOne(new PlaylistSong_1.default((0, crypto_1.randomUUID)(), playlistId, songId, 0));
                });
                return new Result_1.default(200, 'Transaction add many song to playlist succeed.', playlist);
            }
            catch (error) {
                return new Result_1.default(400, `Playlist add many song to playlist failed: playlist with playlistId ${playlistId} is undefined.`, undefined);
            }
        };
        // @ts-expect-error/Too nested return statements
        this.readAllSongFromPlaylist = (playlistId) => {
            try {
                this.playlistRepository.readOneById(playlistId);
                const playlistSongs = this.playlistSongRepository.readAllByPlaylistId(playlistId);
                const songs = [];
                // eslint-disable-next-line no-unreachable-loop
                for (const playlistSong of playlistSongs) {
                    if (playlistSong.songId === undefined) {
                        return new Result_1.default(400, 'Transaction read all song from playlist failed: songId from playlistSong is undefined.', undefined);
                    }
                    try {
                        const song = this.songRepository.readOneById(playlistSong.songId);
                        songs.push(song);
                        return new Result_1.default(200, 'Transaction read all song from playlist succeed.', songs);
                    }
                    catch (error) {
                        return new Result_1.default(400, `Playlist read all song from playlist failed: song with songId ${playlistSong.songId} is undefined.`, undefined);
                    }
                }
            }
            catch (error) {
                return new Result_1.default(400, 'Transaction read all song from playlist failed: playlist undefined.', undefined);
            }
        };
        this.playOneSongFromPlaylist = (playlistId, songId) => {
            try {
                this.playlistRepository.readOneById(playlistId);
                try {
                    const song = this.songRepository.readOneById(songId);
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
                }
                catch (error) {
                    return new Result_1.default(400, `Playlist play one song from playlist failed: song with songId ${songId} is undefined.`, undefined);
                }
            }
            catch (error) {
                return new Result_1.default(400, `Playlist play one song from playlist failed: playlist with playlistId ${playlistId} is undefined.`, undefined);
            }
        };
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.playlistSongRepository = playlistSongRepository;
    }
}
exports.default = PlaylistService;
