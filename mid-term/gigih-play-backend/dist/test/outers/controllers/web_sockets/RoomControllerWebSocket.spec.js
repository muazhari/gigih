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
const chai_1 = __importDefault(require("chai"));
const mocha_1 = require("mocha");
const OneDatastore_1 = __importDefault(require("../../../../src/outers/datastores/OneDatastore"));
const CommentSchema_1 = __importDefault(require("../../../../src/outers/schemas/CommentSchema"));
const UserSchema_1 = __importDefault(require("../../../../src/outers/schemas/UserSchema"));
const VideoCommentMapMock_1 = __importDefault(require("../../../mocks/VideoCommentMapMock"));
const VideoSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoSchema"));
const VideoCommentMapSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoCommentMapSchema"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const JoinRoomRequest_1 = __importDefault(require("../../../../src/inners/models/value_objects/requests/rooms/JoinRoomRequest"));
const App_1 = require("../../../../src/App");
const SubmitCommentRequest_1 = __importDefault(require("../../../../src/inners/models/value_objects/requests/comments/SubmitCommentRequest"));
const async_wait_until_1 = __importDefault(require("async-wait-until"));
chai_1.default.should();
(0, mocha_1.describe)('RoomControllerWebSocket', () => {
    const videoCommentMapMock = new VideoCommentMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    let addressInfo;
    let clientOne;
    let clientTwo;
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, async_wait_until_1.default)(() => App_1.server === null || App_1.server === void 0 ? void 0 : App_1.server.listening);
        addressInfo = App_1.server === null || App_1.server === void 0 ? void 0 : App_1.server.address();
        clientOne = (0, socket_io_client_1.default)(`http://localhost:${addressInfo.port}`);
        clientTwo = (0, socket_io_client_1.default)(`http://localhost:${addressInfo.port}`);
        yield oneDatastore.connect();
        yield UserSchema_1.default.insertMany(videoCommentMapMock.commentMock.userMock.data);
        yield VideoSchema_1.default.insertMany(videoCommentMapMock.videoMock.data);
        yield CommentSchema_1.default.insertMany(videoCommentMapMock.commentMock.data);
        yield VideoCommentMapSchema_1.default.insertMany(videoCommentMapMock.data);
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield UserSchema_1.default.deleteMany({
            _id: {
                $in: videoCommentMapMock.commentMock.userMock.data.map((userMock) => userMock._id)
            }
        });
        yield VideoSchema_1.default.deleteMany({
            _id: {
                $in: videoCommentMapMock.videoMock.data.map((videoMock) => videoMock._id)
            }
        });
        yield CommentSchema_1.default.deleteMany({
            _id: {
                $in: videoCommentMapMock.commentMock.data.map((commentMock) => commentMock._id)
            }
        });
        yield VideoCommentMapSchema_1.default.deleteMany({
            _id: {
                $in: videoCommentMapMock.data.map((videoCommentMapMock) => videoCommentMapMock._id)
            }
        });
        yield oneDatastore.disconnect();
        clientOne.disconnect();
        clientTwo.disconnect();
    }));
    (0, mocha_1.describe)('join', () => {
        (0, mocha_1.it)('should client joined', (done) => {
            const selectedVideoMock = videoCommentMapMock.videoMock.data[0];
            const joinRoomRequest = new JoinRoomRequest_1.default(selectedVideoMock._id);
            clientOne.on('joinedRoom', (result) => {
                result.should.be.a('object');
                result.should.have.property('status').eq(200);
                result.should.have.property('message');
                result.should.have.property('data').a('array');
                videoCommentMapMock.commentMock.data.map((commentMock) => {
                    return JSON.parse(JSON.stringify(commentMock));
                }).should.deep.include.members(result.data);
                done();
            });
            clientOne.emit('joinRoom', joinRoomRequest);
        });
    });
    (0, mocha_1.describe)('leave', () => {
        (0, mocha_1.it)('should client left', (done) => {
            const selectedVideoMock = videoCommentMapMock.videoMock.data[0];
            const joinRoomRequest = new JoinRoomRequest_1.default(selectedVideoMock._id);
            clientOne.on('leftRoom', (videoId) => {
                videoId.should.be.a('string');
                videoId.should.eq(joinRoomRequest.videoId);
                done();
            });
            clientOne.on('joinedRoom', (result) => {
                result.should.be.a('object');
                result.should.have.property('status').eq(200);
                result.should.have.property('message');
                result.should.have.property('data').a('array');
                videoCommentMapMock.commentMock.data.map((commentMock) => {
                    return JSON.parse(JSON.stringify(commentMock));
                }).should.deep.include.members(result.data);
                clientOne.emit('leaveRoom', joinRoomRequest.videoId);
            });
            clientOne.emit('joinRoom', joinRoomRequest);
        });
    });
    (0, mocha_1.describe)('comment', () => {
        (0, mocha_1.it)('should client submitted comment', (done) => {
            const selectedVideoMock = videoCommentMapMock.videoMock.data[0];
            const joinRoomRequest = new JoinRoomRequest_1.default(selectedVideoMock._id);
            const selectedUserMock = videoCommentMapMock.commentMock.userMock.data[0];
            const submitCommentRequest = new SubmitCommentRequest_1.default(selectedVideoMock._id, selectedUserMock.username, 'content test');
            clientTwo.on('commentSubmitted', (result) => {
                result.should.be.a('object');
                result.should.have.property('status').eq(201);
                result.should.have.property('message');
                result.should.have.property('data').a('object');
                result.data.should.have.property('_id');
                result.data.should.have.property('userId').eq(selectedUserMock._id);
                result.data.should.have.property('content').eq(submitCommentRequest.content);
                result.data.should.have.property('timestamp');
                done();
            });
            clientOne.on('joinedRoom', (result) => {
                result.should.be.a('object');
                result.should.have.property('status').eq(200);
                result.should.have.property('message');
                result.should.have.property('data').a('array');
                videoCommentMapMock.commentMock.data.map((commentMock) => {
                    return JSON.parse(JSON.stringify(commentMock));
                }).should.deep.include.members(result.data);
                clientOne.emit('submitComment', submitCommentRequest);
            });
            clientOne.emit('joinRoom', joinRoomRequest);
            clientTwo.emit('joinRoom', joinRoomRequest);
        });
    });
});
//# sourceMappingURL=RoomControllerWebSocket.spec.js.map