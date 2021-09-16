const axios = require('axios')
require('dotenv').config()

// 从环境变量读取登录信息
const email = process.env.email
const passwd = process.env.passwd
const code = process.env.code
const bakURL = process.env.bakURL

// 获取cookie
const getCookie = url => {
  const req = axios.create({
    timeout: 5000,
  })
  return new Promise(resolve => {
    req
      .post(url + '/auth/login', { email, passwd, code })
      .then(res => resolve(res.headers['set-cookie']))
      .catch(err => {
        console.log(err.message)
        resolve(getCookie(bakURL))
      })
  })
}

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
        console.log(err.message)
        resolve(checkIn(bakURL, cookie))
      })
  })
}

module.exports = {
  getCookie,
  checkIn,
}
