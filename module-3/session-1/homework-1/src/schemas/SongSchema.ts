import {model, Schema} from "mongoose";
import Song from "../models/Song";

const songSchema = new Schema<Song>({
    title: {
        type: Schema.Types.String,
    }
})

export default model<Song>('song', songSchema)
