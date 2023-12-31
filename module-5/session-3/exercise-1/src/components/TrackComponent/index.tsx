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
    onClickTrackAddToPlaylist: (event: any) => void,
}

export default function TrackComponent(props: TrackComponentProps) {
    const {
        data,
        onClickTrack,
        onClickTrackPreview,
        onClickTrackAddToPlaylist
    } = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    return (
        <div className="component track" onClick={onClickTrack}>
            <div className="track-image">
                <img src={data.imageUrl} alt="track-image"/>
            </div>
            <div className="track-info">
                <h3>{data.trackName}</h3>
                <p>{data.artists.map((artist) => artist.artistName).join(", ")}</p>
            </div>
            <div className="track-action">
                <button onClick={onClickTrackPreview}>Preview</button>
                <button onClick={onClickTrackAddToPlaylist}>Add To Playlist</button>
            </div>
        </div>
    )
}
