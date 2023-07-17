import {model, Schema} from "mongoose";
import PopularSong from "../models/PopularSong";

const popularSongSchema = new Schema<PopularSong>({
    songId: {
        type: Schema.Types.ObjectId,
    },
    playCount: {
        type: Schema.Types.Number,
    },
    periodOfTime: {
        type: Schema.Types.Number,
    }
})

export default model<PopularSong>('popular_song', popularSongSchema)
