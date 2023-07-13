"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SongController_1 = __importDefault(require("../controllers/SongController"));
const router = express_1.default.Router();
const songController = new SongController_1.default();
router.get("/", (req, res) => {
    res.status(200).json(songController.readAll());
});
router.get("/:songId", (req, res) => {
    const songId = req.params.songId;
    const song = songController.readOneById(songId);
    if (song) {
        res.status(200).json(song);
    }
    else {
        res.status(404).json({ message: `Song with songId ${songId} not found.` });
    }
});
router.post("/", (req, res) => {
    const song = songController.createOne(req.body);
    res.status(201).json(song);
});
router.patch("/:songId", (req, res) => {
    const songId = req.params.songId;
    const song = songController.patchOneById(songId, req.body);
    if (song) {
        res.status(200).json(song);
    }
    else {
        res.status(404).json({ message: `Song with songId ${songId} not found.` });
    }
});
router.delete("/:songId", (req, res) => {
    const songId = req.params.songId;
    const song = songController.deleteOneById(songId);
    if (song) {
        res.status(200).json(song);
    }
    else {
        res.status(404).json({ message: `Song with songId ${songId} not found.` });
    }
});
exports.default = router;
