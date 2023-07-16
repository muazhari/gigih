import axios, { type AxiosResponse } from 'axios'
import type Process from '../../models/Process'
import type ProcessRepository from '../../../outers/repositories/ProcessRepository'

export default class ProcessExecutor {
  processRepository: ProcessRepository

  constructor (processRepository: ProcessRepository) {
    this.processRepository = processRepository
  }

  push = async (process: Process): Promise<void> => {
    if (process.id === undefined) {
      throw new Error('Process id is undefined.')
    }

    let isProcessFound: boolean | undefined
    try {
      await this.processRepository.readOneById(process.id)
      isProcessFound = true
    } catch (error) {
      isProcessFound = false
    }

    if (isProcessFound) {
      await this.processRepository.patchOneById(process.id, process)
    } else {
      await this.processRepository.createOne(process)
    }
  }

  execute = async (): Promise<void> => {
    const data: Process[] = await this.processRepository.readAll()
    for (const item of data) {
      console.log('Checking: ', item)
      if (item.executeAt === undefined) {
        throw new Error('Process executeAt is undefined.')
      }
      const executeAt = item.executeAt
      const currentDate = new Date()

      if (executeAt <= currentDate) {
        console.log('Executing: ', item)

        try {
          const result = await this.executeHttpClient(item.method, item.url, item.query, item.body)
          console.log('Result execute response: ', result.status, result.data)
        } catch (error) {
          console.log('Result execute error: ', error)
        }

        if (item.id === undefined) {
          throw new Error('Process id is undefined.')
        }

        if (item.repeatDelay === undefined) {
          throw new Error('Process repeatDelay is undefined.')
        }

        if (item.repeatCount === undefined) {
          throw new Error('Process repeatCount is undefined.')
        }

        if (item.isRepeated === true) {
          item.executeAt = new Date(item.executeAt.getTime() + item.repeatDelay)
          item.repeatCount = item.repeatCount - 1
          await this.processRepository.patchOneById(item.id, item)
          if (item.repeatCount === 0) {
            await this.processRepository.deleteOneById(item.id)
          }
        } else {
          await this.processRepository.deleteOneById(item.id)
        }
      }
    }
  }

  executeHttpClient = async (
    method: string | undefined,
    url: string | undefined,
    query: string | undefined,
    body: string | undefined
  ): Promise<AxiosResponse<any>> => {
    if (url === undefined) {
      throw new Error('Process url is undefined.')
    }

    switch (method?.toUpperCase()) {
      case 'GET':
        return await axios.get(url, {
          params: query
        })
      case 'POST':
        return await axios.post(url, body, {
          params: query
        })
      case 'PUT':
        return await axios.put(url, body, {
          params: query
        })
      case 'PATCH':
        return await axios.patch(url, body, {
          params: query
        })
      case 'DELETE':
        return await axios.delete(url, {
          params: query
        })
      default:
        throw Error('Method is not supported.')
    }
  }
}
