import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useEffect} from "react";
import Playlist from "../../models/Playlist.ts";
import PlaylistComponent from "../../components/PlaylistComponent";
import {useNavigate} from "react-router-dom";
import Track from "../../models/Track.ts";

export default function PlaylistPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)
    const navigate = useNavigate();

    useEffect(() => {
        spotifyContentService
            .getPlaylistsByUserId(authenticationState.user!.userId!)
            .then((result) => {
                console.log(result)
                dispatch(domainSlice.actions.setPlaylistDomain({
                    playlists: result.data.items.map((playlist: any) => {
                        return Playlist.constructFromApi(playlist)
                    })
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClickPlaylist = (event: any, playlist: Playlist) => {
        spotifyContentService
            .getPlaylistTracks(playlist.playlistId!)
            .then((result) => {
                dispatch(domainSlice.actions.setPlaylistDomain({
                    selectedPlaylist: playlist,
                    selectedPlaylistTracks: result.data.items
                        .map((item: any) => item.track)
                        .map((track: any) => {
                            return Track.constructFromApi(track)
                        })
                }))
                navigate(`/playlist/${playlist.playlistId}`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="page authenticated playlist">
            <div className="section" id="playlisted-track">
                <div className="title">
                    <h1>Playlists</h1>
                </div>
                <div className="list">
                    {
                        domainState.playlistDomain!.playlists!.length > 0 ?
                            domainState.playlistDomain!.playlists!.map((playlist, index) => {
                                    return (
                                        <PlaylistComponent
                                            data={playlist}
                                            key={index}
                                            handleClick={(event) => handleClickPlaylist(event, playlist)}
                                        />
                                    )
                                }
                            )
                            :
                            <div>
                                Please add some playlist..
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

