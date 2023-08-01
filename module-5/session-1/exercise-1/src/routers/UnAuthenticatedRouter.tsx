import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function UnAuthenticatedRouter() {

    return (
        <Routes>
            <Route index path="/" element={<Navigate to="/authentications/logins"/>}/>
            <Route path="/authentications/logins" element={<LoginPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}
