---
title: V2C
description: 关于如何将 V2C Trydan 电动汽车充电设备与 Home Assistant 集成的说明。
ha_category:
  - Car
ha_release: '2023.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
ha_domain: v2c
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - sensor
  - switch
ha_integration_type: device
---

**V2C** 集成允许您在 Home Assistant 中监控和控制本地的 [V2C](https://v2charge.com/trydan/) Trydan 电动车供电设备（EVSE）。

Home Assistant 目前支持以下平台：

- [Sensor](#sensor)
- [Binary sensor](#binary-sensor)
- [Number](#number)
- [Switch](#switch)

## 前提条件

配置 V2C 集成时，您需要输入 Trydan EVSE 的 IP 地址。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

V2C 集成目前会提供以下二进制传感器：

- `connected`：表示 EVSE 是否已连接到车辆。
- `charging`：表示是否正在进行充电会话。
- `ready`：表示您现在可以断开车辆连接。

## 传感器

V2C 集成目前会提供以下传感器：

- `charge_power`：为车辆充电时的当前功率。
- `charge_energy`：当前充电会话期间传输到车辆的电量。
- `charge_time`：当前充电会话已持续的时间。
- `meter_error`：EVSE 提供的与动态功率控制模式相关的错误信息；如果未使用该模式，可以忽略此项。
- `house_power`：家庭当前耗电功率。如果您已在 V2C 应用中为随 <abbr title="electric vehicle supply equipment">EVSE</abbr> 附带的 <abbr title="current transformer">CT</abbr> 电流互感器完成安装和配置，则可获得此数据。
- `fv_power`：光伏系统当前发电功率。如果您已在 V2C 应用中为随 <abbr title="electric vehicle supply equipment">EVSE</abbr> 附带的 <abbr title="current transformer">CT</abbr> 电流互感器完成安装和配置，则可获得此数据。
- `battery_power`：流向家庭电池的功率。如果您已在 V2C 应用中为随 <abbr title="electric vehicle supply equipment">EVSE</abbr> 附带的 <abbr title="current transformer">CT</abbr> 电流互感器完成安装和配置，则可获得此数据。

## 数值

V2C 集成目前会提供以下数值实体：

- `intensity`：用于为车辆充电的电流。

## 开关

V2C 集成目前会提供以下开关：

- `pause session`：暂停当前充电会话。
- `lock EVSE`：禁用 EVSE。
- `charge point timer`：仅允许在预定义时段内充电（在移动应用中设置）。
- `dynamic intensity modulation`：启用动态电流调节。
- `pause dynamic control modulation`：暂停动态控制调节。
