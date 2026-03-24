---
title: HDFury
description: 关于如何在 Home Assistant 中集成 HDFury 设备的说明。
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.2
ha_category:
  - Button
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: platinum
ha_zeroconf: true
---

**HDFury** 集成允许您控制和监控您的 [HDFury](https://hdfury.com/) 设备。

## 用例

- 监控当前设备状态。
- 控制 HDMI 端口选择器和操作状态。
- 控制音频静音和显示/继电器配置。
- 监控 HDMI 输入、输出和音频信号状态。

## 支持的设备

- [VRROOM](https://hdfury.com/product/8k-vrroom-40gbps/)
- [Diva](https://hdfury.com/product/4k-diva-18gbps/)
- [Vertex 2](https://hdfury.com/product/4k-vertex2-18gbps/)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "HDFury 设备的主机名或 IP 地址。"
```

## 支持的功能

该集成将从每个设备获取数据。
以下是此集成提供的实体的完整概述。

### 按钮

- 触发热插拔（向热插拔 TX 和 RX 连接的设备发送命令）
- 重启（远程重启设备）

### 数字

- OLED 淡出计时器（控制前面板 OLED 显示屏淡出前的时间）
- 重启计时器（控制自动设备重启的间隔）

### 选择

- 操作模式（控制设备操作模式，分配器/矩阵等）
- 端口选择 TX0（控制输出 TX0 的 HDMI 源选择）
- 端口选择 TX1（控制输出 TX1 的 HDMI 源选择）

### 传感器

- Audio TX0（HDMI 输出 TX0 上的当前音频格式/状态）
- Audio TX1（HDMI 输出 TX1 上的当前音频格式/状态）
- Audio output（HDMI 输出 AUD 上的当前音频格式/状态）
- eARC/ARC 状态（当前 eARC 或 ARC 连接状态）
- EDID TXA0（从 TX0 音频通道接收的 EDID）
- EDID TXA1（从 TX1 音频通道接收的 EDID）
- EDID AUDA（从 AUD 音频输出接收的 EDID）
- Input RX0（HDMI 输入 RX0 的状态和信号信息）
- Input RX1（HDMI 输入 RX1 的状态和信号信息）
- EDID TX0（从 TX0 视频通道接收的 EDID）
- EDID TX1（从 TX1 视频通道接收的 EDID）
- EDID AUD（从 AUD 视频通道接收的 EDID）
- Output TX0（HDMI 输出 TX0 的状态和信号信息）
- Output TX1（HDMI 输出 TX1 的状态和信号信息）

### 开关

- 自动切换输入（自动切换到活动的 HDMI 输入）
- CEC（在所有输入和输出上启用或禁用 HDMI-CEC）
- CEC RX0（在输入 RX0 上启用或禁用 HDMI-CEC）
- CEC RX1（在输入 RX1 上启用或禁用 HDMI-CEC）
- CEC RX2（在输入 RX2 上启用或禁用 HDMI-CEC）
- CEC RX3（在输入 RX3 上启用或禁用 HDMI-CEC）
- HTPC 模式 RX0（为 HDMI 输入 RX0 启用 HTPC 优化模式）
- HTPC 模式 RX1（为 HDMI 输入 RX1 启用 HTPC 优化模式）
- HTPC 模式 RX2（为 HDMI 输入 RX2 启用 HTPC 优化模式）
- HTPC 模式 RX3（为 HDMI 输入 RX3 启用 HTPC 优化模式）
- 红外（启用或禁用红外接收器）
- 静音 TX0（在 HDMI 输出 TX0 上静音音频输出）
- 静音 TX1（在 HDMI 输出 TX1 上静音音频输出）
- OLED 显示屏（打开或关闭前面板 OLED 显示屏）
- 继电器（控制板载继电器输出）
- TX0 强制 +5v（强制 TX0 的 HDMI 电缆上的 +5v 线路处于活动状态）
- TX1 强制 +5v（强制 TX1 的 HDMI 电缆上的 +5v 线路处于活动状态）

## 数据更新

此集成使用本地轮询，意味着它通过定期与 HDFury 设备通信来检查所有实体的更改。

该集成将每分钟从设备检索一次数据。

## 示例

以下示例展示了如何在 Home Assistant 自动化中使用 HDFury 集成。
这些示例只是一个起点，您可以将它们作为灵感来创建自己的自动化。

### 切换 HDMI 输入

以下示例在媒体播放器开机时将 HDFury 输入切换到正确的源。


```yaml
automation:
  - alias: "开机时将 HDFury 输入切换到 Nvidia SHIELD"
    triggers:
      - trigger: state
        entity_id:
          - remote.nvidia_shield
        to:
          - "on"
        from:
          - "off"

    actions:
      - action: select.select_option
        target:
          entity_id: select.hdfury_port_selector_tx0
        data:
          option: 1
```


## 已知限制

HDFury 集成目前没有已知限制。

## 故障排除

如果您遇到 HDFury 集成的问题，请尝试这些常规故障排除步骤：

1. 确保您的 HDFury 设备已开机并正确连接到您的家庭网络。
2. 验证 HDFury 设备上的 OLED 屏幕是否显示 IP 地址。
3. 如果集成显示为不可用，请尝试重启您的 HDFury 设备和 Home Assistant。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.