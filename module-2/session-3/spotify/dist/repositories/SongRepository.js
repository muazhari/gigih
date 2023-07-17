"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SongRepository {
    constructor(datastoreOne) {
        this.readAll = () => {
            return this.datastoreOne.songs;
        };
        this.readOneById = (id) => {
            const foundItem = this.datastoreOne.songs.find((item) => item.id === id);
            if (foundItem === undefined) {
                throw new Error(`Song with id ${id} is not found.`);
            }
            return foundItem;
        };
        this.createOne = (item) => {
            this.datastoreOne.songs.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            this.datastoreOne.songs = this.datastoreOne.songs.filter((item) => item.id !== id);
            return foundItem;
        };
        this.datastoreOne = datastoreOne;
    }
}
exports.default = SongRepository;
