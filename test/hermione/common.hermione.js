const { assert } = require('chai');


async function checkAdaptability(browser, width, height, url) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.setWindowSize(width, height)
   
    await page.goto(url);
    await browser.mockRestoreAll()
    await browser.assertView('plain', '.Application', {
        ignoreElements: ['.card-img-top', '.card-body', '.navbar-expand-sm'],
        screenshotDelay: 2000,
    });
}

describe('Общие требования, верстка должна адаптироваться под ширину экрана на главной', () => {
    const url = 'http://localhost:3000/hw/store'

    it('при 1600px', async ({ browser }) => {
        await checkAdaptability(browser, 1600, 2560, url);
    })

    it('при 768px', async ({ browser }) => {
        await checkAdaptability(browser, 768, 1024, url); // планшет
    })

    it('при 720px', async ({ browser }) => {
        await checkAdaptability(browser, 720, 1024, url);
    })

    it('при 320px', async ({ browser }) => {
        await checkAdaptability(browser, 320, 480, url); // телефон
    })

    
})

// describe('Общие требования, верстка должна адаптироваться под ширину экрана на странице каталог', () => {
//     const url = 'http://localhost:3000/hw/store/catalog'

//     it('при 1600px', async ({ browser }) => {
//         await checkAdaptability(browser, 1600, 1400, url);
//     })

//     it('при 720px', async ({ browser }) => {
//         await checkAdaptability(browser, 720, 900, url);
//     })

//     it('при 320px', async ({ browser }) => {
//         await checkAdaptability(browser, 320, 1200, url); // телефон
//     })

// })


describe('Общие требования', ()=> {
    it('на ширине меньше 576px навигационное меню должно скрываться за гамбургер', async({browser})=> {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
    
        await browser.setWindowSize(575, 1440)
        await page.goto('http://localhost:3000/hw/store');
        await page.waitForSelector('.Application', {timeout: 4000}) //???
        await browser.mockRestoreAll()
        await browser.assertView('plain', '.Application', {
            screenshotDelay: 2000,
        });

    }) 

    it('при выборе элемента из меню гамбургера, меню должно закрываться', async({browser}) => { 
        //баг 4
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
    
        await browser.setWindowSize(575, 1440)
        await page.goto('http://localhost:3000/hw/store');
        await page.waitForSelector('.Application', {timeout: 4000}) //???
        await page.click('.Application-Toggler')
        await page.click('.nav-link')

        const closed = await page.$('.collapse')

        assert.ok(closed, 'при выборе элемента, меню не закрылось')
      
    })
})