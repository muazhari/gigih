"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(router, userManagement) {
        this.registerRoutes = () => {
            this.router.get('', this.readAll);
            this.router.get('/:userId', this.readOneById);
            this.router.post('', this.createOne);
            this.router.patch('/:userId', this.patchOneById);
            this.router.delete('/:userId', this.deleteOneById);
        };
        this.readAll = (request, response) => {
            this.userManagement
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
            const userId = request.params.userId;
            this.userManagement
                .readOneById(userId)
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
            this.userManagement
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
            const userId = request.params.userId;
            this.userManagement
                .patchOneById(userId, request.body)
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
            const userId = request.params.userId;
            this.userManagement
                .deleteOneById(userId)
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
        this.userManagement = userManagement;
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map