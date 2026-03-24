---
title: Watergate
description: 关于如何将 Watergate 与 Home Assistant 集成的说明。
ha_category:
  - Sensor
  - Valve
  - Water management
ha_release: '2025.1'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@adam-the-hero'
ha_domain: watergate
ha_platforms:
  - event
  - sensor
  - valve
ha_quality_scale: silver
ha_integration_type: device
---

**Watergate** 集成可将您的 Watergate 设备（目前为 Sonic Wi-Fi）接入 Home Assistant。
使用此集成，您可以：

- 控制阀门
- 监控实时遥测数据（流量、水压、水温）
- 监控用水量
- 在 Sonic 因潜在漏水而关闭阀门时接收相关信息

## 前提条件

- 您需要拥有一台 Sonic 设备。
- 必须在 Watergate 应用中启用 Local API 功能。

## 支持的设备

已知此集成支持以下设备：

- Watergate Sonic Wi-Fi

## 不支持的设备

此集成不支持以下设备：

- Watergate Sonic Pro

## 支持的功能

### 实体

Watergate 集成提供以下实体。

#### 传感器

- **Water meter volume**
  - **Description**: Sonic 设备整个生命周期内通过该设备的累计用水量。
  - **Remarks**: 可用于能源仪表板。

- **Water flow rate**
  - **Description**: 当前通过设备的水流速率。
  - **Remarks**: 适合用于监控实时用水情况。

- **Water pressure**
  - **Description**: 系统当前的水压。
  - **Remarks**: 可用于检测供水系统中的潜在问题。

- **Water temperature**
  - **Description**: 当前水温。
  - **Remarks**: 适合用于监控并确保水温安全。

#### 阀门

- **Water valve state**
  - **Description**: 当前水阀状态（打开/关闭）。
  - **Remarks**: 当阀门状态变化时会自动更新。
  
#### 事件

- **Auto Shut-Off**
  - **Description**: 当检测到漏水并自动关闭阀门时触发的事件。
  - **Event Type**: `volume_threshold` 或 `duration_threshold`
  - **Event Data**:
    - `volume`: 触发关闭的用水量
    - `duration`: 触发关闭的漏水持续时间
  - **Remarks**: Home Assistant 重启后不会保留历史事件。

## 数据更新

Watergate 集成每 2 分钟从 Sonic 设备获取一次数据。
借助 webhook 选项，当水流经过时，Sonic 会每秒直接向 Home Assistant 提供实时遥测数据。

## 已知限制

此集成不支持设置自动关闭阈值。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP address:
    description: "The IP address of your Sonic device."
```

## 示例

### 在能源仪表板中监控用水量

可以将水表累计用量实体添加到能源仪表板中，以便监控用水量。

### 自动化思路

- 当家里没人时关闭供水
- 当有人到家时开启供水
- 当水温过高时发送通知
- 当水温过低时发送通知
- 当水流持续时间过长时发送通知

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
