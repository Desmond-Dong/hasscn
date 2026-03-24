---
title: Serial Particulate Matter
description: 有关如何将颗粒物（灰尘）传感器与 Home Assistant 集成的说明。
ha_category:
  - DIY
ha_release: 0.26
ha_iot_class: Local Polling
ha_domain: serial_pm
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

颗粒物传感器用于测量空气中极小颗粒的含量。

价格较低的 LED 传感器通常使用 GPIO 接口，这类接口较难直接连接到计算机。不过，市面上也有很多基于激光 LED 的传感器使用串口接口，您可以通过 USB 转串口适配器轻松将其连接到 Home Assistant 系统。

## 支持的传感器

目前支持以下传感器：

- oneair,s3
- novafitness,sds021
- novafitness,sds011
- plantower,pms1003
- plantower,pms5003
- plantower,pms7003
- plantower,pms2003
- plantower,pms3003

## 配置

要在您的安装中使用 PM 传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
sensor:
  - platform: serial_pm
    serial_device: /dev/tty.SLAB_USBtoUART
    brand: oneair,s3
```

```yaml
serial_device:
  description: 要使用的串口。在 *nix 系统上，通常可以通过 `$ ls /dev/tty*` 识别。
  required: true
  type: string
name:
  description: 在前端中显示的名称。
  required: false
  type: string
brand:
  description: 传感器的制造商和型号（使用支持的传感器列表中的值）。
  required: true
  type: string
```

### 已命名传感器的配置示例

```yaml
sensor:
  - platform: serial_pm
    serial_device: /dev/tty.SLAB_USBtoUART
    name: Nova
    brand: novafitness,sds011
```
