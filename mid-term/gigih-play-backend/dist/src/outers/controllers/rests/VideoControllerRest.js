"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoControllerRest {
    constructor(router, videoManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:id', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:id', this.patchOneById);
            this.router.delete('/:id', this.deleteOneById);
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
            const { id } = request.params;
            this.videoManagement
                .readOneById(id)
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
            const { id } = request.params;
            this.videoManagement
                .patchOneById(id, request.body)
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
            const { id } = request.params;
            this.videoManagement
                .deleteOneById(id)
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
exports.default = VideoControllerRest;
//# sourceMappingURL=VideoControllerRest.js.map