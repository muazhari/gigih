import express from 'express'
import ArtistController from '../controllers/ArtistController'
import SongController from '../controllers/SongController'
import PlaylistController from '../controllers/PlaylistController'

const router = express.Router()

router.use('/artists', new ArtistController().router)
router.use('/songs', new SongController().router)
router.use('/playlists', new PlaylistController().router)

export default router
