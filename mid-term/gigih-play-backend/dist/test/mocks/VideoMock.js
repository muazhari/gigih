"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Video_1 = __importDefault(require("../../src/inners/models/entities/Video"));
const mongoose_1 = require("mongoose");
class VideoMock {
    constructor() {
        this.data = [
            new Video_1.default('thumbnailUrl0', 'contentUrl0', new mongoose_1.Types.ObjectId().toString()),
            new Video_1.default('thumbnailUrl1', 'contentUrl1', new mongoose_1.Types.ObjectId().toString())
        ];
    }
}
exports.default = VideoMock;
//# sourceMappingURL=VideoMock.js.map