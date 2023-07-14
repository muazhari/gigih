import type Playlist from '../models/Playlist'

import PlaylistRepository from '../repositories/PlaylistRepository'

import Result from '../models/Result'
import SongRepository from '../repositories/SongRepository'
import type Song from '../models/Song'
import PlaylistSongRepository from '../repositories/PlaylistSongRepository'
import { randomUUID } from 'crypto'
import PlaylistSong from '../models/PlaylistSong'

export default class PlaylistService {
  playlistRepository: PlaylistRepository = new PlaylistRepository()
  songRepository: SongRepository = new SongRepository()
  playlistSongRepository: PlaylistSongRepository = new PlaylistSongRepository()

  readAll = (): Result<Playlist[]> => {
    const foundPlaylists: Playlist[] = this.playlistRepository.readAll()
    return new Result<Playlist[]>(
      200,
      'Transaction read all succeed.',
      foundPlaylists
    )
  }

  readOneById = (id: string): Result<Playlist | undefined> => {
    const foundPlaylist: Playlist | undefined = this.playlistRepository.readOneById(id)

    if (foundPlaylist === undefined) {
      return new Result<Playlist | undefined>(
        400,
          `Playlist read one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Playlist | undefined>(
      200,
      'Transaction read one by id succeed.',
      foundPlaylist
    )
  }

  createOne = (item: any): Result<Playlist> => {
    return new Result<Playlist>(
      201,
      'Transaction create one succeed.',
      this.playlistRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Playlist | undefined> => {
    const patchedPlaylist: Playlist | undefined = this.playlistRepository.patchOneById(id, item)

    if (patchedPlaylist === undefined) {
      return new Result<Playlist | undefined>(
        400,
          `Playlist patch one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Playlist | undefined>(
      200,
      'Transaction patch one by id succeed.',
      patchedPlaylist
    )
  }

  deleteOneById = (id: string): Result<Playlist | undefined> => {
    const deletedPlaylist: Playlist | undefined = this.playlistRepository.deleteOneById(id)

    if (deletedPlaylist === undefined) {
      return new Result<Playlist | undefined>(
        400,
          `Playlist delete one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }

    return new Result<Playlist | undefined>(
      200,
      'Transaction delete one by id succeed.',
      deletedPlaylist
    )
  }

  addManySongToPlaylist = (playlistId: string, songIds: string[]): Result<Playlist | undefined> => {
    const playlist: Playlist | undefined = this.playlistRepository.readOneById(playlistId)

    if (playlist === undefined) {
      return new Result<undefined>(
        400,
            `Playlist add many song to playlist failed: playlist with playlistId ${playlistId} is undefined.`,
            undefined
      )
    }

    for (const songId of songIds) {
      const song: Song | undefined = this.songRepository.readOneById(songId)
      if (song === undefined) {
        return new Result<undefined>(
          400,
            `Playlist add many song to playlist failed: song with songId ${songId} is undefined.`,
            undefined
        )
      }
    }

    songIds.forEach((songId) => {
      this.playlistSongRepository.createOne(
        new PlaylistSong(
          randomUUID(),
          playlistId,
          songId,
          0
        )
      )
    })

    return new Result<Playlist>(
      200,
      'Transaction add many song to playlist succeed.',
      playlist
    )
  }

  readAllSongFromPlaylist = (playlistId: string): Result<Song[] | undefined> => {
    const playlist: Playlist | undefined = this.playlistRepository.readOneById(playlistId)

    if (playlist === undefined) {
      return new Result<undefined>(
        400,
        'Transaction read all song from playlist failed: playlist undefined.',
        undefined
      )
    }

    const playlistSongs: PlaylistSong[] = this.playlistSongRepository.readAllByPlaylistId(playlistId)

    const songs: Song[] = []

    for (const playlistSong of playlistSongs) {
      if (playlistSong.songId === undefined) {
        return new Result<undefined>(
          400,
          'Transaction read all song from playlist failed: songId from playlistSong is undefined.',
          undefined
        )
      }

      const song = this.songRepository.readOneById(playlistSong.songId)
      if (song === undefined) {
        return new Result<undefined>(
          400,
                `Playlist read all song from playlist failed: song with songId ${playlistSong.songId} is undefined.`,
                undefined
        )
      }

      songs.push(song)
    }

    return new Result<Song[]>(
      200,
      'Transaction read all song from playlist succeed.',
      songs
    )
  }

  playOneSongFromPlaylist = (playlistId: string, songId: string): Result<Song | undefined> => {
    const playlist: Playlist | undefined = this.playlistRepository.readOneById(playlistId)

    if (playlist === undefined) {
      return new Result<undefined>(
        400,
            `Playlist play one song from playlist failed: playlist with playlistId ${playlistId} is undefined.`,
            undefined
      )
    }

    const song: Song | undefined = this.songRepository.readOneById(songId)

    if (song === undefined) {
      return new Result<undefined>(
        400,
          `Playlist play one song from playlist failed: song with songId ${songId} is undefined.`,
          undefined
      )
    }

    const playlistSongs: PlaylistSong [] = this.playlistSongRepository.readAllByPlaylistId(playlistId)

    const playlistSong = playlistSongs.filter((playlistSong) => {
      if (playlistSong.songId === undefined) {
        return new Result<undefined>(
          400,
          'Transaction play one song from playlist failed: songId from playlistSong is undefined.',
          undefined
        )
      }

      return playlistSong.songId === songId
    })[0]

    if (playlistSong === undefined) {
      return new Result<undefined>(
        400,
            `Playlist play one song from playlist failed: playlistSong with songId ${songId} is undefined.`,
            undefined
      )
    }

    if (playlistSong.id === undefined) {
      return new Result<undefined>(
        400,
        'Transaction play one song from playlist failed: id from playlistSong is undefined.',
        undefined
      )
    }

    if (playlistSong.playCount === undefined) {
      playlistSong.playCount = 0
    }

    if (playlistSong.songId === songId) {
      playlistSong.playCount += 1
      this.playlistSongRepository.patchOneById(playlistSong.id, playlistSong)
    }

    return new Result<Song>(
      200,
      'Transaction play one song from playlist succeed.',
      song
    )
  }
}
