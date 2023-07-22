"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoProductMapSchema_1 = __importDefault(require("../schemas/VideoProductMapSchema"));
class VideoProductMapRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundEntities = yield VideoProductMapSchema_1.default.find();
            if (foundEntities === null) {
                throw new Error('Found entities is null.');
            }
            return foundEntities;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundEntity = yield VideoProductMapSchema_1.default.findOne({ _id: id });
            if (foundEntity === null) {
                throw new Error('Found entity is null.');
            }
            return foundEntity;
        });
        this.createOne = (entity) => __awaiter(this, void 0, void 0, function* () {
            return yield VideoProductMapSchema_1.default.create(entity);
        });
        this.patchOneById = (id, entity) => __awaiter(this, void 0, void 0, function* () {
            const patchedEntity = yield VideoProductMapSchema_1.default.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true });
            if (patchedEntity === null) {
                throw new Error('Patched entity is null.');
            }
            return patchedEntity;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedEntity = yield VideoProductMapSchema_1.default.findOneAndDelete({ _id: id });
            if (deletedEntity === null) {
                throw new Error('Deleted entity is null.');
            }
            return deletedEntity;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = VideoProductMapRepository;
//# sourceMappingURL=VideoProductMapRepository.js.map