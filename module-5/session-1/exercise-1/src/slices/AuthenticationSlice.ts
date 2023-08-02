import {createSlice} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";

export interface AuthenticationState {
    isLoggedIn: boolean | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    authorizationCode: string | undefined;
    codeVerifier: string | undefined;
    state: string | undefined;
}

export default createSlice({
    name: 'authentication',
    initialState: <AuthenticationState>{
        isLoggedIn: false,
        accessToken: undefined,
        refreshToken: undefined,
        authorizationCode: undefined,
        codeVerifier: undefined,
        state: undefined,
    },
    reducers: {
        preLogin: (state, action) => {
            state.codeVerifier = action.payload.codeVerifier;
            state.state = action.payload.state;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.authorizationCode = action.payload.authorizationCode;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.authorizationCode = undefined;
            state.codeVerifier = undefined;
            state.state = undefined;
            storage.removeItem("persist")
        },
    },
});



