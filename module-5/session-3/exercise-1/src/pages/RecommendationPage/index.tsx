import TrackComponent from "../../components/TrackComponent";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useEffect, useState} from "react";
import Track from "../../models/Track.ts";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";

export default function RecommendationPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)
    const navigate = useNavigate()

    const searchFormik = useFormik({
        initialValues: {
            searchValue: domainState.searchDomain!.searchValue!
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmitSearch(values.searchValue)
        },
    })

    const handleSubmitSearch = (value: string) => {
        if (value === "") {
            dispatch(domainSlice.actions.setSearchDomain({
                searchValue: "",
                tracks: domainState.recommendationDomain!.tracks!
            }))
            return
        }

        dispatch(domainSlice.actions.setSearchDomain({
            searchValue: value,
            tracks: domainState.recommendationDomain!.tracks!.filter((track) => {
                return JSON.stringify(track).toLowerCase().includes(value.toLowerCase())
            })
        }))
    }

    useEffect(() => {
        handleSubmitSearch(searchFormik.values.searchValue)
    }, [searchFormik.values.searchValue])

    useEffect(() => {
        spotifyContentService
            .getPlaylistsByUserId(authenticationState.user!.userId!)
            .then((result) => {
                return Promise.all(result.data.items.map((playlist: any) => {
                    return spotifyContentService.getPlaylistTracks(playlist.id)
                }))
            })
            .then((playlistsTracks) => {
                return playlistsTracks.flatMap((playlistTrack) => playlistTrack.data.items.map((item: any) => item.track))
            })
            .then((tracks) => {
                const trackIds = tracks.map((track: any) => track.id)
                const artistIds = tracks.flatMap((track: any) => track.artists.map((artist: any) => artist.id))
                const uniqueTrackIds = [...new Set(trackIds)]
                const uniqueArtistIds = [...new Set(artistIds)]
                return spotifyContentService
                    .getRecommendations(
                        uniqueTrackIds.slice(0, 2),
                        uniqueArtistIds.slice(0, 2),
                    )
            })
            .then((recommendationTracks) => {
                const tracks = recommendationTracks.data.tracks.map((track: any) => {
                    return Track.constructFromApi(track)
                })
                dispatch(domainSlice.actions.setRecommendationDomain({
                    tracks: tracks
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

    const handleClickTrackAddToPlaylist = (event: any, track: Track) => {
        navigate(`/playlists/tracks/${track.trackId}`)
    }

    return (
        <div className="page authenticated recommendation">
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

            <div className="section" id="recommendation-track">
                <div className="title">
                    <h1>Recommendation Tracks</h1>
                </div>
                <div className="list">
                    {
                        domainState.searchDomain!.tracks!.length > 0 ?
                            domainState.searchDomain!.tracks!.map((track, index) => {
                                    return (
                                        <TrackComponent
                                            data={track}
                                            key={track.trackId}
                                            onClickTrack={(event) => handleClickTrack(event, track)}
                                            onClickTrackPreview={(event) => handleClickTrackPreview(event, track)}
                                            onClickTrackAddToPlaylist={(event) => handleClickTrackAddToPlaylist(event, track)}
                                        />
                                    )
                                }
                            )
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

