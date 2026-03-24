---
title: Leviton Decora Wi-Fi
description: 关于如何在 Home Assistant 中设置 Leviton Decora Smart Wi-Fi 开关/调光器的说明。
ha_category:
  - Light
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_domain: decora_wifi
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

通过 MyLeviton API 支持 [Leviton Decora Wi-Fi](https://leviton.com/products/residential/smart-home/smart-switches) 调光器和开关。

支持的设备（已测试）：

- [DW6HD1-BZ](https://leviton.com/products/dw6hd-1bz)（Decora Smart Wi-Fi 600W 调光器）
- [DW15P-1BW](https://leviton.com/products/dw15p-1bw)（Decora Smart Wi-Fi 即插即用插座）
- [DW15S-1BZ](https://leviton.com/products/dw15s-1bz)（Decora Smart Wi-Fi 15A 开关）
- [D215S-2RW](https://store.leviton.com/products/decora-smart-wi-fi-switch-2nd-gen-d215s-2rw)（Decora Smart Wi-Fi 15A 开关 - 第二代）
- [DN15S-1BW](https://leviton.com/products/dn15s-1bw)（Decora Smart 无零线开关）通过 [MLWSB-1BW](https://leviton.com/products/mlwsb-1bw)（Decora Smart Wi-Fi 无零线开关/调光器网桥）
- [D2MSD-1BW](https://leviton.com/products/d2msd-1bw)（Decora Smart 动作感应调光开关，Wi-Fi 第二代）

要启用这些灯光，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
light:
  - platform: decora_wifi
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
username:
  description: 您的 “My Leviton” 应用电子邮件地址或用户名。
  required: true
  type: string
password:
  description: 您的 “My Leviton” 应用密码。
  required: true
  type: string
```
