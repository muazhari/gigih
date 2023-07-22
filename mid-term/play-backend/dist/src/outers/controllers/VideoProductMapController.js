"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoProductMapController {
    constructor(router, videoProductMapManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:videoProductMapId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:videoProductMapId', this.patchOneById);
            this.router.delete('/:videoProductMapId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.videoProductMapManagement
                .readAll()
                .then((result) => {
                response.status(result.status).json(result);
            })
                .catch((error) => {
                response.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null
                });
            });
        };
        this.readOneById = (request, response) => {
            const videoProductMapId = request.params.videoProductMapId;
            this.videoProductMapManagement
                .readOneById(videoProductMapId)
                .then((result) => {
                response.status(result.status).json(result);
            })
                .catch((error) => {
                response.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null
                });
            });
        };
        this.createOne = (request, response) => {
            this.videoProductMapManagement
                .createOne(request.body)
                .then((result) => {
                response.status(result.status).json(result);
            })
                .catch((error) => {
                response.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null
                });
            });
        };
        this.patchOneById = (request, response) => {
            const videoProductMapId = request.params.videoProductMapId;
            this.videoProductMapManagement
                .patchOneById(videoProductMapId, request.body)
                .then((result) => {
                response.status(result.status).json(result);
            })
                .catch((error) => {
                response.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null
                });
            });
        };
        this.deleteOneById = (request, response) => {
            const videoProductMapId = request.params.videoProductMapId;
            this.videoProductMapManagement
                .deleteOneById(videoProductMapId)
                .then((result) => {
                response.status(result.status).json(result);
            })
                .catch((error) => {
                response.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null
                });
            });
        };
        this.router = router;
        this.videoProductMapManagement = videoProductMapManagement;
    }
}
exports.default = VideoProductMapController;
//# sourceMappingURL=VideoProductMapController.js.map