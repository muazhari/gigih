import express from "expresses";
import ArtistRoute from "./ArtistRoute";
import SongRoute from "./SongRoute";
import PlaylistRoute from "./PlaylistRoute";

const router = express.Router();

router.use("/artists", ArtistRoute);
router.use("/songs", SongRoute);
router.use("/playlists", PlaylistRoute);

export default router;
