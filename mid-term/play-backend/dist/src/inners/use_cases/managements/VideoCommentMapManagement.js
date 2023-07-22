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
class VideoCommentMapManagement {
    constructor(videoCommentMapRepository) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideoCommentMaps = yield this.videoCommentMapRepository.readAll();
            return new Result_1.default(200, 'VideoCommentMap read all succeed.', foundVideoCommentMaps);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundVideoCommentMap = yield this.videoCommentMapRepository.readOneById(id);
                return new Result_1.default(200, 'VideoCommentMap read one by id succeed.', foundVideoCommentMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdVideoCommentMap = yield this.videoCommentMapRepository.createOne(item);
            return new Result_1.default(201, 'VideoCommentMap create one succeed.', createdVideoCommentMap);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchedVideoCommentMap = yield this.videoCommentMapRepository.patchOneById(id, item);
                return new Result_1.default(200, 'VideoCommentMap patch one by id succeed.', patchedVideoCommentMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedVideoCommentMap = yield this.videoCommentMapRepository.deleteOneById(id);
                return new Result_1.default(200, 'VideoCommentMap delete one by id succeed.', deletedVideoCommentMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.videoCommentMapRepository = videoCommentMapRepository;
    }
}
exports.default = VideoCommentMapManagement;
//# sourceMappingURL=VideoCommentMapManagement.js.map