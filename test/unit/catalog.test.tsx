import React from 'react'; 
import { render, screen,} from "@testing-library/react";
import { CartApi,  ExampleApi} from "../../src/client/api";
import {ProductDetails} from '../../src/client/components/ProductDetails';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore, } from '../../src/client/store';


describe('Проверяем страницу каталог',()=> {
    it(`на странице с подробной информацией отображаются: 
        название товара, его описание, цена, цвет, материал и кнопка 'добавить в корзину'`, async()=> {

        const product = {
            "id": 0,
            "name":"Sleek Salad",
            "description":"The automobile layout consists of a front-engine design",
            "price": 563,
            "color":"green",
            "material":"Plastic"
        }
        const basename = '/hw/store/'
        
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart)
         render(
            <MemoryRouter initialEntries={['/hw/store/catalog']}>
                <Provider store={store}>
                    <ProductDetails product={product}/>
                </Provider>
            </MemoryRouter>
        );
        
        expect(screen.getByRole('heading',{ name: "Sleek Salad" })).toBeTruthy()
        expect(screen.getByText('The automobile layout consists of a front-engine design')).toBeTruthy()
        expect(screen.getByText('$563')).toBeTruthy()
        expect(screen.getByText("green")).toBeTruthy()
        expect(screen.getByText("Plastic")).toBeTruthy()

        expect(screen.getByRole('button', { name: /add to cart/i })).toBeTruthy()    
        
    })
})