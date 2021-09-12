const { getCookie, checkIn } = require('./utils/ajax')
require('dotenv').config()

async function app() {
  const mainURL = process.env.mainURL

  // 获取cookie
  const cookie = await getCookie(mainURL)

  // 签到
  const res = await checkIn(mainURL, cookie)
  console.log(res.msg)
}
app()
