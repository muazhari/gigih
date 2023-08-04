import "./index.scss"
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import Track from "../../models/Track.ts";
import {DomainState} from "../../slices/DomainSlice.ts";

type TrackComponentProps = {
    data: Track,
    onClickTrack: (event: any) => void,
    onClickTrackPreview: (event: any) => void,
    onClickTrackRemoveFromPlaylist: (event: any) => void,
}

export default function PlaylistTrackComponent(props: TrackComponentProps) {
    const {
        data,
        onClickTrack,
        onClickTrackPreview,
        onClickTrackRemoveFromPlaylist
    } = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    return (
        <div className="component playlist-track" onClick={onClickTrack}>
            <div className="track-image">
                <img src={data.imageUrl} alt="track-image"/>
            </div>
            <div className="track-info">
                <h3>{data.trackName}</h3>
                <p>{data.artists.map((artist) => artist.artistName).join(", ")}</p>
            </div>
            <div className="track-action">
                <button onClick={onClickTrackPreview}>Preview</button>
                <button onClick={onClickTrackRemoveFromPlaylist}>Remove From Playlist</button>
            </div>
        </div>
    )
}
