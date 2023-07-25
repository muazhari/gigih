export default class RegisterByUsernameAndPasswordRequest {
  username: string | undefined
  password: string | undefined

  constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }
}
