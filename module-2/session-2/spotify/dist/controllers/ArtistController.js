"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtistRepository_1 = __importDefault(require("../repositories/ArtistRepository"));
class ArtistController {
    constructor() {
        this.artistRepository = new ArtistRepository_1.default();
    }
    readAll() {
        return this.artistRepository.readAll();
    }
    readOneById(id) {
        return this.artistRepository.readOneById(id);
    }
    createOne(item) {
        return this.artistRepository.createOne(item);
    }
    patchOneById(id, item) {
        return this.artistRepository.patchOneById(id, item);
    }
    deleteOneById(id) {
        return this.artistRepository.deleteOneById(id);
    }
}
exports.default = ArtistController;
