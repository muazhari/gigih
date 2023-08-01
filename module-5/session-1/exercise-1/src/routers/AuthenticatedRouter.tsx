import {Navigate, Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";

export default function AuthenticatedRouter() {

    return (
        <Routes>
            <Route index path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}
