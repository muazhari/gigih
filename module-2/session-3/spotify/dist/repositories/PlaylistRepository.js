"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaylistRepository {
    constructor(datastoreOne) {
        this.readAll = () => {
            return this.datastoreOne.playlists;
        };
        this.readOneById = (id) => {
            const foundItem = this.datastoreOne.playlists.find((item) => item.id === id);
            if (foundItem === undefined) {
                throw new Error(`Playlist with id ${id} is not found.`);
            }
            return foundItem;
        };
        this.createOne = (item) => {
            this.datastoreOne.playlists.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            this.datastoreOne.playlists = this.datastoreOne.playlists.filter((item) => item.id !== id);
            return foundItem;
        };
        this.datastoreOne = datastoreOne;
    }
}
exports.default = PlaylistRepository;
