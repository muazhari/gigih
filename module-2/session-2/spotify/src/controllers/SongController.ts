import SongRepository from "../repositories/SongRepository";


export default class SongController {
    songRepository: SongRepository = new SongRepository();

    readAll() {
        return this.songRepository.readAll();
    }

    readOneById(id: string) {
        return this.songRepository.readOneById(id);
    }

    createOne(item: any) {
        return this.songRepository.createOne(item);
    }

    patchOneById(id: string, item: any) {
        return this.songRepository.patchOneById(id, item);
    }

    deleteOneById(id: string) {
        return this.songRepository.deleteOneById(id);
    }

}