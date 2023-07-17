import Artist from '../models/Artist'
import Playlist from '../models/Playlist'
import PlaylistSong from '../models/PlaylistSong'
import Song from '../models/Song'

export default class DatastoreOne {
  artists: Artist[] = [
    new Artist('0', 'name0'),
    new Artist('1', 'name1')
  ]

  playlists: Playlist[] = [
    new Playlist('0'),
    new Playlist('1')
  ]

  playlistSongs: PlaylistSong[] = [
    new PlaylistSong('0', '0', '0', 0),
    new PlaylistSong('1', '0', '1', 1),
    new PlaylistSong('2', '1', '0', 2)
  ]

  songs: Song[] = [
    new Song('0', 'title0', ['0'], 'url0'),
    new Song('1', 'title1', ['0', '1'], 'url1')
  ]
}
