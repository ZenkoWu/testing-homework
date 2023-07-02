import React from 'react'; 
import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { Provider } from "react-redux";
import { Home } from "../../src/client/pages/Home";
import { Catalog } from "../../src/client/pages/Catalog";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";

import {render, screen, fireEvent  } from "@testing-library/react";
import { Cart } from '../../src/client/pages/Cart';

describe('в магазине должны быть страницы', ()=> {
    const basename = '/';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart)

    it('главная', ()=> {
        render (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Home />
                </Provider>
            </BrowserRouter>
        )
        const home = screen.getByRole('heading', { name: /quickly/i })
        
        expect(home).not.toBeNull()
            
    })

    it('каталог', () => {
        render (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )
        const catalog = screen.getByRole('heading', {name: /Catalog/i})
        expect(catalog).not.toBeNull()
    })

    it('условия доставки', () => {
        render (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Delivery />
                </Provider>
            </BrowserRouter>
        )
        const delivery = screen.getByRole('heading', {name: /Delivery/i})
        expect(delivery).not.toBeNull()
    })
    
    it('контакты', () => {
        render (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Contacts />
                </Provider>
            </BrowserRouter>
        )
        const contacts = screen.getByRole('heading', {name: /Contacts/i})
        expect(contacts).not.toBeNull()
    })

})