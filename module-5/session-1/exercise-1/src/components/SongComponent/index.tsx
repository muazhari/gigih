import "./index.css"
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import Song from "../../models/Song.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";

type SongComponentProps = {
    data: Song
}

export default function SongComponent(props: SongComponentProps) {
    const {data} = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    const handleClick = () => {
        if(domainState.playlistDomain!.songs!.find((song) => JSON.stringify(song) === JSON.stringify(data)) !== undefined){
            dispatch(domainSlice.actions.setPlaylistDomain({
                songs: domainState.playlistDomain!.songs!.filter((song) => song !== data)
            }))
        } else {
            dispatch(domainSlice.actions.setPlaylistDomain({
                songs: [...domainState.playlistDomain!.songs!, data]
            }))
        }
    }

    return (
        <div className="song" onClick={handleClick}>
            <div className="song-image">
                <img src={data.imageUrl} alt="song-image"/>
            </div>
            <div className="song-info">
                <h3>{data.songName}</h3>
                <p>{data.artists[0].artistName}</p>
            </div>
        </div>
    )
}
