"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtistRepository_1 = __importDefault(require("../repositories/ArtistRepository"));
const Result_1 = __importDefault(require("../models/Result"));
class ArtistService {
    constructor() {
        this.artistRepository = new ArtistRepository_1.default();
        this.readAll = () => {
            const foundArtists = this.artistRepository.readAll();
            return new Result_1.default(200, 'Artist read all succeed.', foundArtists);
        };
        this.readOneById = (id) => {
            const foundArtist = this.artistRepository.readOneById(id);
            if (foundArtist === undefined) {
                return new Result_1.default(400, `Artist read one by id failed: artist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Artist read one by id succeed.', foundArtist);
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Artist create one succeed.', this.artistRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            const patchedArtist = this.artistRepository.patchOneById(id, item);
            if (patchedArtist === undefined) {
                return new Result_1.default(400, `Artist patch one by id failed: artist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Artist patch one by id succeed.', patchedArtist);
        };
        this.deleteOneById = (id) => {
            const deletedArtist = this.artistRepository.deleteOneById(id);
            if (deletedArtist === undefined) {
                return new Result_1.default(400, `Artist delete one by id failed: artist with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Artist delete one by id succeed.', deletedArtist);
        };
    }
}
exports.default = ArtistService;
