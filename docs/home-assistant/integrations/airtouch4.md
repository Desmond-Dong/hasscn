---
title: AirTouch 4
description: 'AirTouch 4 integration 允许您控制使用 AirTouch 4(https://www.airtouch.net.au/airtouch/airtouch-4/) 控制器的管道式空调系统。目前，此集成仅支持带有独立温度控制 (ITC) 模块的 AirTouch 4 控制器。'
ha_category:
  - Climate
ha_release: 2021.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: airtouch4
ha_platforms:
  - climate
ha_integration_type: device
ha_codeowners:
  - '@samsinnamon'
---
# AirTouch 4

**AirTouch 4** integration 允许您控制使用 [AirTouch 4](https://www.airtouch.net.au/airtouch/airtouch-4/) 控制器的管道式空调系统。目前，此集成仅支持带有独立温度控制 (ITC) 模块的 AirTouch 4 控制器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

### 温控

该 integration 将为每个具有温度控制的 zone 创建一个温控 entity。
