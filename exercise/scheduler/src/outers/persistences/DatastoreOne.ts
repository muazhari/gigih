
import * as os from 'os'
import Message from '../../inners/models/Message'
import executorProcess from '../../inners/use_cases/process/ExecutorProcess'
import mongoose, { type Mongoose } from 'mongoose'

export default class DatastoreOne {
  db: Mongoose | undefined

  connect = async (): Promise<void> => {
    await new Promise((resolve, reject) => {
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

      mongoose.connect(
        url,
        {
          maxPoolSize: os.cpus().length
        }
      ).then((client) => {
        this.db = mongoose
        resolve(undefined)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  disconnect = (): void => {
    this.db?.disconnect().then(() => {
      console.log('Disconnected from datastore one.')
    }).catch((error) => {
      console.log('Error disconnecting from datastore one: ', error)
    })
  }
}
