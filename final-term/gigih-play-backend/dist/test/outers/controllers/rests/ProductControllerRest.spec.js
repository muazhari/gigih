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
const ProductSchema_1 = __importDefault(require("../../../../src/outers/schemas/ProductSchema"));
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("../../../../src/inners/models/entities/Product"));
const VideoProductMapMock_1 = __importDefault(require("../../../mocks/VideoProductMapMock"));
const VideoSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoSchema"));
const VideoProductMapSchema_1 = __importDefault(require("../../../../src/outers/schemas/VideoProductMapSchema"));
const humps_1 = __importDefault(require("humps"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('ProductControllerRest', () => {
    const videoProductMapMock = new VideoProductMapMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield VideoSchema_1.default.insertMany(videoProductMapMock.videoMock.data);
        yield ProductSchema_1.default.insertMany(videoProductMapMock.productMock.data);
        yield VideoProductMapSchema_1.default.insertMany(videoProductMapMock.data);
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
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
        yield VideoProductMapSchema_1.default.deleteMany({
            _id: {
                $in: videoProductMapMock.data.map((videoProductMapMock) => videoProductMapMock._id)
            }
        });
        yield oneDatastore.disconnect();
    }));
    (0, mocha_1.describe)('GET /api/v1/products', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.server).get('/api/v1/products');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/products?search=encoded', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = videoProductMapMock.productMock.data[0];
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const encodedSearch = encodeURIComponent(JSON.stringify({
                _id: selectedProductMock._id
            }));
            const response = yield chai_1.default.request(App_1.server).get(`/api/v1/products?search=${encodedSearch}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include(humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(selectedProductMock))));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/products/videos/:videoId', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedVideoProductMapMock = videoProductMapMock.data[0];
            if (selectedVideoProductMapMock.videoId === undefined) {
                throw new Error('Selected video product map mock videoId is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).get(`/api/v1/products/videos/${selectedVideoProductMapMock.videoId}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }).should.deep.include.members(response.body.data);
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = videoProductMapMock.productMock.data[0];
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).get(`/api/v1/products/${selectedProductMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/products', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = new Product_1.default('title2', 2, 'linkUrl2', new mongoose_1.Types.ObjectId().toString());
            videoProductMapMock.productMock.data.push(selectedProductMock);
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/products').send(selectedProductMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = videoProductMapMock.productMock.data[0];
            selectedProductMock.title = 'title0 patched';
            selectedProductMock.price = 1;
            selectedProductMock.linkUrl = 'linkUrl0 patched';
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).patch(`/api/v1/products/${selectedProductMock._id}`).send(selectedProductMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = videoProductMapMock.productMock.data[0];
            videoProductMapMock.productMock.data.splice(videoProductMapMock.productMock.data.indexOf(selectedProductMock), 1);
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).delete(`/api/v1/products/${selectedProductMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            videoProductMapMock.productMock.data.map((productMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(productMock)));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=ProductControllerRest.spec.js.map