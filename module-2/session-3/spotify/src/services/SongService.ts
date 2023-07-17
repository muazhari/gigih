import type SongRepository from '../repositories/SongRepository'
import Song from '../models/Song'
import Result from '../models/Result'
import type PlaylistSongRepository from '../repositories/PlaylistSongRepository'

export default class SongService {
  songRepository: SongRepository
  playlistSongRepository: PlaylistSongRepository

  constructor (
    songRepository: SongRepository,
    playlistSongRepository: PlaylistSongRepository
  ) {
    this.songRepository = songRepository
    this.playlistSongRepository = playlistSongRepository
  }

  readAll = (): Result<Song[]> => {
    const foundSongs: Song[] = this.songRepository.readAll()
    return new Result<Song[]>(
      200,
      'Song read all succeed.',
      foundSongs
    )
  }

  readOneById = (id: string): Result<Song | undefined> => {
    try {
      const foundSong: Song = this.songRepository.readOneById(id)
      return new Result<Song >(
        200,
        'Song read one by id succeed.',
        foundSong
      )
    } catch (error) {
      return new Result<undefined>(
        400,
            `Song read one by id failed: song with id ${id} is undefined.`,
            undefined
      )
    }
  }

  createOne = (item: any): Result<Song> => {
    return new Result<Song>(
      201,
      'Song create one succeed.',
      this.songRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Song | undefined> => {
    try {
      const patchedSong: Song = this.songRepository.patchOneById(id, item)
      return new Result<Song >(
        200,
        'Song patch one by id succeed.',
        patchedSong
      )
    } catch (error) {
      return new Result< undefined>(
        400,
          `Song patch one by id failed: song with id ${id} is undefined.`,
          undefined
      )
    }
  }

  deleteOneById = (id: string): Result<Song | undefined> => {
    try {
      const deletedSong: Song = this.songRepository.deleteOneById(id)
      return new Result<Song >(
        200,
        'Song delete one by id succeed.',
        deletedSong
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Song delete one by id failed: song with id ${id} is undefined.`,
          undefined
      )
    }
  }

  readAllSortedDescendByPlayCount = (): Result<Song[] | undefined> => {
    const foundSongs: Song[] | undefined = this.songRepository.readAll()
    const foundPlaylistSongs = this.playlistSongRepository.readAll()

    const songsSortedDescendingByPlayCount = foundSongs
      ?.map(song => {
        const playCount = foundPlaylistSongs
          ?.filter(playlistSong => playlistSong.songId === song.id)
          .reduce((acc, curr) => acc + (curr.playCount ?? 0), 0)
        return { ...song, playCount }
      })
      .sort((a, b) => b.playCount - a.playCount)
      .map(song => new Song(song.id, song.title, song.artistIds, song.url))

    return new Result<Song[] | undefined>(
      200,
      'Song read all sorted descend by play count succeed.',
      songsSortedDescendingByPlayCount
    )
  }
}
