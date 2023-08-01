import {useSelector} from "react-redux";
import {AuthenticationState} from "../slices/AuthenticationSlice.ts";
import {RootState} from "../slices/Store.ts";
import UnAuthenticatedRouter from "./UnAuthenticatedRouter.tsx";
import AuthenticatedRouter from "./AuthenticatedRouter.tsx";

export default function RootRouter() {
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const {isLoggedIn} = authenticationState;

    return (
        <>
            {isLoggedIn === true ? <AuthenticatedRouter/> : <UnAuthenticatedRouter/>}
        </>
    )
}
