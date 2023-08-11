import {Button,} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import {MessageState} from "../../slices/MessageSlice.ts";
import React, {useEffect} from "react";
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import AuthenticationService from "../../services/AuthenticationService.ts";

export default function AuthenticatedNavBarComponent() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const authenticationService = new AuthenticationService()

    const handleClickLogout = () => {
        dispatch(authenticationSlice.actions.logout())
        navigate("/authentications/logins")
    }

    const handleClickProfile = () => {
        navigate(`/profiles/${authenticationState.user!._id}`)
    }

    const handleClickHome = () => {
        navigate("/home")
    }

    return (
        <div className="component authenticated-nav-bar">
            <div className="left">
                <Button
                    onClick={handleClickHome}
                >
                    Home
                </Button>
            </div>
            <div className="right">
                <Button
                    onClick={handleClickProfile}
                >
                    Profile
                </Button>
                <Button
                    onClick={handleClickLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
