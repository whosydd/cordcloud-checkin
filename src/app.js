const { checkIn } = require('./utils/ajax')
const mail = require('./utils/mail')
const { login } = require('./utils/puppeteer')

const app = async () => {
  // 获取 cookie
  const { cookie, err } = await login()

  // 出现错误时，发送邮件
  if (err != null) {
    // mail(err)
    return
  }

  // 签到
  const { data } = await checkIn(cookie)
  console.log(data.msg)
}
module.exports = {
  app,
}
