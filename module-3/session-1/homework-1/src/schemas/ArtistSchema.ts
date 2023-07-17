import mongoose, {model, Schema} from "mongoose";
import Album from "../models/Album";
import Artist from "../models/Artist";

const artistSchema = new Schema<Artist>({
    name: {
        type: Schema.Types.String,
    },
    dob: {
        type: Schema.Types.Date,
    },
})

export default model<Artist>('artist', artistSchema)