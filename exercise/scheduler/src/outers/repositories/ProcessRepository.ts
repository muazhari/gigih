import type Process from '../../inners/models/Process'
import type DatastoreOne from '../datastores/DatastoreOne'

export default class ProcessRepository {
  datastoreOne: DatastoreOne

  constructor (datastoreOne: DatastoreOne) {
    this.datastoreOne = datastoreOne
  }

  readAll = async (): Promise<Process[]> => {
    if (this.datastoreOne.db === undefined) {
      throw new Error('Datastore db is undefined.')
    }

    const result: Process[] = await this.datastoreOne.db.model('process').find()

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return result
  }

  readOneById = async (id: string): Promise<Process> => {
    if (this.datastoreOne.db === undefined) {
      throw new Error('Datastore db is undefined.')
    }

    const result: Process | null = await this.datastoreOne.db.model('process').findOne({ id })

    if (result === null) {
      throw new Error('Result is null.')
    }

    return result
  }

  createOne = async (item: Process): Promise<Process> => {
    if (this.datastoreOne.db === undefined) {
      throw new Error('Datastore db is undefined.')
    }

    const result: Process = await this.datastoreOne.db?.model('process').create(item)

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return item
  }

  patchOneById = async (id: string, item: Process): Promise<Process> => {
    if (this.datastoreOne.db === undefined) {
      throw new Error('Datastore db is undefined.')
    }

    const foundItem: Process = await this.readOneById(id)
    await this.datastoreOne.db?.model('process').updateOne({ id }, { $set: item })

    return foundItem
  }

  deleteOneById = async (id: string): Promise<Process> => {
    if (this.datastoreOne.db === undefined) {
      throw new Error('Datastore db is undefined.')
    }

    const foundItem: Process = await this.readOneById(id)
    await this.datastoreOne.db?.model('process').deleteOne({ id })

    return foundItem
  }
}
