import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";

export default function UnAuthenticatedRouter() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Navigate to="/authentications/logins"/>}/>
                <Route path="/authentications/logins" element={<LoginPage/>}/>
                <Route path="/authentications/registers" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}
