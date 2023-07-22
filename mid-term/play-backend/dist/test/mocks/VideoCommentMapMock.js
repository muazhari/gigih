"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoCommentMap_1 = __importDefault(require("../../src/inners/models/entities/VideoCommentMap"));
const mongoose_1 = require("mongoose");
const VideoMock_1 = __importDefault(require("./VideoMock"));
const CommentMock_1 = __importDefault(require("./CommentMock"));
class VideoCommentMapMock {
    constructor() {
        this.videoMock = new VideoMock_1.default();
        this.commentMock = new CommentMock_1.default();
        this.data = [
            new VideoCommentMap_1.default(this.videoMock.data[0]._id, this.commentMock.data[0]._id, new mongoose_1.Types.ObjectId().toString()),
            new VideoCommentMap_1.default(this.videoMock.data[1]._id, this.commentMock.data[1]._id, new mongoose_1.Types.ObjectId().toString())
        ];
    }
}
exports.default = VideoCommentMapMock;
//# sourceMappingURL=VideoCommentMapMock.js.map