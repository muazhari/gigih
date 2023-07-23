import { type Application, Router } from 'express'
import ProductController from '../controllers/ProductController'
import type OneDatastore from '../datastores/OneDatastore'
import ProductRepository from '../repositories/ProductRepository'
import ProductManagement from '../../inners/use_cases/managements/ProductManagement'
import UserRepository from '../repositories/UserRepository'
import UserManagement from '../../inners/use_cases/managements/UserManagement'
import UserController from '../controllers/UserController'
import VideoRepository from '../repositories/VideoRepository'
import VideoManagement from '../../inners/use_cases/managements/VideoManagement'
import VideoController from '../controllers/VideoController'
import CommentRepository from '../repositories/CommentRepository'
import CommentManagement from '../../inners/use_cases/managements/CommentManagement'
import CommentController from '../controllers/CommentController'
import VideoCommentMapRepository from '../repositories/VideoCommentMapRepository'
import VideoCommentMapManagement from '../../inners/use_cases/managements/VideoCommentMapManagement'
import VideoCommentMapController from '../controllers/VideoCommentController'
import VideoProductMapController from '../controllers/VideoProductMapController'
import VideoProductMapManagement from '../../inners/use_cases/managements/VideoProductMapManagement'
import VideoProductMapRepository from '../repositories/VideoProductMapRepository'

export default class RootRoute {
  app: Application
  datastoreOne: OneDatastore

  constructor (app: Application, datastoreOne: OneDatastore) {
    this.app = app
    this.datastoreOne = datastoreOne
  }

  registerRoutes = async (): Promise<void> => {
    const router = Router()

    const userRepository: UserRepository = new UserRepository(this.datastoreOne)
    const userManagement: UserManagement = new UserManagement(userRepository)
    const userController: UserController = new UserController(Router(), userManagement)
    userController.registerRoutes()
    router.use('/users', userController.router)

    const videoRepository: VideoRepository = new VideoRepository(this.datastoreOne)
    const videoManagement: VideoManagement = new VideoManagement(videoRepository)
    const videoController: VideoController = new VideoController(Router(), videoManagement)
    videoController.registerRoutes()
    router.use('/videos', videoController.router)

    const commentRepository: CommentRepository = new CommentRepository(this.datastoreOne)
    const commentManagement: CommentManagement = new CommentManagement(commentRepository, userRepository)
    const commentController: CommentController = new CommentController(Router(), commentManagement)
    commentController.registerRoutes()
    router.use('/comments', commentController.router)

    const productRepository: ProductRepository = new ProductRepository(this.datastoreOne)
    const productManagement: ProductManagement = new ProductManagement(productRepository)
    const productController: ProductController = new ProductController(Router(), productManagement)
    productController.registerRoutes()
    router.use('/products', productController.router)

    const videoCommentMapRepository: VideoCommentMapRepository = new VideoCommentMapRepository(this.datastoreOne)
    const videoCommentMapManagement: VideoCommentMapManagement = new VideoCommentMapManagement(videoCommentMapRepository)
    const videoCommentMapController: VideoCommentMapController = new VideoCommentMapController(Router(), videoCommentMapManagement)
    videoCommentMapController.registerRoutes()
    router.use('/video-comment-maps', videoCommentMapController.router)

    const videoProductMapRepository: VideoProductMapRepository = new VideoProductMapRepository(this.datastoreOne)
    const videoProductMapManagement: VideoProductMapManagement = new VideoProductMapManagement(videoProductMapRepository)
    const videoProductMapController: VideoProductMapController = new VideoProductMapController(Router(), videoProductMapManagement)
    videoProductMapController.registerRoutes()
    router.use('/video-product-maps', videoProductMapController.router)

    this.app.use('/api/v1', router)
  }
}
