import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {persistor, store} from "./slices/Store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

import {ChakraProvider} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ChakraProvider>
                        <App/>
                    </ChakraProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
