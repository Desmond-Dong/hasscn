---
title: Lupus Electronics LUPUSEC
description: 关于将 Lupusec 家庭安防与 Home Assistant 集成的说明。
ha_category:
  - Alarm
  - Binary sensor
  - Hub
  - Switch
ha_release: 0.83
ha_iot_class: Local Polling
ha_codeowners:
  - '@majuss'
  - '@suaveolent'
ha_domain: lupusec
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - switch
ha_integration_type: hub
ha_config_flow: true
---

**Lupus Electronics LUPUSEC** 集成允许用户集成他们的 Lupusec 报警控制面板以及所有连接的传感器和其他设备。有关 LUPUS-Electronics 安防系统的更多信息，请访问他们的[网站](https://www.lupus-electronics.de)。

支持的单元：

- Lupusec XT1
- Lupusec XT2 Plus
- Lupusec XT3

以下设备由底层 `lupupy` Python 库支持并集成到 Home Assistant 中。

- **报警控制面板**：显示报警状态并控制布防、撤防和在家模式。
- **二值传感器**：显示二值传感器的状态。支持门、窗、水和烟雾传感器。
- **开关**：开关您的 Lupus 电源插座。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::