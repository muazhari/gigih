import SpotifyLogo from "../../assets/spotify-logo-with-text.svg";
import "./index.css";

export default function SideBarComponent() {
    return (
        <>
            <div className="side-bar">
                <div className="logo">
                    <img src={SpotifyLogo} alt="logo"/>
                </div>
                <div className="menu">
                    <a className="menu-item" href="#all-songs">
                        <p>All Songs</p>
                    </a>
                    <a className="menu-item" href="#most-played-songs">
                        <p>Most Played Songs</p>
                    </a>
                    <a className="menu-item" href="#playlisted-songs">
                        <p>Playlisted Songs</p>
                    </a>
                </div>
            </div>
            <div className="side-bar-behind"></div>
        </>
    )
}
