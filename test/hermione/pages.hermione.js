const basename = 'http://localhost:3000/hw/store'

async function checkStatic(browser, path) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.setWindowSize(1920, 1080)
    
    await page.goto(basename + path);
    await browser.mockRestoreAll()
    await browser.assertView('plain', '.Application', {
        screenshotDelay: 2000,
        ignoreElements: '.navbar-expand-sm'
    });
}
describe('страницы должны иметь статичное содержание', ()=> {
    it('Доставка', async ({browser})=> {
        await checkStatic(browser, '/delivery')
    })

    it('Контакты', async ({browser})=> {
        await checkStatic(browser, '/contacts')
    })
})