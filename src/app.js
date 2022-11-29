const { checkIn } = require('./utils/ajax')
const { login } = require('./utils/puppeteer')
require('dotenv').config()

const app = async () => {
  const url = process.env.URL
  // 获取 cookie
  const cookie = await login(url)
  // 签到
  const { data } = await checkIn(url, cookie)
  console.log('msg:', data)
}
module.exports = {
  app,
}
