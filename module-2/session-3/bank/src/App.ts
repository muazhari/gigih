import express from 'express'
import indexRoute from './routes/Index'

const app = express()
app.use(express.json({ type: '*/*' }))

const PORT = 3000

app.use('/api/v1', indexRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
