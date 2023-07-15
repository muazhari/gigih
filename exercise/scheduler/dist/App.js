"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datastoreOne = void 0;
const express_1 = __importDefault(require("express"));
const Process_1 = __importDefault(require("./inners/models/Process"));
const child_process_1 = require("child_process");
const Message_1 = __importDefault(require("./inners/models/Message"));
const DatastoreOne_1 = __importDefault(require("./outers/persistences/DatastoreOne"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env'
});
const datastoreOne = new DatastoreOne_1.default();
exports.datastoreOne = datastoreOne;
datastoreOne.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json({ type: '*/*' }));
const port = process.env.APP_PORT;
if (port === undefined) {
    throw new Error('Port is undefined.');
}
const executorChildProcess = (0, child_process_1.fork)('./dist/inners/use_cases/workers/ExecutorWorker.js');
// executorChildProcess.send(new Message('fetch', undefined))
executorChildProcess.send(new Message_1.default('start', undefined));
app.post('/', (req, res) => {
    const { id, method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount } = req.body;
    const process = new Process_1.default(id, method, url, query, body, new Date(executeAt), isRepeated, repeatDelay, repeatCount);
    executorChildProcess.send(new Message_1.default('push', process));
    res.send('A new process has tried to be insert to queue.');
});
app.listen(port, () => {
    console.log(`Scheduler app listening on port ${port}`);
});
//# sourceMappingURL=App.js.map