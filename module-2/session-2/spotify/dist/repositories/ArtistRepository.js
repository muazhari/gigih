"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Artist_1 = __importDefault(require("../models/Artist"));
class ArtistRepository {
    constructor() {
        this.data = [
            new Artist_1.default("0", "name0"),
            new Artist_1.default("1", "name1"),
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
exports.default = ArtistRepository;
