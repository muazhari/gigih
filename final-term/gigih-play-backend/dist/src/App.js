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
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("./outers/configurations/DotenvConfiguration");
const OneDatastore_1 = __importDefault(require("./outers/datastores/OneDatastore"));
const RootRoute_1 = __importDefault(require("./outers/routes/RootRoute"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const CaseExpressMiddleware_1 = __importDefault(require("./outers/middlewares/CaseExpressMiddleware"));
const cors_1 = __importDefault(require("cors"));
const OneMigration_1 = __importDefault(require("./outers/migrations/OneMigration"));
let app;
let io;
let server;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.app = app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ type: '*/*' }));
    app.use((0, CaseExpressMiddleware_1.default)());
    const appHttp = http_1.default.createServer(app);
    exports.io = io = new socket_io_1.default.Server(appHttp, {
        cors: {
            origin: '*'
        }
    });
    const oneDatastore = new OneDatastore_1.default();
    try {
        yield oneDatastore.connect();
        console.log('One datastore connected.');
    }
    catch (error) {
        console.log('Error connecting to one datastore: ', error);
    }
    if (process.env.NODE_ENV !== 'test') {
        const oneMigration = new OneMigration_1.default(oneDatastore);
        yield oneMigration.down();
        yield oneMigration.up();
    }
    const rootRoute = new RootRoute_1.default(app, io, oneDatastore);
    yield rootRoute.registerRoutes();
    yield rootRoute.registerSockets();
    const port = process.env.NODE_ENV === 'test' ? 0 : Number(process.env.APP_PORT);
    if (port === undefined) {
        throw new Error('Port is undefined.');
    }
    exports.server = server = yield new Promise((resolve, reject) => {
        const server = appHttp.listen(port, () => {
            resolve(server);
        });
    });
    const addressInfo = server === null || server === void 0 ? void 0 : server.address();
    console.log(`App listening on port ${addressInfo.port}.`);
});
main()
    .then(() => {
    console.log('App started.');
})
    .catch((error) => {
    console.log('Error starting app: ', error);
});
//# sourceMappingURL=App.js.map