"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SongService_1 = __importDefault(require("../services/SongService"));
class SongController {
    constructor() {
        this.songService = new SongService_1.default();
        this.router = express_1.default.Router();
        this.readAll = (request, response) => {
            const result = this.songService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const songId = request.params.songId;
            const result = this.songService.readOneById(songId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.songService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const songId = request.params.songId;
            const result = this.songService.patchOneById(songId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const songId = request.params.songId;
            const result = this.songService.deleteOneById(songId);
            response.status(result.status).json(result);
        };
        this.readAllSortedDescendByPlayCount = (request, response) => {
            const result = this.songService.readAllSortedDescendByPlayCount();
            response.status(result.status).json(result);
        };
        this.router.get('/', this.readAll);
        this.router.get('/:songId', this.readOneById);
        this.router.post('/', this.createOne);
        this.router.patch('/:songId', this.patchOneById);
        this.router.delete('/:songId', this.deleteOneById);
        this.router.get('/sorted/descend/play-count', this.readAllSortedDescendByPlayCount);
    }
}
exports.default = SongController;
