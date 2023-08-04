import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useEffect} from "react";
import Playlist from "../../models/Playlist.ts";
import PlaylistComponent from "../../components/PlaylistComponent";
import {useNavigate, useParams} from "react-router-dom";
import Track from "../../models/Track.ts";

export default function SelectPlaylistPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        Promise.all([
            spotifyContentService.getPlaylistsByUserId(authenticationState.user!.userId!),
            spotifyContentService.getTrack(params.trackId!)
        ])
            .then((result) => {
                const playlists = result[0]
                const track = result[1]
                dispatch(domainSlice.actions.setPlaylistDomain({
                    playlists: playlists.data.items.map((playlist: any) => {
                        return Playlist.constructFromApi(playlist)
                    }),
                    selectedTrack: Track.constructFromApi(track.data)
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClickPlaylist = (event: any, playlist: Playlist) => {
        spotifyContentService
            .addTracksToPlaylist(
                playlist.playlistId!,
                [domainState.playlistDomain!.selectedTrack!.trackUri!]
            )
            .then((result) => {
                navigate(`/playlists/${playlist.playlistId}`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClickPlaylistRemove = (event: any, playlist: Playlist) => {
        event.stopPropagation()
        spotifyContentService
            .unfollowPlaylist(playlist.playlistId!)
            .then(() => {
                dispatch(domainSlice.actions.setPlaylistDomain({
                    playlists: domainState.playlistDomain!.playlists!.filter((item) => item.playlistId !== playlist.playlistId)
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="page authenticated select-playlist">
            <div className="section" id="playlisted-track">
                <div className="title">
                    <h1>Select Which Playlist You Want To Add This Track</h1>
                    {
                        domainState.playlistDomain!.selectedTrack &&
                        <p>{domainState.playlistDomain!.selectedTrack!.trackName} - {domainState.playlistDomain!.selectedTrack!.artists.map((artist) => artist.artistName).join(", ")}</p>
                    }
                </div>
                <div className="list">
                    {
                        domainState.playlistDomain!.playlists!.length > 0 ?
                            domainState.playlistDomain!.playlists!.map((playlist, index) => {
                                    return (
                                        <PlaylistComponent
                                            data={playlist}
                                            key={index}
                                            onClickPlaylist={(event) => handleClickPlaylist(event, playlist)}
                                            onClickPlaylistRemove={(event) => handleClickPlaylistRemove(event, playlist)}
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

