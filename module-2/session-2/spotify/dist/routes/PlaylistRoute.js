"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PlaylistController_1 = __importDefault(require("../controllers/PlaylistController"));
const router = express_1.default.Router();
const playlistController = new PlaylistController_1.default();
// Add song to playlist
router.post("/:playlistId/songs", (req, res) => {
    // console.log(req.body)
    const playlistId = req.params.playlistId;
    const songIds = req.body.songIds;
    const playlist = playlistController.addSongsToPlaylist(playlistId, songIds);
    if (playlist) {
        res.status(200).end();
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});
// Play song from playlist
router.get("/:playlistId/songs/:songId", (req, res) => {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;
    const song = playlistController.playSongFromPlayList(playlistId, songId);
    if (song) {
        res.status(200).json(song);
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} or songId ${songId} not found.` });
    }
});
// Get list of songs from playlist
router.get("/:playlistId/songs", (req, res) => {
    const playlistId = req.params.playlistId;
    const songs = playlistController.readSongsFromPlaylist(playlistId);
    if (songs) {
        res.status(200).json(songs);
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});
router.get("/", (req, res) => {
    res.status(200).json(playlistController.readAll());
});
router.get("/:playlistId", (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = playlistController.readOneById(playlistId);
    if (playlist) {
        res.status(200).json(playlist);
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});
router.post("/", (req, res) => {
    const playlist = playlistController.createOne(req.body);
    res.status(201).json(playlist);
});
router.patch("/:playlistId", (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = playlistController.patchOneById(playlistId, req.body);
    if (playlist) {
        res.status(200).json(playlist);
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});
router.delete("/:playlistId", (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = playlistController.deleteOneById(playlistId);
    if (playlist) {
        res.status(200).json(playlist);
    }
    else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});
exports.default = router;
