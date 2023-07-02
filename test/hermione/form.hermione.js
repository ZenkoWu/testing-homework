const { assert } = require('chai');


it('Проверяем форму успешной покупки', async({browser})=> {
    // process.env.BUG_ID = '8' // ловит 5 баг !!
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.setWindowSize(1600, 1400)
    const prodMock = await browser.mock(
        'http://localhost:3000/hw/store/api/checkout',
        {
            method: 'post',
        }
    )
    prodMock.respond(
        {
            "id": 123
        }
    )
    await page.goto('http://localhost:3000/hw/store/catalog');

    await page.waitForSelector('.ProductItem-DetailsLink', {timeout: 2000})
    await page.click('.ProductItem-DetailsLink')

    await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 2000})
    await page.click('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')

    await page.goto('http://localhost:3000/hw/store/cart')

    await page.waitForSelector('.Form', {timeout: 2000})
    
    await page.click('.Form-Field_type_name')
    await page.keyboard.type('qwertyu')

    await page.click('.Form-Field_type_phone')
    await page.keyboard.type('88005553535')

    await page.click('.Form-Field_type_address')
    await page.keyboard.type('Moscow')


    await page.click('.Form-Submit')
    await browser.assertView('plain', '.Application', {
        // ignoreElements: '.Cart-Number',
        ignoreElements: '.navbar-expand-sm',
        screenshotDelay: 2000,
    });
})


it('Проверяем правильный номер заказа', async({browser})=> {
    //BUG_ID = 2 1!!
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.setWindowSize(1600, 1400)
    await page.goto('http://localhost:3000/hw/store/catalog');

    await page.waitForSelector('.ProductItem-DetailsLink', {timeout: 2000})
    await page.click('.ProductItem-DetailsLink')

    await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 2000})
    await page.click('.ProductDetails-AddToCart')

    await page.goto('http://localhost:3000/hw/store/cart')

    await page.waitForSelector('.Form', {timeout: 2000})
    
    await page.click('.Form-Field_type_name')
    await page.keyboard.type('qwertyu')

    await page.click('.Form-Field_type_phone')
    await page.keyboard.type('88005553535')

    await page.click('.Form-Field_type_address')
    await page.keyboard.type('Moscow')

    await page.click('.Form-Submit')

    await page.waitForSelector('.Cart-Number', {timeout: 4000})
    const orderId = await page.$('.Cart-Number')
    const orderIdNum = await page.evaluate(orderId => orderId.textContent, orderId);
    assert.ok(orderIdNum < 100000000, 'неправильный номер заказа')
})