---
title: 现已支持 IP 摄像头、Arduino、Kodi 和 Efergy 能耗监测器
description: '又过了一个月，Home Assistant 迎来了一批很棒的新功能。本月发布由 balloob(https://github.com/balloob)、ettisan(https://github.com/ettisan)、fabaff(https://github.com/fabaff)、gyran(htt。'
---
# 现已支持 IP 摄像头、Arduino、Kodi 和 Efergy 能耗监测器

又过了一个月，Home Assistant 迎来了一批很棒的新功能。本月发布由 [balloob](https://github.com/balloob)、[ettisan](https://github.com/ettisan)、[fabaff](https://github.com/fabaff)、[gyran](https://github.com/gyran)、[jamespcole](https://github.com/jamespcole)、[michaelarnauts](https://github.com/michaelarnauts)、[miniconfig](https://github.com/miniconfig) 和 [rmkraus](https://github.com/rmkraus) 共同实现。

这次发布还包含了我做的一些架构调整。首先，前端现在基于 [NuclearJS](http://optimizely.github.io/nuclear-js/) JavaScript 后端，这极大地改善了前端代码的组织和优化。另一个变化是，Home Assistant 现在会按需安装依赖，而不是一次性为所有受支持设备安装全部依赖。

__IP 摄像头支持__
James 付出了大量努力，为 Home Assistant 增加了 IP 摄像头支持，并已包含在本次发布中。首个版本聚焦于通用 IP 摄像头支持，这意味着只要摄像头能通过 URL 提供 JPEG 图像，就可以集成。

Home Assistant 会通过服务器转发到摄像头的请求，让你可以在 Home Assistant 应用中访问内网里的 IP 摄像头。

```yaml
# Example configuration.yaml entry
camera:
  platform: generic
  name: my sample camera
  username: MY_USERNAME
  password: MY_PASSWORD
  still_image_url: http://194.218.96.92/jpg/image.jpg
```

:::note
要更新到最新版本，请运行 <code>script/update</code>。如遇到问题，请在 <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a> 上反馈。
:::

<!--more-->

__Arduino__
<img src='/home-assistant/images/supported_brands/arduino.png' style='border:none; box-shadow: none; float: right;' height='50' /> Fabian 贡献了 Arduino 接口支持。你现在可以通过 USB 连接 Arduino，将引脚作为传感器数据暴露出来，并通过开关写入引脚状态。可查看[文档](/home-assistant/integrations/arduino/)了解详细入门指南。

```yaml
# Example configuration.yaml entry
switch:
  platform: arduino
  pins:
    11:
      name: Fan Office
      type: digital
    12:
      name: Light Desk
      type: digital

sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
      type: analog
    0:
      name: Brightness
      type: analog
```

__Kodi (XBMC)__
<img src='/home-assistant/images/supported_brands/kodi.png' style='border:none; box-shadow: none; float: right;' height='50' /> Ettisan 为媒体播放器组件贡献了 Kodi（XBMC）平台。这让你可以跟踪正在播放的媒体并进行控制。

```yaml
# Example configuration.yaml entry
media_player:
  platform: kodi
  name: Kodi
  url: http://192.168.0.123/jsonrpc
  user: kodi
  password: my_secure_password
```

__TP-Link__
<img src='/home-assistant/images/supported_brands/tp-link.png' style='border:none; box-shadow: none; float: right;' width='150' /> Michael 为设备追踪器添加了 TP-Link 支持。如果你使用 TP-Link 路由器，现在可以进行在家状态检测。

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: tplink
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__Efergy 能耗监测器__
<img src='/home-assistant/images/supported_brands/efergy.png' style='border:none; box-shadow: none; float: right;' height='50' /> Miniconfig 贡献了对 [Efergy 电表](https://efergy.com)的支持。要获取应用令牌，请登录 Efergy 账户，进入设置页面，选择 App tokens，然后点击“Add token”。

```yaml
# Example configuration.yaml entry
sensor:
  platform: efergy
  app_token: APP_TOKEN
  utc_offset: UTC_OFFSET
  monitored_variables:
    - type: instant_readings
    - type: budget
    - type: cost
      period: day
      currency: $
```

__Forecast.io__
Fabian 增加了 [Forecast.io](https://forecast.io/) 支持，用于在 Home Assistant 中获取天气预报。你需要一个 API 密钥，免费但需要先[注册](https://developer.forecast.io/register)。要将 Forecast.io 添加到你的安装中，请在 `configuration.yaml` 中加入以下内容：

```yaml
# Example configuration.yaml entry
sensor:
  platform: forecast
  api_key: YOUR_APP_KEY
  monitored_conditions:
    - summary
    - precip_type
    - precip_intensity
    - temperature
    - dew_point
    - wind_speed
    - wind_bearing
    - cloud_cover
    - humidity
    - pressure
    - visibility
    - ozone
```
