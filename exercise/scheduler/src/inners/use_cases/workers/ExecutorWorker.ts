import type ProcessExecutor from '../executor/ProcessExecutor'
import { type ChildProcess } from 'child_process'
import type Message from '../../models/Message'

export default class ExecutorWorker {
  processExecutor: ProcessExecutor
  executorProcess: ChildProcess

  intervalId: NodeJS.Timeout | undefined

  constructor (processExecutor: ProcessExecutor, executorProcess: ChildProcess) {
    this.processExecutor = processExecutor
    this.executorProcess = executorProcess
  }

  registerListeners = (): void => {
    this.executorProcess.on('message', ({ event, payload }: Message<any>): void => {
      console.log('Executor worker received message: ', event, payload)

      if (event === 'start') {
        this.intervalId = setInterval(() => {
          this.processExecutor
            .execute()
            .then((result: any) => { console.log('Executor worker execute succeed') })
            .catch((error: any) => { console.log('Executor worker execute failed: ', error) })
        }, 1000)
      } else if (event === 'stop') {
        if (this.intervalId === undefined) {
          throw new Error('Interval id is undefined.')
        }
        clearInterval(this.intervalId)
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
    })
  }
}
