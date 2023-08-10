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
        this.readAll = (isAggregated, search) => __awaiter(this, void 0, void 0, function* () {
            let foundVideoCommentMaps;
            if (isAggregated === true) {
                foundVideoCommentMaps = yield this.videoCommentMapRepository.readAllAggregated(search);
            }
            else {
                foundVideoCommentMaps = yield this.videoCommentMapRepository.readAll(search);
            }
            return new Result_1.default(200, 'VideoCommentMap read all succeed.', foundVideoCommentMaps);
        });
        this.readOneById = (id, isAggregated) => __awaiter(this, void 0, void 0, function* () {
            let foundVideoCommentMap;
            if (isAggregated === true) {
                foundVideoCommentMap = yield this.videoCommentMapRepository.readOneByIdAggregated(id);
            }
            else {
                foundVideoCommentMap = yield this.videoCommentMapRepository.readOneById(id);
            }
            return new Result_1.default(200, 'VideoCommentMap read one by id succeed.', foundVideoCommentMap);
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdVideoCommentMap = yield this.videoCommentMapRepository.createOne(item);
            return new Result_1.default(201, 'VideoCommentMap create one succeed.', createdVideoCommentMap);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            const patchedVideoCommentMap = yield this.videoCommentMapRepository.patchOneById(id, item);
            return new Result_1.default(200, 'VideoCommentMap patch one by id succeed.', patchedVideoCommentMap);
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedVideoCommentMap = yield this.videoCommentMapRepository.deleteOneById(id);
            return new Result_1.default(200, 'VideoCommentMap delete one by id succeed.', deletedVideoCommentMap);
        });
        this.videoCommentMapRepository = videoCommentMapRepository;
    }
}
exports.default = VideoCommentMapManagement;
//# sourceMappingURL=VideoCommentMapManagement.js.map