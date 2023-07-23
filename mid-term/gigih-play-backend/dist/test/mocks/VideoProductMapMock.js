"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoProductMap_1 = __importDefault(require("../../src/inners/models/entities/VideoProductMap"));
const mongoose_1 = require("mongoose");
const VideoMock_1 = __importDefault(require("./VideoMock"));
const ProductMock_1 = __importDefault(require("./ProductMock"));
const VideoProductMapAggregate_1 = __importDefault(require("../../src/inners/models/aggregates/VideoProductMapAggregate"));
class VideoProductMapMock {
    constructor() {
        this.videoMock = new VideoMock_1.default();
        this.productMock = new ProductMock_1.default();
        this.data = [
            new VideoProductMap_1.default(this.videoMock.data[0]._id, this.productMock.data[0]._id, new mongoose_1.Types.ObjectId().toString()),
            new VideoProductMap_1.default(this.videoMock.data[1]._id, this.productMock.data[1]._id, new mongoose_1.Types.ObjectId().toString())
        ];
        this.aggregatedData = [
            new VideoProductMapAggregate_1.default(this.videoMock.data[0], this.productMock.data[0], this.data[0]._id),
            new VideoProductMapAggregate_1.default(this.videoMock.data[1], this.productMock.data[1], this.data[1]._id)
        ];
    }
}
exports.default = VideoProductMapMock;
//# sourceMappingURL=VideoProductMapMock.js.map