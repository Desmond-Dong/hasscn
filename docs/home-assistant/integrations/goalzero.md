---
title: Goal Zero Yeti
description: 关于如何将 Goal Zero Yeti 与 Home Assistant 集成的说明
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: 0.116
ha_config_flow: true
ha_dhcp: true
ha_domain: goalzero
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

**Goal Zero Yeti** 集成会从支持 Wi-Fi 的 [Goal Zero Yeti](https://www.goalzero.com) 设备中获取数据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 集成实体

每个添加的配置条目都会创建以下二进制传感器：

- **Backlight**：指示背光当前是否开启。
- **App Online**：指示移动应用当前是否正在被使用。
- **Charging**：显示电池当前是否正在充电。
- **Input Detected**：显示设备是否检测到电源输入。

还会创建以下开关：

- **12V Port Status**：指示 12V 电源端口当前是否开启。
- **USB Port Status**：指示 USB 电源端口当前是否开启。
- **AC Port Status**：指示 AC 电源端口当前是否开启。

还会创建以下传感器：

- **Watts In**：显示输入功率。
- **Amps In**：显示输入电流。（默认禁用）
- **Watts Out**：显示输出功率。
- **Amps Out**：显示输出电流。（默认禁用）
- **WH Out**：显示输出电量（瓦时）。（默认禁用）
- **WH Stored**：显示当前存储的电量（瓦时）。
- **Volts**：显示电池电压。（默认禁用）
- **State of Charge Percent**：显示当前电池电量百分比。
- **Temperature**：显示电池温度。
- **Time to Empty/Full**：根据当前使用情况显示距离耗尽或充满还剩多少分钟。没有电池活动时显示为 `-1`。
- **Wi-Fi Strength**：显示设备与已连接接入点之间的 Wi-Fi 信号强度。
- **Total Run Time**：设备总运行时长。（默认禁用）
- **Wi-Fi SSID**：设备连接的 Wi-Fi 网络。（默认禁用）
- **IP Address**：设备的 IP 地址。（默认禁用）
