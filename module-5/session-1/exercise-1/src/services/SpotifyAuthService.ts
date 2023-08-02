import axios, {AxiosResponse} from "axios";

export default class SpotifyAuthService {

    authorizationUrl: string | undefined
    getAccessTokenUrl: string | undefined
    clientId: string | undefined
    redirectUri: string | undefined

    constructor(
        authorizationUrl: string | undefined = "https://accounts.spotify.com/authorize",
        getAccessTokenUrl: string | undefined = "https://accounts.spotify.com/api/token",
        clientId: string | undefined = import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        redirectUri: string | undefined = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
    ) {
        this.authorizationUrl = authorizationUrl
        this.getAccessTokenUrl = getAccessTokenUrl
        this.clientId = clientId
        this.redirectUri = redirectUri
    }

    getAuthorizationURL = (scope: string[], codeChallenge: string, state: string): string => {
        if (!this.clientId) {
            throw new Error("Missing client id.")
        }

        if (!this.redirectUri) {
            throw new Error("Missing redirect uri.")
        }

        const params = new URLSearchParams({
            response_type: "code",
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            scope: scope.join(" "),
            state: state,
            code_challenge_method: "S256",
            code_challenge: codeChallenge
        })

        return `${this.authorizationUrl}?${params.toString()}`
    }

    getAccessToken = (authorizationCode: string, codeVerifier: string): Promise<AxiosResponse<any>> => {
        if (!this.clientId) {
            throw new Error("Missing client id.")
        }

        if (!this.redirectUri) {
            throw new Error("Missing redirect uri.")
        }

        return axios
            .create({
                baseURL: this.getAccessTokenUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .request({
                method: "POST",
                data: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: this.redirectUri,
                    client_id: this.clientId,
                    code_verifier: codeVerifier
                }),
            })
    }
}
