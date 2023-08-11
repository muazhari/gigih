import {useSelector} from "react-redux";
import {AuthenticationState} from "../slices/AuthenticationSlice.ts";
import {RootState} from "../slices/Store.ts";
import UnAuthenticatedRouter from "./UnAuthenticatedRouter.tsx";
import AuthenticatedRouter from "./AuthenticatedRouter.tsx";
import {useState} from "react";
import MessageModalComponent from "../components/MessageModalComponent";
import useAuthenticationRouter from "../hooks/UseAuthenticationRouter.ts";

export default function RootRouter() {
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const [router, setRouter] = useState(<UnAuthenticatedRouter/>)

    useAuthenticationRouter(
        authenticationState.isLoggedIn,
        () => {
            setRouter(<AuthenticatedRouter/>)
        },
        () => {
            setRouter(<UnAuthenticatedRouter/>)
        }
    )

    return (
        <>
            <MessageModalComponent/>
            {router}
        </>
    )
}
