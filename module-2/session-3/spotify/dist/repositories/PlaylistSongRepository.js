"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaylistSongRepository {
    constructor(datastoreOne) {
        this.readAll = () => {
            return this.datastoreOne.playlistSongs;
        };
        this.readAllByPlaylistId = (playlistId) => {
            return this.datastoreOne.playlistSongs.filter((item) => item.playlistId === playlistId);
        };
        this.readOneById = (id) => {
            const foundItem = this.datastoreOne.playlistSongs.find((item) => item.id === id);
            if (foundItem === undefined) {
                throw new Error(`PlaylistSong with id ${id} is not found.`);
            }
            return foundItem;
        };
        this.createOne = (item) => {
            this.datastoreOne.playlistSongs.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            this.datastoreOne.playlistSongs = this.datastoreOne.playlistSongs.filter((item) => item.id !== id);
            return foundItem;
        };
        this.datastoreOne = datastoreOne;
    }
}
exports.default = PlaylistSongRepository;
