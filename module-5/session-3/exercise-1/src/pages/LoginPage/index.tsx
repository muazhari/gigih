import {useEffect} from "react";
import "./index.scss"
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import SpotifyAuthService from "../../services/SpotifyAuthService.ts";
import {md, util} from "node-forge";
import AuthenticatedRouter from "../../routers/AuthenticatedRouter.tsx";
import UnAuthenticatedRouter from "../../routers/UnAuthenticatedRouter.tsx";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const spotifyAuthService: SpotifyAuthService = new SpotifyAuthService()
    const navigate = useNavigate()

    useEffect(() => {
        if(authenticationState.isLoggedIn === true) {
            navigate("/")
        }
    }, [authenticationState.isLoggedIn])

    useEffect(() => {
        const params: URLSearchParams = new URLSearchParams(window.location.search)
        const authorizationCode: string | null = params.get("code")

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
                            refreshToken: result.data.refresh_token,
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

    const generateRandomString = (length: number): string => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    const base64UrlEncode = (bytes: string): string => {
        return util.encode64(bytes)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const handleClickLoginWithSpotify = async (event: any) => {
        const codeVerifier: string = generateRandomString(128)
        const hashedCodeVerifier: string = md.sha256.create().update(codeVerifier).digest().bytes()
        const codeChallenge: string = base64UrlEncode(hashedCodeVerifier)
        const state: string = generateRandomString(16)
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

