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
const VideoProductMapMock_1 = __importDefault(require("../../mocks/VideoProductMapMock"));
const VideoProductMapSchema_1 = __importDefault(require("../../../src/outers/schemas/VideoProductMapSchema"));
const mongoose_1 = require("mongoose");
const VideoProductMap_1 = __importDefault(require("../../../src/inners/models/entities/VideoProductMap"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
// create integration test for videoProductMap controller
(0, mocha_1.describe)('VideoProductMapController', () => {
    const videoProductMapMock = new VideoProductMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield VideoProductMapSchema_1.default.deleteMany({});
        yield VideoProductMapSchema_1.default.insertMany(videoProductMapMock.data);
    }));
    (0, mocha_1.describe)('GET /api/v1/video-product-maps', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.default).get('/api/v1/video-product-maps');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array').length(videoProductMapMock.data.length);
            response.body.data.forEach((videoProductMap) => {
                videoProductMapMock.data.map((videoProductMapMock) => {
                    return JSON.parse(JSON.stringify(videoProductMapMock));
                }).should.deep.include(videoProductMap);
            });
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-product-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            if (selectedVideoProductMapMock._id === undefined) {
                throw new Error('Selected videoProductMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).get(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return JSON.parse(JSON.stringify(videoProductMapMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/video-product-maps', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = new VideoProductMap_1.default(videoProductMapMock.videoMock.data[0]._id, videoProductMapMock.productMock.data[0]._id, new mongoose_1.Types.ObjectId().toString());
            videoProductMapMock.data.push(selectedVideoProductMapMock);
            const response = yield chai_1.default.request(App_1.default).post('/api/v1/video-product-maps').send(selectedVideoProductMapMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return JSON.parse(JSON.stringify(videoProductMapMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/video-product-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            selectedVideoProductMapMock.videoId = videoProductMapMock.videoMock.data[1]._id;
            selectedVideoProductMapMock.productId = videoProductMapMock.productMock.data[1]._id;
            if (selectedVideoProductMapMock._id === undefined) {
                throw new Error('Selected videoProductMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).patch(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`).send(selectedVideoProductMapMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return JSON.parse(JSON.stringify(videoProductMapMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/video-product-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            videoProductMapMock.data.splice(videoProductMapMock.data.indexOf(selectedVideoProductMapMock), 1);
            if (selectedVideoProductMapMock._id === undefined) {
                throw new Error('Selected videoProductMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).delete(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return JSON.parse(JSON.stringify(videoProductMapMock));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=VideoProductMapController.spec.js.map