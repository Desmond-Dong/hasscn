---
title: NRGkick
description: "使用本地 REST JSON API 集成 NRGkick Gen2 移动电动汽车充电器。"

ha_category:
  - Energy
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_release: 2026.2
ha_codeowners:
  - '@andijakl'
ha_domain: nrgkick
ha_integration_type: device
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - number
  - sensor
  - switch
related:
  - url: https://www.nrgkick.com/
    title: NRGkick Website
---

The **NRGkick** integration allows you to monitor the [NRGkick](https://www.nrgkick.com/) mobile EV charger (Wallbox) by DiniTech with Home Assistant. The wallbox is smart home friendly and allows detailed monitoring with 80+ data points.

该集成使用本地 REST JSON API 直接连接到本地网络上的设备。无需云连接。

## Supported devices

- NRGkick Gen2（智能电缆/灵活壁箱）

:::note
The NRGkick is available in different variants, including the 16A and 32A models, as well as models with cellular (SIM) and GPS capabilities. All are compatible with this integration.

The NRGkick 16A light model needs the "NRGkick App incl. Bluetooth/Wi-Fi connectivity" as one-time upgrade to use the local API.

:::
## Unsupported devices

- NRGkick Gen1（仅限蓝牙）

## Prerequisites

- Home Assistant 和 NRGkick 设备需要位于同一本地网络。
- 您的 NRGkick 设备需要具有 SmartModule 固件 4.0.0.0 或更高版本。
- 需要在 NRGkick 应用程序中启用 REST JSON API。

To enable the API:

1. 在智能手机上打开制造商提供的 NRGkick 应用程序。
2. 转到**扩展** > **本地 API**。
3. 启用 **JSON API**。
4. 可选：启用身份验证并设置用户名和密码。

## Configuration

To add the **NRGkick** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nrgkick)

NRGkick can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nrgkick).
- From the list, select **NRGkick**.
- Follow the instructions on screen to complete the setup.

</details>

如果您在 NRGkick 应用程序中启用了身份验证，请在设置过程中输入用户名和密码。

```yaml
Host:
  description: |
    The hostname or IP address of your NRGkick device, for example, `nrgkick.local` or `192.0.2.10`.
Username:
  description: Username for HTTP Basic Authentication (optional).
Password:
  description: Password for HTTP Basic Authentication (optional).
```

## Supported functionality

该集成提供了监控充电和控制充电设置的实体。

### Sensors

该集成创建了以下传感器：

#### Device information

##### General

- **额定电流** (A)：NRGkick 的最大额定电流。

##### Connector

- **连接器相位计数**：所连接附件的相位计数。
- **连接器最大电流** (A)：所连接附件的最大电流。
- **连接器类型**：附件类型（例如类型 2、CEE、国内）。
- **连接器序列**：附件序列号（默认情况下禁用）。

##### Grid

- **电网电压** (V)：检测到的电网电压类型。
- **电网频率** (Hz)：检测到的电网频率。

##### Network

- **SSID**：当前连接网络的 Wi-Fi 网络名称（默认禁用）。
- **信号强度** (dBm)：Wi-Fi 信号强度 (RSSI)。

##### 蜂窝网络（仅当可用时）

这些传感器仅适用于 NRGkick SIM 型号，并且默认情况下处于禁用状态。

- **蜂窝运营商**：蜂窝网络运营商。
- **蜂窝信号强度** (dBm)：蜂窝信号强度 (RSSI)。
- **蜂窝模式**：蜂窝模式。

#### Device values

##### Energy

- **总充电能量** (kWh)：总充电能量。
- **充电能量** (kWh)：最近一次充电期间的充电能量。

##### Powerflow

- **充电电流** (A)：向 EV 发送信号的最大电流。
- **峰值功率** (W)：最近一次充电期间的最高功率（默认情况下禁用）。
- **总有功功率** (W)：所有相的总有功功率。
- **总无功功率** (var)：所有相的总无功功率（默认禁用）。
- **总视在功率** (VA)：所有相的总视在功率（默认情况下禁用）。
- **总功率因数** (%)：所有相的功率因数（默认禁用）。
- **充电电压** (V)：各相平均充电电压。
- **潮流电网频率** (Hz)：潮流数据中报告的电网频率（默认情况下禁用）。
- **L1 电压** (V)：L1 相电压（默认禁用）。
- **L1 电流** (A)：L1 相上的电流。
- **L1 有功功率** (W)：L1 相上的有功功率。
- **L1 无功功率** (var)：L1 相上的无功功率（默认禁用）。
- **L1 视在功率** (VA)：L1 相的视在功率（默认禁用）。
- **L1 功率因数** (%)：L1 相功率因数（默认禁用）。
- **L2 电压** (V)：L2 相电压（默认禁用）。
- **L2 电流** (A)：L2 相上的电流。
- **L2 有功功率** (W)：L2 相上的有功功率。
- **L2 无功功率** (var)：L2 相上的无功功率（默认情况下禁用）。
- **L2 视在功率** (VA)：L2 相上的视在功率（默认情况下禁用）。
- **L2 功率因数** (%)：L2 相功率因数（默认禁用）。
- **L3 电压** (V)：L3 相电压（默认禁用）。
- **L3 电流** (A)：L3 相上的电流。
- **L3 有功功率** (W)：L3 相上的有功功率。
- **L3 无功功率** (var)：L3 相上的无功功率（默认情况下禁用）。
- **L3 视在功率** (VA)：L3 相上的视在功率（默认情况下禁用）。
- **L3 功率因数** (%)：L3 相功率因数（默认禁用）。
- **中性线电流** (A)：中性线 (N) 上的电流（默认禁用）。

##### General

- **充电率**：考虑到用户定义的电动汽车平均消耗量（以公里每小时为单位）的充电率。
- **车辆连接时间**：从设备报告的连接时间得出的时间戳。
- **车辆充电时间**（秒）：最近一次充电的充电时间。
- **状态**：充电状态（例如待机、已连接、充电、错误）。
- **充电计数**：车辆插入循环计数。
- **RCD 触发**：指示 RCD 是否被触发以及触发类型。
- **警告代码**：设备报告的当前警告代码。
- **错误代码**：设备报告的当前错误代码。

##### Temperatures

- **外壳温度** (°C)：NRGkick 外壳温度。
- **连接器 L1 温度** (°C)：连接阶段 1 温度。
- **连接器 L2 温度** (°C)：连接阶段 2 温度。
- **连接器 L3 温度** (°C)：连接阶段 3 温度。
- **家用插头 1 温度** (°C)：家用连接插针 1 温度。
- **家用插头 2 温度** (°C)：家用连接插脚 2 温度。

### Controls

集成创建了以下控件。

#### Switches

- **充电启用**：打开以启用充电。关闭以暂停充电。

#### 数字
- **充电电流** (A)：设置充电电流（6 A 至您的设备和连接的附件支持的最大电流）。
- **相数**：设置相数（1 到 3，取决于连接的附件）。
- **能量限制** (Wh)：设置当前充电会话的能量限制（0 = 无限制）。

### Key entities

实体 ID 取决于您在 Home Assistant 中的设备名称。以下示例假定默认设备名称为“NRGkick”。

- `sensor.nrgkick_charging_current`：充电电流。
- `sensor.nrgkick_charged_energy`：充电能量。
- `sensor.nrgkick_status`：充电状态。
- `number.nrgkick_charging_current`：设置充电电流。
- `number.nrgkick_energy_limit`：设置当前充电会话的能量限制（0 = 无限制）。
- `number.nrgkick_phase_count`：设置相数。
- `switch.nrgkick_charging_enabled`：打开以启用充电。关闭以暂停充电。

## Data updates

The integration polls the device for updates.

- 轮询间隔：30 秒。
- 您无法更改轮询间隔。

## Known limitations

- 最大充电电流和相数取决于所连接的附件。
- 仅当电源和会话使用多相时，L2 和 L3 的每相值才可用。
- 某些温度传感器取决于连接的附件，可能不可用。
- 蜂窝和 GPS 传感器仅适用于 SIM 型号。

## Troubleshooting

### 无法连接到设备

如果安装因连接错误而失败：

- 验证该设备在您的网络上是否可达。
- 验证 NRGkick 应用程序中是否启用了 REST JSON API。
- 如果您使用身份验证，请验证用户名和密码。

### Entities show unavailable

- Verify the device is powered on and connected.
- Under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), select **NRGkick**, then reload the integration.
- If your network is unstable, verify Wi-Fi coverage.

### 一些相位传感器丢失或显示为未知

当使用单相电源充电时，这是预期的。这些传感器通常仅在三相电源可用且处于活动状态时才提供值。

## Removing the integration

此集成遵循标准集成删除。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
