const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')

const login = async url => {
  puppeteer.use(StealthPlugin())

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
  })

  const [page] = await browser.pages()

  await page.goto(url + '/auth/login')

  await page.waitForSelector('#login', { visible: true })

  // // login
  const email = process.env.LOGIN_MAIL
  const passwd = process.env.LOGIN_PASSWORD
  await page.type('#email', email)
  await page.type('#passwd', passwd)
  await page.waitForTimeout(3000)
  await page.click('#login')

  await page.waitForSelector('#checkin-msg')
  await page.waitForTimeout(3000)

  const cookies = await page.cookies()

  const cookie = cookies.reduce((pre, cur) => {
    pre += cur.name + '=' + cur.value + ';'
    return pre
  }, '')

  return new Promise(async (resolve, reject) => {
    resolve(cookie)
    await browser.close()
  })
}

module.exports = {
  login,
}
