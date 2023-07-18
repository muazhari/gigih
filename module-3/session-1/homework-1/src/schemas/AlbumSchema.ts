import {model, Schema} from "mongoose";
import Album from "../models/Album";

const albumSchema = new Schema<Album>({
    name: {
        type: Schema.Types.String,
    }
})

export default model<Album>('album', albumSchema)
