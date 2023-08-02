import "./index.css"
import {forwardRef, useEffect, useState} from "react";
import SongComponent from "../SongComponent";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import {useFormik} from "formik";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";

export default function ContentComponent() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    const searchFormik = useFormik({
        initialValues: {
            value: ""
        },
        onSubmit: (values) => {
            handleSubmitSearch(values.value)
        },
    })

    const [trackItems, setTrackItems] = useState([])

    const handleSubmitSearch = (value: string) => {
        if(value === ""){
            setTrackItems([])
            return
        }

        spotifyContentService
            .search(value)
            .then((result) => {
                setTrackItems(result.data.tracks.items)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        handleSubmitSearch(searchFormik.values.value)
    }, [searchFormik.values.value])

    useEffect(() => {
        if (domainState.playlistDomain!.songs!.length <= 0) {
            dispatch(domainSlice.actions.setRecommendationDomain({
                songs: []
            }))
            return
        }

        spotifyContentService
            .getRecommendations(
                domainState.playlistDomain!.songs!.map((song) => song.songId!),
                domainState.playlistDomain!.songs!.flatMap((song) => song.artists!.map((artist) => artist!.artistId!)),
                domainState.playlistDomain!.songs!.flatMap((song) => song.genres)
            )
            .then((result) => {
                dispatch(domainSlice.actions.setRecommendationDomain({
                    songs: result.data.tracks.map((track: any) => {
                        return {
                            songId: track.id,
                            songName: track.name,
                            songUrl: track.uri,
                            imageUrl: track.album.images[0].url,
                            artists : track.artists.map((artist: any) => {
                                return {
                                    artistId: artist.id,
                                    artistName: artist.name
                                }
                            }),
                            genres: track.genres
                        }
                    })
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [domainState.playlistDomain!.songs])

    return (
        <div className="content">
            <div className="section" id="search">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        id="search-input"
                        name="value"
                        onBlur={searchFormik.handleBlur}
                        onChange={searchFormik.handleChange}
                    />
                </div>
            </div>

            <div className="section" id="all-song">
                <div className="title">
                    <h1>All Songs</h1>
                </div>
                <div className="song-list">
                    {
                        trackItems.length > 0 ?
                            trackItems.map((item: any) => {
                                return {
                                    songId: item.id,
                                    songName: item.name,
                                    songUrl: item.uri,
                                    imageUrl: item.album.images[0].url,
                                    artists : item.artists.map((artist: any) => {
                                        return {
                                            artistId: artist.id,
                                            artistName: artist.name
                                        }
                                    }),
                                    genres: item.genres
                                }
                            }).map((song, index) => {
                                return (
                                    <SongComponent data={song} key={index}/>
                                )
                            })
                            :
                            <div>
                                Please use the search bar..
                            </div>
                    }
                </div>
            </div>


            <div className="section" id="recommendation-song">
                <div className="title">
                    <h1>Recommendation Songs</h1>
                </div>
                <div className="song-list">
                    {
                        domainState.recommendationDomain!.songs!.length > 0 ?
                            domainState.recommendationDomain!.songs!.map((song, index) => {
                                return (
                                    <SongComponent data={song} key={index}/>
                                )
                            }
                        )
                        :
                        <div>
                            Please add some songs to the playlist..
                        </div>
                    }
                </div>
            </div>


            <div className="section" id="playlisted-song">
                <div className="title">
                    <h1>Playlisted Songs</h1>
                </div>
                <div className="song-list">
                    {
                        domainState.playlistDomain!.songs!.length > 0 ?
                            domainState.playlistDomain!.songs!.map((song, index) => {
                                return (
                                    <SongComponent data={song} key={index}/>
                                )
                            }
                        )
                        :
                        <div>
                            Please add some songs to the playlist..
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

