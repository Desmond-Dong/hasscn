---
title: Huum
description: 关于如何将 Huum 桑拿集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Number
  - Sensor
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frwickst'
  - '@vincentwolsink'
ha_domain: huum
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - light
  - number
  - sensor
ha_integration_type: device
---

将 [Huum](https://huum.eu/) 桑拿设备接入 Home Assistant。

配置此集成时，您需要提供用户名（通常是邮箱地址）和密码。

此集成在桑拿门开启时采用与 Huum 应用相同的安全措施。
如果桑拿门处于打开状态，桑拿不会启动。

:::note
当桑拿处于关闭状态时，您必须先开启桑拿，再设置温度。
这是为了防止误操作导致意外启动桑拿。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Available platforms & entities

### Binary sensors

- **Door**：桑拿门状态（打开或关闭）。

### Sensors

- **Temperature**：当前桑拿温度（摄氏度）。

### Climate

气候实体用于控制桑拿加热器，并提供以下能力：

- 调整目标温度
- 更改运行模式（关闭或加热）

### Light

- **Light**：桑拿照明控制（开或关）。

### Number

- **Humidity**：控制蒸汽器占空比（0-10）以调节桑拿湿度。
