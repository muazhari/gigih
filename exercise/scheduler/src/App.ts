import express from 'express'
import Process from './inners/models/Process'
import { fork } from 'child_process'
import Message from './inners/models/Message'
import DatastoreOne from './outers/persistences/DatastoreOne'
import dotenv from 'dotenv'

dotenv.config(
  {
    path: './.env'
  }
)

const datastoreOne: DatastoreOne = new DatastoreOne()
datastoreOne.connect()

const app = express()
app.use(express.json({ type: '*/*' }))

const port = process.env.APP_PORT

if (port === undefined) {
  throw new Error('Port is undefined.')
}

const executorChildProcess = fork('./dist/inners/use_cases/workers/ExecutorWorker.js')

// executorChildProcess.send(new Message('fetch', undefined))
executorChildProcess.send(new Message('start', undefined))

app.post('/', (req, res) => {
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

  executorChildProcess.send(new Message('push', process))
  res.send('A new process has tried to be insert to queue.')
})

app.listen(port, () => {
  console.log(`Scheduler app listening on port ${port}`)
})

export { datastoreOne }
