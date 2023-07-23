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
const OneDatastore_1 = __importDefault(require("../../../src/outers/datastores/OneDatastore"));
const App_1 = __importDefault(require("../../../src/App"));
const VideoMock_1 = __importDefault(require("../../mocks/VideoMock"));
const VideoSchema_1 = __importDefault(require("../../../src/outers/schemas/VideoSchema"));
const mongoose_1 = require("mongoose");
const Video_1 = __importDefault(require("../../../src/inners/models/entities/Video"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
// create integration test for video controller
(0, mocha_1.describe)('VideoController', () => {
    const videoMock = new VideoMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield VideoSchema_1.default.deleteMany({});
        yield VideoSchema_1.default.insertMany(videoMock.data);
    }));
    (0, mocha_1.describe)('GET /api/v1/videos', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.default).get('/api/v1/videos');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array').length(videoMock.data.length);
            response.body.data.forEach((video) => {
                videoMock.data.map((videoMock) => {
                    return JSON.parse(JSON.stringify(videoMock));
                }).should.deep.include(video);
            });
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/videos/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = videoMock.data[0];
            if (selectedVideoMock._id === undefined) {
                throw new Error('Selected video mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).get(`/api/v1/videos/${selectedVideoMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoMock.data.map((videoMock) => {
                return JSON.parse(JSON.stringify(videoMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/videos', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = new Video_1.default('thumbnailUrl2', 'contentUrl2', new mongoose_1.Types.ObjectId().toString());
            videoMock.data.push(selectedVideoMock);
            const response = yield chai_1.default.request(App_1.default).post('/api/v1/videos').send(selectedVideoMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoMock.data.map((videoMock) => {
                return JSON.parse(JSON.stringify(videoMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/videos/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = videoMock.data[0];
            selectedVideoMock.thumbnailUrl = 'thumbnailUrl0 patched';
            selectedVideoMock.contentUrl = 'contentUrl0 patched';
            if (selectedVideoMock._id === undefined) {
                throw new Error('Selected video mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).patch(`/api/v1/videos/${selectedVideoMock._id}`).send(selectedVideoMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoMock.data.map((videoMock) => {
                return JSON.parse(JSON.stringify(videoMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/videos/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoMock = videoMock.data[0];
            videoMock.data.splice(videoMock.data.indexOf(selectedVideoMock), 1);
            if (selectedVideoMock._id === undefined) {
                throw new Error('Selected video mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).delete(`/api/v1/videos/${selectedVideoMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoMock.data.map((videoMock) => {
                return JSON.parse(JSON.stringify(videoMock));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=VideoControllerRest.spec.js.map
