import express, { type Request, type Response, type Router } from 'express'
import SongService from '../services/SongService'
import type Song from '../models/Song'
import type Result from '../models/Result'
import Artist from '../models/Artist'

export default class SongController {
  songService: SongService = new SongService()
  router: Router = express.Router()

  constructor () {
    this.router.get('/', this.readAll)
    this.router.get('/:songId', this.readOneById)
    this.router.post('/', this.createOne)
    this.router.patch('/:songId', this.patchOneById)
    this.router.delete('/:songId', this.deleteOneById)
    this.router.get('/sorted/descend/play-count', this.readAllSortedDescendByPlayCount)
  }

  readAll = (request: Request, response: Response): void => {
    const result: Result<Song[] | undefined> = this.songService.readAll()
    response.status(result.status).json(result)
  }

  readOneById = (request: Request, response: Response): void => {
    const songId: string = request.params.songId
    const result: Result<Song | undefined> = this.songService.readOneById(songId)
    response.status(result.status).json(result)
  }

  createOne = (request: Request, response: Response): void => {
    const result: Result<Song> = this.songService.createOne(request.body)
    response.status(result.status).json(result)
  }

  patchOneById = (request: Request, response: Response): void => {
    const songId: string = request.params.songId
    const result: Result<Song | undefined> = this.songService.patchOneById(songId, request.body)
    response.status(result.status).json(result)
  }

  deleteOneById = (request: Request, response: Response): void => {
    const songId: string = request.params.songId
    const result: Result<Song | undefined> = this.songService.deleteOneById(songId)
    response.status(result.status).json(result)
  }

  readAllSortedDescendByPlayCount = (request: Request, response: Response): void => {
    const result: Result<Song[] | undefined> = this.songService.readAllSortedDescendByPlayCount()
    response.status(result.status).json(result)
  }
}
