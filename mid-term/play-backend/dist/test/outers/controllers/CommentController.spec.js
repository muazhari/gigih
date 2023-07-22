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
const CommentMock_1 = __importDefault(require("../../mocks/CommentMock"));
const CommentSchema_1 = __importDefault(require("../../../src/outers/schemas/CommentSchema"));
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("../../../src/inners/models/entities/Comment"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
// create integration test for comment controller
(0, mocha_1.describe)('CommentController', () => {
    const commentMock = new CommentMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield CommentSchema_1.default.deleteMany({});
        yield CommentSchema_1.default.insertMany(commentMock.data);
    }));
    (0, mocha_1.describe)('GET /api/v1/comments', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.default).get('/api/v1/comments');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array').length(commentMock.data.length);
            response.body.data.forEach((comment) => {
                commentMock.data.map((commentMock) => {
                    return JSON.parse(JSON.stringify(commentMock));
                }).should.deep.include(comment);
            });
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = commentMock.data[0];
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).get(`/api/v1/comments/${selectedCommentMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            commentMock.data.map((commentMock) => {
                return JSON.parse(JSON.stringify(commentMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/comments', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = new Comment_1.default(commentMock.userMock.data[0]._id, 'content2', new Date(), new mongoose_1.Types.ObjectId().toString());
            commentMock.data.push(selectedCommentMock);
            const response = yield chai_1.default.request(App_1.default).post('/api/v1/comments').send(selectedCommentMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            commentMock.data.map((commentMock) => {
                return JSON.parse(JSON.stringify(commentMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = commentMock.data[0];
            selectedCommentMock.userId = commentMock.userMock.data[1]._id;
            selectedCommentMock.content = 'content0 patched';
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).patch(`/api/v1/comments/${selectedCommentMock._id}`).send(selectedCommentMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            commentMock.data.map((commentMock) => {
                return JSON.parse(JSON.stringify(commentMock));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/comments/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCommentMock = commentMock.data[0];
            commentMock.data.splice(commentMock.data.indexOf(selectedCommentMock), 1);
            if (selectedCommentMock._id === undefined) {
                throw new Error('Selected comment mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.default).delete(`/api/v1/comments/${selectedCommentMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            commentMock.data.map((commentMock) => {
                return JSON.parse(JSON.stringify(commentMock));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=CommentController.spec.js.map