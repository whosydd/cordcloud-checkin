const { getCookie, checkIn } = require('./utils/ajax')
require('dotenv').config()

async function app() {
  const mainURL = process.env.mainURL
  const bakURL = process.env.bakURL

  let cookie

  // 主地址无效时
  if (cookie === undefined) {
    cookie = await getCookie(bakURL)
    // 签到
    const res = await checkIn(bakURL, cookie)
    console.log(res.msg)
  } else {
    cookie = await getCookie(mainURL)
    // 签到
    const res = await checkIn(mainURL, cookie)
    console.log(res.msg)
  }
}
app()
