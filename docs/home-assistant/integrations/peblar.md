---
title: Peblar
description: 有关如何将 Peblar Rocksolid EV 充电器与 Home Assistant 集成的说明。
ha_category:
  - Car
  - Energy
  - Update
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: peblar
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: platinum
---

**Peblar** 集成可将 [Peblar Rocksolid EV Charger] 接入你的智能家居生态。它支持实时监控充电状态、跟踪能耗、控制充电行为，并将电动车充电数据集成到 Home Assistant 能源仪表板中。

[Peblar Rocksolid EV Charger]: https://peblar.com/

## 使用场景

Peblar 集成可将你的电动车充电器连接到 Home Assistant，提供全面的数据和控制能力。你可以这样使用它：

- **实时监控电动车充电情况**：直接在仪表板中查看充电状态、当前功率和本次充电会话的能耗
- **优化家庭能源管理**：将充电器添加到 Home Assistant 能源仪表板，把电动车充电纳入整体能源监控系统
- **创建智能充电自动化**，例如：
  - 当车辆充满电时接收通知
  - 根据太阳能发电预测自动调整充电模式
  - 当充电器检测到错误或异常时收到提醒
  - 在低谷电价时段安排充电
  - 根据电价和出行计划优化充电
- **及时获取软件更新**：当 Peblar 充电器有固件或自定义更新可用时接收通知
- **远程控制充电**：通过 Home Assistant 应用从任何地方启动、停止或调整充电参数

## 支持的设备

此集成支持以下 Peblar Rocksolid EV 充电器：

- Peblar Home
- Peblar Home Plus
- Peblar Business

## 前提条件

在设置 Peblar 集成之前，请确认：

- 你的 Peblar 充电器已连接到家庭网络
- 你知道充电器在网络中的主机名或 IP 地址
- 你有用于访问充电器本地 Web 界面的密码

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
Host:
  description: 你的 Peblar 充电器在家庭网络中的主机名或 IP 地址。
Password:
  description: 用于登录 Peblar 设备本地 Web 界面的密码。
```

完成后，你也可以稍后在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 中调整这些配置。选择 `[mdi:dots-vertical]`，然后选择 **Reconfigure**。

## 支持的功能

下面是此集成提供的实体完整概览。

### 二进制传感器

这些二进制传感器用于指示充电器的健康状态。可用的二进制传感器包括：

- **Active error**：指示充电器是否检测到错误。如果此传感器开启（状态：`on`），表示检测到错误；否则为关闭（状态：`off`）
- **Active warning**：指示充电器是否发出警告。如果此传感器开启（状态：`on`），表示存在警告；否则为关闭（状态：`off`）

如果这些二进制传感器中的任意一个为开启状态，你应查看充电器的本地 Web 界面以获取更多信息。

:::important
这些二进制传感器默认处于禁用状态。如果你想使用它们，需要先启用。有关操作方法，请参阅[启用或禁用实体](/home-assistant/common-tasks/general/#enabling-or-disabling-entities)。

:::
### 按钮

此集成提供的按钮可用于触发充电器上的操作。可用按钮包括：

- **Identify**：用于识别充电器。如果你有多个充电器，这个按钮可帮助你区分具体是哪一个。按下后，充电器上的 LED 会闪烁几秒钟
- **Restart**：用于重启充电器。当充电器未按预期响应时，这会很有用

:::important
这些按钮默认处于禁用状态。如果你想使用它们，需要先启用。有关操作方法，请参阅[启用或禁用实体](/home-assistant/common-tasks/general/#enabling-or-disabling-entities)。

:::
### 数值

此集成提供一个数值实体：**Charge limit**。

你可以使用此实体设置充电器可提供给电动车的最大电流。该实体的数值单位为安培（A）。

此实体的最小值为 6A，最大值取决于你的充电器配置。数值可按 1A 递增设置。

### 选择器

此集成提供一个选择实体：**Smart charging**。

它反映与充电器本地 Web 界面中相同的智能充电状态，并允许你控制充电器的充电行为。

可用选项如下：

- **Default**（状态：`default`）：车辆接入后立即开始充电
- **Fast solar**（状态：`fast_solar`）：优先使用太阳能剩余发电进行快速充电，但当太阳能发电不足时也会使用电网供电
- **Smart solar**（状态：`smart_solar`）：使用太阳能剩余发电为车辆充电，但在太阳能发电不足时也会使用电网供电
- **Pure solar**（状态：`pure_solar`）：仅使用太阳能剩余发电为车辆充电
- **Scheduled**（状态：`scheduled`）：按照充电器上配置的时间表充电

### 传感器

Peblar 集成为 Home Assistant 提供了许多传感器。

:::tip
将充电器添加到 Home Assistant 能源仪表板，可能是这个集成最有用的功能。因此，建议你将 Peblar 充电器添加到 Home Assistant 能源仪表板，把 **Lifetime energy** 传感器作为设备加入能源仪表板配置中。

:::
- **Current**：充电器当前为你的电动车充电时消耗的电流（单位：安培）。这是所有相位的总值。如果使用多相充电，还会提供三个相位专用传感器：
  - **Current Phase 1**\*\*：第 1 相的电流（安培）
  - **Current Phase 2**\*\*：第 2 相的电流（安培）
  - **Current Phase 3**\*\*：第 3 相的电流（安培）
- **Lifetime energy**：自安装以来充电器累计消耗的总能量（千瓦时）。**这是 Home Assistant 能源仪表板推荐使用的传感器**
- **Limit source**：当前生效的充电电流限制来源。来源可能是以下之一：
  - _Charging cable_（状态：`charging_cable`）：当前限制来自充电线缆可承受的最大电流
  - _Current limiter_（状态：`current_limiter`）：当前限制由电流限制器设定
  - _Dynamic load balancing_（状态：`dynamic_load_balancing`）：当前限制由动态负载均衡功能设定
  - _External power limit_（状态：`external_power_limit`）：当前限制由外部功率限制器设定
  - _Group load balancing_（状态：`group_load_balancing`）：当前限制由组负载均衡功能设定，也就是多个充电器共享可用功率
  - _Hardware limitation_（状态：`hardware_limitation`）：当前限制受限于充电器硬件，无法提供更高电流
  - _High temperature_（状态：`high_temperature`）：当前限制因温度过高而受限
  - _Household power limit_（状态：`household_power_limit`）：当前限制由家庭功率限制功能设定，用于防止家庭用电过载
  - _Installer limitation_（状态：`installer_limitation`）：当前限制由安装人员设定，例如为了防止家庭保险丝过载
  - _Local Modbus API_（状态：`local_modbus_api`）：当前限制由本地 Modbus API 软件设定
  - _Local REST API_（状态：`local_rest_api`）：当前限制由本地 REST API 软件设定。Home Assistant 使用此 API 设置电流限制，因此如果你看到此状态，通常表示电流限制很可能是通过 Home Assistant 设置的
  - _OCPP smart charging_（状态：`ocpp_smart_charging`）：当前限制由 OCPP 智能充电功能设定
  - _Overcurrent protection_（状态：`overcurrent_protection`）：当前限制因过流保护而受限
  - _Phase imbalance_（状态：`phase_imbalance`）：当前限制因电气安装中的相位不平衡而受限
  - _Power factor_（状态：`power_factor`）：当前限制因电气安装中的功率因数过低而受限
  - _Solar charging_（状态：`solar_charging`）：当前限制由充电器的太阳能充电功能设定。这表示充电器正在等待太阳能出现剩余发电后再开始充电
- **Power**：充电器为你的电动车充电时使用的功率（单位：瓦）。这是所有相位的总值。如果使用多相充电，还会提供三个相位专用传感器：
  - **Power Phase 1**\*\*：第 1 相的功率（瓦）
  - **Power Phase 2**\*\*：第 2 相的功率（瓦）
  - **Power Phase 3**\*\*：第 3 相的功率（瓦）
- **Session energy**：当前充电会话期间充电器消耗的总能量（千瓦时）。新的充电会话开始时，此传感器会重置。虽然可以使用，但**不建议**在 Home Assistant 能源仪表板中使用此传感器。请改用 **Lifetime energy**
- **State**：充电器当前状态，可能为以下之一：
  - _Charging_（状态：`charging`）：正在为电动车充电
  - _Error_（状态：`error`）：检测到错误，当前未充电
  - _Fault_（状态：`fault`）：检测到故障，当前未充电
  - _No EV connected_（状态：`no_ev_connected`）：当前未连接电动车
  - _Suspended_（状态：`suspended`）：当前未充电，但已准备好在需要时开始充电
  - _Invalid_（状态：`invalid`）：充电器处于无效状态
- **Uptime**\*\*：自上次重启以来充电器已运行的总时间。充电器重启时，此传感器会重置
- **Voltage**：充电时使用的电压。仅在充电器连接到单相电源时可用
- **Voltage Phase 1**\*\*：第 1 相电压。仅在充电器至少连接到两相电源时可用
- **Voltage Phase 2**\*\*：第 2 相电压。仅在充电器至少连接到两相电源时可用
- **Voltage Phase 3**\*\*：第 3 相电压。仅在充电器连接到三相电源时可用

:::important
带有 \*\* 标记的传感器默认处于禁用状态。如果你想使用它们，需要先启用。有关操作方法，请参阅[启用或禁用实体](/home-assistant/common-tasks/general/#enabling-or-disabling-entities)。

:::
### 开关

此集成提供两个开关实体：

- **Charge**：允许你启动、停止或暂停电动车充电。如果你想临时停止充电，例如避免在高电价时段充电，这会很有用
- **Force single phase**：可强制充电器使用单相为电动车充电。如果你想将充电器电流限制在单相，例如为了避免电气安装过载，这会很有用

:::note
只有当充电器连接到多相电源时，才会提供 **Force single phase** 开关。如果充电器连接的是单相电源，则不会创建此开关。

:::
### 更新

Peblar 集成为 Peblar 充电器提供两个更新实体：

- **Firmware**：指示充电器是否有可用固件更新。你可以把固件理解为充电器的操作系统
- **Customization**：指示充电器是否有可用的自定义更新。你可以把它理解为你登录充电器本地 Web 界面后看到的用户界面

无法通过 Home Assistant 安装软件更新。你需要登录充电器的本地 Web 界面进行安装。

## 数据更新

此集成使用本地轮询，也就是通过定期与家庭网络中的 Peblar 充电器通信来检查所有实体的变化。

此集成使用三种不同的轮询频率：

- **每 10 秒**：更新所有传感器和二进制传感器，让你获得最新的电动车充电状态
- **每 5 分钟**：检查充电器的配置更改，影响智能充电模式、电流限制等配置实体
- **每 2 小时**：检查充电器本身是否有更新，确保你及时知道 Peblar 充电器是否有可用更新

虽然此集成使用本地轮询，但你在 Home Assistant 中对 Peblar 充电器做出的任何配置更改，几乎都会立刻出现在充电器上。

## 操作

此集成不提供额外操作。此集成可用的所有操作都由各自的实体提供。

## 示例

以下示例展示如何在 Home Assistant 自动化中使用 Peblar 集成。这些示例只是起点，你可以据此创建自己的自动化。

欢迎为本文档贡献更多示例 ❤️。如果你使用 Peblar 充电器创建了实用自动化，欢迎分享，帮助其他人更好地使用此集成。

### 当有软件更新可用时发送通知

以下示例会在 Peblar 充电器有软件更新可用时向你的移动设备发送通知。

```yaml
automation:
  - alias: "Peblar software update available"
    triggers:
      - trigger: state
        entity_id: update.peblar_firmware
        from: "off"
        to: "on"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Peblar charger update available!"
          message: >
            There is a software update available for your Peblar charger.
            Please log in to the charger's local web interface to install
            the update.
```

### 当检测到问题时发送通知

以下自动化示例会在充电器检测到错误或发出警告时发送通知。

```yaml
automation:
  - alias: "Peblar issue detected"
    triggers:
      - trigger: state
        entity_id:
          - binary_sensor.peblar_active_error
          - binary_sensor.peblar_active_warning
        from: "off"
        to: "on"
      - trigger: state
        entity_id: sensor.peblar_state
        to:
          - "error"
          - "fault"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Peblar charger issue detected!"
          message: >
            An issue with your Peblar charger has been detected.
            Please check the charger's local web interface for more information.
```

## 已知限制

并非 Peblar 充电器的所有功能都可通过此集成使用。已知限制如下：

- 目前 Peblar API 在充电器等待身份验证时不会提供通信，比如需要使用 RFID 卡认证后才能开始充电。因此，当充电器实际上在等待认证时，Home Assistant 中会显示为暂停充电状态
- Home Assistant 会使用并管理充电器的 REST API。这意味着使用此集成时会自动在充电器上启用 REST API。同时也可以并行直接使用该 REST API
- Peblar 也以白标产品形式销售，例如 [CoolBlue BlueBuilt](https://www.coolblue.nl/en/charging-stations/our-charging-stations)、[Eneco Connectric®](https://www.eneco.nl/campagnes/laadpalen/) 和 [Shell Recharge](https://www.shell.nl/b2b-business/shell-fleet-solutions/electric-charging/at-home-ev-charging.html#thuisladers)。此集成仅使用 Peblar 品牌产品进行过测试，是否适用于这些白标版本仍未知

## 故障排除

如果 Peblar 充电器集成出现问题，请先尝试以下常规排查步骤：

1. 确认 Peblar 充电器已通电，并且已正确连接到家庭网络。
2. 确认你可以使用在 Home Assistant 中配置的相同主机名或 IP 地址，直接访问充电器的本地 Web 界面。
3. 如果集成显示为不可用，请尝试同时重启 Peblar 充电器和 Home Assistant。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

1. 进入 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并选择集成卡片。
2. 从设备列表中，选择你要删除的集成实例。
3. 在条目旁边，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。
