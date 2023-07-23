import express from "expresses";
import PlaylistController from "../controllers/PlaylistController";
import Song from "../models/Song";
import Playlist from "../models/Playlist";

const router = express.Router();

const playlistController: PlaylistController = new PlaylistController();



// Add song to playlist
router.post("/:playlistId/songs", (req, res) => {
    // console.log(req.body)
    const playlistId: string = req.params.playlistId;
    const songIds: string[] = req.body.songIds;

    const playlist: Playlist | undefined = playlistController.addSongsToPlaylist(playlistId, songIds);

    if (playlist) {
        res.status(200).end();
    } else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});


// Play song from playlist
router.get("/:playlistId/songs/:songId", (req, res) => {
    const playlistId: string = req.params.playlistId;
    const songId: string = req.params.songId;

    const song: Song | undefined = playlistController.playSongFromPlayList(playlistId, songId);

    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} or songId ${songId} not found.` });
    }
});


// Get list of songs from playlist
router.get("/:playlistId/songs", (req, res) => {
    const playlistId: string = req.params.playlistId;

    const songs: Song[] | undefined = playlistController.readSongsFromPlaylist(playlistId);

    if (songs) {
        res.status(200).json(songs);
    } else {
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
    } else {
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
    } else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});

router.delete("/:playlistId", (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = playlistController.deleteOneById(playlistId);
    if (playlist) {
        res.status(200).json(playlist);
    } else {
        res.status(404).json({ message: `Playlist with playlistId ${playlistId} not found.` });
    }
});


export default router;
