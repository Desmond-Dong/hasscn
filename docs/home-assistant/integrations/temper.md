---
title: TEMPer
description: 有关如何将 TEMPer 传感器集成到 Home Assistant 的说明。
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: temper
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

此 **TEMPer** 集成可让您从 TEMPer 设备获取当前温度。

## 配置

要在您的安装中使用 TEMPer 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: temper
```

```yaml
offset:
  description: 用于修正上报数值的偏移量。
  required: false
  type: integer
  default: 0
scale:
  description: 传感器的缩放系数。
  required: false
  type: integer
  default: 1
name:
  description: 显示此传感器时使用的名称。
  required: false
  type: string
  default: Unnamed Device
```

由于其中一些传感器持续显示偏高温度，因此可以使用 `scale` 和 `offset` 来微调传感器读数。
计算公式为 `scale * sensor value + offset`。

默认情况下，TEMPer 传感器只能由 root 访问。要修复系统中的 USB 权限，请创建文件 `/etc/udev/rules.d/99-tempsensor.rules`，并向其中添加以下一行：

```text
SUBSYSTEMS=="usb", ACTION=="add", ATTRS{idVendor}=="0c45", ATTRS{idProduct}=="7401", MODE="666"
```

之后重新插拔设备，并重启 Home Assistant。
