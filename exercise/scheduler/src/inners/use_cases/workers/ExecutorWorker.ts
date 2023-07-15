import ProcessExecutor from '../executor/ProcessExecutor'
import Process from '../../models/Process'
import type Message from '../../models/Message'

const executorWorker: ProcessExecutor = new ProcessExecutor()

process.on('message', (message: Message<any>): void => {
  const { event, payload } = message
  let intervalId: NodeJS.Timer | undefined

  if (event === 'start') {
    intervalId = setInterval(() => {
      executorWorker
        .execute()
        .then((result) => { console.log('Result executed item: ', result) })
        .catch((error) => { console.log('Result executed error: ', error) })
    }, 1000)
  } else if (event === 'stop') {
    clearInterval(intervalId)
  } else if (event === 'push') {
    const process: Process = new Process(
      payload.id,
      payload.method,
      payload.url,
      payload.query,
      payload.body,
      new Date(payload.executeAt),
      payload.isRepeated,
      payload.repeatDelay,
      payload.repeatCount
    )

    executorWorker
      .push(process)
      .then((result) => { console.log('Result pushed item: ', result) })
      .catch((error) => { console.log('Result pushed error: ', error) })
  }
})
