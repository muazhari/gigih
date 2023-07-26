import "./index.css"
import {useState} from "react";
import SongComponent from "../SongComponent";

export default function ContentComponent() {
    const song = {
        songName: "song name",
        artistName: "artist name"
    }

    const [songs] = useState([
        song, song, song, song, song, song, song, song
    ])
    const [mostPlayedSongs] = useState([
        song, song, song, song, song, song, song, song
    ])
    const [playlistedSongs] = useState([
        song, song, song, song, song, song, song, song
    ])

    return (
        <div className="content">
            <div className="section" id="all-song">
                <div className="title">
                    <h1>All Song</h1>
                </div>
                <div className="song-list">
                    {
                        songs.map((song, index) => {
                            return (
                                <SongComponent data={song} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="section" id="most-played-song">
                <div className="title">
                    <h1>Most Played Songs</h1>
                </div>
                <div className="song-list">
                    {
                        mostPlayedSongs.map((song, index) => {
                            return (
                                <SongComponent data={song} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="section" id="playlisted-song">
                <div className="title">
                    <h1>Playlisted Songs</h1>
                </div>
                <div className="song-list">
                    {
                        playlistedSongs.map((song, index) => {
                            return (
                                <SongComponent data={song} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
