import SpotifyLogo from "../../assets/spotify-logo-with-text.svg";
import "./index.scss";
import {useDispatch, useSelector} from "react-redux";
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import {useNavigate} from "react-router-dom";

export default function SideBarComponent() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const handleClickLogout = () => {
        dispatch(authenticationSlice.actions.logout())
        navigate("/authentications/logins")
    }

    const handleClickMenuItemAllTrack = () => {
        navigate("/home")
    }

    const handleClickMenuItemPlaylists = () => {
        navigate("/playlists")
    }

    const handleClickMenuItemRecommendatinTrack = () => {
        navigate("/recommendations")
    }

    return (
        <>
            <div className="component side-bar">
                <div className="logo">
                    <img src={SpotifyLogo} alt="logo"/>
                </div>
                <div className="upper-menu">
                    <a className="menu-item" onClick={handleClickMenuItemAllTrack}>
                        All Tracks
                    </a>
                    <a className="menu-item" onClick={handleClickMenuItemRecommendatinTrack}>
                        Recommendation Tracks
                    </a>
                    <a className="menu-item" onClick={handleClickMenuItemPlaylists}>
                        Playlists
                    </a>
                </div>
                <div className="bottom-menu">
                    <a className="menu-item" onClick={handleClickLogout}>
                        Logout
                    </a>
                </div>
            </div>
            <div className="component side-bar-behind"></div>
        </>
    )
}
