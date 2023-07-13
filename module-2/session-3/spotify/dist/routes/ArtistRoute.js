"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArtistController_1 = __importDefault(require("../controllers/ArtistController"));
const router = express_1.default.Router();
const artistController = new ArtistController_1.default();
router.get("/", (req, res) => {
    res.status(200).json(artistController.readAll());
});
router.get("/:artistId", (req, res) => {
    const artistId = req.params.artistId;
    const artist = artistController.readOneById(artistId);
    if (artist) {
        res.status(200).json(artist);
    }
    else {
        res.status(404).json({ message: `Artist with artistId ${artistId} not found.` });
    }
});
router.post("/", (req, res) => {
    const artist = artistController.createOne(req.body);
    res.status(201).json(artist);
});
router.patch("/:artistId", (req, res) => {
    const artistId = req.params.artistId;
    const artist = artistController.patchOneById(artistId, req.body);
    if (artist) {
        res.status(200).json(artist);
    }
    else {
        res.status(404).json({ message: `Artist with artistId ${artistId} not found.` });
    }
});
router.delete("/:artistId", (req, res) => {
    const artistId = req.params.artistId;
    const artist = artistController.deleteOneById(artistId);
    if (artist) {
        res.status(200).json(artist);
    }
    else {
        res.status(404).json({ message: `Artist with artistId ${artistId} not found.` });
    }
});
exports.default = router;
