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
const UserMock_1 = __importDefault(require("../../../mocks/UserMock"));
const UserSchema_1 = __importDefault(require("../../../../src/outers/schemas/UserSchema"));
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../../../../src/inners/models/entities/User"));
const humps_1 = __importDefault(require("humps"));
const crypto_1 = require("crypto");
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('UserControllerRest', () => {
    const userMock = new UserMock_1.default();
    const oneDatastore = new OneDatastore_1.default();
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield oneDatastore.connect();
        yield UserSchema_1.default.insertMany(userMock.data);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield UserSchema_1.default.deleteMany({
            _id: {
                $in: userMock.data.map((userMock) => userMock._id)
            }
        });
        yield oneDatastore.disconnect();
    }));
    (0, mocha_1.describe)('GET /api/v1/users', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(App_1.server).get('/api/v1/users');
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include.members(userMock.data.map((userMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(userMock)));
            }));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/users?search=encoded', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            const encodedSearch = encodeURIComponent(JSON.stringify({
                _id: selectedUserMock._id
            }));
            const response = yield chai_1.default.request(App_1.server).get(`/api/v1/users?search=${encodedSearch}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('array');
            response.body.data.should.deep.include(humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock))));
        }));
    });
    (0, mocha_1.describe)('GET /api/v1/users/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).get(`/api/v1/users/${selectedUserMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            userMock.data.map((userMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(userMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/users', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = new User_1.default(`username${(0, crypto_1.randomUUID)()}`, 'password2', 'pictureUrl2', new mongoose_1.Types.ObjectId().toString());
            userMock.data.push(selectedUserMock);
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/users').send(selectedUserMock);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            userMock.data.map((userMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(userMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('PATCH /api/v1/users/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            selectedUserMock.username = `username${(0, crypto_1.randomUUID)()} patched`;
            selectedUserMock.password = 'password0 patched';
            selectedUserMock.pictureUrl = 'pictureUrl0 patched';
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).patch(`/api/v1/users/${selectedUserMock._id}`).send(selectedUserMock);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            userMock.data.map((userMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(userMock)));
            }).should.deep.include(response.body.data);
        }));
    });
    (0, mocha_1.describe)('DELETE /api/v1/users/:id', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            userMock.data.splice(userMock.data.indexOf(selectedUserMock), 1);
            if (selectedUserMock._id === undefined) {
                throw new Error('Selected user mock id is undefined.');
            }
            const response = yield chai_1.default.request(App_1.server).delete(`/api/v1/users/${selectedUserMock._id}`);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            userMock.data.map((userMock) => {
                return humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(userMock)));
            }).should.not.deep.include(response.body.data);
        }));
    });
});
//# sourceMappingURL=UserControllerRest.spec.js.map