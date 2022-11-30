// const puppeteer = require('puppeteer-extra')
const puppeteer = require('puppeteer')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// const { executablePath } = require('puppeteer')

const login = async () => {
  // puppeteer.use(StealthPlugin())

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
    headless: false,
  })

  const url = process.env.URL
  const email = process.env.LOGIN_MAIL
  const passwd = process.env.LOGIN_PASSWORD

  try {
    const [page] = await browser.pages()

    await page.goto(url + '/auth/login')

    // await page.waitForSelector('.captcha-solver', { timeout: 0 })
    // await page.click('.captcha-solver')
    // await page.waitForSelector(`.captcha-solver[data-state="solved"]`, {
    //   // timeout: 180000,
    //   timeout: 0,
    // })
    // await page.click("button[type='submit']")

    await page.waitForSelector('#login')

    // // login
    await page.type('#email', email)
    await page.type('#passwd', passwd)
    await page.waitForTimeout(3000)
    await page.click('#login')

    await page.waitForTimeout(3000)
    await page.waitForSelector('#checkin-msg')

    const cookies = await page.cookies()

    const cookie = cookies.reduce((pre, cur) => {
      pre += cur.name + '=' + cur.value + ';'
      return pre
    }, '')

    return new Promise(async (resolve, reject) => {
      resolve({ cookie, err: null })
    })
  } catch (err) {
    console.log('pptr_err:', err)
    return new Promise((resolve, reject) => {
      resolve({ cookie: null, err })
    })
  } finally {
    if (browser != null) {
      await browser.close()
    }
  }
}

module.exports = {
  login,
}
