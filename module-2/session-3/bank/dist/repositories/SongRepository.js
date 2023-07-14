"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Song_1 = __importDefault(require("../models/Song"));
class SongRepository {
    constructor() {
        this.data = [
            new Song_1.default('0', 'title0', ['0'], 'url0'),
            new Song_1.default('1', 'title1', ['0', '1'], 'url1')
        ];
        this.readAll = () => {
            return this.data;
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
exports.default = SongRepository;
