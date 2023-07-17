"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistRepository {
    constructor(datastoreOne) {
        this.readAll = () => {
            return this.datastoreOne.artists;
        };
        this.readOneById = (id) => {
            const foundItem = this.datastoreOne.artists.find((item) => item.id === id);
            if (foundItem === undefined) {
                throw new Error(`Artist with id ${id} is not found.`);
            }
            return foundItem;
        };
        this.createOne = (item) => {
            this.datastoreOne.artists.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            this.datastoreOne.artists = this.datastoreOne.artists.filter((item) => item.id !== id);
            return foundItem;
        };
        this.datastoreOne = datastoreOne;
    }
}
exports.default = ArtistRepository;
