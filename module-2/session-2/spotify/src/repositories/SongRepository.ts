import { randomUUID } from "crypto";
import Song from "../models/Song";
import ArtistRepository from "./ArtistRepository";

export default class SongRepository {

    artistRepository: ArtistRepository = new ArtistRepository();

    data: Song[] = [
        new Song("0", "title0", ["0"], "url0"),
        new Song("1", "title1", ["0", "1"], "url1"),
    ]

    readAll(): Song[] {
        return this.data;
    }

    readOneById(id: string): Song | undefined {
        return this.data.find((item) => item.id === id);
    }

    createOne(item: Song): Song {
        item.id = randomUUID().toString();
        this.data.push(item);
        return item;
    }

    patchOneById(id: string, item: Song): Song | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            foundItem.patchFrom(item);
            return foundItem;
        }
        return undefined;
    }

    deleteOneById(id: string): Song | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        }
        return undefined;
    }

}