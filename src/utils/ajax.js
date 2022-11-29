const axios = require('axios')
const mail = require('./mail')
require('dotenv').config()

// 签到
const checkIn = (url, cookie) => {
  const req = axios.create({
    timeout: 5000,
    headers: {
      cookie,
    },
    responseType: 'json',
    responseEncoding: 'utf8',
  })
  return new Promise(resolve => {
    req
      .post(url + '/user/checkin')
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // 无法签到时，发送邮件
        mail(err)
        console.log('err:', err.message)
      })
  })
}

module.exports = {
  checkIn,
}
