import { type Request, type Response, type Router } from 'express'

import Process from '../../inners/models/Process'
import Message from '../../inners/models/Message'
import { type ChildProcess } from 'child_process'
import type ExecutorWorker from '../../inners/use_cases/workers/ExecutorWorker'

export default class ExecutorController {
  router: Router

  executorWorker: ExecutorWorker
  constructor (router: Router, executorProcess: ExecutorWorker) {
    this.router = router
    this.executorWorker = executorProcess
  }

  registerRoutes = (): void => {
    this.router.post('/', this.execute)
  }

  execute = (req: Request, res: Response): void => {
    const { id, method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount } = req.body

    const process: Process = new Process(
      id,
      method,
      url,
      query,
      body,
      new Date(executeAt),
      isRepeated,
      repeatDelay,
      repeatCount
    )

    this.executorWorker.executorProcess.send(new Message('push', process))
    res.send('A new process has tried to be insert to queue.')
  }
}
