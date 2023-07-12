"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Playlist extends BaseModel_1.default {
    constructor(id, songIds) {
        super();
        this.id = id;
        this.songIds = songIds;
    }
}
exports.default = Playlist;
