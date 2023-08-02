import SpotifyLogo from "../../assets/spotify-logo-with-text.svg";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import {useNavigate} from "react-router-dom";
import {forwardRef} from "react";

export default function SideBarComponent() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const handleClickLogout = () => {
        dispatch(authenticationSlice.actions.logout())
        navigate("/authentications/logins")
    }

    const handleClickMenuItemAllSong = () => {
        const allSong = document.getElementById("all-song")
        if (allSong === null) {
            throw new Error("All song is null.")
        }
        allSong.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <div className="side-bar">
                <div className="logo">
                    <img src={SpotifyLogo} alt="logo"/>
                </div>
                <div className="upper-menu">
                    <a className="menu-item" onClick={handleClickMenuItemAllSong}>
                        <p>All Songs</p>
                    </a>
                </div>
                <div className="bottom-menu">
                    <a className="menu-item" onClick={handleClickLogout}>
                        Logout
                    </a>
                </div>
            </div>
            <div className="side-bar-behind"></div>
        </>
    )
}
