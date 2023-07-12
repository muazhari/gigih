import ArtistRepository from "../repositories/ArtistRepository";


export default class ArtistController {
    artistRepository: ArtistRepository = new ArtistRepository();

    readAll() {
        return this.artistRepository.readAll();
    }

    readOneById(id: string) {
        return this.artistRepository.readOneById(id);
    }

    createOne(item: any) {
        return this.artistRepository.createOne(item);
    }

    patchOneById(id: string, item: any) {
        return this.artistRepository.patchOneById(id, item);
    }

    deleteOneById(id: string) {
        return this.artistRepository.deleteOneById(id);
    }

}