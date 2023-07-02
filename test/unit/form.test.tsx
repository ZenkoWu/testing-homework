import React from 'react';
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Form } from "../../src/client/components/Form";
import userEvent from '@testing-library/user-event';
import { Cart } from '../../src/client/pages/Cart';

describe('Проверка валидации формы при верных данных', ()=> {
    it('Корректная работа валидации номера телефона', async()=> {
        // process.env.BUG_ID= '10'
        const correctPhoneNumber = '88005553535'
        const unCorrectPhoneNumber = 'qwertyu'
        
        const user =  userEvent.setup()
        const onSubmit = jest.fn()
        
        const basename = '/hw/store/'
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart)
        
        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Form onSubmit={onSubmit}/>
                </Provider>
            </BrowserRouter>
        );

        const onSubmitBtn = screen.getByRole('button', {name: 'Checkout'})
        const phone = screen.getByLabelText('Phone')
        const name = screen.getByTestId('name')
        const address = screen.getByTestId('address')

        await user.type(address, 'Moscow')
        await user.type(name, 'qwertyuio')

        await user.type(phone, unCorrectPhoneNumber)
        await user.click(onSubmitBtn)
        expect(onSubmit).not.toBeCalled()
        

        await user.type(phone, correctPhoneNumber)
        await user.click(onSubmitBtn)
        expect(onSubmit).toBeCalled()
    })

    // it('Проверка номера заказа', async()=> {
    //     const basename = '/hw/store/'
    //     const api = new ExampleApi(basename);
    //     const cart = new CartApi();
    //     const store = initStore(api, cart)

    //     let res = await api.checkout({ 
    //         name: 'qwerty',
    //         phone: '88005553535',
    //         address: 'Moscow'
    //     }, {})
    //     store.dispatch(checkoutComplete(res.data.id))
        
    //     render(
    //         <BrowserRouter basename={basename}>
    //             <Provider store={store}>
    //                 <Cart/>
    //             </Provider>
    //         </BrowserRouter>
    //     );
    //     expect(screen.getByText('1')).toBeTruthy()
        
    //     screen.logTestingPlaygroundURL()

    // })
})