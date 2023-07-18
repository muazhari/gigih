import {model, Schema} from "mongoose";
import Genre from "../models/Genre";

const genreSchema = new Schema<Genre>({
    name: {
        type: Schema.Types.String,
    }
})

export default model<Genre>('genre', genreSchema)
