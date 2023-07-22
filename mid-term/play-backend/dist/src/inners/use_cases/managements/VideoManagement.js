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
const Result_1 = __importDefault(require("../../models/value_objects/Result"));
class VideoManagement {
    constructor(videoRepository) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideos = yield this.videoRepository.readAll();
            return new Result_1.default(200, 'Video read all succeed.', foundVideos);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundVideo = yield this.videoRepository.readOneById(id);
                return new Result_1.default(200, 'Video read one by id succeed.', foundVideo);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdVideo = yield this.videoRepository.createOne(item);
            return new Result_1.default(201, 'Video create one succeed.', createdVideo);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchedVideo = yield this.videoRepository.patchOneById(id, item);
                return new Result_1.default(200, 'Video patch one by id succeed.', patchedVideo);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedVideo = yield this.videoRepository.deleteOneById(id);
                return new Result_1.default(200, 'Video delete one by id succeed.', deletedVideo);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.videoRepository = videoRepository;
    }
}
exports.default = VideoManagement;
//# sourceMappingURL=VideoManagement.js.map