import {useEffect} from "react";

export default function useAuthenticationRouter(
    isLoggedIn: boolean | undefined,
    loggedInCallback: () => void,
    unLoggedInCallback: () => void
){
    useEffect(() => {
        if (isLoggedIn === true){
            loggedInCallback()
        } else {
            unLoggedInCallback()
        }
    }, [isLoggedIn])
}
