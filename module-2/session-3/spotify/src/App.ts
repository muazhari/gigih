import express, { Router } from 'express'
import RootRoute from './routes/RootRoute'

const main = async () => {
  const app = express()
  app.use(express.json({ type: '*/*' }))

  const PORT = 3000

  const rootRoute = new RootRoute(app, Router())
  rootRoute.registerRoutes()

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

main().then(() => {
  console.log('Application started.')
}).catch((error) => {
  console.log('Application failed to start.')
  console.error(error)
})
