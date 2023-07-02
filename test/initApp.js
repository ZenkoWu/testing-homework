import React from 'react';
import { CartApi, ExampleApi } from "../src/client/api";
import { initStore } from "../src/client/store";
import { Application } from "../src/client/Application";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

export const initApp = () => {
    const basename = '/hw/store';
    
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart)

    const application=(
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    )

    return application;
}