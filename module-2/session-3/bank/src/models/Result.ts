import BaseModel from './BaseModel'

export default class Result<T> extends BaseModel {
  status: number
  message: string
  data: T

  constructor (
    status: number,
    message: string,
    data: T
  ) {
    super()
    this.status = status
    this.message = message
    this.data = data
  }
}
