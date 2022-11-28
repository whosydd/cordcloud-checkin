# cordcloud-checkin

## 配置项

由于目前直接使用 cookie 进行签到，所以当 cookie 信息失效时会使用 QQ 邮箱发送邮件，需要在 `secrets` 中配置相关环境变量

- `SEND_MAIL` ：发送邮件的邮箱，默认使用 QQ 邮箱
- `RECEIVE_MAIL` ：接收邮件的邮箱
- `TOKEN` ：这是 smtp 授权码
- `URL`：cordcloud 的网站地址
- `COOKIE`：直接登录 cordcloud 使用控制台获取 cookie

## 使用

github actions 默认北京时间每天中午 12 点执行一次，如果想要更改时间，可以编辑 `.github/workflows/checkin.yml`中的`schedule`字段，[如果你一头雾水，这个链接可能对你有帮助](https://crontab.guru/#00_12_*_*_*)
