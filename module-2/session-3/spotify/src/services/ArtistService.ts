import ArtistRepository from '../repositories/ArtistRepository'
import type Artist from '../models/Artist'
import Result from '../models/Result'

export default class ArtistService {
  artistRepository: ArtistRepository = new ArtistRepository()

  readAll = (): Result<Artist[]> => {
    const foundArtists: Artist[] = this.artistRepository.readAll()
    return new Result<Artist[]>(
      200,
      'Artist read all succeed.',
      foundArtists
    )
  }

  readOneById = (id: string): Result<Artist | undefined> => {
    const foundArtist: Artist | undefined = this.artistRepository.readOneById(id)

    if (foundArtist === undefined) {
      return new Result<Artist | undefined>(
        400,
            `Artist read one by id failed: artist with id ${id} is undefined.`,
            undefined
      )
    }

    return new Result<Artist | undefined>(
      200,
      'Artist read one by id succeed.',
      foundArtist
    )
  }

  createOne = (item: any): Result<Artist> => {
    return new Result<Artist>(
      201,
      'Artist create one succeed.',
      this.artistRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Artist | undefined> => {
    const patchedArtist: Artist | undefined = this.artistRepository.patchOneById(id, item)

    if (patchedArtist === undefined) {
      return new Result<Artist | undefined>(
        400,
          `Artist patch one by id failed: artist with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Artist | undefined>(
      200,
      'Artist patch one by id succeed.',
      patchedArtist
    )
  }

  deleteOneById = (id: string): Result<Artist | undefined> => {
    const deletedArtist: Artist | undefined = this.artistRepository.deleteOneById(id)

    if (deletedArtist === undefined) {
      return new Result<Artist | undefined>(
        400,
          `Artist delete one by id failed: artist with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Artist | undefined>(
      200,
      'Artist delete one by id succeed.',
      deletedArtist
    )
  }
}
