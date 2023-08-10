import { type NextFunction, type Request, type Response } from 'express'
import humps, { type OptionOrProcessor } from 'humps'
import { type ParamsDictionary } from 'express-serve-static-core'
import { type ParsedQs } from 'qs'

const caseExpressMiddleware = (options?: OptionOrProcessor): any => {
  const snakeCaseResHandler = (_req: Request, res: Response, next: NextFunction): void => {
    const send: any = res.send
    res.send = function (body?: any): any {
      try {
        const parsedBody = JSON.parse(body)
        body = humps.decamelizeKeys(parsedBody, options)
        const stringifiesBody = JSON.stringify(body)
        send.call(this, stringifiesBody)
      } catch (error) {
        send.call(this, body)
      }
      return res
    }
    next()
  }

  const snakeCaseReqHandler = (req: Request, _res: Response, next: NextFunction): void => {
    req.body = humps.camelizeKeys(req.body, options)
    req.params = humps.camelizeKeys(req.params, options) as ParamsDictionary
    req.query = humps.camelizeKeys(req.query, options) as ParsedQs
    next()
  }

  return [snakeCaseResHandler, snakeCaseReqHandler]
}

export default caseExpressMiddleware
