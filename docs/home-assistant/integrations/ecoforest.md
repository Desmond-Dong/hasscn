---
title: Ecoforest
description: 关于如何将 Ecoforest 壁炉与 Home Assistant 集成的说明。
ha_category:
  - Climate
ha_release: '2023.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@pjanuario'
ha_domain: ecoforest
ha_platforms:
  - number
  - sensor
  - switch
ha_integration_type: device
---

**Ecoforest** 集成允许在 Home Assistant 中监控和控制本地 [Ecoforest](https://ecoforest.com) 壁炉。

Home Assistant 目前支持以下设备平台：

- [数值](#number)
- [开关](#switch)
- [传感器](#sensor)

## 前提条件

要配置 Ecoforest 集成，您需要输入您的 Ecoforest 凭据，这些凭据与您在制造商应用程序中使用的相同。下图显示了如何获取凭据：

- 用户名：使用图中 1 标识的设备序列号。
- 密码：使用图中 4 标识的 WiFi 密码的前 8 个字符。

![Ecoforest 凭据](/home-assistant/images/integrations/ecoforest/credentials.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的型号

任何与 [Ecoforest Home](https://ecoforesthome.com/) 配合使用的 Ecoforest 设备都应该被支持，此集成已确认支持：

- Ecoforest Cordoba Glass（使用固件版本 `30Abr19_v2z`）

## 数值

Ecoforest 集成为设备功率级别公开一个数值实体。

## 开关

Ecoforest 集成公开一个开关实体，用于打开和关闭设备状态。

## 传感器

Ecoforest 集成公开多个传感器来监控各种功能：

- temperature：当前环境温度的传感器
- cpu_temperature：当前 CPU 温度的传感器
- gas_temperature：当前燃气温度的传感器
- ntc_temperature：当前 <abbr title="负温度系数">NTC</abbr> 探头温度的传感器
- status：设备当前状态的传感器。可能的值有：off、starting、pre-heating、on、shutting down、standby、alarm。
- alarm：设备当前报警的传感器。可能的值有：空气负压、颗粒、CPU 过热、未知。
- depression：当前负压进气口的传感器。
- working_hours：设备总工作小时数的传感器。
- ignitions：设备总点火次数的传感器。
- live_pulse：当前活动脉冲持续时间的传感器。
- pulse_offset：当前等待脉冲持续时间的传感器。
- extractor：当前提取器速度的传感器。
- convecto_air_flow：当前设备空气速度的传感器。