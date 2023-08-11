import {Navigate, Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";
import AuthenticatedNavBarComponent from "../components/AuthenticatedNavBarComponent";
import ProfilePage from "../pages/ProfilePage";

export default function AuthenticatedRouter() {
    return (
        <>
            <AuthenticatedNavBarComponent/>
            <Routes>
                <Route index path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/profiles/:id" element={<ProfilePage/>}/>
                <Route path="/videos/:id" element={<VideoPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}
