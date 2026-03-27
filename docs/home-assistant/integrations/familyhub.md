---
title: Samsung Family Hub
description: 'Samsung Family Hub 集成允许您在 Home Assistant 中获取 Samsung Family Hub refrigerator(https://www.samsung.com/us/explore/family-hub-refrigerator/connected-hub/)。'
ha_category:
  - Camera
ha_release: '0.70'
ha_iot_class: Local Polling
ha_domain: familyhub
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Samsung Family Hub

**Samsung Family Hub** 集成允许您在 Home Assistant 中获取 [Samsung Family Hub refrigerator](https://www.samsung.com/us/explore/family-hub-refrigerator/connected-hub/) 内部的图像。

＃＃ 配置

要在安装中启用 Family Hub 摄像头，请将以下内容添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
camera:
  - platform: familyhub
    ip_address: "IP_ADDRESS"
```

```yaml
IP 地址：
描述：您的冰箱的 IP 地址。
必填：真实
类型：字符串
```
