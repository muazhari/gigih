"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("../models/Artist"));
const Playlist_1 = __importDefault(require("../models/Playlist"));
const PlaylistSong_1 = __importDefault(require("../models/PlaylistSong"));
const Song_1 = __importDefault(require("../models/Song"));
class DatastoreOne {
    constructor() {
        this.artists = [
            new Artist_1.default('0', 'name0'),
            new Artist_1.default('1', 'name1')
        ];
        this.playlists = [
            new Playlist_1.default('0'),
            new Playlist_1.default('1')
        ];
        this.playlistSongs = [
            new PlaylistSong_1.default('0', '0', '0', 0),
            new PlaylistSong_1.default('1', '0', '1', 1),
            new PlaylistSong_1.default('2', '1', '0', 2)
        ];
        this.songs = [
            new Song_1.default('0', 'title0', ['0'], 'url0'),
            new Song_1.default('1', 'title1', ['0', '1'], 'url1')
        ];
    }
}
exports.default = DatastoreOne;
