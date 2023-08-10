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
const humps_1 = __importDefault(require("humps"));
const crypto_1 = require("crypto");
const LoginByUsernameAndPasswordRequest_1 = __importDefault(require("../../../../src/inners/models/value_objects/requests/authentications/LoginByUsernameAndPasswordRequest"));
const RegisterByUsernameAndPasswordRequest_1 = __importDefault(require("../../../../src/inners/models/value_objects/requests/authentications/RegisterByUsernameAndPasswordRequest"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
(0, mocha_1.describe)('AuthenticationControllerRest', () => {
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
    (0, mocha_1.describe)('POST /api/v1/authentications/logins?method=username_and_password', () => {
        (0, mocha_1.it)('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            if (selectedUserMock.username === undefined) {
                throw new Error('Selected user mock username is undefined.');
            }
            if (selectedUserMock.password === undefined) {
                throw new Error('Selected user mock password is undefined.');
            }
            const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest_1.default(selectedUserMock.username, selectedUserMock.password);
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(200);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            response.body.data.should.deep.equal(humps_1.default.decamelizeKeys(JSON.parse(JSON.stringify(selectedUserMock))));
        }));
        (0, mocha_1.it)('should return 404 NOT FOUND: Unknown username', () => __awaiter(void 0, void 0, void 0, function* () {
            const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest_1.default(`username${(0, crypto_1.randomUUID)()}`, 'password login');
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest);
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(404);
            response.body.should.have.property('message');
            response.body.should.have.property('data').eq(null);
        }));
        (0, mocha_1.it)('should return 404 NOT FOUND: Unknown username or password', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            if (selectedUserMock.username === undefined) {
                throw new Error('Selected user mock username is undefined.');
            }
            const loginByUsernameAndPasswordRequest = new LoginByUsernameAndPasswordRequest_1.default(selectedUserMock.username, `password${(0, crypto_1.randomUUID)()}`);
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/authentications/logins?method=username_and_password').send(loginByUsernameAndPasswordRequest);
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(404);
            response.body.should.have.property('message');
            response.body.should.have.property('data').eq(null);
        }));
    });
    (0, mocha_1.describe)('POST /api/v1/authentications/registers?method=username_and_password', () => {
        (0, mocha_1.it)('should return 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
            const registerByUsernameAndPasswordRequest = new RegisterByUsernameAndPasswordRequest_1.default(`username${(0, crypto_1.randomUUID)()}`, 'password register');
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/authentications/registers?method=username_and_password').send(registerByUsernameAndPasswordRequest);
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(201);
            response.body.should.have.property('message');
            response.body.should.have.property('data').a('object');
            response.body.data.should.have.property('_id');
            response.body.data.should.have.property('username').eq(registerByUsernameAndPasswordRequest.username);
            response.body.data.should.have.property('password').eq(registerByUsernameAndPasswordRequest.password);
            response.body.data.should.have.property('picture_url');
        }));
        (0, mocha_1.it)('should return 409 CONFLICT: Username already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const selectedUserMock = userMock.data[0];
            if (selectedUserMock.username === undefined) {
                throw new Error('Selected user mock username is undefined.');
            }
            const registerByUsernameAndPasswordRequest = new RegisterByUsernameAndPasswordRequest_1.default(selectedUserMock.username, 'password register');
            const response = yield chai_1.default.request(App_1.server).post('/api/v1/authentications/registers?method=username_and_password').send(registerByUsernameAndPasswordRequest);
            response.should.have.status(409);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eq(409);
            response.body.should.have.property('message');
            response.body.should.have.property('data').eq(null);
        }));
    });
});
//# sourceMappingURL=AuthenticationControllerRest.spec.js.map