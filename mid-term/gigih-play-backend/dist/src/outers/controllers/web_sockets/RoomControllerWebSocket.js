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
const Comment_1 = __importDefault(require("../../../inners/models/entities/Comment"));
class RoomControllerWebSocket {
    constructor(io, commentManagement, userManagement) {
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
            socket.emit('leftRoom', videoId);
        });
        this.submitComment = (socket) => (submitCommentRequest) => __awaiter(this, void 0, void 0, function* () {
            if (submitCommentRequest.videoId === undefined) {
                throw new Error('SubmitCommentRequest videoId is undefined');
            }
            if (submitCommentRequest.username === undefined) {
                throw new Error('SubmitCommentRequest username is undefined');
            }
            const foundUser = yield this.userManagement.readOneByUsername(submitCommentRequest.username);
            const toCreateComment = new Comment_1.default(foundUser.data._id, submitCommentRequest.content, new Date());
            const result = yield this.commentManagement.createOne(toCreateComment);
            socket.to(submitCommentRequest.videoId).emit('submittedComment', result);
        });
        this.io = io;
        this.commentManagement = commentManagement;
        this.userManagement = userManagement;
    }
}
exports.default = RoomControllerWebSocket;
//# sourceMappingURL=RoomControllerWebSocket.js.map