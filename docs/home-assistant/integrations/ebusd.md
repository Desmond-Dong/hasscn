---
title: ebusd
description: 'ebusd(https://github.com/john30/ebusd/) 守护进程（用于与 eBUS 供暖系统通信）与 Home Assistant 之间的集成。ebusd 集成使用传感器集成。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.88
ha_domain: ebusd
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# ebusd

[ebusd](https://github.com/john30/ebusd/) 守护进程（用于与 eBUS 供暖系统通信）与 Home Assistant 之间的集成。ebusd 集成使用传感器集成。

## 配置

通过将以下内容添加到您的 "`configuration.yaml`" 文件来启用传感器。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
ebusd:
  host: 127.0.0.1
  circuit: "700"
```

```yaml
host:
  description: 这是您的 ebus 守护进程的 IP 地址，例如 `127.0.0.1`。
  required: true
  type: string
circuit:
  description: 要监控的供暖回路名称，例如 '700'、'ehp' 或 'bai'。
  required: true
  type: string
port:
  description: 您的 ebus 守护进程使用的端口。
  type: integer
  required: false
  default: 8888
name:
  description: 显示此 ebusd 实例时使用的名称。
  type: string
  required: false
  default: ebusd
monitored_conditions:
  description: 要监控的条件列表。请注意，您的回路可能不支持此处列出的所有 monitored_conditions。此集成将有限的键集映射到特定回路的 ebusd 值。
  type: list
  required: false
  keys:
    ActualFlowTemperatureDesired:
      description: 供暖回路期望流量温度。
    MaxFlowTemperatureDesired:
      description: 供暖回路最大流量温度。
    MinFlowTemperatureDesired:
      description: 供暖回路最小流量温度。
    PumpStatus:
      description: 供暖回路泵状态。
    HCSummerTemperatureLimit:
      description: 供暖回路夏季温度限制。
    HolidayTemperature:
      description: 供暖回路假日温度。
    HWTemperature:
      description: 热水回路实际温度。
    HWTemperatureDesired:
      description: 热水回路期望温度。
    HWTimerMonday:
      description: 热水回路星期一计时器。
    HWTimerTuesday:
      description: 热水回路星期二计时器。
    HWTimerWednesday:
      description: 热水回路星期三计时器。
    HWTimerThursday:
      description: 热水回路星期四计时器。
    HWTimerFriday:
      description: 热水回路星期五计时器。
    HWTimerSaturday:
      description: 热水回路星期六计时器。
    HWTimerSunday:
      description: 热水回路星期日计时器。
    WaterPressure:
      description: 水压（巴）。
    Zone1RoomZoneMapping:
      description: 房间控制器分配区域 1。
    Zone1NightTemperature:
      description: 区域 1 供暖回路期望夜间温度。
    Zone1DayTemperature:
      description: 区域 1 供暖回路期望日间温度。
    Zone1HolidayTemperature:
      description: 区域 1 供暖回路期望假日温度。
    Zone1RoomTemperature:
      description: 区域 1 实际房间温度。
    Zone1ActualRoomTemperatureDesired:
      description: 区域 1 期望实际房间温度。
    Zone1TimerMonday:
      description: 区域 1 供暖回路星期一计时器。
    Zone1TimerTuesday:
      description: 区域 1 供暖回路星期二计时器。
    Zone1TimerWednesday:
      description: 区域 1 供暖回路星期三计时器。
    Zone1TimerThursday:
      description: 区域 1 供暖回路星期四计时器。
    Zone1TimerFriday:
      description: 区域 1 供暖回路星期五计时器。
    Zone1TimerSaturday:
      description: 区域 1 供暖回路星期六计时器。
    Zone1TimerSunday:
      description: 区域 1 供暖回路星期日计时器。
    Zone1OperativeMode:
      description: 供暖回路操作模式（开/关/日间/夜间）。
    ContinuosHeating:
      description: 连续供暖。
    PowerEnergyConsumptionLastMonth:
      description: 上月能耗。
    PowerEnergyConsumptionThisMonth:
      description: 本月能耗。
    HotWaterTemperature:
      description: 热水回路温度。
    StorageTemperature:
      description: 锅炉温度。
    DesiredStorageTemperature:
      description: 目标锅炉温度。
    OutdoorsTemperature:
      description: 用于天气相关计算的温度。
    AverageIgnitionTime:
      description: 平均火焰点火时间（秒）。
    MaximumIgnitionTime:
      description: 最大火焰点火时间（秒）。
    MinimumIgnitionTime:
      description: 最小火焰点火时间（秒）。
    ReturnTemperature:
      description: 从水回路返回加热器的温度。
    DesiredFlowTemperature:
      description: 目标加热温度。
    FlowTemperature:
      description: 出口温度。
```