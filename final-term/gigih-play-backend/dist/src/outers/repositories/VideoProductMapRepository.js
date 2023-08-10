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
const mongoose_1 = require("mongoose");
class VideoProductMapRepository {
    constructor(datastoreOne) {
        this.readAll = (search) => __awaiter(this, void 0, void 0, function* () {
            if (search !== undefined) {
                if (search._id !== undefined) {
                    search._id = new mongoose_1.Types.ObjectId(search._id);
                }
                if (search.videoId !== undefined) {
                    search.videoId = new mongoose_1.Types.ObjectId(search.videoId);
                }
                if (search.productId !== undefined) {
                    search.productId = new mongoose_1.Types.ObjectId(search.productId);
                }
            }
            const foundVideoProductMaps = yield VideoProductMapSchema_1.default.find(search);
            if (foundVideoProductMaps === null) {
                throw new Error('Found videoProductMaps is null.');
            }
            return foundVideoProductMaps;
        });
        this.readAllAggregated = (search) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pipeline = [
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
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: {
                        path: '$product'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        video: 1,
                        product: 1
                    }
                }
            ];
            if (search !== undefined) {
                if (search._id !== undefined) {
                    search._id = new mongoose_1.Types.ObjectId(search._id);
                }
                if (search.videoId !== undefined) {
                    search.videoId = new mongoose_1.Types.ObjectId(search.videoId);
                }
                if (search.productId !== undefined) {
                    search.productId = new mongoose_1.Types.ObjectId(search.productId);
                }
                if (((_a = search.product) === null || _a === void 0 ? void 0 : _a._id) !== undefined) {
                    search.product._id = new mongoose_1.Types.ObjectId(search.product._id);
                }
                pipeline.splice(pipeline.length - 1, 0, {
                    $match: search
                });
            }
            const foundVideoProductMaps = yield VideoProductMapSchema_1.default.aggregate(pipeline);
            if (foundVideoProductMaps === null) {
                throw new Error('Found videoProductMaps is null.');
            }
            return foundVideoProductMaps;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundVideoProductMap = yield VideoProductMapSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundVideoProductMap === null) {
                throw new Error('Found videoProductMap is null.');
            }
            return foundVideoProductMap;
        });
        this.readOneByIdAggregated = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundVideoProductMaps = yield VideoProductMapSchema_1.default.aggregate([
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
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: {
                        path: '$product'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        video: 1,
                        product: 1
                    }
                }
            ]);
            if (foundVideoProductMaps === null) {
                throw new Error('Found videoProductMaps is null.');
            }
            const foundVideoProductMap = foundVideoProductMaps[0];
            if (foundVideoProductMap === null) {
                throw new Error('Found videoProductMap is null.');
            }
            return foundVideoProductMap;
        });
        this.createOne = (videoProductMap) => __awaiter(this, void 0, void 0, function* () {
            return yield VideoProductMapSchema_1.default.create(videoProductMap);
        });
        this.patchOneById = (id, videoProductMap) => __awaiter(this, void 0, void 0, function* () {
            const patchedVideoProductMap = yield VideoProductMapSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: videoProductMap }, { new: true });
            if (patchedVideoProductMap === null) {
                throw new Error('Patched videoProductMap is null.');
            }
            return patchedVideoProductMap;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedVideoProductMap = yield VideoProductMapSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedVideoProductMap === null) {
                throw new Error('Deleted videoProductMap is null.');
            }
            return deletedVideoProductMap;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = VideoProductMapRepository;
//# sourceMappingURL=VideoProductMapRepository.js.map