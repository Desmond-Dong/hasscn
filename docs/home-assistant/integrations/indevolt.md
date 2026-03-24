---
title: Indevolt
description: 关于如何将 Indevolt 设备与 Home Assistant 集成的说明。
ha_release: 2026.3
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_codeowners:
  - '@xirtnl'
ha_platforms:
  - number
  - select
  - sensor
  - switch
ha_domain: indevolt
ha_integration_type: device
ha_quality_scale: bronze
ha_config_flow: true
---

Indevolt 集成可在 Home Assistant 与您的 [Indevolt](https://www.indevolt.com/) 储能设备之间建立直接的本地通信。

## 使用场景

通过此集成，您可以监控发电量、耗电量和电池状态，并配置功率限制及其他电池保护设置。

## 支持的设备

此集成支持以下设备：

- BK1600/BK1600Ultra
- SolidFlex/PowerFlex2000

## 先决条件

1. Connect your Indevolt device and Home Assistant to the same local network.
2. Ensure the Indevolt device is powered on and has acquired a network IP address. You can get the IP from the app or from your router.
3. In the Indevolt app, enable the **Local API** and set the protocol to `http`.
<!-- textlint-enable capitalize -->


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "您设备的 IP 地址。您可以在路由器或 Indevolt 应用中找到它。"
```


Indevolt 集成通过设备的标准 TCP 端口（8080）与设备通信。该端口会由 Home Assistant 自动使用，无需手动配置。

## 支持的功能

Indevolt 集成提供用于监控设备的传感器（只读）。

### Sensors

#### BK1600/BK1600Ultra (Generation 1)

- Device mode (overal setup of the device, for example standalone/cluster)
- Energy mode (battery and energy management strategy, for example Self-Consumped Prioritized/Price-Based Strategy)
- DC input power (2 channels, W)
- Daily production (kWh)
- Cumulative production (kWh)
- Total AC input power (W)
- Total AC input energy (kWh)
- Total AC output power (W)
- Total DC output power (W)
- Battery power (W)
- Battery charge/discharge state
- Battery SOC (%)
- Battery daily charging energy (kWh)
- Battery daily discharging energy (kWh)
- Battery total charging energy (kWh)
- Battery total discharging energy (kWh)
- Meter connection status
- Meter power (W)

#### SolidFlex2000/PowerFlex2000 (Generation 2)

All Generation 1 sensors, plus:

- Rated capacity (kWh)
- DC input voltage (4 channels, V)
- DC input current (4 channels, A)
- DC input power (4 channels, W)
- Grid voltage (V)
- Grid frequency (Hz)
- Bypass power (W)
- Bypass input energy (Wh)
- Off-grid output energy (kWh)
- Total AC output energy (kWh)
- Main battery serial number
- Main battery SOC (%)
- Main battery temperature (°C)
- Main battery voltage (V)
- Main battery current (A)
- Battery pack 1-5 serial number
- Battery pack 1-5 SOC (%)
- Battery pack 1-5 temperature (°C)
- Battery pack 1-5 voltage (V)
- Battery pack 1-5 current (A)

### 可配置实体（仅限第二代）

除了上面列出的只读传感器外，Indevolt 集成还会为受支持的第二代设备公开以下可配置实体。您可以直接在 Home Assistant 中修改这些设置，它们会直接应用到设备上。

- Energy mode: Configure battery and energy management strategy (select)
- Discharge limit: Set the minimum battery level (emergency power/SOC, %)
- Max AC output power: Configure maximum discharge power (W)
- Inverter input limit: Set maximum PV input power (W)
- Feed-in power limit: Configure grid feed-in power limit (W)
- Allow grid charging: Enable or disable charging from the grid (switch)
- Bypass socket: Enable or disable the bypass socket (switch)
- LED indicator: Enable or disable the LED indicator (switch)

## 数据更新

Indevolt 集成会每 30 秒轮询一次 OpenData API，以自动从您的设备获取数据。如果更新失败，集成会在下一个设定间隔自动重试（自恢复）。

## 已知限制

- 只有当设备不处于 "Outdoor / Portable" 模式时，才能设置 Energy mode
- Some sensors are device generation-specific and may not appear for all models.
- Some sensors / configurations available in the app are not (yet) available in the integration.

## 故障排除

### 无法添加设备或获取数据

1. 确保设备已通电且运行正常。
2. 确认设备和 Home Assistant 都连接在同一本地网络中。
3. 确保设备 IP 地址正确且未发生变化。
4. 检查 Indevolt 应用中的设备设置，确认 API 已启用。

更多信息请查看 Home Assistant 日志。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
