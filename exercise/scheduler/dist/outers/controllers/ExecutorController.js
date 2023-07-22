"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = __importDefault(require("../../inners/models/Process"));
const Message_1 = __importDefault(require("../../inners/models/Message"));
class ExecutorController {
    constructor(router, executorWorker) {
        this.registerRoutes = () => {
            this.router.post('/', this.execute);
        };
        this.execute = (req, res) => {
            const { id, method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount } = req.body;
            const process = new Process_1.default(id, method, url, query, body, new Date(executeAt), isRepeated, repeatDelay, repeatCount);
            this.executorWorker.executorProcess.send(new Message_1.default('push', process));
            res.send('A new process has tried to be insert to queue.');
        };
        this.router = router;
        this.executorWorker = executorWorker;
    }
}
exports.default = ExecutorController;
//# sourceMappingURL=ProductController.js.map
