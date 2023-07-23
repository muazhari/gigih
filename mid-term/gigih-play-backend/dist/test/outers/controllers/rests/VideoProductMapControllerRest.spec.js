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
const VideoProductMapMock_1 = __importDefault(require("../../../mocks/VideoProductMapMock"));
const VideoProductMapSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoProductMapSchema"));
const mongoose_1 = require("mongoose");
const VideoProductMap_1 = __importDefault(require("../../../../src/inners/models/entities/VideoProductMap"));
const VideoSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoSchema"));
const ProductSchema_1 = __importDefault(require("../../../../src/outers/schemas/ProductSchema"));
const humps_1 = __importDefault(require("humps"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('VideoProductMapControllerRest', () => {
    const videoProductMapMock = new VideoProductMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield VideoSchema_1.default.insertMany(videoProductMapMock.videoMock.data);
        yield ProductSchema_1.default.insertMany(videoProductMapMock.productMock.data);
        yield VideoProductMapSchema_1.default.insertMany(videoProductMapMock.data);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield VideoProductMapSchema_1.default.deleteMany({
            _id: {
                $in: videoProductMapMock.data.map((videoProductMapMock) => videoProductMapMock._id)
            }
        });
        yield VideoSchema_1.default.deleteMany({
            _id: {
                $in: videoProductMapMock.videoMock.data.map((videoMock) => videoMock._id)
            }
        });
        yield ProductSchema_1.default.deleteMany({
            _id: {
                $in: videoProductMapMock.productMock.data.map((productMock) => productMock._id)
            }
        });
        yield oneDatastore.disconnect();
    }));
    (0, mocha_1.describe)('GET /api/v1/video-product-maps', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/video-product-maps');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoProductMapMock.data.map((videoProductMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-product-maps/aggregated', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.app).get('/api/v1/video-product-maps/aggregated');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoProductMapMock.aggregatedData.map((videoProductMapMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMockAggregated)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-product-maps/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            if (selectedVideoProductMapMock._id === undefined) {
                throw new Error('Selected videoProductMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/video-product-maps/:id/aggregated', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            if (selectedVideoProductMapMock._id === undefined) {
                throw new Error('Selected videoProductMap mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.app).get(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}/aggregated`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.aggregatedData.map((videoProductMapMockAggregated) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMockAggregated)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/video-product-maps', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = new VideoProductMap_1.default(videoProductMapMock.videoMock.data[0]._id, videoProductMapMock.productMock.data[0]._id, new mongoose_1.Types.ObjectId().toString());
            videoProductMapMock.data.push(selectedVideoProductMapMock);
            const response = yield chai_1.default.request(App_1.app).post('/api/v1/video-product-maps').send(selectedVideoProductMapMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)));
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
            const response = yield chai_1.default.request(App_1.app).patch(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`).send(selectedVideoProductMapMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)));
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
            const response = yield chai_1.default.request(App_1.app).delete(`/api/v1/video-product-maps/${selectedVideoProductMapMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.data.map((videoProductMapMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(videoProductMapMock)));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=VideoProductMapControllerRest.spec.js.map