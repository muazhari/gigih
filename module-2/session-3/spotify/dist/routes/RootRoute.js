"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArtistController_1 = __importDefault(require("../controllers/ArtistController"));
const SongController_1 = __importDefault(require("../controllers/SongController"));
const PlaylistController_1 = __importDefault(require("../controllers/PlaylistController"));
const DatastoreOne_1 = __importDefault(require("../datastores/DatastoreOne"));
const ArtistRepository_1 = __importDefault(require("../repositories/ArtistRepository"));
const SongRepository_1 = __importDefault(require("../repositories/SongRepository"));
const PlaylistRepository_1 = __importDefault(require("../repositories/PlaylistRepository"));
const ArtistService_1 = __importDefault(require("../services/ArtistService"));
const SongService_1 = __importDefault(require("../services/SongService"));
const PlaylistService_1 = __importDefault(require("../services/PlaylistService"));
const PlaylistSongRepository_1 = __importDefault(require("../repositories/PlaylistSongRepository"));
class RootRoute {
    constructor(app, router) {
        this.registerRoutes = () => {
            const datastoreOne = new DatastoreOne_1.default();
            const artistRepository = new ArtistRepository_1.default(datastoreOne);
            const playlistRepository = new PlaylistRepository_1.default(datastoreOne);
            const songRepository = new SongRepository_1.default(datastoreOne);
            const playlistSongRepository = new PlaylistSongRepository_1.default(datastoreOne);
            const artistService = new ArtistService_1.default(artistRepository);
            const songService = new SongService_1.default(songRepository, playlistSongRepository);
            const playlistService = new PlaylistService_1.default(playlistRepository, songRepository, playlistSongRepository);
            const artistController = new ArtistController_1.default((0, express_1.Router)(), artistService);
            artistController.registerRoutes();
            const songController = new SongController_1.default((0, express_1.Router)(), songService);
            songController.registerRoutes();
            const playlistController = new PlaylistController_1.default((0, express_1.Router)(), playlistService);
            playlistController.registerRoutes();
            this.router.use('/artists', artistController.router);
            this.router.use('/songs', songController.router);
            this.router.use('/playlists', playlistController.router);
            this.app.use('/api/v1', this.router);
        };
        this.app = app;
        this.router = router;
    }
}
exports.default = RootRoute;
