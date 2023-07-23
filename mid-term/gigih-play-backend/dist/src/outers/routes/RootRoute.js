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
const ProductControllerRest_1 = __importDefault(require("../controllers/rests/ProductControllerRest"));
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const ProductManagement_1 = __importDefault(require("../../inners/use_cases/managements/ProductManagement"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UserManagement_1 = __importDefault(require("../../inners/use_cases/managements/UserManagement"));
const UserControllerRest_1 = __importDefault(require("../controllers/rests/UserControllerRest"));
const VideoRepository_1 = __importDefault(require("../repositories/VideoRepository"));
const VideoManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoManagement"));
const VideoControllerRest_1 = __importDefault(require("../controllers/rests/VideoControllerRest"));
const CommentRepository_1 = __importDefault(require("../repositories/CommentRepository"));
const CommentManagement_1 = __importDefault(require("../../inners/use_cases/managements/CommentManagement"));
const CommentControllerRest_1 = __importDefault(require("../controllers/rests/CommentControllerRest"));
const VideoCommentMapRepository_1 = __importDefault(require("../repositories/VideoCommentMapRepository"));
const VideoCommentMapManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoCommentMapManagement"));
const VideoCommentControllerRest_1 = __importDefault(require("../controllers/rests/VideoCommentControllerRest"));
const VideoProductMapControllerRest_1 = __importDefault(require("../controllers/rests/VideoProductMapControllerRest"));
const VideoProductMapManagement_1 = __importDefault(require("../../inners/use_cases/managements/VideoProductMapManagement"));
const VideoProductMapRepository_1 = __importDefault(require("../repositories/VideoProductMapRepository"));
const RoomControllerWebSocket_1 = __importDefault(require("../controllers/web_sockets/RoomControllerWebSocket"));
class RootRoute {
    constructor(app, io, datastoreOne) {
        this.registerRoutes = () => __awaiter(this, void 0, void 0, function* () {
            const routerVersionOne = (0, express_1.Router)();
            const userRepository = new UserRepository_1.default(this.datastoreOne);
            const userManagement = new UserManagement_1.default(userRepository);
            const userControllerRest = new UserControllerRest_1.default((0, express_1.Router)(), userManagement);
            userControllerRest.registerRoutes();
            routerVersionOne.use('/users', userControllerRest.router);
            const videoRepository = new VideoRepository_1.default(this.datastoreOne);
            const videoManagement = new VideoManagement_1.default(videoRepository);
            const videoControllerRest = new VideoControllerRest_1.default((0, express_1.Router)(), videoManagement);
            videoControllerRest.registerRoutes();
            routerVersionOne.use('/videos', videoControllerRest.router);
            const commentRepository = new CommentRepository_1.default(this.datastoreOne);
            const commentManagement = new CommentManagement_1.default(commentRepository, userRepository);
            const commentControllerRest = new CommentControllerRest_1.default((0, express_1.Router)(), commentManagement);
            commentControllerRest.registerRoutes();
            routerVersionOne.use('/comments', commentControllerRest.router);
            const productRepository = new ProductRepository_1.default(this.datastoreOne);
            const productManagement = new ProductManagement_1.default(productRepository);
            const productControllerRest = new ProductControllerRest_1.default((0, express_1.Router)(), productManagement);
            productControllerRest.registerRoutes();
            routerVersionOne.use('/products', productControllerRest.router);
            const videoCommentMapRepository = new VideoCommentMapRepository_1.default(this.datastoreOne);
            const videoCommentMapManagement = new VideoCommentMapManagement_1.default(videoCommentMapRepository);
            const videoCommentMapControllerRest = new VideoCommentControllerRest_1.default((0, express_1.Router)(), videoCommentMapManagement);
            videoCommentMapControllerRest.registerRoutes();
            routerVersionOne.use('/video-comment-maps', videoCommentMapControllerRest.router);
            const videoProductMapRepository = new VideoProductMapRepository_1.default(this.datastoreOne);
            const videoProductMapManagement = new VideoProductMapManagement_1.default(videoProductMapRepository);
            const videoProductMapControllerRest = new VideoProductMapControllerRest_1.default((0, express_1.Router)(), videoProductMapManagement);
            videoProductMapControllerRest.registerRoutes();
            routerVersionOne.use('/video-product-maps', videoProductMapControllerRest.router);
            this.app.use('/api/v1', routerVersionOne);
        });
        this.registerSockets = () => __awaiter(this, void 0, void 0, function* () {
            const userRepository = new UserRepository_1.default(this.datastoreOne);
            const commentRepository = new CommentRepository_1.default(this.datastoreOne);
            const userManagement = new UserManagement_1.default(userRepository);
            const commentManagement = new CommentManagement_1.default(commentRepository, userRepository);
            const roomControllerWebSocket = new RoomControllerWebSocket_1.default(this.io, commentManagement, userManagement);
            roomControllerWebSocket.registerSockets();
        });
        this.app = app;
        this.io = io;
        this.datastoreOne = datastoreOne;
    }
}
exports.default = RootRoute;
//# sourceMappingURL=RootRoute.js.map