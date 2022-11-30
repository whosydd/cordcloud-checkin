const axios = require('axios')
const mail = require('./mail')

const url = process.env.URL

// 签到
const checkIn = cookie => {
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
        console.log('ajax_err:', err.message)
        // 无法签到时，发送邮件
        mail(err)
      })
  })
}

module.exports = {
  checkIn,
}
