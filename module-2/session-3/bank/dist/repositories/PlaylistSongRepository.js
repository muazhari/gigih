"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistSong_1 = __importDefault(require("../models/PlaylistSong"));
const SongRepository_1 = __importDefault(require("./SongRepository"));
class PlaylistSongRepository {
    constructor() {
        this.songRepository = new SongRepository_1.default();
        this.data = [
            new PlaylistSong_1.default('0', '0', '0', 0),
            new PlaylistSong_1.default('1', '0', '1', 1),
            new PlaylistSong_1.default('2', '1', '0', 2)
        ];
        this.readAll = () => {
            return this.data;
        };
        this.readAllByPlaylistId = (playlistId) => {
            return this.data.filter((item) => item.playlistId === playlistId);
        };
        this.readOneById = (id) => {
            return this.data.find((item) => item.id === id);
        };
        this.createOne = (item) => {
            this.data.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            if (foundItem === undefined) {
                return undefined;
            }
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            if (foundItem === undefined) {
                return undefined;
            }
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        };
    }
}
exports.default = PlaylistSongRepository;
