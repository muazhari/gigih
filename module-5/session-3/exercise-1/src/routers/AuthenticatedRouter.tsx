import {Navigate, Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import SideBarComponent from "../components/SideBarComponent";
import RecommendationPage from "../pages/RecommendationPage";
import PlaylistPage from "../pages/PlaylistPage";
import authenticationSlice, {AuthenticationState} from "../slices/AuthenticationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../slices/Store.ts";
import {useEffect} from "react";
import SpotifyContentService from "../services/SpotifyContentService.ts";
import User from "../models/User.ts";
import SelectedPlaylistPage from "../pages/SelectedPlaylistPage";

export default function AuthenticatedRouter() {
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const dispatch = useDispatch()
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    useEffect(() => {
        spotifyContentService
            .getProfile()
            .then((result) => {
                dispatch(authenticationSlice.actions.setUser({
                    user: User.constructFromApi(result.data)
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <SideBarComponent/>
            <Routes>
                <Route index path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/recommendations" element={<RecommendationPage/>}/>
                <Route path="/playlist/:playlistId" element={<SelectedPlaylistPage/>}/>
                <Route path="/playlists" element={<PlaylistPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}
