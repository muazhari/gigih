"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExecutorController_1 = __importDefault(require("../controllers/ExecutorController"));
const ExecutorProcess_1 = __importDefault(require("../../inners/use_cases/process/ExecutorProcess"));
const ExecutorWorker_1 = __importDefault(require("../../inners/use_cases/workers/ExecutorWorker"));
const ProcessExecutor_1 = __importDefault(require("../../inners/use_cases/executor/ProcessExecutor"));
const DatastoreOne_1 = __importDefault(require("../persistences/DatastoreOne"));
const ProcessRepository_1 = __importDefault(require("../repositories/ProcessRepository"));
const Message_1 = __importDefault(require("../../inners/models/Message"));
class RootRoute {
    constructor(app) {
        this.getExecutorRouter = () => {
            // datastores
            const datastoreOne = new DatastoreOne_1.default();
            datastoreOne.connect()
                .then(() => {
                console.log('Connected to datastore one.');
                // executorChildProcess.send(new Message('fetch', undefined))
                ExecutorProcess_1.default.send(new Message_1.default('start', undefined));
            })
                .catch((error) => {
                console.log('Error connecting to datastore one: ', error);
            });
            // repositories
            const processRepository = new ProcessRepository_1.default(datastoreOne);
            // use cases
            const processExecutor = new ProcessExecutor_1.default(processRepository);
            const executorWorker = new ExecutorWorker_1.default(ExecutorProcess_1.default, processExecutor);
            // controllers
            const router = (0, express_1.Router)();
            const executorController = new ExecutorController_1.default(router, executorWorker);
            executorController.registerRoutes();
            return router;
        };
        this.app = app;
    }
    registerRoutes() {
        const router = (0, express_1.Router)();
        router.use('/executors', this.getExecutorRouter());
        this.app.use('/api/v1/', router);
    }
}
exports.default = RootRoute;
//# sourceMappingURL=RootRoute.js.map