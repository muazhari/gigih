"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoCommentMapController {
    constructor(router, videoCommentMapManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:videoCommentMapId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:videoCommentMapId', this.patchOneById);
            this.router.delete('/:videoCommentMapId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.videoCommentMapManagement
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
            const videoCommentMapId = request.params.videoCommentMapId;
            this.videoCommentMapManagement
                .readOneById(videoCommentMapId)
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
            this.videoCommentMapManagement
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
            const videoCommentMapId = request.params.videoCommentMapId;
            this.videoCommentMapManagement
                .patchOneById(videoCommentMapId, request.body)
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
            const videoCommentMapId = request.params.videoCommentMapId;
            this.videoCommentMapManagement
                .deleteOneById(videoCommentMapId)
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
        this.videoCommentMapManagement = videoCommentMapManagement;
    }
}
exports.default = VideoCommentMapController;
//# sourceMappingURL=VideoCommentController.js.map