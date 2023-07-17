import type Playlist from '../models/Playlist'

import type PlaylistRepository from '../repositories/PlaylistRepository'

import Result from '../models/Result'
import type SongRepository from '../repositories/SongRepository'
import type Song from '../models/Song'
import type PlaylistSongRepository from '../repositories/PlaylistSongRepository'
import { randomUUID } from 'crypto'
import PlaylistSong from '../models/PlaylistSong'
import Artist from '../models/Artist'

export default class PlaylistService {
  playlistRepository: PlaylistRepository
  songRepository: SongRepository
  playlistSongRepository: PlaylistSongRepository

  constructor (
    playlistRepository: PlaylistRepository,
    songRepository: SongRepository,
    playlistSongRepository: PlaylistSongRepository
  ) {
    this.playlistRepository = playlistRepository
    this.songRepository = songRepository
    this.playlistSongRepository = playlistSongRepository
  }

  readAll = (): Result<Playlist[]> => {
    const foundPlaylists: Playlist[] = this.playlistRepository.readAll()
    return new Result<Playlist[]>(
      200,
      'Playlist read all succeed.',
      foundPlaylists
    )
  }

  readOneById = (id: string): Result<Playlist | undefined> => {
    try {
      const foundPlaylist: Playlist = this.playlistRepository.readOneById(id)
      return new Result<Playlist >(
        200,
        'Playlist read one by id succeed.',
        foundPlaylist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Playlist read one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }
  }

  createOne = (item: any): Result<Playlist> => {
    return new Result<Playlist>(
      201,
      'Playlist create one succeed.',
      this.playlistRepository.createOne(item)
    )
  }

  patchOneById = (id: string, item: any): Result<Playlist | undefined> => {
    try {
      const patchedPlaylist: Playlist = this.playlistRepository.patchOneById(id, item)
      return new Result<Playlist >(
        200,
        'Playlist patch one by id succeed.',
        patchedPlaylist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Playlist patch one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }
  }

  deleteOneById = (id: string): Result<Playlist | undefined> => {
    try {
      const deletedPlaylist: Playlist = this.playlistRepository.deleteOneById(id)
      return new Result<Playlist>(
        200,
        'Playlist delete one by id succeed.',
        deletedPlaylist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Playlist delete one by id failed: playlist with id ${id} is undefined.`,
          undefined
      )
    }
  }

  addManySongToPlaylist = (playlistId: string, songIds: string[]): Result<Playlist | undefined> => {
    try {
      const playlist: Playlist = this.playlistRepository.readOneById(playlistId)

      for (const songId of songIds) {
        try {
          this.songRepository.readOneById(songId)
        } catch (error) {
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
        'Playlist add many song to playlist succeed.',
        playlist
      )
    } catch (error) {
      return new Result<undefined>(
        400,
          `Playlist add many song to playlist failed: playlist with playlistId ${playlistId} is undefined.`,
          undefined
      )
    }
  }

  // @ts-expect-error/Too nested return statements
  readAllSongFromPlaylist = (playlistId: string): Result<Song[] | undefined> => {
    try {
      this.playlistRepository.readOneById(playlistId)
      const playlistSongs: PlaylistSong[] = this.playlistSongRepository.readAllByPlaylistId(playlistId)

      const songs: Song[] = []

      // eslint-disable-next-line no-unreachable-loop
      for (const playlistSong of playlistSongs) {
        if (playlistSong.songId === undefined) {
          return new Result<undefined>(
            400,
            'Playlist read all song from playlist failed: songId from playlistSong is undefined.',
            undefined
          )
        }

        try {
          const song = this.songRepository.readOneById(playlistSong.songId)
          songs.push(song)
          return new Result<Song[]>(
            200,
            'Playlist read all song from playlist succeed.',
            songs
          )
        } catch (error) {
          return new Result<undefined>(
            400,
              `Playlist read all song from playlist failed: song with songId ${playlistSong.songId} is undefined.`,
              undefined
          )
        }
      }
    } catch (error) {
      return new Result<undefined>(
        400,
        'Playlist read all song from playlist failed: playlist undefined.',
        undefined
      )
    }
  }

  playOneSongFromPlaylist = (playlistId: string, songId: string): Result<Song | undefined> => {
    try {
      this.playlistRepository.readOneById(playlistId)

      try {
        const song: Song = this.songRepository.readOneById(songId)
        const playlistSongs: PlaylistSong[] = this.playlistSongRepository.readAllByPlaylistId(playlistId)

        const playlistSong = playlistSongs.filter((playlistSong) => {
          if (playlistSong.songId === undefined) {
            return new Result<undefined>(
              400,
              'Playlist play one song from playlist failed: songId from playlistSong is undefined.',
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
            'Playlist play one song from playlist failed: id from playlistSong is undefined.',
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
          'Playlist play one song from playlist succeed.',
          song
        )
      } catch (error) {
        return new Result<undefined>(
          400,
            `Playlist play one song from playlist failed: song with songId ${songId} is undefined.`,
            undefined
        )
      }
    } catch (error) {
      return new Result<undefined>(
        400,
          `Playlist play one song from playlist failed: playlist with playlistId ${playlistId} is undefined.`,
          undefined
      )
    }
  }
}
