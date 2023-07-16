"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const executorProcess = (0, child_process_1.fork)('./dist/inners/use_cases/workers/ExecutorWorker.js');
exports.default = executorProcess;
//# sourceMappingURL=ExecutorProcess.js.map