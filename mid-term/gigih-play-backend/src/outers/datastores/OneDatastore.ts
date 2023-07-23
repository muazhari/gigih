import * as os from 'os'
import mongoose, { type Mongoose } from 'mongoose'

export default class OneDatastore {
  db: Mongoose | undefined

  connect = async (): Promise<void> => {
    const host = process.env.DS_1_HOST
    if (host === undefined) {
      throw new Error('Host is undefined.')
    }

    const port = process.env.DS_1_PORT
    if (port === undefined) {
      throw new Error('Port is undefined.')
    }

    const username = process.env.DS_1_ROOT_USERNAME
    if (username === undefined) {
      throw new Error('Username is undefined.')
    }

    const password = process.env.DS_1_ROOT_PASSWORD
    if (password === undefined) {
      throw new Error('Password is undefined.')
    }

    const database = process.env.DS_1_DATABASE
    if (database === undefined) {
      throw new Error('Database is undefined.')
    }

    const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`

    await mongoose.connect(
      url,
      {
        maxPoolSize: os.cpus().length
      }
    )
    this.db = mongoose
  }

  disconnect = async (): Promise<void> => {
    await mongoose.disconnect()
  }
}
