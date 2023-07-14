import BaseModel from './BaseModel'

export default class Message<T> extends BaseModel {
  event: string
  payload: T

  constructor (
    event: string,
    payload: T
  ) {
    super()
    this.event = event
    this.payload = payload
  }
}
