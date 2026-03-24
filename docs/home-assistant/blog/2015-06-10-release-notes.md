---
title: 2015 年 6 月 10 日发布说明
description: Polymer 1.0、媒体播放器支持回归，以及命令行开关。
---

哇，距离上次发布几乎过去了一个月，而这次发布内容非常丰富。你最可能不会直接注意到的一项重大变化是：前端已从 Polymer 0.5 升级到全新发布的 Polymer 1.0。Polymer 已被 Google 宣布为稳定版本，这让我们能够继续扩展此前一直在等待这一时刻的功能。

这次发布还刷新了参与人数纪录：8 位！感谢 [Andythigpen](https://github.com/Andythigpen)、[Jamespcole](https://github.com/Jamespcole)、[Azelphur](https://github.com/Azelphur)、[Fabaff](https://github.com/Fabaff)、[Dutchy-](https://github.com/Dutchy-)、[Fbradyirl](https://github.com/Fbradyirl)、wind-rider 和 [ettisan](https://github.com/ettisan) 的贡献！

wind-rider 为本次发布带来了一个重要改进。他花时间恢复了 Chromecast 支持，并开始持续完善媒体播放器集成。这也带动了更多人加入，最终带来了焕然一新的媒体播放器体验，以及对 Music Player Daemon 的支持。

<p class='img'>
  <img src='/home-assistant/images/screenshots/media_player-card.png' />   新媒体播放器卡片示例
</p>

:::note
要更新到最新版本，请运行 <code>脚本/更新</code>。如果遇到问题，请在 <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a> 提交反馈。
:::

<!--more-->

在介绍新支持的平台之前，先看看这次发布带来的其他改进：

- 前端由 @balloob 升级到 Polymer 1.0
- 通过 `!include` 关键字支持在 YAML 中包含其他文件（@andythigpen）
- Vera 平台新增开关支持并修复多个问题（@jamespcole）
- HTTP 组件增加 HTTP session 支持（@jamespcole）
- 设备追踪器问题修复（@Dutchy-）
- 设备追踪器平台问题修复（@fbradyirl）
- 修复 Chromecast 支持（@wind-rider）
- 媒体播放器改进（@balloob 与 @wind-rider）
- Nest 恒温器问题修复（@balloob）
- 修复设备追踪器死锁问题（@balloob）
- 更新文档（@fabaff）

__Music Player Daemon__
<img src='/home-assistant/images/supported_brands/mpd.png' style='border:none; box-shadow: none; float: right;' height='50' /> Fabaff 贡献了 Music Player Daemon 支持。mpd 平台让你可以在 Home Assistant 中控制 [Music Player Daemon](http://www.musicpd.org/)。目前支持播放控制，不支持播放列表管理。

```yaml
# Example configuration.yaml entry
media_player:
  platform: mpd
  server: 127.0.0.1
  port: 6600
  location: bedroom
```

__命令行开关__
这是一个开关平台，在打开和关闭时会分别执行指定命令。它很可能会成为最受欢迎的平台之一，因为它让你可以把任何可通过命令行控制的开关类型集成进 Home Assistant，甚至包括调用其他脚本！

```yaml
# Example configuration.yaml entry
switch:
  platform: command_switch
  switches:
    - kitchen_light:
        oncmd: switch_command on kitchen
        offcmd: switch_command off kitchen
```

__LimitlessLED__
这个新平台可以让你在 Home Assistant 中控制 LimitlessLED 灯光。这些灯光也被称为 EasyBulb、AppLight、AppLamp、MiLight、LEDme、dekolight 或 iLight。

```yaml
# Example configuration.yaml entry
light:
  platform: limitlessled
  host: 192.168.1.10
  group_1_name: Living Room
  group_2_name: Bedroom
  group_3_name: Office
  group_4_name: Kitchen
```

__比特币传感器__
<img src='/home-assistant/images/supported_brands/bitcoin.png' style='border:none; box-shadow: none; float: right;' height='50' /> Bitcoin 平台会显示 [Bitcoin](https://bitcoin.org) 网络的多项信息。如果你使用 [Blockchain.info](https://blockchain.info/) 在线钱包，该传感器还可以显示当前余额。

```yaml
# Example configuration.yaml entry
sensor:
  platform: bitcoin
  wallet: "YOUR WALLET_ID"
  password: YOUR_ACCOUNT_PASSWORD
  currency: YOUR CURRENCY
  display_options:
    - exchangerate
    - trade_volume_btc
    - miners_revenue_usd
    - btc_mined
    - trade_volume_usd
    - difficulty
    - minutes_between_blocks
    - number_of_transactions
    - hash_rate
    - timestamp
    - mined_blocks
    - blocks_size
    - total_fees_btc
    - total_btc_sent
    - estimated_btc_sent
    - total_btc
    - total_blocks
    - next_retarget
    - estimated_transaction_volume_usd
    - miners_revenue_btc
    - market_price_usd
```

__SMTP 通知平台__
<img src='/home-assistant/images/supported_brands/smtp.png' style='border:none; box-shadow: none; float: right;' height='50' /> SMTP 平台允许你把 Home Assistant 的通知发送到电子邮件收件人。

```yaml
# Example configuration.yaml entry
notify:
  platform: mail
  server: MAIL_SERVER
  port: YOUR_SMTP_PORT
  sender: SENDER_EMAIL_ADDRESS
  starttls: 1 or 0
  username: YOUR_SMTP_USERNAME
  password: YOUR_SMTP_PASSWORD
  recipient: YOUR_RECIPIENT
```

__Syslog 通知平台__
Syslog 平台允许你把 Home Assistant 的通知发送到本地 syslog。

```yaml
# Example configuration.yaml entry
notify:
  platform: syslog
```

__瑞士公共交通传感器__
瑞士公共交通传感器会提供瑞士境内指定起点到终点的后两班发车时间。查看[组件页面](/home-assistant/integrations/swiss_public_transport)了解更多设置方法。

__Transmission 海龟模式开关__
<img src='/home-assistant/images/supported_brands/transmission.png' style='border:none; box-shadow: none; float: right;' height='50' /> Transmission 平台允许你在 Home Assistant 中控制 [Transmission](http://www.transmissionbt.com/) 客户端。该平台可让你开关其“备用速度限制”（也叫“海龟模式”）。

```yaml
# Example configuration.yaml entry
switch:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

__Hikvision 摄像头运动检测支持__
这个开关平台允许你控制 Hikvision 摄像头的运动检测设置。

```yaml
# Example configuration.yaml entry
switch:
    platform: hikvisioncam
    name: Hikvision Cam 1 Motion Detection
    host: 192.168.1.26
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```
