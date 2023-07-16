"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExecutorWorker {
    constructor(processExecutor, executorProcess) {
        this.registerListeners = () => {
            this.executorProcess.on('message', ({ event, payload }) => {
                console.log('Executor worker received message: ', event, payload);
                if (event === 'start') {
                    this.intervalId = setInterval(() => {
                        this.processExecutor
                            .execute()
                            .then((result) => { console.log('Executor worker execute succeed'); })
                            .catch((error) => { console.log('Executor worker execute failed: ', error); });
                    }, 1000);
                }
                else if (event === 'stop') {
                    if (this.intervalId === undefined) {
                        throw new Error('Interval id is undefined.');
                    }
                    clearInterval(this.intervalId);
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
            });
        };
        this.processExecutor = processExecutor;
        this.executorProcess = executorProcess;
    }
}
exports.default = ExecutorWorker;
//# sourceMappingURL=ExecutorWorker.js.map