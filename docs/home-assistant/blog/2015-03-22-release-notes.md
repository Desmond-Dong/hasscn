---
title: 2015 年 3 月 22 日发布说明
description: 'Home Assistant 刚刚推送了一个新版本。这个版本包含了 jamespcole(https://github.com/jamespcole)、andythigpen(https://github.com/andythigpen)、trainman419(https://github.com/trai。'
---
# 2015 年 3 月 22 日发布说明

Home Assistant 刚刚推送了一个新版本。这个版本包含了 [jamespcole](https://github.com/jamespcole)、[andythigpen](https://github.com/andythigpen)、[trainman419](https://github.com/trainman419) 和 [我](https://github.com/balloob) 贡献的错误修复，也带来了不少很棒的新功能：

__脚本__
Andythigpen 贡献了脚本组件。它允许你创建由服务调用和延时组成的顺序流程。你可以通过服务 `script/turn_on` 启动脚本，并通过服务 `script/turn_off` 中断脚本。前端也新增了一个独立页面，用来查看脚本状态。

```yaml
# Example configuration.yaml entry
script:
  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: "Wake Up"
    sequence:
      - alias: "Bedroom lights on"
        execute_service: light.turn_on
        service_data:
          entity_id: group.bedroom
      - delay:
          # supports seconds, milliseconds, minutes, hours, etc.
          minutes: 1
      - alias: "Living room lights on"
        execute_service: light.turn_on
        service_data:
          entity_id: group.living_room
```

<!--more-->

__场景__
我（Paulus）贡献了场景组件。你可以创建场景，定义某些实体应处于的状态。比如，一个场景可以设置灯 A 打开、灯 B 为亮红色。停用场景时，系统会恢复到场景激活前的状态。和脚本一样，场景也有独立页面来查看哪些场景处于开启状态。

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    entities:
      light.tv_back_light: on
      light.ceiling:
        state: on
        color: [0.33, 0.66]
        brightness: 200
```

<a name='sabnzbd'></a>
__SABnzbd__
<img src='/home-assistant/images/supported_brands/sabnzbd.png' style='border:none; box-shadow: none; float: right;' height='50' /> James Cole 贡献了 SABnzbd 集成支持。这样你就可以在 Home Assistant 中监控下载，并基于这些信息设置自动化。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sabnzbd
    name: SAB
    api_key: YOUR_API_KEY
    # Example: http://192.168.1.32:8124/
    base_url: YOUR_SABNZBD_BASE_URL
    monitored_variables:
        - type: 'current_status'
        - type: 'speed'
        - type: 'queue_size'
        - type: 'queue_remaining'
        - type: 'disk_size'
        - type: 'disk_free'
```

<a name='pushover'></a>
__Pushover__
<img src='/home-assistant/images/supported_brands/pushover.png' style='border:none; box-shadow: none; float: right;' height='50' /> James Cole 还贡献了对 <a href='https://pushover.net/'>Pushover 服务</a> 的支持，可作为通知组件的平台。这让各组件能够通过 Pushover 向你发送消息。

```yaml
# Example configuration.yaml entry
notify:
    platform: pushover
    # Get this by registering a new application on https://pushover.net
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    # Get this by logging into your account on https://pushover.net
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```
