import { type ChildProcess, fork } from 'child_process'

const executorProcess: ChildProcess = fork('./dist/inners/use_cases/workers/ExecutorWorker.js')

export default executorProcess
