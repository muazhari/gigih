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
const VideoCommentMapMock_1 = __importDefault(require("../../../mocks/VideoCommentMapMock"));
const VideoCommentMapSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoCommentMapSchema"));
const mongoose_1 = require("mongoose");
const VideoCommentMap_1 = __importDefault(require("../../../../src/inners/models/entities/VideoCommentMap"));
const VideoSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoSchema"));
const CommentSchema_1 = __importDefault(require("../../../../src/outers/schemas/CommentSchema"));
const humps_1 = __importDefault(require("humps"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('VideoCommentMapControllerRest', () => {
    const videoCommentMapMock = new VideoCommentMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield VideoSchema_1.default.insertMany(videoCommentMapMock.videoMock.data);
        yield CommentSchema_1.default.insertMany(videoCommentMapMock.commentMock.data);
        yield VideoCommentMapSchema_1.default.insertMany(videoCommentMapMock.data);
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, mocha_1.describe)('GET /api/v1/video-comment-maps', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/video-comment-maps');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoCommentMapMock.data.map((videoCommentMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMock)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-comment-maps/aggregated', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/video-comment-maps/aggregated');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoCommentMapMock.aggregatedData.map((videoCommentMapMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMockAggregated)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-comment-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = videoCommentMapMock.data[0];
            if (selectedVideoCommentMapMock._id === undefined) {
                throw new Error('Selected videoCommentMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.data.map((videoCommentMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-comment-maps/:id/aggregated', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMockAggregated = videoCommentMapMock.aggregatedData[0];
            if (selectedVideoCommentMapMockAggregated._id === undefined) {
                throw new Error('Selected videoCommentMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/video-comment-maps/${selectedVideoCommentMapMockAggregated._id}/aggregated`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.aggregatedData.map((videoCommentMapMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMockAggregated)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/video-comment-maps', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = new VideoCommentMap_1.default(videoCommentMapMock.videoMock.data[0]._id, videoCommentMapMock.commentMock.data[0]._id, new mongoose_1.Types.ObjectId().toString());
            videoCommentMapMock.data.push(selectedVideoCommentMapMock);
            const response = yield chai_1.default.request(App_1.app).post('/api/v1/video-comment-maps').send(selectedVideoCommentMapMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.data.map((videoCommentMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/video-comment-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = videoCommentMapMock.data[0];
            selectedVideoCommentMapMock.videoId = videoCommentMapMock.videoMock.data[1]._id;
            selectedVideoCommentMapMock.commentId = videoCommentMapMock.commentMock.data[1]._id;
            if (selectedVideoCommentMapMock._id === undefined) {
                throw new Error('Selected videoCommentMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).patch(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`).send(selectedVideoCommentMapMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.data.map((videoCommentMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/video-comment-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoCommentMapMock = videoCommentMapMock.data[0];
            videoCommentMapMock.data.splice(videoCommentMapMock.data.indexOf(selectedVideoCommentMapMock), 1);
            if (selectedVideoCommentMapMock._id === undefined) {
                throw new Error('Selected videoCommentMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).delete(`/api/v1/video-comment-maps/${selectedVideoCommentMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoCommentMapMock.data.map((videoCommentMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoCommentMapMock)));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=VideoCommentMapControllerRest.spec.js.map