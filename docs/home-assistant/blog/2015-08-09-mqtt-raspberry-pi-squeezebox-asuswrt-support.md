---
title: 现已支持 MQTT、Raspberry Pi、Logitech Squeezebox 和 ASUSWRT 路由器
description: 新增对 MQTT、Raspberry Pi GPIO、Logitech Squeezebox 和 ASUSWRT 的支持
  routers
---

八月发布来了，这次有不少重磅内容。感谢 [@balloob](https://github.com/balloob) 对 Home Assistant 核心进行了一轮深入清理，并提升了测试覆盖率。如果你是开发者，请务必阅读[弃用公告](https://github.com/home-assistant/home-assistant/pull/251)。[@fabaff](https://github.com/fabaff) 也再次完善了各类组件文档。

__MQTT 支持__
<img src='/home-assistant/images/supported_brands/mqtt.png' style='border:none; box-shadow: none; float: right;' height='50' /> 本次发布最重要的新功能是 MQTT 协议支持，由 [@fabaff](https://github.com/fabaff) 贡献，并得到 [@balloob](https://github.com/balloob) 协助。现在，任何通过 MQTT 通信的 IoT 设备都可以集成。首个版本支持将 Home Assistant 连接到 Broker（暂不支持 TLS）。组件现可订阅和发布 MQTT 主题，自动化组件也已新增相关支持[MQTT-自动化]。更多信息请参见 [MQTT 组件页面][MQTT-component]。

[MQTT-自动化]: /getting-started/自动化-触发器/#MQTT-触发器
[MQTT-component]: /integrations/MQTT/

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
  # All the other options are optional:
  port: 1883
  keepalive: 60
  qos: 0
  username: your_username
  password: your_secret_password
```

<!--more-->

__Raspberry Pi GPIO 支持__
<img src='/home-assistant/images/supported_brands/raspberry-pi.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@gbarba](https://github.com/gbarba) 贡献了 Raspberry Pi 通用输入输出（GPIO）支持，你可以在 Home Assistant 中把这些引脚当作开关使用。

```yaml
# Example configuration.yaml entry
switch:
  platform: rpi_gpio
  ports:
    11: Fan Office
    12: Light Desk
```

__基于 ASUSWRT 的路由器__
<img src='/home-assistant/images/supported_brands/asus.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@persandstrom](https://github.com/persandstrom) 贡献了基于 ASUSWRT 路由器的在家状态检测支持。

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: asuswrt
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__Logitech Squeezebox 媒体播放器支持__
<img src='/home-assistant/images/supported_brands/logitech.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@persandstrom](https://github.com/persandstrom) 还贡献了 Logitech Squeezebox 媒体播放器支持，让你可以直接在 Home Assistant 中控制它。

```yaml
# Example configuration.yaml entry
media_player:
  platform: squeezebox
  host: 192.168.1.21
  port: 9090
  username: user
  password: password
```

__Slack 通知支持__
<img src='/home-assistant/images/supported_brands/slack.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@jamespcole](https://github.com/jamespcole) 为通知平台贡献了 Slack 支持，你可以将消息发送到任意频道。

```yaml
# Example configuration.yaml entry
notify:
  platform: slack
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  default_channel: "#general"
```

__Edimax 智能开关支持__
<img src='/home-assistant/images/supported_brands/edimax.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@rkabadi](https://github.com/rkabadi) 贡献了 Edimax 智能开关集成支持。

```yaml
# Example configuration.yaml entry
switch:
  platform: edimax
  host: 192.168.1.32
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  name: Edimax Smart Plug
```

__RFXtrx 传感器支持__
[@danielhiversen](https://github.com/danielhiversen) 贡献了 RFXtrx 传感器支持。该平台支持在 433.92 MHz 频段通信的传感器。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
    device: PATH_TO_DEVICE
```

这里填写你的设备路径，例如 `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`

__TEMPer 温度传感器支持__
[@rkabadi](https://github.com/rkabadi) 贡献了 TEMPer 温度传感器支持。

```yaml
# Example configuration.yaml entry
sensor:
  platform: temper
```
