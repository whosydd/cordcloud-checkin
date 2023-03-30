const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()
require('dotenv').config()

chromium.use(stealth)

let count = 0

let app = () => {
  chromium.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    })
    try {
      await page.goto(process.env.URL)

      const emailHandle = await page.waitForSelector('#email', { timeout: 15000 })

      await emailHandle.fill(process.env.EMAIL)

      await page.waitForTimeout(1000)

      const passwdHandle = await page.waitForSelector('#passwd', { timeout: 15000 })
      await passwdHandle.fill(process.env.PASSWD)

      await page.waitForTimeout(1000)

      const loginHandle = await page.waitForSelector('#login', { timeout: 15000 })
      await loginHandle.click()

      await page.waitForTimeout(5000)

      const checkinHandle = await page.waitForSelector('.usercheck > p > a', { timeout: 5000 })
      const tip = await checkinHandle.innerText()

      if (tip.includes('今日已签到')) {
        const checkinTimeHandle = await page.$('.card-main > div:nth-child(2) > p:nth-child(2)')
        console.log(await checkinTimeHandle.innerText())
        await browser.close()
        return
      }

      await checkinHandle.click()

      // await page.screenshot({ path: 'stealth.png', fullPage: true })
      // await console.log('All done, check the screenshot. ✨')
      await browser.close()
    } catch (error) {
      if (count >= 5) {
        app = null
      }
      count++
      await browser.close()
      console.log('failed --> ', count)
      app()
    }
  })
}
app()
