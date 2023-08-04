import "./index.scss"
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import Playlist from "../../models/Playlist.ts";
import {DomainState} from "../../slices/DomainSlice.ts";

type PlaylistComponentProps = {
    data: Playlist,
    onClickPlaylist: (event: any) => void,
    onClickPlaylistRemove: (event: any) => void
}

export default function PlaylistComponent(props: PlaylistComponentProps) {
    const {
        data,
        onClickPlaylist,
        onClickPlaylistRemove
    } = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    return (
        <div className="component playlist" onClick={onClickPlaylist}>
            <div className="playlist-image">
                <img src={data.imageUrl ?? `https://placehold.co/200x200?text=${data.playlistName!.charAt(0)}`}
                     alt="playlist-image"/>
            </div>
            <div className="playlist-info">
                <h3>{data.playlistName}</h3>
            </div>
            <div className="playlist-action">
                <button onClick={onClickPlaylistRemove}>Remove Playlist</button>
            </div>
        </div>
    )
}
