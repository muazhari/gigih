"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class PlaylistSong extends BaseModel_1.default {
    constructor(id, playlistId, songId, playCount) {
        super();
        this.id = id;
        this.playlistId = playlistId;
        this.songId = songId;
        this.playCount = playCount;
    }
}
exports.default = PlaylistSong;
