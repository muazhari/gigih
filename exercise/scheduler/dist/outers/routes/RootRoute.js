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
const express_1 = require("express");
const ExecutorController_1 = __importDefault(require("../controllers/ExecutorController"));
const ExecutorWorker_1 = __importDefault(require("../../inners/use_cases/workers/ExecutorWorker"));
const ProcessExecutor_1 = __importDefault(require("../../inners/use_cases/executor/ProcessExecutor"));
const DatastoreOne_1 = __importDefault(require("../datastores/DatastoreOne"));
const ProcessRepository_1 = __importDefault(require("../repositories/ProcessRepository"));
const child_process_1 = require("child_process");
const Message_1 = __importDefault(require("../../inners/models/Message"));
class RootRoute {
    constructor(app) {
        this.registerRoutes = () => __awaiter(this, void 0, void 0, function* () {
            // datastores
            const datastoreOne = new DatastoreOne_1.default();
            try {
                yield datastoreOne.connect();
                console.log('Datastore one connected.');
            }
            catch (error) {
                console.log('Error connecting to datastore one: ', error);
            }
            // repositories
            const processRepository = new ProcessRepository_1.default(datastoreOne);
            // process
            const executorProcess = (0, child_process_1.fork)('./dist/inners/use_cases/tasks/ExecutorTask.js');
            // use cases
            const processExecutor = new ProcessExecutor_1.default(processRepository);
            const executorWorker = new ExecutorWorker_1.default(processExecutor, executorProcess);
            executorWorker.registerListeners();
            executorWorker.executorProcess.send(new Message_1.default('start', undefined));
            const executorController = new ExecutorController_1.default((0, express_1.Router)(), executorWorker);
            executorController.registerRoutes();
            const router = (0, express_1.Router)();
            router.use('/executors', executorController.router);
            this.app.use('/api/v1/', router);
        });
        this.app = app;
    }
}
exports.default = RootRoute;
//# sourceMappingURL=RootRoute.js.map