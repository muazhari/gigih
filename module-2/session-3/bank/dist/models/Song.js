"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Song extends BaseModel_1.default {
    constructor(id, title, artistIds, url) {
        super();
        this.id = id;
        this.title = title;
        this.artistIds = artistIds;
        this.url = url;
    }
}
exports.default = Song;
