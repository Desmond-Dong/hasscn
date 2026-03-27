---
title: Danfoss Air
description: 'Danfoss Air 集成允许您访问 Danfoss Air HRV 设备的信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
ha_release: 0.87
ha_iot_class: Local Polling
ha_domain: danfoss_air
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---
# Danfoss Air

**Danfoss Air** 集成允许您访问 Danfoss Air HRV 设备的信息。

*注意*：Danfoss Air CCM 一次只接受一个 TCP 连接。因此，当您打开 HRV PC-Tool 时，集成将无法工作。

目前 Home Assistant 支持以下设备类型：

- [二值传感器](#binary-sensor)
- [传感器](#sensor)
- [开关](#switch)

要启用 Danfoss Air，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
danfoss_air:
  host: IP_ADDRESS_OF_CCM
```

```yaml
host:
  description: Danfoss Air CCM IP。
  required: true
  type: string
```

## 二值传感器

支持以下二值传感器。

- **旁路激活**：指示热回收当前是否被旁路。

## 传感器

支持以下传感器。

- **室外温度**：室外空气温度。
- **送风温度**：送入房屋的空气温度。
- **回风温度**：从房屋抽出的空气温度。
- **排风温度**：排出空气的温度。
- **滤网剩余寿命**：滤网剩余寿命百分比。
- **湿度**：相对湿度百分比。
- **风扇档位**：风扇档位。
- **排风扇速度**：排风扇速度。
- **送风扇速度**：送风扇速度。
- **旋钮电池**：旋钮电池电量百分比。

## 开关

支持以下开关。

- **加速**：手动激活加速的开关。
- **旁路**：手动激活旁路的开关。
- **自动旁路**：启用自动旁路的开关。