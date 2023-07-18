import {model, Schema} from "mongoose";
import ArtistGenreMap from "../models/ArtistGenreMap";

const artistGenreMapSchema = new Schema<ArtistGenreMap>({
    artistId: {
        type: Schema.Types.ObjectId,
    },
    genreId: {
        type: Schema.Types.ObjectId,
    }
})

export default model<ArtistGenreMap>('artist_genre_maps', artistGenreMapSchema)
