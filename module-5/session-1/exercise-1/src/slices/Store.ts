import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authenticationSlice from "./AuthenticationSlice.ts";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    [authenticationSlice.name]: authenticationSlice.reducer,
})

const persistedReducer = persistReducer({
        key: "persist",
        whitelist: ["authentication"],
        storage,
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

