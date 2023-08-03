import {useSelector} from "react-redux";
import {AuthenticationState} from "../slices/AuthenticationSlice.ts";
import {RootState} from "../slices/Store.ts";
import UnAuthenticatedRouter from "./UnAuthenticatedRouter.tsx";
import AuthenticatedRouter from "./AuthenticatedRouter.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function RootRouter() {
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);

    const navigate = useNavigate()

    const [router, setRouter] = useState(<UnAuthenticatedRouter/>)

    useEffect(() => {
        if(authenticationState.isLoggedIn === true) {
            setRouter(<AuthenticatedRouter/>)
        } else {
            setRouter(<UnAuthenticatedRouter/>)
        }
    }, [authenticationState.isLoggedIn])

    return router
}
