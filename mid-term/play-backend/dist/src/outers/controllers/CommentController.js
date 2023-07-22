"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentController {
    constructor(router, commentManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:commentId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:commentId', this.patchOneById);
            this.router.delete('/:commentId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.commentManagement
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
            const commentId = request.params.commentId;
            this.commentManagement
                .readOneById(commentId)
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
            this.commentManagement
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
            const commentId = request.params.commentId;
            this.commentManagement
                .patchOneById(commentId, request.body)
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
            const commentId = request.params.commentId;
            this.commentManagement
                .deleteOneById(commentId)
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
        this.commentManagement = commentManagement;
    }
}
exports.default = CommentController;
//# sourceMappingURL=CommentController.js.map