"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AlbumSchema_1 = __importDefault(require("../schemas/AlbumSchema"));
const Album_1 = __importDefault(require("../models/Album"));
const Genre_1 = __importDefault(require("../models/Genre"));
const GenreSchema_1 = __importDefault(require("../schemas/GenreSchema"));
const ArtistSchema_1 = __importDefault(require("../schemas/ArtistSchema"));
const Artist_1 = __importDefault(require("../models/Artist"));
const ArtistGenreMap_1 = __importDefault(require("../models/ArtistGenreMap"));
const ArtistGenreMapSchema_1 = __importDefault(require("../schemas/ArtistGenreMapSchema"));
const Song_1 = __importDefault(require("../models/Song"));
const SongSchema_1 = __importDefault(require("../schemas/SongSchema"));
const PopularSong_1 = __importDefault(require("../models/PopularSong"));
const PopularSongSchema_1 = __importDefault(require("../schemas/PopularSongSchema"));
const SongAlbumMap_1 = __importDefault(require("../models/SongAlbumMap"));
const SongAlbumMapSchema_1 = __importDefault(require("../schemas/SongAlbumMapSchema"));
const SongArtistMap_1 = __importDefault(require("../models/SongArtistMap"));
const SongArtistMapSchema_1 = __importDefault(require("../schemas/SongArtistMapSchema"));
class OneMigration {
    constructor(oneDatastore) {
        this.up = () => __awaiter(this, void 0, void 0, function* () {
            const albums = yield AlbumSchema_1.default.create([
                new Album_1.default('name0'),
                new Album_1.default('name1'),
                new Album_1.default('name2'),
                new Album_1.default('name3'),
                new Album_1.default('name4'),
                new Album_1.default('name5'),
                new Album_1.default('name6'),
                new Album_1.default('name7'),
                new Album_1.default('name8'),
                new Album_1.default('name9'),
            ]);
            console.log(albums);
            const genres = yield GenreSchema_1.default.create([
                new Genre_1.default('genre0'),
                new Genre_1.default('genre1'),
                new Genre_1.default('genre2'),
                new Genre_1.default('genre3'),
                new Genre_1.default('genre4'),
                new Genre_1.default('genre5'),
                new Genre_1.default('genre6'),
                new Genre_1.default('genre7'),
                new Genre_1.default('genre8'),
                new Genre_1.default('genre9'),
            ]);
            console.log(genres);
            const artists = yield ArtistSchema_1.default.create([
                new Artist_1.default('artist0', new Date()),
                new Artist_1.default('artist1', new Date()),
                new Artist_1.default('artist2', new Date()),
                new Artist_1.default('artist3', new Date()),
                new Artist_1.default('artist4', new Date()),
                new Artist_1.default('artist5', new Date()),
                new Artist_1.default('artist6', new Date()),
                new Artist_1.default('artist7', new Date()),
                new Artist_1.default('artist8', new Date()),
                new Artist_1.default('artist9', new Date()),
            ]);
            console.log(artists);
            const songs = yield SongSchema_1.default.create([
                new Song_1.default('song0'),
                new Song_1.default('song1'),
                new Song_1.default('song2'),
                new Song_1.default('song3'),
                new Song_1.default('song4'),
                new Song_1.default('song5'),
                new Song_1.default('song6'),
                new Song_1.default('song7'),
                new Song_1.default('song8'),
                new Song_1.default('song9'),
            ]);
            console.log(songs);
            const popularSongs = yield PopularSongSchema_1.default.create([
                new PopularSong_1.default(songs[0]._id, 0, 0),
                new PopularSong_1.default(songs[1]._id, 1, 1),
                new PopularSong_1.default(songs[2]._id, 2, 2),
                new PopularSong_1.default(songs[3]._id, 3, 3),
                new PopularSong_1.default(songs[4]._id, 4, 4),
                new PopularSong_1.default(songs[5]._id, 5, 5),
                new PopularSong_1.default(songs[6]._id, 6, 6),
                new PopularSong_1.default(songs[7]._id, 7, 7),
                new PopularSong_1.default(songs[8]._id, 8, 8),
                new PopularSong_1.default(songs[9]._id, 9, 9),
            ]);
            console.log(popularSongs);
            const artistGenreMaps = yield ArtistGenreMapSchema_1.default.create([
                new ArtistGenreMap_1.default(artists[0]._id, genres[0]._id),
                new ArtistGenreMap_1.default(artists[1]._id, genres[1]._id),
                new ArtistGenreMap_1.default(artists[2]._id, genres[2]._id),
                new ArtistGenreMap_1.default(artists[3]._id, genres[3]._id),
                new ArtistGenreMap_1.default(artists[4]._id, genres[4]._id),
                new ArtistGenreMap_1.default(artists[5]._id, genres[5]._id),
                new ArtistGenreMap_1.default(artists[6]._id, genres[6]._id),
                new ArtistGenreMap_1.default(artists[7]._id, genres[7]._id),
                new ArtistGenreMap_1.default(artists[8]._id, genres[8]._id),
                new ArtistGenreMap_1.default(artists[9]._id, genres[9]._id),
            ]);
            console.log(artistGenreMaps);
            const songAlbumMaps = yield SongAlbumMapSchema_1.default.create([
                new SongAlbumMap_1.default(songs[0]._id, albums[0]._id),
                new SongAlbumMap_1.default(songs[1]._id, albums[1]._id),
                new SongAlbumMap_1.default(songs[2]._id, albums[2]._id),
                new SongAlbumMap_1.default(songs[3]._id, albums[3]._id),
                new SongAlbumMap_1.default(songs[4]._id, albums[4]._id),
                new SongAlbumMap_1.default(songs[5]._id, albums[5]._id),
                new SongAlbumMap_1.default(songs[6]._id, albums[6]._id),
                new SongAlbumMap_1.default(songs[7]._id, albums[7]._id),
                new SongAlbumMap_1.default(songs[8]._id, albums[8]._id),
                new SongAlbumMap_1.default(songs[9]._id, albums[9]._id),
            ]);
            console.log(songAlbumMaps);
            const songArtistMaps = yield SongArtistMapSchema_1.default.create([
                new SongArtistMap_1.default(songs[0]._id, artists[0]._id),
                new SongArtistMap_1.default(songs[1]._id, artists[1]._id),
                new SongArtistMap_1.default(songs[2]._id, artists[2]._id),
                new SongArtistMap_1.default(songs[3]._id, artists[3]._id),
                new SongArtistMap_1.default(songs[4]._id, artists[4]._id),
                new SongArtistMap_1.default(songs[5]._id, artists[5]._id),
                new SongArtistMap_1.default(songs[6]._id, artists[6]._id),
                new SongArtistMap_1.default(songs[7]._id, artists[7]._id),
                new SongArtistMap_1.default(songs[8]._id, artists[8]._id),
                new SongArtistMap_1.default(songs[9]._id, artists[9]._id),
            ]);
            console.log(songArtistMaps);
            console.log('OneMigration up');
        });
        this.down = () => __awaiter(this, void 0, void 0, function* () {
            yield AlbumSchema_1.default.deleteMany({});
            yield GenreSchema_1.default.deleteMany({});
            yield ArtistSchema_1.default.deleteMany({});
            yield SongSchema_1.default.deleteMany({});
            yield PopularSongSchema_1.default.deleteMany({});
            yield ArtistGenreMapSchema_1.default.deleteMany({});
            yield SongAlbumMapSchema_1.default.deleteMany({});
            yield SongArtistMapSchema_1.default.deleteMany({});
            console.log('OneMigration down');
        });
        this.oneDatastore = oneDatastore;
    }
}
exports.default = OneMigration;
//# sourceMappingURL=OneMigration.js.map