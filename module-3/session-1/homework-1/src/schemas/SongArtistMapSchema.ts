import {model, Schema} from "mongoose";
import SongArtistMap from "../models/SongArtistMap";

const songArtistMapSchema = new Schema<SongArtistMap>({
    songId: {
        type: Schema.Types.ObjectId,
    },
    artistId: {
        type: Schema.Types.ObjectId,
    }
})

export default model<SongArtistMap>('song_artist_maps', songArtistMapSchema)
