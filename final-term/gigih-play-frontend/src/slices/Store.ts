import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authenticationSlice from "./AuthenticationSlice.ts";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import domainSlice from "./DomainSlice.ts";
import messageSlice from "./MessageSlice.ts";

const appReducer = combineReducers({
    [authenticationSlice.name]: authenticationSlice.reducer,
    [domainSlice.name]: domainSlice.reducer,
    [messageSlice.name]: messageSlice.reducer,
})

const rootReducer = (state: any, action: any) => {
    if (action.type === 'authentication/logout') {
        storage.removeItem("persist")
        state = undefined
    }
    return appReducer(state, action)
}

const persistedReducer = persistReducer({
        key: "persist",
        whitelist: ["authentication", "domain"],
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

