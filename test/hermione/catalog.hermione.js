const { assert } = require('chai');

describe('Проверяем страницу каталог', ()=> {
    it(`на странице с подробной информацией отображаются: 
        название товара, его описание, цена, цвет, материал и кнопка 'добавить в корзину'`, async({browser})=> {
        // BUG_ID = 9
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
    
        await browser.setWindowSize(1600, 1400)
        const prodMock = await browser.mock(
            'http://localhost:3000/hw/store/api/products/0',
            {
                method: 'get',
            }
        )
        prodMock.respond(
            {
                "id":0,
                "name":"Incredible Orange",
                "description":"Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                "price":123,
                "color":"purple",
                "material":"Fresh"
            }
        )
        await page.goto('http://localhost:3000/hw/store/catalog');
    
        await page.waitForSelector('.ProductItem-DetailsLink', {timeout: 3000})
        await page.click('.ProductItem-DetailsLink')
        await browser.assertView('plain', '.Application', {
            screenshotDelay: 2000,
            ignoreElements: '.navbar-expand-sm'
        });
    })

    it(`для каждого товара в каталоге отображается название, цена и ссылка на страницу 
    с подробной информацией о товаре`, async function ({browser}) {
        //BUG_ID= 1 - серверный
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.setWindowSize(1600, 1400)
        await page.goto('http://localhost:3000/hw/store/catalog');

        await page.waitForSelector('.ProductItem', {timeout: 2000})

        const itemPrice= await page.$('.ProductItem-Price')
        const price = await page.evaluate(itemPrice => itemPrice.textContent, itemPrice);
        assert.ok(price, "Цены товара не существует")

        const itemDetailsLink= await page.$('.ProductItem-DetailsLink')
        const details = await page.evaluate(itemDetailsLink => itemDetailsLink.textContent, itemDetailsLink);
        assert.ok(details, "Ссылки на подробную инфу товара не существует")

        const itemTitle = await page.$('.ProductItem-Name')
        const text = await page.evaluate(itemTitle => itemTitle.textContent, itemTitle);
        assert.ok(text, "Тайтла товара не существует")

    });

    
    // it('Переход с карточки на общей странице ведет на конкретный товар', async({})=> {
        
    // })
})
