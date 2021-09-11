const axios = require('axios')
require('dotenv').config()

// 从环境变量读取登录信息
const email = process.env.email
const passwd = process.env.passwd

// 获取cookie
const getCookie = url => {
  const req = axios.create({
    timeout: 5000,
    withCredentials: true,
  })
  return new Promise(resolve => {
    req
      .post(url, { email, passwd, code: '' })
      .then(res => resolve(res.headers['set-cookie']))
      .catch(err => {
        console.log(err.message)
        resolve(getCookie('https://www.c-cloud.xyz/auth/login'))
      })
  })
}

// 签到
const checkIn = function (url, cookie) {
  const req = axios.create({
    timeout: 5000,
    headers: {
      cookie,
    },
  })
  return new Promise(resolve => {
    req
      .post(url)
      .then(res => resolve(res.data))
      .catch(err => {
        console.log(err.message)
        resolve(checkIn('https://www.c-cloud.xyz/user/checkin', cookie))
      })
  })
}

module.exports = {
  getCookie,
  checkIn,
}
