"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    constructor(router, productManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/videos/:videoId', this.readAllByVideoId);
            this.router.get('/:productId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:productId', this.patchOneById);
            this.router.delete('/:productId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.productManagement
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
        this.readAllByVideoId = (request, response) => {
            const videoId = request.params.videoId;
            this.productManagement
                .readAllByVideoId(videoId)
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
            const productId = request.params.productId;
            this.productManagement
                .readOneById(productId)
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
            this.productManagement
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
            const productId = request.params.productId;
            this.productManagement
                .patchOneById(productId, request.body)
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
            const productId = request.params.productId;
            this.productManagement
                .deleteOneById(productId)
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
        this.productManagement = productManagement;
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map