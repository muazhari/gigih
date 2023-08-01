import {useEffect} from "react";
import "./index.css"
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import forge from "node-forge";
import SpotifyAuthService from "../../services/SpotifyAuthService.ts";

export default function LoginPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const spotifyAuthService: SpotifyAuthService = new SpotifyAuthService()

    useEffect(() => {
        const params: URLSearchParams = new URLSearchParams(window.location.search)
        const authorizationCode: string | null = params.get("code")
        const state: string | null = params.get("state")

        // if (state !== null) {
        //     console.log(state, authenticationState.state)
        //     if(state !== authenticationState.state) {
        //         throw new Error("State is not match.")
        //     }
        // }

        if (authorizationCode !== null) {
            if (authenticationState.codeVerifier === undefined) {
                throw new Error("Code verifier is undefined.")
            }

            spotifyAuthService
                .getAccessToken(authorizationCode, authenticationState.codeVerifier)
                .then((result) => {
                    if (result.status === 200) {
                        dispatch(authenticationSlice.actions.login({
                            accessToken: result.data.access_token,
                            authorizationCode: authorizationCode
                        }))
                    } else {
                        throw new Error(`Get access token failed: ${result}`)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    const handleClickLoginWithSpotify = (event: any) => {
        const codeVerifier: string = forge.util.encode64(forge.random.getBytesSync(256))
        const codeChallenge: string = forge.util.encode64(forge.sha256.create().update(codeVerifier).digest().getBytes())
        const state: string = forge.util.encode64(forge.random.getBytesSync(32))
        const scope: string[] = [
            "user-read-private",
            "user-read-email"
        ]
        const spotifyLoginUrl: string = spotifyAuthService.getAuthorizationURL(scope, codeChallenge, state)
        dispatch(authenticationSlice.actions.preLogin({
            codeVerifier: codeVerifier,
            state: state
        }))
        window.location.href = spotifyLoginUrl
    }

    return (
        <>
            <div className="page login">
                <h1>
                    Login Page
                </h1>
                <button
                    onClick={handleClickLoginWithSpotify}
                >
                    Login with Spotify
                </button>
            </div>
        </>
    )
}

