import ProcessExecutor from '../executor/ProcessExecutor'
import Process from '../../models/Process'
import type Message from '../../models/Message'

process.on('message', (message: Message<any>): void => {
  const { event, payload } = message
  let intervalId: NodeJS.Timer | undefined

  const executorWorker: ProcessExecutor = new ProcessExecutor()

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

    executorWorker.push(process)
    console.log('Pushed: ', process)
  }
})
