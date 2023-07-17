"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistController {
    constructor(router, artistService) {
        this.registerRoutes = () => {
            this.router.get('/', this.readAll);
            this.router.get('/:artistId', this.readOneById);
            this.router.post('/', this.createOne);
            this.router.patch('/:artistId', this.patchOneById);
            this.router.delete('/:artistId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            const result = this.artistService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.readOneById(artistId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.artistService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.patchOneById(artistId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const artistId = request.params.artistId;
            const result = this.artistService.deleteOneById(artistId);
            response.status(result.status).json(result);
        };
        this.artistService = artistService;
        this.router = router;
    }
}
exports.default = ArtistController;
