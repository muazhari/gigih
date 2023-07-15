import Process from '../../inners/models/Process'
import { datastoreOne } from '../../App'

export default class ProcessRepository {
  readAll = async (): Promise<Process[]> => {
    const result = await datastoreOne.db?.collection('processes').find().toArray()

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return result.map((item) => new Process(
      item.id,
      item.method,
      item.url,
      item.query,
      item.body,
      new Date(item.executeAt),
      item.isRepeated,
      item.repeatDelay,
      item.repeatCount
    ))
  }

  readOneById = async (id: string): Promise<Process> => {
    const result = await datastoreOne.db?.collection('processes').findOne({ id })

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    if (result === null) {
      throw new Error('Result is null.')
    }

    const foundItem: Process | undefined = new Process(
      result.id,
      result.method,
      result.url,
      result.query,
      result.body,
      new Date(result.executeAt),
      result.isRepeated,
      result.repeatDelay,
      result.repeatCount
    )

    if (foundItem === undefined) {
      throw new Error('Process id not found.')
    }

    return foundItem
  }

  createOne = async (item: Process): Promise<Process> => {
    const result = await datastoreOne.db?.collection('processes').insertOne(item)

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return item
  }

  patchOneById = async (id: string, item: Process): Promise<Process> => {
    const foundItem: Process = await this.readOneById(id)
    const result = await datastoreOne.db?.collection('processes').updateOne({ id }, { $set: item })

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return foundItem
  }

  deleteOneById = async (id: string): Promise<Process> => {
    const foundItem: Process = await this.readOneById(id)
    const result = await datastoreOne.db?.collection('processes').deleteOne({ id })

    if (result === undefined) {
      throw new Error('Result is undefined.')
    }

    return foundItem
  }
}
