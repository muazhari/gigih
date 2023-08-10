import {Navigate, Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";

export default function AuthenticatedRouter() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/videos/:id" element={<VideoPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}
