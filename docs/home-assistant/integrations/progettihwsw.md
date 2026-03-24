---
title: ProgettiHWSW Automation
description: 有关如何将 ProgettiHWSW 远程继电器板集成到 Home Assistant 中的说明。
ha_category:
  - Binary sensor
  - DIY
  - Switch
ha_release: 0.115
ha_iot_class: Local Polling
ha_domain: progettihwsw
ha_codeowners:
  - '@ardaseremet'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: device
---

**ProgettiHWSW Automation** 集成将 ProgettiHWSW 板卡的自动化能力带入 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

`progettihwsw` 二进制传感器平台允许您读取 [ProgettiHWSW Board](http://www.progetti-hw-sw.it/) 的输入值。

传感器输入编号可在板卡外壳和 PCB 上查看。

## 开关

`progettihwsw` 开关平台允许您控制 [ProgettiHWSW Board](http://www.progetti-hw-sw.it/) 的继电器。

有关板卡的更多信息，请访问[官网](http://www.progetti-hw-sw.it/)。

### 故障排除

目前此集成暂无已知错误。如有问题，欢迎提交反馈给我们。
