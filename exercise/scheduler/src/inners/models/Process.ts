import BaseModel from './BaseModel'

export default class Process extends BaseModel {
  id: string | undefined
  method: string | undefined
  url: string | undefined
  query: string | undefined
  body: string | undefined
  executeAt: Date | undefined
  isRepeated: boolean | undefined
  repeatDelay: number | undefined // in milliseconds
  repeatCount: number | undefined

  constructor (
    id: string | undefined,
    method: string | undefined,
    url: string | undefined,
    query: string | undefined,
    body: string | undefined,
    executeAt: Date | undefined,
    isRepeated: boolean | undefined,
    repeatDelay: number | undefined,
    repeatCount: number | undefined
  ) {
    super()
    this.id = id
    this.method = method
    this.url = url
    this.query = query
    this.body = body
    this.executeAt = executeAt
    this.isRepeated = isRepeated
    this.repeatDelay = repeatDelay
    this.repeatCount = repeatCount
  }
}
