---
title: Fjäråskupan
description: 关于如何配置 fjäråskupan 集成的说明。
ha_category:
  - Binary sensor
  - Fan
  - Light
ha_release: 2021.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elupus'
ha_domain: fjaraskupan
ha_platforms:
  - binary_sensor
  - fan
  - light
  - number
  - sensor
ha_integration_type: hub
---

[Fjäråskupan](https://fjaraskupan.se/) 允许您控制配备蓝牙的厨房风扇。

Home Assistant 目前支持以下设备类型：

- 二进制传感器
- 扇子
- 光

该集成允许控制风扇速度、灯光和厨房风扇的烹饪后计时器。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 调试集成

如果您在集成时遇到问题，可以将调试打印添加到日志中。

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fjaraskupan: debug
```
