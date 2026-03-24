---
title: FAA Delays
description: 关于如何在 Home Assistant 中使用 FAA 延误数据的说明
ha_category:
  - Transport
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ntilley905'
ha_domain: faa_delays
ha_platforms:
  - binary_sensor
ha_integration_type: service
---

**FAA Delays** 集成根据以下信息收集并显示有关美国机场延误的信息：
[FAA's National Airspace System Status](https://nasstatus.faa.gov/)。

测量的数据包括：

- 地面延误
- 地面站
- 抵达/出发延误
- 关闭


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的机场

输入的机场必须是有效的 IATA 机场
美国机场的机场代码。您可以通过查找来找到它
FAA 标识符为 [Airnav](https://airnav.com/airports/)。

## 附加延迟信息

添加的每个机场将暴露 5 个二进制传感器，每个传感器对应一种类型的延误。每个传感器内还有额外的
列为属性的信息，这取决于延迟的类型。每种延迟类型都有以下属性
列出如下：

- 地面延迟
- 平均延误时间
- 延误原因
- 地面停止
- 预计停止的结束时间
- 延误原因
- 到达/出发延误
- 最短延迟时间
- 最大延迟时间
- 延迟趋势（增加/减少）
- 延误原因
- 关闭
- 关闭开始（开始）
- 关闭结束（结束）
