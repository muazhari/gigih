import { randomUUID } from "crypto";
import Playlist from "../models/Playlist";
import ArtistRepository from "./ArtistRepository";
import SongRepository from "./SongRepository";

export default class PlaylistRepository {

    songRepository: SongRepository = new SongRepository();

    data: Playlist[] = [
        new Playlist("0", ["0"]),
        new Playlist("1", ["0", "1"]),
    ]

    readAll(): Playlist[] {
        return this.data;
    }

    readOneById(id: string): Playlist | undefined {
        return this.data.find((item) => item.id === id);
    }

    createOne(item: Playlist): Playlist {
        item.id = randomUUID().toString();
        this.data.push(item);
        return item;
    }

    patchOneById(id: string, item: Playlist): Playlist | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            foundItem.patchFrom(item);
            return foundItem;
        }
        return undefined;
    }

    deleteOneById(id: string): Playlist | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        }
        return undefined;
    }

}