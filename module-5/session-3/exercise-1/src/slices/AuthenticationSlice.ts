import {createSlice} from '@reduxjs/toolkit';
import User from "../models/User.ts";

export interface AuthenticationState {
    isLoggedIn: boolean | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    authorizationCode: string | undefined;
    codeVerifier: string | undefined;
    state: string | undefined;
    user: User | undefined;
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
        user: undefined
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
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
        },
    },
});



