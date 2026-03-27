---
title: 2015 年 5 月 14 日发布说明
description: 介绍 MySensors、InstaPush、Notify My Android、OpenWeatherMap 和 Jabber 支持。
---
# 2015 年 5 月 14 日发布说明

距离上次发布已经过去将近忙碌的三周。我们终于完成了内部日期时间格式统一为 UTC 的重构。过程中我们新增了大量测试覆盖，以确保迁移平稳完成。关于向后不兼容的变更，请查看[UTC 重构博文](/home-assistant/blog/2015/05/09/utc-time-zone-awareness/#backwards-incompatible-stuff)。

这次发布还包含前端启动速度的显著提升，并修复了 Wemo 在其最新固件升级后的发现问题。

我还要特别感谢我们的新贡献者 [fabaff](https://github.com/fabaff)，他投入了很多时间改进文档。

:::note
要更新到最新版本，请运行 <code>脚本/更新</code>。如果遇到问题，请在 <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a> 提交反馈。
:::

<!--more-->

__覆盖实体属性__
在介绍新支持的设备和服务之前，我想先重点提一下 [rmkraus](https://github.com/rmkraus) 带来的一项很棒的配置增强：覆盖实体属性。

这些新的配置选项允许你覆盖实体的状态属性。其主要用途是覆盖那些会影响实体在界面中显示方式的属性。

```yaml
# Example configuration.yaml entry
homeassistant:
  customize:
    light.bowl:
      # hides this entity from the interface
      hidden: true
    light.ceiling:
      # Replaces the state badge with given picture
      entity_picture: http://graph.facebook.com/schoutsen/picture
```

__MySensors__
<img src='https://brands.home-assistant.io/mysensors/logo.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Andythigpen](https://github.com/andythigpen) 和 [Theolind](https://github.com/theolind) 为 Home Assistant 增加了 [MySensors 平台](http://www.mysensors.org) 支持。

```yaml
# Example configuration.yaml entry
sensor:
  platform: mysensors
  port: /dev/ttyACM0
```

__OpenWeatherMap__
<img src='/home-assistant/images/supported_brands/openweathermap.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) 贡献了 [OpenWeatherMap](http://openweathermap.org) 支持。这让你可以把本地天气数据集成到 Home Assistant 中。

```yaml
# Example configuration.yaml entry
sensor:
  platform: openweathermap
  api_key: YOUR_API_KEY
  monitored_variables:
    - type: 'weather'
    - type: 'temperature'
    - type: 'wind_speed'
    - type: 'humidity'
    - type: 'pressure'
    - type: 'clouds'
    - type: 'rain'
    - type: 'snow'
```

__InstaPush__
[Fabaff](https://github.com/fabaff) 贡献了 InstaPush 支持。你可以通过它把消息从 Home Assistant 发送到 iOS 和 Android 设备。

```yaml
# Example configuration.yaml entry
notify:
    platform: instapush
    # Get those by creating a new application, event and tracker
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    app_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
    event: ABCDEFGHJKLMNOPQRSTUVXYZ
    tracker: ABCDEFGHJKLMNOPQRSTUVXYZ
```

__XMPP__
<img src='/home-assistant/images/supported_brands/xmpp.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) 贡献了 Jabber/XMPP 支持。你可以通过 Home Assistant 向任何 Jabber/XMPP 用户发送消息。

```yaml
# Example configuration.yaml entry
notify:
    platform: xmpp
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient: YOUR_RECIPIENT
```

__Notify My Android__
<img src='/home-assistant/images/supported_brands/nma.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) 贡献了 [Notify My Android](http://www.notifymyandroid.com/) 支持。你可以借此通过 Home Assistant 向 Android 设备发送消息。

```yaml
# Example configuration.yaml entry
notify:
    platform: nma
    # Get this by registering a new application on http://www.notifymyandroid.com/
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

__时间与日期传感器__
[Fabaff](https://github.com/fabaff) 贡献了时间与日期传感器。你可以用它在仪表盘上显示当前时间和日期。

```yaml
# Example configuration.yaml entry
sensor:
  platform: time_date
  monitored_variables:
    - type: 'time'
    - type: 'date'
    - type: 'date_time'
    - type: 'time_date'
```
