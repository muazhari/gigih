import OneDatastore from "../datastores/OneDatastore";
import AlbumSchema from "../schemas/AlbumSchema";
import Album from "../models/Album";
import Genre from "../models/Genre";
import GenreSchema from "../schemas/GenreSchema";
import ArtistSchema from "../schemas/ArtistSchema";
import Artist from "../models/Artist";
import ArtistGenreMap from "../models/ArtistGenreMap";
import ArtistGenreMapSchema from "../schemas/ArtistGenreMapSchema";
import Song from "../models/Song";
import SongSchema from "../schemas/SongSchema";
import PopularSong from "../models/PopularSong";
import PopularSongSchema from "../schemas/PopularSongSchema";
import SongAlbumMap from "../models/SongAlbumMap";
import SongAlbumMapSchema from "../schemas/SongAlbumMapSchema";
import SongArtistMap from "../models/SongArtistMap";
import SongArtistMapSchema from "../schemas/SongArtistMapSchema";

export default class OneMigration {

    oneDatastore: OneDatastore

    constructor(oneDatastore: OneDatastore) {
        this.oneDatastore = oneDatastore
    }

    up = async () : Promise<void> => {
        const albums: Album[] = await AlbumSchema.create([
            new Album('album0'),
            new Album('album1'),
            new Album('album2'),
            new Album('album3'),
            new Album('album4'),
            new Album('album5'),
            new Album('album6'),
            new Album('album7'),
            new Album('album8'),
            new Album('album9'),
        ])
        console.log(albums)

        const genres: Genre[] = await GenreSchema.create([
            new Genre('genre0'),
            new Genre('genre1'),
            new Genre('genre2'),
            new Genre('genre3'),
            new Genre('genre4'),
            new Genre('genre5'),
            new Genre('genre6'),
            new Genre('genre7'),
            new Genre('genre8'),
            new Genre('genre9'),
        ])
        console.log(genres)

        const artists: Artist[] = await ArtistSchema.create([
            new Artist('artist0', new Date()),
            new Artist('artist1', new Date()),
            new Artist('artist2', new Date()),
            new Artist('artist3', new Date()),
            new Artist('artist4', new Date()),
            new Artist('artist5', new Date()),
            new Artist('artist6', new Date()),
            new Artist('artist7', new Date()),
            new Artist('artist8', new Date()),
            new Artist('artist9', new Date()),
        ])
        console.log(artists)

        const songs: Song[] = await SongSchema.create([
            new Song('song0'),
            new Song('song1'),
            new Song('song2'),
            new Song('song3'),
            new Song('song4'),
            new Song('song5'),
            new Song('song6'),
            new Song('song7'),
            new Song('song8'),
            new Song('song9'),
        ])
        console.log(songs)

        const popularSongs: PopularSong[] = await PopularSongSchema.create([
            new PopularSong(songs[0]._id!, 0, 0),
            new PopularSong(songs[1]._id!, 1, 1),
            new PopularSong(songs[2]._id!, 2, 2),
            new PopularSong(songs[3]._id!, 3, 3),
            new PopularSong(songs[4]._id!, 4, 4),
            new PopularSong(songs[5]._id!, 5, 5),
            new PopularSong(songs[6]._id!, 6, 6),
            new PopularSong(songs[7]._id!, 7, 7),
            new PopularSong(songs[8]._id!, 8, 8),
            new PopularSong(songs[9]._id!, 9, 9),
        ])
        console.log(popularSongs)

        const artistGenreMaps: ArtistGenreMap[] = await ArtistGenreMapSchema.create([
            new ArtistGenreMap(artists[0]._id!, genres[0]._id!),
            new ArtistGenreMap(artists[1]._id!, genres[1]._id!),
            new ArtistGenreMap(artists[2]._id!, genres[2]._id!),
            new ArtistGenreMap(artists[3]._id!, genres[3]._id!),
            new ArtistGenreMap(artists[4]._id!, genres[4]._id!),
            new ArtistGenreMap(artists[5]._id!, genres[5]._id!),
            new ArtistGenreMap(artists[6]._id!, genres[6]._id!),
            new ArtistGenreMap(artists[7]._id!, genres[7]._id!),
            new ArtistGenreMap(artists[8]._id!, genres[8]._id!),
            new ArtistGenreMap(artists[9]._id!, genres[9]._id!),
        ])
        console.log(artistGenreMaps)

        const songAlbumMaps: SongAlbumMap[] = await SongAlbumMapSchema.create([
            new SongAlbumMap(songs[0]._id!, albums[0]._id!),
            new SongAlbumMap(songs[1]._id!, albums[1]._id!),
            new SongAlbumMap(songs[2]._id!, albums[2]._id!),
            new SongAlbumMap(songs[3]._id!, albums[3]._id!),
            new SongAlbumMap(songs[4]._id!, albums[4]._id!),
            new SongAlbumMap(songs[5]._id!, albums[5]._id!),
            new SongAlbumMap(songs[6]._id!, albums[6]._id!),
            new SongAlbumMap(songs[7]._id!, albums[7]._id!),
            new SongAlbumMap(songs[8]._id!, albums[8]._id!),
            new SongAlbumMap(songs[9]._id!, albums[9]._id!),
        ])
        console.log(songAlbumMaps)

        const songArtistMaps: SongArtistMap[] = await SongArtistMapSchema.create([
            new SongArtistMap(songs[0]._id!, artists[0]._id!),
            new SongArtistMap(songs[1]._id!, artists[1]._id!),
            new SongArtistMap(songs[2]._id!, artists[2]._id!),
            new SongArtistMap(songs[3]._id!, artists[3]._id!),
            new SongArtistMap(songs[4]._id!, artists[4]._id!),
            new SongArtistMap(songs[5]._id!, artists[5]._id!),
            new SongArtistMap(songs[6]._id!, artists[6]._id!),
            new SongArtistMap(songs[7]._id!, artists[7]._id!),
            new SongArtistMap(songs[8]._id!, artists[8]._id!),
            new SongArtistMap(songs[9]._id!, artists[9]._id!),
        ])
        console.log(songArtistMaps)

        // collection view of songs with genres, artists, and albums
        const view1: any = await SongSchema.aggregate([
            {
                $lookup: {
                    from: "song_artist_maps",
                    foreignField: "songId",
                    localField: "_id",
                    as: "song_artist_maps"
                }
            },
            {
                $lookup: {
                    from: "artists",
                    foreignField: "_id",
                    localField: "song_artist_maps.artistId",
                    as: "artists"
                }
            },
            {
                $lookup: {
                    from: "song_album_maps",
                    foreignField: "songId",
                    localField: "_id",
                    as: "song_album_maps"
                }
            },
            {
                $lookup: {
                    from: "albums",
                    foreignField: "_id",
                    localField: "song_album_maps.albumId",
                    as: "albums"
                }
            },
            {
                $lookup: {
                    from: "artist_genre_maps",
                    foreignField: "artistId",
                    localField: "artists._id",
                    as: "artist_genre_maps"
                }
            },
            {
                $lookup: {
                    from: "genres",
                    foreignField: "_id",
                    localField: "artist_genre_maps.genreId",
                    as: "genres"
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artists: 1,
                    albums: 1,
                    genres: 1
                }
            }
        ])
        console.log(view1)

        console.log('OneMigration up');
    }


    down = async () : Promise<void> => {
        await AlbumSchema.deleteMany({})
        await GenreSchema.deleteMany({})
        await ArtistSchema.deleteMany({})
        await SongSchema.deleteMany({})
        await PopularSongSchema.deleteMany({})
        await ArtistGenreMapSchema.deleteMany({})
        await SongAlbumMapSchema.deleteMany({})
        await SongArtistMapSchema.deleteMany({})

        console.log('OneMigration down');
    }
}
