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
const VideoSchema_1 = __importDefault(require("../schemas/VideoSchema"));
const mongoose_1 = require("mongoose");
class VideoRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideos = yield VideoSchema_1.default.find();
            if (foundVideos === null) {
                throw new Error('Found videos is null.');
            }
            return foundVideos;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundVideo = yield VideoSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundVideo === null) {
                throw new Error('Found video is null.');
            }
            return foundVideo;
        });
        this.createOne = (video) => __awaiter(this, void 0, void 0, function* () {
            return yield VideoSchema_1.default.create(video);
        });
        this.patchOneById = (id, video) => __awaiter(this, void 0, void 0, function* () {
            const patchedVideo = yield VideoSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: video }, { new: true });
            if (patchedVideo === null) {
                throw new Error('Patched video is null.');
            }
            return patchedVideo;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedVideo = yield VideoSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedVideo === null) {
                throw new Error('Deleted video is null.');
            }
            return deletedVideo;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = VideoRepository;
//# sourceMappingURL=VideoRepository.js.map