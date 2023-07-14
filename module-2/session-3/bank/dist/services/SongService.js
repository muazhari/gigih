"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SongRepository_1 = __importDefault(require("../repositories/SongRepository"));
const Song_1 = __importDefault(require("../models/Song"));
const Result_1 = __importDefault(require("../models/Result"));
const PlaylistSongRepository_1 = __importDefault(require("../repositories/PlaylistSongRepository"));
class SongService {
    constructor() {
        this.songRepository = new SongRepository_1.default();
        this.playlistSongRepository = new PlaylistSongRepository_1.default();
        this.readAll = () => {
            const foundSongs = this.songRepository.readAll();
            return new Result_1.default(200, 'Song read all succeed.', foundSongs);
        };
        this.readOneById = (id) => {
            const foundSong = this.songRepository.readOneById(id);
            if (foundSong === undefined) {
                return new Result_1.default(400, `Song read one by id failed: song with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Song read one by id succeed.', foundSong);
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Song create one succeed.', this.songRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            const patchedSong = this.songRepository.patchOneById(id, item);
            if (patchedSong === undefined) {
                return new Result_1.default(400, `Song patch one by id failed: song with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Song patch one by id succeed.', patchedSong);
        };
        this.deleteOneById = (id) => {
            const deletedSong = this.songRepository.deleteOneById(id);
            if (deletedSong === undefined) {
                return new Result_1.default(400, `Song delete one by id failed: song with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Song delete one by id succeed.', deletedSong);
        };
        this.readAllSortedDescendByPlayCount = () => {
            const foundSongs = this.songRepository.readAll();
            const foundPlaylistSongs = this.playlistSongRepository.readAll();
            const songsSortedDescendingByPlayCount = foundSongs === null || foundSongs === void 0 ? void 0 : foundSongs.map(song => {
                const playCount = foundPlaylistSongs === null || foundPlaylistSongs === void 0 ? void 0 : foundPlaylistSongs.filter(playlistSong => playlistSong.songId === song.id).reduce((acc, curr) => { var _a; return acc + ((_a = curr.playCount) !== null && _a !== void 0 ? _a : 0); }, 0);
                return Object.assign(Object.assign({}, song), { playCount });
            }).sort((a, b) => b.playCount - a.playCount).map(song => new Song_1.default(song.id, song.title, song.artistIds, song.url));
            return new Result_1.default(200, 'Song read all sorted descend by play count succeed.', songsSortedDescendingByPlayCount);
        };
    }
}
exports.default = SongService;
