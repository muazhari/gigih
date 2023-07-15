import { MongoClient, type Db } from 'mongodb'
import * as os from 'os'
export default class DatastoreOne {
  client: MongoClient | undefined
  db: Db | undefined

  connect = (): void => {
    const host = process.env.DS_1_HOST
    if (host === undefined) {
      throw new Error('Host is undefined.')
    }

    const port = process.env.DS_1_PORT
    if (port === undefined) {
      throw new Error('Port is undefined.')
    }

    const database = process.env.DS_1_DATABASE
    if (database === undefined) {
      throw new Error('Database is undefined.')
    }

    const username = process.env.DS_1_ROOT_USERNAME
    if (username === undefined) {
      throw new Error('Username is undefined.')
    }

    const password = process.env.DS_1_ROOT_PASSWORD
    if (password === undefined) {
      throw new Error('Password is undefined.')
    }

    const url = `mongodb://${username}:${password}@${host}:${port}/${database}/?authSource=admin`

    MongoClient.connect(
      url,
      {
        maxPoolSize: os.cpus().length
      }
    ).then((client) => {
      this.client = client
      this.db = this.client.db('scheduler')
      console.log('Connected to datastore one.')
    }).catch((error) => {
      console.log('Error connecting to datastore one: ', error)
    })
  }
}
