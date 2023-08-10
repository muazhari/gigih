import {useSelector} from "react-redux";
import {AuthenticationState} from "../slices/AuthenticationSlice.ts";
import {RootState} from "../slices/Store.ts";
import UnAuthenticatedRouter from "./UnAuthenticatedRouter.tsx";
import AuthenticatedRouter from "./AuthenticatedRouter.tsx";
import {useEffect, useState} from "react";
import MessageModalComponent from "../components/MessageModalComponent";

export default function RootRouter() {
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);

    const [router, setRouter] = useState(<UnAuthenticatedRouter/>)

    useEffect(() => {
        if (authenticationState.isLoggedIn === true) {
            setRouter(<AuthenticatedRouter/>)
        } else {
            setRouter(<UnAuthenticatedRouter/>)
        }
    }, [authenticationState.isLoggedIn])

    return (
        <>
            <MessageModalComponent/>
            {router}
        </>
    )
}
