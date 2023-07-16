import express from 'express'
import './outers/configurations'
import './outers/persistences/DatastoreOne'
import RootRoute from './outers/routes/RootRoute'

const main = async (): Promise<void> => {
  const app = express()
  app.use(express.json({ type: '*/*' }))

  const rootRoute = new RootRoute(app)
  rootRoute.registerRoutes()

  const port = process.env.APP_PORT

  if (port === undefined) {
    throw new Error('Port is undefined.')
  }

  app.listen(port, () => {
    console.log(`Scheduler app listening on port ${port}`)
  })
}

main()
  .then(() => {
    console.log('Scheduler app started.')
  })
  .catch((error) => {
    console.log('Error starting scheduler app: ', error)
  })
