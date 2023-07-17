import type PlaylistService from '../services/PlaylistService'
import type Song from '../models/Song'
import type Playlist from '../models/Playlist'
import express, { type Request, type Response, type Router } from 'express'
import type Result from '../models/Result'
import type Artist from '../models/Artist'

export default class PlaylistController {
  playlistService: PlaylistService
  router: Router

  constructor (router: Router, playlistService: PlaylistService) {
    this.playlistService = playlistService
    this.router = router
  }

  registerRoutes = (): void => {
    this.router.get('/', this.readAll)
    this.router.get('/:playlistId', this.readOneById)
    this.router.post('/', this.createOne)
    this.router.patch('/:playlistId', this.patchOneById)
    this.router.delete('/:playlistId', this.deleteOneById)
    this.router.post('/:playlistId/songs', this.addManySongToPlaylist)
    this.router.get('/:playlistId/songs/:songId', this.playOneSongFromPlaylist)
    this.router.get('/:playlistId/songs', this.readAllSongFromPlaylist)
  }

  addManySongToPlaylist = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const songIds: string[] = request.body.songIds
    const result: Result<Playlist | undefined> = this.playlistService.addManySongToPlaylist(playlistId, songIds)
    response.status(result.status).json(result)
  }

  playOneSongFromPlaylist = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const songId: string = request.params.songId
    const result: Result<Song | undefined> = this.playlistService.playOneSongFromPlaylist(playlistId, songId)
    response.status(result.status).json(result)
  }

  readAllSongFromPlaylist = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const result: Result<Song[] | undefined> = this.playlistService.readAllSongFromPlaylist(playlistId)
    response.status(result.status).json(result)
  }

  readAll = (request: Request, response: Response): void => {
    const result: Result<Playlist[] | undefined> = this.playlistService.readAll()
    response.status(result.status).json(result)
  }

  readOneById = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const result: Result<Playlist | undefined> = this.playlistService.readOneById(playlistId)
    response.status(result.status).json(result)
  }

  createOne = (request: Request, response: Response): void => {
    const result: Result<Playlist> = this.playlistService.createOne(request.body)
    response.status(result.status).json(result)
  }

  patchOneById = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const result: Result<Playlist | undefined> = this.playlistService.patchOneById(playlistId, request.body)
    response.status(result.status).json(result)
  }

  deleteOneById = (request: Request, response: Response): void => {
    const playlistId: string = request.params.playlistId
    const result: Result<Playlist | undefined> = this.playlistService.deleteOneById(playlistId)
    response.status(result.status).json(result)
  }
}
