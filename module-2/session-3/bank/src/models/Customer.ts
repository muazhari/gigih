import BaseModel from './BaseModel'

export default class Customer extends BaseModel {
  id: string | undefined
  name: string | undefined
  email: string | undefined
  password: string | undefined
  balance: number | undefined

  constructor (
    id: string | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    balance: number | undefined

  ) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.balance = balance
  }
}
