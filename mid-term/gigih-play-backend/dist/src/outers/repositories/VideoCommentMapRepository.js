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
const VideoCommentMapSchema_1 = __importDefault(require("../schemas/VideoCommentMapSchema"));
const mongoose_1 = require("mongoose");
class VideoCommentMapRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideoCommentMaps = yield VideoCommentMapSchema_1.default.find();
            if (foundVideoCommentMaps === null) {
                throw new Error('Found videoCommentMaps is null.');
            }
            return foundVideoCommentMaps;
        });
        this.readAllAggregated = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideoCommentMaps = yield VideoCommentMapSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'videos',
                        localField: 'videoId',
                        foreignField: '_id',
                        as: 'video'
                    }
                },
                {
                    $unwind: {
                        path: '$video'
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'commentId',
                        foreignField: '_id',
                        as: 'comment'
                    }
                },
                {
                    $unwind: {
                        path: '$comment'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        video: 1,
                        comment: 1
                    }
                }
            ]);
            if (foundVideoCommentMaps === null) {
                throw new Error('Found videoCommentMaps is null.');
            }
            return foundVideoCommentMaps;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundVideoCommentMap = yield VideoCommentMapSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundVideoCommentMap === null) {
                throw new Error('Found videoCommentMap is null.');
            }
            return foundVideoCommentMap;
        });
        this.readOneByIdAggregated = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundVideoCommentMaps = yield VideoCommentMapSchema_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'videos',
                        localField: 'videoId',
                        foreignField: '_id',
                        as: 'video'
                    }
                },
                {
                    $unwind: {
                        path: '$video'
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'commentId',
                        foreignField: '_id',
                        as: 'comment'
                    }
                },
                {
                    $unwind: {
                        path: '$comment'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        video: 1,
                        comment: 1
                    }
                },
                {
                    $limit: 1
                }
            ]);
            if (foundVideoCommentMaps === null) {
                throw new Error('Found videoCommentMaps is null.');
            }
            const foundVideoCommentMap = foundVideoCommentMaps[0];
            if (foundVideoCommentMap === null) {
                throw new Error('Found videoCommentMap is null.');
            }
            return foundVideoCommentMap;
        });
        this.createOne = (videoCommentMap) => __awaiter(this, void 0, void 0, function* () {
            return yield VideoCommentMapSchema_1.default.create(videoCommentMap);
        });
        this.patchOneById = (id, videoCommentMap) => __awaiter(this, void 0, void 0, function* () {
            const patchedVideoCommentMap = yield VideoCommentMapSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: videoCommentMap }, { new: true });
            if (patchedVideoCommentMap === null) {
                throw new Error('Patched videoCommentMap is null.');
            }
            return patchedVideoCommentMap;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedVideoCommentMap = yield VideoCommentMapSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedVideoCommentMap === null) {
                throw new Error('Deleted videoCommentMap is null.');
            }
            return deletedVideoCommentMap;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = VideoCommentMapRepository;
//# sourceMappingURL=VideoCommentMapRepository.js.map