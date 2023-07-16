import express, { type Request, type Response, type Router } from 'express'
import ArtistService from '../services/ArtistService'
import type Artist from '../models/Artist'
import type Result from '../models/Result'

export default class ArtistController {
  artistService: ArtistService = new ArtistService()
  router: Router = express.Router()

  constructor () {
    this.router.get('/', this.readAll)
    this.router.get('/:artistId', this.readOneById)
    this.router.post('/', this.createOne)
    this.router.patch('/:artistId', this.patchOneById)
    this.router.delete('/:artistId', this.deleteOneById)
  }

  readAll = (request: Request, response: Response): void => {
    const result: Result<Artist[] | undefined> = this.artistService.readAll()
    response.status(result.status).json(result)
  }

  readOneById = (request: Request, response: Response): void => {
    const artistId: string = request.params.artistId
    const result: Result<Artist | undefined> = this.artistService.readOneById(artistId)
    response.status(result.status).json(result)
  }

  createOne = (request: Request, response: Response): void => {
    const result: Result<Artist> = this.artistService.createOne(request.body)
    response.status(result.status).json(result)
  }

  patchOneById = (request: Request, response: Response): void => {
    const artistId: string = request.params.artistId
    const result: Result<Artist | undefined> = this.artistService.patchOneById(artistId, request.body)
    response.status(result.status).json(result)
  }

  deleteOneById = (request: Request, response: Response): void => {
    const artistId: string = request.params.artistId
    const result: Result<Artist | undefined> = this.artistService.deleteOneById(artistId)
    response.status(result.status).json(result)
  }
}