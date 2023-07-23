import { type Application, Router } from 'express'
import ProductControllerRest from '../controllers/rests/ProductControllerRest'
import type OneDatastore from '../datastores/OneDatastore'
import ProductRepository from '../repositories/ProductRepository'
import ProductManagement from '../../inners/use_cases/managements/ProductManagement'
import UserRepository from '../repositories/UserRepository'
import UserManagement from '../../inners/use_cases/managements/UserManagement'
import UserControllerRest from '../controllers/rests/UserControllerRest'
import VideoRepository from '../repositories/VideoRepository'
import VideoManagement from '../../inners/use_cases/managements/VideoManagement'
import VideoControllerRest from '../controllers/rests/VideoControllerRest'
import CommentRepository from '../repositories/CommentRepository'
import CommentManagement from '../../inners/use_cases/managements/CommentManagement'
import CommentControllerRest from '../controllers/rests/CommentControllerRest'
import VideoCommentMapRepository from '../repositories/VideoCommentMapRepository'
import VideoCommentMapManagement from '../../inners/use_cases/managements/VideoCommentMapManagement'
import VideoCommentMapController from '../controllers/rests/VideoCommentControllerRest'
import VideoProductMapControllerRest from '../controllers/rests/VideoProductMapControllerRest'
import VideoProductMapManagement from '../../inners/use_cases/managements/VideoProductMapManagement'
import VideoProductMapRepository from '../repositories/VideoProductMapRepository'
import type socketIo from 'socket.io'
import RoomControllerWebSocket from '../controllers/web_sockets/RoomControllerWebSocket'

export default class RootRoute {
  app: Application
  io: socketIo.Server
  datastoreOne: OneDatastore

  constructor (app: Application, io: socketIo.Server, datastoreOne: OneDatastore) {
    this.app = app
    this.io = io
    this.datastoreOne = datastoreOne
  }

  registerRoutes = async (): Promise<void> => {
    const routerVersionOne = Router()

    const userRepository: UserRepository = new UserRepository(this.datastoreOne)
    const userManagement: UserManagement = new UserManagement(userRepository)
    const userControllerRest: UserControllerRest = new UserControllerRest(Router(), userManagement)
    userControllerRest.registerRoutes()
    routerVersionOne.use('/users', userControllerRest.router)

    const videoRepository: VideoRepository = new VideoRepository(this.datastoreOne)
    const videoManagement: VideoManagement = new VideoManagement(videoRepository)
    const videoControllerRest: VideoControllerRest = new VideoControllerRest(Router(), videoManagement)
    videoControllerRest.registerRoutes()
    routerVersionOne.use('/videos', videoControllerRest.router)

    const commentRepository: CommentRepository = new CommentRepository(this.datastoreOne)
    const commentManagement: CommentManagement = new CommentManagement(commentRepository, userRepository)
    const commentControllerRest: CommentControllerRest = new CommentControllerRest(Router(), commentManagement)
    commentControllerRest.registerRoutes()
    routerVersionOne.use('/comments', commentControllerRest.router)

    const productRepository: ProductRepository = new ProductRepository(this.datastoreOne)
    const productManagement: ProductManagement = new ProductManagement(productRepository)
    const productControllerRest: ProductControllerRest = new ProductControllerRest(Router(), productManagement)
    productControllerRest.registerRoutes()
    routerVersionOne.use('/products', productControllerRest.router)

    const videoCommentMapRepository: VideoCommentMapRepository = new VideoCommentMapRepository(this.datastoreOne)
    const videoCommentMapManagement: VideoCommentMapManagement = new VideoCommentMapManagement(videoCommentMapRepository)
    const videoCommentMapControllerRest: VideoCommentMapController = new VideoCommentMapController(Router(), videoCommentMapManagement)
    videoCommentMapControllerRest.registerRoutes()
    routerVersionOne.use('/video-comment-maps', videoCommentMapControllerRest.router)

    const videoProductMapRepository: VideoProductMapRepository = new VideoProductMapRepository(this.datastoreOne)
    const videoProductMapManagement: VideoProductMapManagement = new VideoProductMapManagement(videoProductMapRepository)
    const videoProductMapControllerRest: VideoProductMapControllerRest = new VideoProductMapControllerRest(Router(), videoProductMapManagement)
    videoProductMapControllerRest.registerRoutes()
    routerVersionOne.use('/video-product-maps', videoProductMapControllerRest.router)

    this.app.use('/api/v1', routerVersionOne)
  }

  registerSockets = async (): Promise<void> => {
    const userRepository: UserRepository = new UserRepository(this.datastoreOne)
    const commentRepository: CommentRepository = new CommentRepository(this.datastoreOne)
    const userManagement: UserManagement = new UserManagement(userRepository)
    const commentManagement: CommentManagement = new CommentManagement(commentRepository, userRepository)
    const roomControllerWebSocket: RoomControllerWebSocket = new RoomControllerWebSocket(this.io, commentManagement, userManagement)
    roomControllerWebSocket.registerSockets()
  }
}
