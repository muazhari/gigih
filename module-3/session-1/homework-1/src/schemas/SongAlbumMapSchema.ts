import mongoose, {model, Schema} from "mongoose";
import Album from "../models/Album";
import SongAlbumMap from "../models/SongAlbumMap";

const songAlbumMapSchema = new Schema<SongAlbumMap>({
    songId: {
        type: Schema.Types.ObjectId,
    },
    albumId: {
        type: Schema.Types.ObjectId,
    }
})

export default model<SongAlbumMap>('song_album_map', songAlbumMapSchema)
