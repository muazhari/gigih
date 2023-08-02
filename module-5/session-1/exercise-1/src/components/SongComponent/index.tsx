import "./index.css"
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";

type SongComponentProps = {
    data: {
        songName: string,
        artistName: string,
        songUrl: string,
        imageUrl: string
    }
}

export default function SongComponent(props: SongComponentProps) {
    const {data} = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    const handleClick = () => {
        spotifyContentService
            .playSongs([data.songUrl])
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="song" onClick={handleClick}>
            <div className="song-image">
                <img src={data.imageUrl} alt="song-image"/>
            </div>
            <div className="song-info">
                <h3>{data.songName}</h3>
                <p>{data.artistName}</p>
            </div>
        </div>
    )
}
