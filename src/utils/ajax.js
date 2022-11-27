const axios = require('axios')
const mail = require('./mail')
require('dotenv').config()

// 从环境变量读取登录信息
// const email = process.env.LOGIN_MAIL
// const passwd = process.env.LOGIN_PASSWORD
// const code = process.env.CODE
// const bakURL = process.env.BACKUP_URL

// 获取cookie
// const getCookie = url => {
//   const req = axios.create({
//     timeout: 5000,
//   })
//   return new Promise(resolve => {
//     req
//       .post(url + '/auth/login', { email, passwd, code })
//       .then(res => resolve(res.headers['set-cookie']))
//       .catch(err => {
//         console.log('err:', err.message)
//         mail(err)
//       })
//   })
// }

// 签到
const checkIn = (url, cookie) => {
  const req = axios.create({
    timeout: 5000,
    headers: {
      cookie,
    },
  })
  return new Promise(resolve => {
    req
      .post(url + '/user/checkin')
      .then(res => resolve(res.data))
      .catch(err => {
        // 无法签到时，发送邮件
        mail(err)
      })
  })
}

module.exports = {
  // getCookie,
  checkIn,
}
