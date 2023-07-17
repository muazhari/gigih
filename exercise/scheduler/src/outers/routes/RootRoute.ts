import { type Application, Router } from 'express'
import ExecutorController from '../controllers/ExecutorController'
import ExecutorWorker from '../../inners/use_cases/workers/ExecutorWorker'
import ProcessExecutor from '../../inners/use_cases/executor/ProcessExecutor'
import DatastoreOne from '../datastores/DatastoreOne'
import ProcessRepository from '../repositories/ProcessRepository'
import { type ChildProcess, fork } from 'child_process'
import Message from '../../inners/models/Message'

export default class RootRoute {
  app: Application

  constructor (app: Application) {
    this.app = app
  }

  registerRoutes = async (): Promise<void> => {
    // datastores
    const datastoreOne: DatastoreOne = new DatastoreOne()

    try {
      await datastoreOne.connect()
      console.log('Datastore one connected.')
    } catch (error) {
      console.log('Error connecting to datastore one: ', error)
    }

    // repositories
    const processRepository: ProcessRepository = new ProcessRepository(datastoreOne)

    // process
    const executorProcess: ChildProcess = fork('./dist/inners/use_cases/tasks/ExecutorTask.js')

    // use cases
    const processExecutor: ProcessExecutor = new ProcessExecutor(processRepository)
    const executorWorker: ExecutorWorker = new ExecutorWorker(processExecutor, executorProcess)
    executorWorker.registerListeners()

    executorWorker.executorProcess.send(new Message('start', undefined))

    const executorController: ExecutorController = new ExecutorController(Router(), executorWorker)
    executorController.registerRoutes()

    const router = Router()
    router.use('/executors', executorController.router)

    this.app.use('/api/v1/', router)
  }
}
