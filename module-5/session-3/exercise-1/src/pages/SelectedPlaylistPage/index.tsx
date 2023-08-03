import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useFormik} from "formik";
import {useEffect} from "react";
import Track from "../../models/Track.ts";
import "./index.scss"
import TrackComponent from "../../components/TrackComponent";

export default function SelectedPlaylistPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

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

    const handleClickTrackPlayPreview = (event: any, track: Track) => {

    }

    const handleClickTrackAddToPlaylist = (event: any, track: Track) => {

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
                    <h1>{domainState.playlistDomain!.selectedPlaylist!.playlistName} Playlist Tracks</h1>
                </div>
                <div className="list">
                    {
                        domainState.searchDomain!.tracks!.length > 0 ?
                            domainState.searchDomain!.tracks!
                                .map((track, index) => {
                                    return (
                                        <TrackComponent
                                            data={track}
                                            key={track.trackId}
                                            handleClickTrack={(event) => handleClickTrack(event, track)}
                                            handleClickTrackPreview={(event) => handleClickTrackPlayPreview(event, track)}
                                            handleClickTrackAddToPlaylist={(event) => handleClickTrackAddToPlaylist(event, track)}
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

