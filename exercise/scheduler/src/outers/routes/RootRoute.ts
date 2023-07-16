import express, { type Application, Router } from 'express'
import ExecutorController from '../controllers/ExecutorController'
import executorProcess from '../../inners/use_cases/process/ExecutorProcess'
import ExecutorWorker from '../../inners/use_cases/workers/ExecutorWorker'
import ProcessExecutor from '../../inners/use_cases/executor/ProcessExecutor'
import DatastoreOne from '../persistences/DatastoreOne'
import ProcessRepository from '../repositories/ProcessRepository'
import Message from '../../inners/models/Message'

export default class RootRoute {
  app: Application

  constructor (app: Application) {
    this.app = app
  }

  getExecutorRouter = (): Router => {
    // datastores
    const datastoreOne: DatastoreOne = new DatastoreOne()
    datastoreOne.connect()
      .then(() => {
        console.log('Connected to datastore one.')

        // executorChildProcess.send(new Message('fetch', undefined))
        executorProcess.send(new Message('start', undefined))
      })
      .catch((error) => {
        console.log('Error connecting to datastore one: ', error)
      })

    // repositories
    const processRepository: ProcessRepository = new ProcessRepository(datastoreOne)

    // use cases
    const processExecutor: ProcessExecutor = new ProcessExecutor(processRepository)
    const executorWorker: ExecutorWorker = new ExecutorWorker(executorProcess, processExecutor)

    // controllers
    const router = Router()
    const executorController: ExecutorController = new ExecutorController(router, executorWorker)
    executorController.registerRoutes()

    return router
  }

  registerRoutes (): void {
    const router = Router()
    router.use('/executors', this.getExecutorRouter())

    this.app.use('/api/v1/', router)
  }
}
