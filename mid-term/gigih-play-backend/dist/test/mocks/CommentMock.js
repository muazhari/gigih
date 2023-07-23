"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("../../src/inners/models/entities/Comment"));
const mongoose_1 = require("mongoose");
const UserMock_1 = __importDefault(require("./UserMock"));
const CommentAggregate_1 = __importDefault(require("../../src/inners/models/aggregates/CommentAggregate"));
class CommentMock {
    constructor() {
        this.userMock = new UserMock_1.default();
        this.data = [
            new Comment_1.default(this.userMock.data[0]._id, 'content0', new Date(), new mongoose_1.Types.ObjectId().toString()),
            new Comment_1.default(this.userMock.data[1]._id, 'content1', new Date(), new mongoose_1.Types.ObjectId().toString())
        ];
        this.aggregatedData = [
            new CommentAggregate_1.default(this.userMock.data[0], this.data[0].content, this.data[0].timestamp, this.data[0]._id),
            new CommentAggregate_1.default(this.userMock.data[1], this.data[1].content, this.data[1].timestamp, this.data[1]._id)
        ];
    }
}
exports.default = CommentMock;
//# sourceMappingURL=CommentMock.js.map