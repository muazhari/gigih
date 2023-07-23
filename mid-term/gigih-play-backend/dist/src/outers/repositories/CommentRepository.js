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
const CommentSchema_1 = __importDefault(require("../schemas/CommentSchema"));
const mongoose_1 = require("mongoose");
class CommentRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundComment = yield CommentSchema_1.default.find();
            if (foundComment === null) {
                throw new Error('Found comments is null.');
            }
            return foundComment;
        });
        this.readAllAggregated = () => __awaiter(this, void 0, void 0, function* () {
            const foundComment = yield CommentSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        content: 1,
                        timestamp: 1
                    }
                }
            ]);
            if (foundComment === null) {
                throw new Error('Found comments is null.');
            }
            return foundComment;
        });
        this.readAllByVideoId = (videoId) => __awaiter(this, void 0, void 0, function* () {
            const foundCommentByVideoId = yield CommentSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'video_comment_maps',
                        localField: '_id',
                        foreignField: 'commentId',
                        as: 'videoCommentMaps'
                    }
                },
                {
                    $match: {
                        'videoCommentMaps.videoId': new mongoose_1.Types.ObjectId(videoId)
                    }
                },
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        content: 1,
                        timestamp: 1
                    }
                }
            ]);
            if (foundCommentByVideoId === null) {
                throw new Error('Found comments by video id is null.');
            }
            return foundCommentByVideoId;
        });
        this.readAllByVideoIdAggregated = (videoId) => __awaiter(this, void 0, void 0, function* () {
            const foundCommentByVideoId = yield CommentSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'video_comment_maps',
                        localField: '_id',
                        foreignField: 'commentId',
                        as: 'videoCommentMaps'
                    }
                },
                {
                    $match: {
                        'videoCommentMaps.videoId': new mongoose_1.Types.ObjectId(videoId)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        content: 1,
                        timestamp: 1
                    }
                }
            ]);
            if (foundCommentByVideoId === null) {
                throw new Error('Found comments by video id is null.');
            }
            return foundCommentByVideoId;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundComment = yield CommentSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundComment === null) {
                throw new Error('Found comment is null.');
            }
            return foundComment;
        });
        this.readOneByIdAggregated = (id) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const foundComments = yield CommentSchema_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        content: 1,
                        timestamp: 1
                    }
                },
                {
                    $limit: 1
                }
            ]);
            if (foundComments === null) {
                throw new Error('Found comments is null.');
            }
            const foundComment = (_a = foundComments[0]) !== null && _a !== void 0 ? _a : null;
            if (foundComment === null) {
                throw new Error('Found comment is null.');
            }
            return foundComment;
        });
        this.createOne = (comment) => __awaiter(this, void 0, void 0, function* () {
            return yield CommentSchema_1.default.create(comment);
        });
        this.patchOneById = (id, comment) => __awaiter(this, void 0, void 0, function* () {
            const patchedComment = yield CommentSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: comment }, { new: true });
            if (patchedComment === null) {
                throw new Error('Patched comment is null.');
            }
            return patchedComment;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield CommentSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedComment === null) {
                throw new Error('Deleted comment is null.');
            }
            return deletedComment;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = CommentRepository;
//# sourceMappingURL=CommentRepository.js.map