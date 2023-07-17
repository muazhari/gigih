import mongoose, {model, Schema} from "mongoose";
import Album from "../models/Album";
import Artist from "../models/Artist";
import ArtistGenreMap from "../models/ArtistGenreMap";

const artistGenreMapSchema = new Schema<ArtistGenreMap>({
    artistId: {
        type: Schema.Types.ObjectId,
    },
    genreId: {
        type: Schema.Types.ObjectId,
    }
})

export default model<ArtistGenreMap>('artist_genre_map', artistGenreMapSchema)
