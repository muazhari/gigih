import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import Track from "../../models/Track.ts";
import "./index.scss"
import PlaylistTrackComponent from "../../components/PlaylistTrackComponent";
import {useParams} from "react-router-dom";
import Playlist from "../../models/Playlist.ts";

export default function SelectedPlaylistPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)
    const params = useParams()

    const searchFormik = useFormik({
        initialValues: {
            searchValue: domainState.searchDomain!.searchValue!
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmitSearch(values.searchValue)
        },
    })

    useEffect(() => {
        Promise.all([
            spotifyContentService.getPlaylist(params.playlistId!),
            spotifyContentService.getPlaylistTracks(params.playlistId!)
        ])
            .then(([playlist, playlistTracks]) => {
                const tracks = playlistTracks.data.items
                    .map((item: any) => item.track)
                    .map((track: any) => {
                        return Track.constructFromApi(track)
                    })
                dispatch(domainSlice.actions.setPlaylistDomain({
                    selectedPlaylist: Playlist.constructFromApi(playlist),
                    selectedPlaylistTracks: tracks
                }))
                dispatch(domainSlice.actions.setSearchDomain({
                    searchValue: "",
                    tracks: tracks
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleSubmitSearch = (value: string) => {
        if (value === "") {
            dispatch(domainSlice.actions.setSearchDomain({
                searchValue: "",
                tracks: domainState.playlistDomain!.selectedPlaylistTracks!
            }))
            return
        }

        dispatch(domainSlice.actions.setSearchDomain({
            searchValue: value,
            tracks: domainState.playlistDomain!.selectedPlaylistTracks!.filter((track) => {
                return JSON.stringify(track).toLowerCase().includes(value.toLowerCase())
            })
        }))
    }

    useEffect(() => {
        dispatch(domainSlice.actions.setSearchDomain({
            tracks: domainState.playlistDomain!.selectedPlaylistTracks!,
            searchValue: ""
        }))
    }, [])

    useEffect(() => {
        handleSubmitSearch(searchFormik.values.searchValue)
    }, [searchFormik.values.searchValue])

    const handleClickTrack = (event: any, track: Track) => {

    }

    const [audio, setAudio] = useState<HTMLAudioElement>();

    const handleClickTrackPreview = (event: any, track: Track) => {
        if (!audio) {
            const audio = new Audio(track.previewUrl);
            audio.play().then(() => {
                setAudio(audio);
            })
        } else {
            audio.pause();
            setAudio(undefined);
        }
    }

    const handleClickTrackRemoveFromPlaylist = (event: any, track: Track) => {
        if (audio) {
            audio.pause();
            setAudio(undefined);
        }
        spotifyContentService
            .removeTracksFromPlaylist(
                params.playlistId!,
                [track.trackUri!]
            )
            .then((result) => {
                const tracks = domainState.playlistDomain!.selectedPlaylistTracks!.filter((playlistTrack) => {
                    return playlistTrack.trackId !== track.trackId
                })
                dispatch(domainSlice.actions.setPlaylistDomain({
                    selectedPlaylistTracks: tracks
                }))
                dispatch(domainSlice.actions.setSearchDomain({
                    searchValue: searchFormik.values.searchValue,
                    tracks: tracks
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="page authenticated selected-playlist">
            <div className="section" id="search">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        id="search-input"
                        name="searchValue"
                        onBlur={searchFormik.handleBlur}
                        onChange={searchFormik.handleChange}
                    />
                </div>
            </div>

            <div className="section" id="all-track">
                <div className="title">
                    {
                        domainState.playlistDomain!.selectedPlaylist &&
                        <h1>{domainState.playlistDomain!.selectedPlaylist!.playlistName} Playlist Tracks</h1>
                    }
                </div>
                <div className="list">
                    {
                        domainState.searchDomain!.tracks!.length > 0 ?
                            domainState.searchDomain!.tracks!
                                .map((track, index) => {
                                    return (
                                        <PlaylistTrackComponent
                                            data={track}
                                            key={track.trackId}
                                            onClickTrack={(event) => handleClickTrack(event, track)}
                                            onClickTrackPreview={(event) => handleClickTrackPreview(event, track)}
                                            onClickTrackRemoveFromPlaylist={(event) => handleClickTrackRemoveFromPlaylist(event, track)}
                                        />
                                    )
                                })
                            :
                            <div>
                                Empty..
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

