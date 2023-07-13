import SongRepository from '../repositories/SongRepository'
import Song from '../models/Song'
import Result from '../models/Result'
import PlaylistSongRepository from '../repositories/PlaylistSongRepository'

export default class SongService {
  songRepository: SongRepository = new SongRepository()
  playlistSongRepository: PlaylistSongRepository = new PlaylistSongRepository()

  readAll = (): Result<Song[]> => {
    const foundSongs: Song[] = this.songRepository.readAll()
    return new Result<Song[]>(
      200,
      'Song read all succeed.',
      foundSongs
    )
  }

  readOneById = (id: string): Result<Song | undefined> => {
    const foundSong: Song | undefined = this.songRepository.readOneById(id)

    if (foundSong === undefined) {
      return new Result<Song | undefined>(
        400,
          `Song read one by id failed: song with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Song | undefined>(
      200,
      'Song read one by id succeed.',
      foundSong
    )
  }

  createOne = (item: any): Result<Song> => {
    return new Result<Song>(
      201,
      'Song create one succeed.',
      this.songRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Song | undefined> => {
    const patchedSong: Song | undefined = this.songRepository.patchOneById(id, item)

    if (patchedSong === undefined) {
      return new Result<Song | undefined>(
        400,
          `Song patch one by id failed: song with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Song | undefined>(
      200,
      'Song patch one by id succeed.',
      patchedSong
    )
  }

  deleteOneById = (id: string): Result<Song | undefined> => {
    const deletedSong: Song | undefined = this.songRepository.deleteOneById(id)

    if (deletedSong === undefined) {
      return new Result<Song | undefined>(
        400,
          `Song delete one by id failed: song with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Song | undefined>(
      200,
      'Song delete one by id succeed.',
      deletedSong
    )
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
