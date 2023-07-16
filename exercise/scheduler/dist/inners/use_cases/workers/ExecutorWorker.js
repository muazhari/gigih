"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExecutorWorker {
    constructor(executorProcess, processExecutor) {
        this.registerListeners = () => {
            this.executorProcess.on('message', this.handleMessage);
        };
        this.handleMessage = (message) => {
            const { event, payload } = message;
            let intervalId;
            if (event === 'start') {
                intervalId = setInterval(() => {
                    this.processExecutor
                        .execute()
                        .then((result) => { console.log('Executor worker execute succeed'); })
                        .catch((error) => { console.log('Executor worker execute failed: ', error); });
                }, 1000);
            }
            else if (event === 'stop') {
                clearInterval(intervalId);
            }
            else if (event === 'push') {
                this.processExecutor
                    .push(payload)
                    .then((result) => {
                    console.log('Result pushed item: ', result);
                })
                    .catch((error) => {
                    console.log('Result pushed error: ', error);
                });
            }
        };
        this.executorProcess = executorProcess;
        this.processExecutor = processExecutor;
        this.registerListeners();
    }
}
exports.default = ExecutorWorker;
//# sourceMappingURL=ExecutorWorker.js.map