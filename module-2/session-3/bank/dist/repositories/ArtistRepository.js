"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("../models/Artist"));
class ArtistRepository {
    constructor() {
        this.data = [
            new Artist_1.default('0', 'name0'),
            new Artist_1.default('1', 'name1')
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
exports.default = ArtistRepository;
