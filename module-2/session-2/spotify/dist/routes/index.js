"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArtistRoute_1 = __importDefault(require("./ArtistRoute"));
const SongRoute_1 = __importDefault(require("./SongRoute"));
const PlaylistRoute_1 = __importDefault(require("./PlaylistRoute"));
const router = express_1.default.Router();
router.use("/artists", ArtistRoute_1.default);
router.use("/songs", SongRoute_1.default);
router.use("/playlists", PlaylistRoute_1.default);
exports.default = router;
