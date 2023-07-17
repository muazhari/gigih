"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaylistController {
    constructor(router, playlistService) {
        this.registerRoutes = () => {
            this.router.get('/', this.readAll);
            this.router.get('/:playlistId', this.readOneById);
            this.router.post('/', this.createOne);
            this.router.patch('/:playlistId', this.patchOneById);
            this.router.delete('/:playlistId', this.deleteOneById);
            this.router.post('/:playlistId/songs', this.addManySongToPlaylist);
            this.router.get('/:playlistId/songs/:songId', this.playOneSongFromPlaylist);
            this.router.get('/:playlistId/songs', this.readAllSongFromPlaylist);
        };
        this.addManySongToPlaylist = (request, response) => {
            const playlistId = request.params.playlistId;
            const songIds = request.body.songIds;
            const result = this.playlistService.addManySongToPlaylist(playlistId, songIds);
            response.status(result.status).json(result);
        };
        this.playOneSongFromPlaylist = (request, response) => {
            const playlistId = request.params.playlistId;
            const songId = request.params.songId;
            const result = this.playlistService.playOneSongFromPlaylist(playlistId, songId);
            response.status(result.status).json(result);
        };
        this.readAllSongFromPlaylist = (request, response) => {
            const playlistId = request.params.playlistId;
            const result = this.playlistService.readAllSongFromPlaylist(playlistId);
            response.status(result.status).json(result);
        };
        this.readAll = (request, response) => {
            const result = this.playlistService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const playlistId = request.params.playlistId;
            const result = this.playlistService.readOneById(playlistId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.playlistService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const playlistId = request.params.playlistId;
            const result = this.playlistService.patchOneById(playlistId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const playlistId = request.params.playlistId;
            const result = this.playlistService.deleteOneById(playlistId);
            response.status(result.status).json(result);
        };
        this.playlistService = playlistService;
        this.router = router;
    }
}
exports.default = PlaylistController;
