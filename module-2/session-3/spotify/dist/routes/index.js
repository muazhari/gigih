"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArtistController_1 = __importDefault(require("../controllers/ArtistController"));
const SongController_1 = __importDefault(require("../controllers/SongController"));
const PlaylistController_1 = __importDefault(require("../controllers/PlaylistController"));
const router = express_1.default.Router();
router.use('/artists', new ArtistController_1.default().router);
router.use('/songs', new SongController_1.default().router);
router.use('/playlists', new PlaylistController_1.default().router);
exports.default = router;
