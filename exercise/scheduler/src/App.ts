import express from 'express'
import bodyParser from 'body-parser'
import Process from './inners/models/Process'
import { fork } from 'child_process'
import Message from './inners/models/Message'

const app = express()
app.use(bodyParser.json())

const port = 3000

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
  res.send('A new process has inserted to queue')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
