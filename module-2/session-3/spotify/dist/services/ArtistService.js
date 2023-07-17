"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = __importDefault(require("../models/Result"));
class ArtistService {
    constructor(artistRepository) {
        this.readAll = () => {
            const foundArtists = this.artistRepository.readAll();
            return new Result_1.default(200, 'Artist read all succeed.', foundArtists);
        };
        this.readOneById = (id) => {
            try {
                const foundArtist = this.artistRepository.readOneById(id);
                return new Result_1.default(200, 'Artist read one by id succeed.', foundArtist);
            }
            catch (error) {
                return new Result_1.default(400, `Artist read one by id failed: artist with id ${id} is undefined.`, undefined);
            }
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Artist create one succeed.', this.artistRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            try {
                const patchedArtist = this.artistRepository.patchOneById(id, item);
                return new Result_1.default(200, 'Artist patch one by id succeed.', patchedArtist);
            }
            catch (error) {
                return new Result_1.default(400, `Artist patch one by id failed: artist with id ${id} is undefined.`, undefined);
            }
        };
        this.deleteOneById = (id) => {
            try {
                const deletedArtist = this.artistRepository.deleteOneById(id);
                return new Result_1.default(200, 'Artist delete one by id succeed.', deletedArtist);
            }
            catch (error) {
                return new Result_1.default(400, `Artist delete one by id failed: artist with id ${id} is undefined.`, undefined);
            }
        };
        this.artistRepository = artistRepository;
    }
}
exports.default = ArtistService;
