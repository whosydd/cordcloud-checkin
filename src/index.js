const { checkIn } = require('./utils/ajax')
require('dotenv').config()

async function app() {
  const url = process.env.URL
  // 在环境变量中配置cookie
  const cookie = process.env.COOKIE
  // 签到
  const res = await checkIn(url, cookie)
  console.log(res.msg)
}
app()
