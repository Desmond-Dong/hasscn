---
title: D-Link Wi-Fi Smart Plugs
description: 关于将 D-Link 开关集成到 Home Assistant 的说明。
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.14
ha_config_flow: true
ha_dhcp: true
ha_domain: dlink
ha_platforms:
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

**D-Link Wi-Fi Smart Plugs** 集成允许您控制 [D-Link Wi-Fi Smart Plugs](https://us.dlink.com/en/consumer/smart-home) 的状态。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

支持的设备（已测试）：

- DSP-W215
- DSP-W110

密码：默认密码是配置卡或设备背面包含的 PIN 码。

如果 D-Link Wi-Fi Smart Plugs 无法工作，请使用旧版协议。这将启用对旧版固件协议的有限支持（已测试 v1.24、v1.26）。功耗等数据将不可用。温度也会显示冰点水平。