"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Process_1 = __importDefault(require("./inners/models/Process"));
const child_process_1 = require("child_process");
const Message_1 = __importDefault(require("./inners/models/Message"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = 3000;
const executorChildProcess = (0, child_process_1.fork)('./dist/inners/use_cases/workers/ExecutorWorker.js');
// executorChildProcess.send(new Message('fetch', undefined))
executorChildProcess.send(new Message_1.default('start', undefined));
app.post('/', (req, res) => {
    const { id, method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount } = req.body;
    const process = new Process_1.default(id, method, url, query, body, new Date(executeAt), isRepeated, repeatDelay, repeatCount);
    executorChildProcess.send(new Message_1.default('push', process));
    res.send('A new process has inserted to queue');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=App.js.map