import type Process from '../../inners/models/Process'

export default class ProcessRepository {
  data: Process[] = [
    // new Process(
    //   '0',
    //   'GET',
    //   'url1',
    //   undefined,
    //   undefined,
    //   new Date(),
    //   true,
    //   1000,
    //   10
    // ),
    // new Process(
    //   '1',
    //   'GET',
    //   'url2',
    //   undefined,
    //   undefined,
    //   new Date(),
    //   true,
    //   1000,
    //   10
    // )
  ]

  readAll = (): Process[] => {
    return this.data
  }

  readOneById = (id: string): Process => {
    const foundItem: Process | undefined = this.data.find((item) => item.id === id)

    if (foundItem === undefined) {
      throw new Error('Process id not found.')
    }

    return foundItem
  }

  createOne = (item: Process): Process => {
    this.data.push(item)
    return item
  }

  patchOneById = (id: string, item: Process): Process => {
    const foundItem: Process = this.readOneById(id)
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): Process => {
    const foundItem: Process = this.readOneById(id)
    this.data = this.data.filter((item) => item.id !== id)
    return foundItem
  }
}
