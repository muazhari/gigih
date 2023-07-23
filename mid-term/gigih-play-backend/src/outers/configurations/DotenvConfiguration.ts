import dotenv, { type DotenvConfigOutput } from 'dotenv'

const dotenvOutput: DotenvConfigOutput = dotenv.config(
  {
    path: './.env'
  }
)

export default dotenvOutput
