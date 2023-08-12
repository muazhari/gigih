import {createSlice} from '@reduxjs/toolkit';
import User from "../models/entities/User.ts";

export interface AuthenticationState {
    isLoggedIn: boolean | undefined;
    user: User | undefined;
}

export default createSlice({
    name: 'authentication',
    initialState: <AuthenticationState>{
        isLoggedIn: false,
        user: undefined
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        register: (state, action) => {
            state.isLoggedIn = false;
            state.user = action.payload.user;
        },
        logout: (state) => {
            console.log("logout", state)
        },
    },
});



