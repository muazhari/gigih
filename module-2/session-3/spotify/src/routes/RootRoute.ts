import express, { type Application, Router } from 'express'
import ArtistController from '../controllers/ArtistController'
import SongController from '../controllers/SongController'
import PlaylistController from '../controllers/PlaylistController'
import DatastoreOne from '../datastores/DatastoreOne'
import ArtistRepository from '../repositories/ArtistRepository'
import SongRepository from '../repositories/SongRepository'
import PlaylistRepository from '../repositories/PlaylistRepository'
import ArtistService from '../services/ArtistService'
import SongService from '../services/SongService'
import PlaylistService from '../services/PlaylistService'
import PlaylistSongRepository from '../repositories/PlaylistSongRepository'

export default class RootRoute {
  app: Application
  router: Router

  constructor (app: Application, router: Router) {
    this.app = app
    this.router = router
  }

  registerRoutes = (): void => {
    const datastoreOne: DatastoreOne = new DatastoreOne()
    const artistRepository: ArtistRepository = new ArtistRepository(datastoreOne)
    const playlistRepository: PlaylistRepository = new PlaylistRepository(datastoreOne)
    const songRepository: SongRepository = new SongRepository(datastoreOne)
    const playlistSongRepository: PlaylistSongRepository = new PlaylistSongRepository(datastoreOne)

    const artistService: ArtistService = new ArtistService(artistRepository)
    const songService: SongService = new SongService(songRepository, playlistSongRepository)
    const playlistService: PlaylistService = new PlaylistService(playlistRepository, songRepository, playlistSongRepository)

    const artistController = new ArtistController(Router(), artistService)
    artistController.registerRoutes()
    const songController = new SongController(Router(), songService)
    songController.registerRoutes()
    const playlistController = new PlaylistController(Router(), playlistService)
    playlistController.registerRoutes()

    this.router.use('/artists', artistController.router)
    this.router.use('/songs', songController.router)
    this.router.use('/playlists', playlistController.router)
    this.app.use('/api/v1', this.router)
  }
}
