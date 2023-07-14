"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArtistService_1 = __importDefault(require("../services/ArtistService"));
class ArtistController {
    constructor() {
        this.artistService = new ArtistService_1.default();
        this.router = express_1.default.Router();
        this.readAll = (request, response) => {
            const result = this.artistService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.readOneById(artistId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.artistService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.patchOneById(artistId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.deleteOneById(artistId);
            response.status(result.status).json(result);
        };
        this.router.get('/', this.readAll);
        this.router.get('/:artistId', this.readOneById);
        this.router.post('/', this.createOne);
        this.router.patch('/:artistId', this.patchOneById);
        this.router.delete('/:artistId', this.deleteOneById);
    }
}
exports.default = ArtistController;
