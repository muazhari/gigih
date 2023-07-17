import type PlaylistSong from '../models/PlaylistSong'
import type DatastoreOne from '../datastores/DatastoreOne'
import Playlist from '../models/Playlist'

export default class PlaylistSongRepository {
  datastoreOne: DatastoreOne

  constructor (datastoreOne: DatastoreOne) {
    this.datastoreOne = datastoreOne
  }

  readAll = (): PlaylistSong[] => {
    return this.datastoreOne.playlistSongs
  }

  readAllByPlaylistId = (playlistId: string): PlaylistSong[] => {
    return this.datastoreOne.playlistSongs.filter((item) => item.playlistId === playlistId)
  }

  readOneById = (id: string): PlaylistSong => {
    const foundItem: PlaylistSong | undefined = this.datastoreOne.playlistSongs.find((item) => item.id === id)
    if (foundItem === undefined) {
      throw new Error(`PlaylistSong with id ${id} is not found.`)
    }
    return foundItem
  }

  createOne = (item: PlaylistSong): PlaylistSong => {
    this.datastoreOne.playlistSongs.push(item)
    return item
  }

  patchOneById = (id: string, item: PlaylistSong): PlaylistSong => {
    const foundItem: PlaylistSong = this.readOneById(id)
    foundItem.patchFrom(item)
    return foundItem
  }

  deleteOneById = (id: string): PlaylistSong => {
    const foundItem: PlaylistSong = this.readOneById(id)
    this.datastoreOne.playlistSongs = this.datastoreOne.playlistSongs.filter((item) => item.id !== id)
    return foundItem
  }
}
