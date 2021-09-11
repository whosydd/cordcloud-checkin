const { getCookie, checkIn } = require('./utils/ajax')

async function app() {
  // 获取cookie
  const cookie = await getCookie('https://www.cordcloud.one/auth/login')

  // 签到
  const res = await checkIn('https://www.cordcloud.one/user/checkin', cookie)
  console.log(res.msg)
}
app()
