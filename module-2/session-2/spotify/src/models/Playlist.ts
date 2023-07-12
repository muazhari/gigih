import Artist from "./Artist";
import BaseModel from "./BaseModel";


export default class Playlist extends BaseModel {
    id: string | undefined;
    songIds: string[] | undefined;

    constructor(
        id: string | undefined,
        songIds: string[] | undefined
    ) {
        super();
        this.id = id;
        this.songIds = songIds;
    }
}