# cordcloud-checkin

## 配置项

由于目前直接使用 cookie 进行签到，所以当cookie信息失效时会发送邮件到已配置的 QQ 邮箱，需要在 `secrets` 中配置相关环境变量

- `MAIL` ：默认使用 QQ 邮箱
- `TOKEN` ：这是 smtp 授权码
- `URL`：cordcloud 的网站地址
- `COOKIE`：直接登录 cordcloud 使用控制台获取 cookie

## 使用

github actions 默认北京时间每天中午12点执行一次，如果想要更改时间，可以编辑 `.github/workflows/checkin.yml`中的`schedule`字段，[如果你一头雾水，这个链接可能对你有帮助](https://crontab.guru/#00_12_*_*_*)

