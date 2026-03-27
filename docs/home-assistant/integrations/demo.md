---
title: Demo
description: 'Demo 集成允许您使用带有演示实现的集成。演示实体是虚拟的，但它们可以向您展示真实平台在 Home Assistant 中的外观。这样，您就可以像使用在线 Home Assistant 演示(/home-assistant/demo/) 一样运行自己的演示实例，同时又能结合您自己的真实平台。'
ha_category:
  - Other
  - Update
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: demo
ha_iot_class: Calculated
ha_platforms:
  - air_quality
  - alarm_control_panel
  - binary_sensor
  - button
  - calendar
  - camera
  - climate
  - cover
  - date
  - datetime
  - device_tracker
  - event
  - fan
  - geo_location
  - humidifier
  - light
  - lock
  - media_player
  - notify
  - number
  - remote
  - select
  - sensor
  - siren
  - stt
  - switch
  - text
  - time
  - tts
  - update
  - vacuum
  - valve
  - water_heater
  - weather
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Demo

**Demo** 集成允许您使用带有演示实现的集成。演示实体是虚拟的，但它们可以向您展示真实平台在 Home Assistant 中的外观。这样，您就可以像使用在线 [Home Assistant 演示](/home-assistant/demo/) 一样运行自己的演示实例，同时又能结合您自己的真实平台。

可用的演示平台：

- [空气质量](/home-assistant/integrations/air_quality/) (`air_quality`)
- [报警控制面板](/home-assistant/integrations/alarm_control_panel/) (`alarm_control_panel`)
- [二进制传感器](/home-assistant/integrations/binary_sensor/) (`binary_sensor`)
- [按钮](/home-assistant/integrations/button/) (`button`)
- [日历](/home-assistant/integrations/calendar/) (`calendar`)
- [摄像头](/home-assistant/integrations/camera/) (`camera`)
- [气候](/home-assistant/integrations/climate/) (`climate`)
- [遮盖](/home-assistant/integrations/cover/) (`cover`)
- [设备跟踪器](/home-assistant/integrations/device_tracker/) (`device_tracker`)
- [风扇](/home-assistant/integrations/fan/) (`fan`)
- [地理位置](/home-assistant/integrations/geo_location/) (`geo_location`)
- [加湿器](/home-assistant/integrations/humidifier/) (`humidifier`)
- [图像处理](/home-assistant/integrations/image_processing/) (`image_processing`)
- [灯光](/home-assistant/integrations/light/) (`light`)
- [门锁](/home-assistant/integrations/lock/) (`lock`)
- [媒体播放器](/home-assistant/integrations/media_player/) (`media_player`)
- [通知](/home-assistant/integrations/notify/) (`notify`)
- [数字](/home-assistant/integrations/number/) (`number`)
- [遥控](/home-assistant/integrations/remote/) (`remote`)
- [选择](/home-assistant/integrations/select/) (`select`)
- [传感器](/home-assistant/integrations/sensor/) (`sensor`)
- [警报器](/home-assistant/integrations/siren/) (`siren`)
- [开关](/home-assistant/integrations/switch/) (`switch`)
- [文本](/home-assistant/integrations/text/) (`text`)
- [文本转语音](/home-assistant/integrations/tts/) (`tts`)
- [更新](/home-assistant/integrations/update/) (`update`)
- [吸尘器](/home-assistant/integrations/vacuum/) (`vacuum`)
- [阀门](/home-assistant/integrations/valve/) (`valve`)
- [热水器](/home-assistant/integrations/water_heater/) (`water_heater`)
- [天气](/home-assistant/integrations/weather/) (`weather`)

要在 Home Assistant 中启用演示平台，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
demo:
```

```yaml
"[component]":
  description: 配置示例列表上方说明的集成名称。
  required: true
  type: string
```
