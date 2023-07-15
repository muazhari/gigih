"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessExecutor_1 = __importDefault(require("../executor/ProcessExecutor"));
const Process_1 = __importDefault(require("../../models/Process"));
const executorWorker = new ProcessExecutor_1.default();
process.on('message', (message) => {
    const { event, payload } = message;
    let intervalId;
    if (event === 'start') {
        intervalId = setInterval(() => {
            executorWorker
                .execute()
                .then((result) => { console.log('Result executed item: ', result); })
                .catch((error) => { console.log('Result executed error: ', error); });
        }, 1000);
    }
    else if (event === 'stop') {
        clearInterval(intervalId);
    }
    else if (event === 'push') {
        const process = new Process_1.default(payload.id, payload.method, payload.url, payload.query, payload.body, new Date(payload.executeAt), payload.isRepeated, payload.repeatDelay, payload.repeatCount);
        executorWorker.push(process);
        console.log('Pushed: ', process);
    }
});
//# sourceMappingURL=ExecutorWorker.js.map