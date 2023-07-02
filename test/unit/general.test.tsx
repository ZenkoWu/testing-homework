
import { render, screen } from "@testing-library/react";
import React from 'react';
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

export const initApp = () => {
    const basename = '/';
    
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



describe('Проверяем общие требования', () => {
    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', ()=> { 
        const app = initApp()
        
        render(app)

    expect(screen.getByRole('link', {name: /catalog/i }).getAttribute('href')).toBe('/catalog')
    expect(screen.getByRole('link', {name: /delivery/i }).getAttribute('href')).toBe('/delivery')
    expect(screen.getByRole('link', {name: /contacts/i }).getAttribute('href')).toBe('/contacts')
    expect(screen.getByRole('link', {name: /cart/i }).getAttribute('href')).toBe('/cart')

})
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
        const app = initApp()
        const {getByRole} = render(app)

        const logo = getByRole('link', {name: /Example store/i })
        expect(logo.getAttribute('href')).toBe('/')
    })
})