import type Message from '../../models/Message'
import type ProcessExecutor from '../executor/ProcessExecutor'
import { type ChildProcess } from 'child_process'

export default class ExecutorWorker {
  executorProcess: ChildProcess
  processExecutor: ProcessExecutor

  constructor (executorProcess: ChildProcess, processExecutor: ProcessExecutor) {
    this.executorProcess = executorProcess
    this.processExecutor = processExecutor
    this.registerListeners()
  }

  registerListeners = (): void => {
    this.executorProcess.on('message', this.handleMessage)
  }

  handleMessage = (message: Message<any>): void => {
    const { event, payload } = message
    let intervalId: NodeJS.Timer | undefined

    if (event === 'start') {
      intervalId = setInterval(() => {
        this.processExecutor
          .execute()
          .then((result: any) => { console.log('Executor worker execute succeed') })
          .catch((error: any) => { console.log('Executor worker execute failed: ', error) })
      }, 1000)
    } else if (event === 'stop') {
      clearInterval(intervalId)
    } else if (event === 'push') {
      this.processExecutor
        .push(payload)
        .then((result) => {
          console.log('Result pushed item: ', result)
        })
        .catch((error) => {
          console.log('Result pushed error: ', error)
        })
    }
  }
}
