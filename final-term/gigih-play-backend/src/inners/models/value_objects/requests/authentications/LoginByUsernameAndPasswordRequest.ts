export default class LoginByUsernameAndPasswordRequest {
  username: string | undefined
  password: string | undefined

  constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }
}
