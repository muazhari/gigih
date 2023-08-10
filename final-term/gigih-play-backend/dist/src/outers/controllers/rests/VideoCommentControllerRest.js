"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoCommentMapController {
    constructor(router, videoCommentMapManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:id', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:id', this.patchOneById);
            this.router.delete('/:id', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            const { isAggregated, search } = request.query;
            const parsedIsAggregated = isAggregated !== undefined ? Boolean(isAggregated) : undefined;
            const parsedSearch = search !== undefined ? JSON.parse(decodeURIComponent(String(search))) : undefined;
            this.videoCommentMapManagement
                .readAll(parsedIsAggregated, parsedSearch)
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
            const { isAggregated } = request.query;
            const parsedIsAggregated = isAggregated !== undefined ? Boolean(isAggregated) : undefined;
            this.videoCommentMapManagement
                .readOneById(id, parsedIsAggregated)
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
            const { id } = request.params;
            this.videoCommentMapManagement
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
            this.videoCommentMapManagement
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
        this.videoCommentMapManagement = videoCommentMapManagement;
    }
}
exports.default = VideoCommentMapController;
//# sourceMappingURL=VideoCommentControllerRest.js.map