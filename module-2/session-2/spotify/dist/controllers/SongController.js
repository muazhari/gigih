"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SongRepository_1 = __importDefault(require("../repositories/SongRepository"));
class SongController {
    constructor() {
        this.songRepository = new SongRepository_1.default();
    }
    readAll() {
        return this.songRepository.readAll();
    }
    readOneById(id) {
        return this.songRepository.readOneById(id);
    }
    createOne(item) {
        return this.songRepository.createOne(item);
    }
    patchOneById(id, item) {
        return this.songRepository.patchOneById(id, item);
    }
    deleteOneById(id) {
        return this.songRepository.deleteOneById(id);
    }
}
exports.default = SongController;
