"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoController {
    constructor(router, videoManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:videoId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:videoId', this.patchOneById);
            this.router.delete('/:videoId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.videoManagement
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
            const videoId = request.params.videoId;
            this.videoManagement
                .readOneById(videoId)
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
            this.videoManagement
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
            const videoId = request.params.videoId;
            this.videoManagement
                .patchOneById(videoId, request.body)
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
            const videoId = request.params.videoId;
            this.videoManagement
                .deleteOneById(videoId)
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
        this.videoManagement = videoManagement;
    }
}
exports.default = VideoController;
//# sourceMappingURL=VideoController.js.map