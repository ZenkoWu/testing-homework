import React from 'react'; 
import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../src/client/api";
import { addToCart, initStore } from "../../src/client/store";
import { Provider } from "react-redux";
import {render, screen, fireEvent  } from "@testing-library/react";
import events from '@testing-library/user-event';
import { Cart } from '../../src/client/pages/Cart';
import { createStore } from 'redux';

describe('Проверяем корзину', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart)

    const getApp = (store:any) => {
       return (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
        )
    }

    it('в корзине должна отображаться таблица с добавленными в нее товарами', () => {

        const initState = {
            cart: {
                1: { id: 1, name: "товар-1", price: 43, count: 1 },
                2: { id: 2, name: "товар-2", price: 82, count: 5 },
            },
            products: [
                { id: 1, name: "товар-1", price: 43,},
                { id: 2, name: "товар-2", price: 82 },
            ]
        }
        const store = createStore(() => initState);
        
        const {getByTestId} = render(getApp(store));

        expect(screen.getByTestId('1')).not.toBeNull()
        expect(screen.getByTestId('2')).not.toBeNull()

    })
    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async()=> {
        // process.env.BUG_ID = '7'
        const product1 = await new ExampleApi(basename).getProductById(0)
        const product2 = await new ExampleApi(basename).getProductById(1)

        const {getByTestId} = render(getApp(store));

        store.dispatch(addToCart(product1.data))
        store.dispatch(addToCart(product2.data))

        const clearButton = getByTestId('delete-order')
        await events.click(clearButton)

        expect(Object.keys(store.getState().cart).length).toBe(0)

    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров:', () => {
    
    render(
        <BrowserRouter basename={'/'}>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
    );

    expect(screen.getByRole('link', {name: /catalog/i }).getAttribute('href')).toBe('/catalog')
    })

    
})