# cordcloud-checkin

## 配置项

由于登录信息比较敏感，需要在`secrets`中配置

![Screenshot of Actions secrets](https://raw.githubusercontent.com/whosydd/images-in-one/main/202109111336293.jpg)

## 使用

github actions 默认北京时间每天中午12点执行一次，如果想要更改时间，可以编辑 `.github/workflows/checkIn.yml`中的`schedule`字段，[如果你一头雾水，这个链接可能对你有帮助](https://crontab.guru/#00_12_*_*_*)

