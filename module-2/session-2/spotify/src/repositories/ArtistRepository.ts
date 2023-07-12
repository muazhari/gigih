import { randomUUID } from "crypto";
import Artist from "../models/Artist";

export default class ArtistRepository {
    data: Artist[] = [
        new Artist("0", "name0"),
        new Artist("1", "name1"),
    ]

    readAll(): Artist[] {
        return this.data;
    }

    readOneById(id: string): Artist | undefined {
        return this.data.find((item) => item.id === id);
    }

    createOne(item: Artist): Artist {
        item.id = randomUUID().toString();
        this.data.push(item);
        return item;
    }

    patchOneById(id: string, item: Artist): Artist | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            foundItem.patchFrom(item);
            return foundItem;
        }
        return undefined;
    }

    deleteOneById(id: string): Artist | undefined {
        const foundItem = this.readOneById(id);
        if (foundItem) {
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        }
        return undefined;
    }
}