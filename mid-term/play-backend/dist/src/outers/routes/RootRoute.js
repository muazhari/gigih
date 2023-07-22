"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const ProductManagement_1 = __importDefault(require("../../inners/use_cases/managements/ProductManagement"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UserManagement_1 = __importDefault(require("../../inners/use_cases/managements/UserManagement"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const VideoRepository_1 = __importDefault(require("../repositories/VideoRepository"));
const VideoManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoManagement"));
const VideoController_1 = __importDefault(require("../controllers/VideoController"));
const CommentRepository_1 = __importDefault(require("../repositories/CommentRepository"));
const CommentManagement_1 = __importDefault(require("../../inners/use_cases/managements/CommentManagement"));
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const VideoCommentMapRepository_1 = __importDefault(require("../repositories/VideoCommentMapRepository"));
const VideoCommentMapManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoCommentMapManagement"));
const VideoCommentController_1 = __importDefault(require("../controllers/VideoCommentController"));
const VideoProductMapController_1 = __importDefault(require("../controllers/VideoProductMapController"));
const VideoProductMapManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoProductMapManagement"));
const VideoProductMapRepository_1 = __importDefault(require("../repositories/VideoProductMapRepository"));
class RootRoute {
    constructor(app, datastoreOne) {
        this.registerRoutes = () => __awaiter(this, void 0, void 0, function* () {
            const router = (0, express_1.Router)();
            const userRepository = new UserRepository_1.default(this.datastoreOne);
            const userManagement = new UserManagement_1.default(userRepository);
            const userController = new UserController_1.default((0, express_1.Router)(), userManagement);
            userController.registerRoutes();
            router.use('/users', userController.router);
            const videoRepository = new VideoRepository_1.default(this.datastoreOne);
            const videoManagement = new VideoManagement_1.default(videoRepository);
            const videoController = new VideoController_1.default((0, express_1.Router)(), videoManagement);
            videoController.registerRoutes();
            router.use('/videos', videoController.router);
            const commentRepository = new CommentRepository_1.default(this.datastoreOne);
            const commentManagement = new CommentManagement_1.default(commentRepository);
            const commentController = new CommentController_1.default((0, express_1.Router)(), commentManagement);
            commentController.registerRoutes();
            router.use('/comments', commentController.router);
            const productRepository = new ProductRepository_1.default(this.datastoreOne);
            const productManagement = new ProductManagement_1.default(productRepository);
            const productController = new ProductController_1.default((0, express_1.Router)(), productManagement);
            productController.registerRoutes();
            router.use('/products', productController.router);
            const videoCommentMapRepository = new VideoCommentMapRepository_1.default(this.datastoreOne);
            const videoCommentMapManagement = new VideoCommentMapManagement_1.default(videoCommentMapRepository);
            const videoCommentMapController = new VideoCommentController_1.default((0, express_1.Router)(), videoCommentMapManagement);
            videoCommentMapController.registerRoutes();
            router.use('/video-comment-maps', videoCommentMapController.router);
            const videoProductMapRepository = new VideoProductMapRepository_1.default(this.datastoreOne);
            const videoProductMapManagement = new VideoProductMapManagement_1.default(videoProductMapRepository);
            const videoProductMapController = new VideoProductMapController_1.default((0, express_1.Router)(), videoProductMapManagement);
            videoProductMapController.registerRoutes();
            router.use('/video-product-maps', videoProductMapController.router);
            this.app.use('/api/v1', router);
        });
        this.app = app;
        this.datastoreOne = datastoreOne;
    }
}
exports.default = RootRoute;
//# sourceMappingURL=RootRoute.js.map