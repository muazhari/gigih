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
const ProductMock_1 = __importDefault(require("../../mocks/ProductMock"));
const ProductSchema_1 = __importDefault(require("../../../src/outers/schemas/ProductSchema"));
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("../../../src/inners/models/entities/Product"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
// create integration test for product controller
(0, mocha_1.describe)('ProductController', () => {
    const productMock = new ProductMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield ProductSchema_1.default.deleteMany({});
        yield ProductSchema_1.default.insertMany(productMock.data);
    }));
    (0, mocha_1.describe)('GET /api/v1/products', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.default).get('/api/v1/products');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array').length(productMock.data.length);
            response.body.data.forEach((product) => {
                productMock.data.map((productMock) => {
                    return JSON.parse(JSON.stringify(productMock));
                }).should.deep.include(product);
            });
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = productMock.data[0];
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).get(`/api/v1/products/${selectedProductMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            productMock.data.map((productMock) => {
                return JSON.parse(JSON.stringify(productMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/products', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = new Product_1.default('title2', 2, 'linkUrl2', new mongoose_1.Types.ObjectId().toString());
            productMock.data.push(selectedProductMock);
            const response = yield chai_1.default.request(App_1.default).post('/api/v1/products').send(selectedProductMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            productMock.data.map((productMock) => {
                return JSON.parse(JSON.stringify(productMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = productMock.data[0];
            selectedProductMock.title = 'title0 patched';
            selectedProductMock.price = 1;
            selectedProductMock.linkUrl = 'linkUrl0 patched';
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).patch(`/api/v1/products/${selectedProductMock._id}`).send(selectedProductMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            productMock.data.map((productMock) => {
                return JSON.parse(JSON.stringify(productMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/products/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedProductMock = productMock.data[0];
            productMock.data.splice(productMock.data.indexOf(selectedProductMock), 1);
            if (selectedProductMock._id === undefined) {
                throw new Error('Selected product mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).delete(`/api/v1/products/${selectedProductMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            productMock.data.map((productMock) => {
                return JSON.parse(JSON.stringify(productMock));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=ProductController.spec.js.map