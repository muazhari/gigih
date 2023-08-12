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
const Result_1 = __importDefault(require("../../../inners/models/value_objects/Result"));
const CommentAggregate_1 = __importDefault(require("../../../inners/models/aggregates/CommentAggregate"));
const Comment_1 = __importDefault(require("../../../inners/models/entities/Comment"));
const VideoCommentMap_1 = __importDefault(require("../../../inners/models/entities/VideoCommentMap"));
class RoomControllerWebSocket {
    constructor(io, commentManagement, userManagement, videoCommentMapManagement) {
        this.registerSockets = () => {
            this.io.on('connection', (socket) => {
                socket.on('joinRoom', this.joinRoom(socket));
                socket.on('leaveRoom', this.leaveRoom(socket));
                socket.on('submitComment', this.submitComment(socket));
            });
        };
        this.joinRoom = (socket) => (joinRoomRequest) => __awaiter(this, void 0, void 0, function* () {
            if (joinRoomRequest.videoId === undefined) {
                throw new Error('JoinRoomRequest videoId is undefined');
            }
            yield socket.join(joinRoomRequest.videoId);
            const result = yield this.commentManagement.readAllByVideoId(joinRoomRequest.videoId, joinRoomRequest.isAggregated);
            socket.emit('joinedRoom', result);
        });
        this.leaveRoom = (socket) => (videoId) => __awaiter(this, void 0, void 0, function* () {
            yield socket.leave(videoId);
            const result = new Result_1.default(200, 'LeftRoom succeed.', videoId);
            socket.emit('leftRoom', result);
        });
        this.submitComment = (socket) => (submitCommentRequest) => __awaiter(this, void 0, void 0, function* () {
            if (submitCommentRequest.videoId === undefined) {
                throw new Error('SubmitCommentRequest videoId is undefined');
            }
            if (submitCommentRequest.username === undefined) {
                throw new Error('SubmitCommentRequest username is undefined');
            }
            const foundUser = yield this.userManagement.readOneByUsername(submitCommentRequest.username);
            const createdComment = yield this.commentManagement.createOne(new Comment_1.default(foundUser.data._id, submitCommentRequest.content, new Date()));
            if (createdComment.data === undefined) {
                throw new Error('CreatedComment is undefined');
            }
            yield this.videoCommentMapManagement.createOne(new VideoCommentMap_1.default(submitCommentRequest.videoId, createdComment.data._id));
            const result = new Result_1.default(201, 'SubmittedComment succeed.', new CommentAggregate_1.default(foundUser.data, createdComment.data.content, createdComment.data.timestamp, createdComment.data._id));
            socket.to(submitCommentRequest.videoId).emit('submittedComment', result);
        });
        this.io = io;
        this.commentManagement = commentManagement;
        this.userManagement = userManagement;
        this.videoCommentMapManagement = videoCommentMapManagement;
    }
}
exports.default = RoomControllerWebSocket;
//# sourceMappingURL=RoomControllerWebSocket.js.map