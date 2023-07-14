import BaseModel from './BaseModel'

export default class Transaction extends BaseModel {
  id: string | undefined
  sourceId: string | undefined
  destinationId: string | undefined
  amount: number | undefined
  timestamp: Date | undefined

  constructor (
    id: string | undefined,
    sourceId: string | undefined,
    destinationId: string | undefined,
    amount: number | undefined,
    timestamp: Date | undefined
  ) {
    super()
    this.id = id
    this.sourceId = sourceId
    this.destinationId = destinationId
    this.amount = amount
    this.timestamp = timestamp
  }
}
