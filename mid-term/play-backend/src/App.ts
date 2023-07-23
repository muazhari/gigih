import express, { type Application } from 'express'
import './outers/configurations/DotenvConfiguration'
import OneDatastore from './outers/datastores/OneDatastore'
import RootRoute from './outers/routes/RootRoute'
import caseMiddleware from './outers/middlewares/CaseMiddleware'

let app: Application | undefined
const main = async (): Promise<void> => {
  app = express()
  app.use(express.json({ type: '*/*' }))
  app.use(caseMiddleware())

  const oneDatastore = new OneDatastore()

  try {
    await oneDatastore.connect()
    console.log('One datastore connected.')
  } catch (error) {
    console.log('Error connecting to one datastore: ', error)
  }

  // const oneMigration = new OneMigration(oneDatastore)
  // await oneMigration.down()
  // await oneMigration.up()

  const rootRoute = new RootRoute(app, oneDatastore)
  await rootRoute.registerRoutes()

  const port = process.env.NODE_ENV === 'test' ? 0 : Number(process.env.APP_PORT)

  if (port === undefined) {
    throw new Error('Port is undefined.')
  }

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

main()
  .then(() => {
    console.log('App started.')
  })
  .catch((error) => {
    console.log('Error starting app: ', error)
  })

export default app
