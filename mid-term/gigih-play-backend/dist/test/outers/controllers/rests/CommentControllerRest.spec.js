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
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const OneDatastore_1 = __importDefault(require("../../../../src/outers/datastores/OneDatastore"));
const App_1 = require("../../../../src/App");
const CommentSchema_1 = __importDefault(require("../../../../src/outers/schemas/CommentSchema"));
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("../../../../src/inners/models/entities/Comment"));
const UserSchema_1 = __importDefault(require("../../../../src/outers/schemas/UserSchema"));
const VideoCommentMapMock_1 = __importDefault(require("../../../mocks/VideoCommentMapMock"));
const VideoSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoSchema"));
const VideoCommentMapSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoCommentMapSchema"));
const humps_1 = __importDefault(require("humps"));
const SubmitCommentRequest_1 = __importDefault(require("../../../../src/inners/models/value_objects/requests/comments/SubmitCommentRequest"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('CommentControllerRest', () => {
    const videoCommentMapMock = new VideoCommentMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    (0, mocha_1.describe)('GET /api/v1/comments', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/comments');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoCommentMapMock.commentMock.data.map((commentMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments?is_aggregated=true', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/comments?is_aggregated=true');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments/videos/:videoId', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = videoCommentMapMock.data[0];
            if (selectedVideoCommentMapMock.videoId === undefined) {
                throw new Error('Selected video comment map mock video id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/comments/videos/${selectedVideoCommentMapMock.videoId}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            videoCommentMapMock.commentMock.data.map((commentMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)));
            }).should.deep.include.members(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments/videos/:videoId?is_aggregated=true', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = videoCommentMapMock.data[0];
            if (selectedVideoCommentMapMock.videoId === undefined) {
                throw new Error('Selected video comment map mock video id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/comments/videos/${selectedVideoCommentMapMock.videoId}?is_aggregated=true`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)));
            }).should.deep.include.members(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = videoCommentMapMock.commentMock.data[0];
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/comments/${selectedCommentMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.commentMock.data.map((commentMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments/:id?is_aggregated=true', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMockAggregated = videoCommentMapMock.commentMock.aggregatedData[0];
            if (selectedCommentMockAggregated._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/comments/${selectedCommentMockAggregated._id}?is_aggregated=true`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.commentMock.aggregatedData.map((commentMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMockAggregated)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/comments/submission', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = videoCommentMapMock.videoMock.data[0];
            const selectedUserMock = videoCommentMapMock.commentMock.userMock.data[0];
            if (selectedVideoMock._id === undefined) {
                throw new Error('Selected video mock id is undefined.');
            }
            const submitCommentRequest = new SubmitCommentRequest_1.default(selectedVideoMock._id.toString(), selectedUserMock.username, 'content submit');
            const response = yield chai_1.default.request(App_1.app).post('/api/v1/comments/submission').send(submitCommentRequest);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            response.body.data.should.have.property('user_id').eq(selectedUserMock._id.toString());
            response.body.data.should.have.property('content').eq(submitCommentRequest.content);
            response.body.data.should.have.property('timestamp');
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/comments/submission?is_aggregated=true', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = videoCommentMapMock.videoMock.data[0];
            const selectedUserMock = videoCommentMapMock.commentMock.userMock.data[0];
            if (selectedVideoMock._id === undefined) {
                throw new Error('Selected video mock id is undefined.');
            }
            const submitCommentRequest = new SubmitCommentRequest_1.default(selectedVideoMock._id.toString(), selectedUserMock.username, 'content submit');
            const response = yield chai_1.default.request(App_1.app).post('/api/v1/comments/submission?is_aggregated=true').send(submitCommentRequest);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            response.body.data.should.have.property('user').a('object').deep.eq(humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock))));
            response.body.data.should.have.property('content').eq(submitCommentRequest.content);
            response.body.data.should.have.property('timestamp');
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/comments', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = new Comment_1.default(videoCommentMapMock.commentMock.userMock.data[0]._id, 'content2', new Date(), new mongoose_1.Types.ObjectId().toString());
            videoCommentMapMock.commentMock.data.push(selectedCommentMock);
            const response = yield chai_1.default.request(App_1.app).post('/api/v1/comments').send(selectedCommentMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.commentMock.data.map((commentMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = videoCommentMapMock.commentMock.data[0];
            selectedCommentMock.userId = videoCommentMapMock.commentMock.userMock.data[1]._id;
            selectedCommentMock.content = 'content0 patched';
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).patch(`/api/v1/comments/${selectedCommentMock._id}`).send(selectedCommentMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.commentMock.data.map((commentMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = videoCommentMapMock.commentMock.data[0];
            videoCommentMapMock.commentMock.data.splice(videoCommentMapMock.commentMock.data.indexOf(selectedCommentMock), 1);
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).delete(`/api/v1/comments/${selectedCommentMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.commentMock.data.map((commentMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(commentMock)));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=CommentControllerRest.spec.js.map