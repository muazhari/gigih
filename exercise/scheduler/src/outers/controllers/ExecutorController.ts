import { type Request, type Response, type Router } from 'express'

import Process from '../../inners/models/Process'
import type ExecutorWorker from '../../inners/use_cases/workers/ExecutorWorker'
import Message from '../../inners/models/Message'

export default class ExecutorController {
  router: Router

  executorWorker: ExecutorWorker
  constructor (router: Router, executorWorker: ExecutorWorker) {
    this.router = router
    this.executorWorker = executorWorker
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
