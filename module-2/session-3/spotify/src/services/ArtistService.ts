import type ArtistRepository from '../repositories/ArtistRepository'
import type Artist from '../models/Artist'
import Result from '../models/Result'

export default class ArtistService {
  artistRepository: ArtistRepository

  constructor (artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository
  }

  readAll = (): Result<Artist[]> => {
    const foundArtists: Artist[] = this.artistRepository.readAll()
    return new Result<Artist[]>(
      200,
      'Artist read all succeed.',
      foundArtists
    )
  }

  readOneById = (id: string): Result<Artist | undefined> => {
    try {
      const foundArtist: Artist = this.artistRepository.readOneById(id)
      return new Result<Artist >(
        200,
        'Artist read one by id succeed.',
        foundArtist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
            `Artist read one by id failed: artist with id ${id} is undefined.`,
            undefined
      )
    }
  }

  createOne = (item: any): Result<Artist> => {
    return new Result<Artist>(
      201,
      'Artist create one succeed.',
      this.artistRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Artist | undefined> => {
    try {
      const patchedArtist: Artist = this.artistRepository.patchOneById(id, item)
      return new Result<Artist >(
        200,
        'Artist patch one by id succeed.',
        patchedArtist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Artist patch one by id failed: artist with id ${id} is undefined.`,
          undefined
      )
    }
  }

  deleteOneById = (id: string): Result<Artist | undefined> => {
    try {
      const deletedArtist: Artist = this.artistRepository.deleteOneById(id)
      return new Result<Artist>(
        200,
        'Artist delete one by id succeed.',
        deletedArtist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Artist delete one by id failed: artist with id ${id} is undefined.`,
          undefined
      )
    }
  }
}
