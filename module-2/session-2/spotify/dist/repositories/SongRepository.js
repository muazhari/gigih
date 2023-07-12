"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Song_1 = __importDefault(require("../models/Song"));
const ArtistRepository_1 = __importDefault(require("./ArtistRepository"));
class SongRepository {
    constructor() {
        this.artistRepository = new ArtistRepository_1.default();
        this.data = [
            new Song_1.default("0", "title0", ["0"], "url0"),
            new Song_1.default("1", "title1", ["0", "1"], "url1"),
        ];
    }
    readAll() {
        return this.data;
    }
    readOneById(id) {
        return this.data.find((item) => item.id === id);
    }
    createOne(item) {
        item.id = (0, crypto_1.randomUUID)().toString();
        this.data.push(item);
        return item;
    }
    patchOneById(id, item) {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            foundItem.patchFrom(item);
            return foundItem;
        }
        return undefined;
    }
    deleteOneById(id) {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        }
        return undefined;
    }
}
exports.default = SongRepository;
