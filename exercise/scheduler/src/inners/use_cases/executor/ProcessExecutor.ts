import axios, { type AxiosResponse } from 'axios'
import type Process from '../../models/Process'
import ProcessRepository from '../../../outers/repositories/ProcessRepository'

export default class ProcessExecutor {
  processRepository: ProcessRepository = new ProcessRepository()

  push = (process: Process): void => {
    console.log(process)
    if (process.id === undefined) {
      throw new Error('Process id is undefined.')
    }

    let isProcessFound: boolean | undefined
    try {
      this.processRepository.readOneById(process.id)
      isProcessFound = true
    } catch (error) {
      isProcessFound = false
    }

    if (isProcessFound) {
      this.processRepository.patchOneById(process.id, process)
    } else {
      this.processRepository.createOne(process)
    }
  }

  execute = async (): Promise<Process> => {
    return await new Promise((resolve, reject) => {
      const data: Process[] = this.processRepository.readAll()
      data.forEach((item, index) => {
        console.log('Checking: ', item)
        if (item.executeAt === undefined) {
          throw new Error('Process executeAt is undefined.')
        }
        const executeAt = item.executeAt
        const currentDate = new Date()
        if (executeAt <= currentDate) {
          console.log('Executing: ', item)

          const httpClient = this.prepareHttpClient(item.method, item.url, item.query, item.body)
          httpClient
            .then((result) => { console.log('Result response: ', result.status, result.data) })
            .catch((error) => { console.log('Result response error: ', error) })
            .finally(() => {
              try {
                if (item.id === undefined) {
                  throw new Error('Process id is undefined.')
                }

                if (item.repeatDelay === undefined) {
                  throw new Error('Process repeatDelay is undefined.')
                }

                if (item.repeatCount === undefined) {
                  throw new Error('Process repeatCount is undefined.')
                }

                if (item.executeAt === undefined) {
                  throw new Error('Process repeatCount is undefined.')
                }

                if (item.isRepeated === true) {
                  item.executeAt = new Date(item.executeAt.getTime() + item.repeatDelay)
                  item.repeatCount = item.repeatCount - 1
                  this.processRepository.patchOneById(item.id, item)
                  if (item.repeatCount === 0) {
                    this.processRepository.deleteOneById(item.id)
                  }
                } else {
                  this.processRepository.deleteOneById(item.id)
                }

                resolve(item)
              } catch (error) {
                reject(error)
              }
            })
        }
      })
    })
  }

  prepareHttpClient = async (
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
