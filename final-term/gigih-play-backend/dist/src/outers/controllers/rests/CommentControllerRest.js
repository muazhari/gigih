"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubmitCommentRequest_1 = __importDefault(require("../../../inners/models/value_objects/requests/comments/SubmitCommentRequest"));
class CommentControllerRest {
    constructor(router, commentManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/videos/:videoId', this.readAllByVideoId);
            this.router.get('/:id', this.readOneById);
            this.router.post('', this.createOne);
            this.router.post('/submissions', this.submit);
            this.router.patch('/:id', this.patchOneById);
            this.router.delete('/:id', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            const { isAggregated, search } = request.query;
            const parsedIsAggregated = isAggregated !== undefined ? Boolean(isAggregated) : undefined;
            const parsedSearch = search !== undefined ? JSON.parse(decodeURIComponent(String(search))) : undefined;
            this.commentManagement
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
        this.readAllByVideoId = (request, response) => {
            const { videoId } = request.params;
            const { isAggregated } = request.query;
            const parsedIsAggregated = isAggregated !== undefined ? Boolean(isAggregated) : undefined;
            this.commentManagement
                .readAllByVideoId(videoId, parsedIsAggregated)
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
            this.commentManagement
                .readOneById(id, Boolean(isAggregated))
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
        this.submit = (request, response) => {
            const { isAggregated } = request.query;
            const { videoId, username, content } = request.body;
            const submitComment = new SubmitCommentRequest_1.default(videoId, username, content);
            this.commentManagement
                .submit(submitComment, Boolean(isAggregated))
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
            this.commentManagement
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
            this.commentManagement
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
        this.commentManagement = commentManagement;
    }
}
exports.default = CommentControllerRest;
//# sourceMappingURL=CommentControllerRest.js.map