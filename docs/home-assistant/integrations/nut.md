---
title: Network UPS Tools (NUT)
description: 关于如何在 Home Assistant 中设置 NUT 传感器的说明。
ha_category:
  - Button
  - Switch
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.34
ha_domain: nut
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@ollo69'
  - '@pestevez'
  - '@tdfountain'
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: device
related:
  - url: https://www.networkupstools.org
    title: Network UPS Tools
ha_quality_scale: platinum
---


**Network UPS Tools (NUT)** integration 允许您使用 [NUT](https://networkupstools.org/) 服务器监控和管理不间断电源 (UPS) 电池备份、配电单元 (PDU) 或其他类似电力设备。它让您可以查看状态、接收重要事件通知，并作为一个或多个此类设备的设备动作执行命令。

此集成无法直接与 UPS 或电力设备通信。
因此，需要 NUT 服务器。集成使用 NUT 协议与 NUT 服务器通信以检索数据和状态信息。

## 支持的设备

此集成支持兼容 NUT 的硬件设备。NUT 的硬件兼容性列表可从 [Network UPS Tools](https://networkupstools.org/) 网站获取。

## 前提条件

您必须配置一个 NUT 服务器来监控一个或多个支持的电力设备。

无法自动检测 NUT 服务器 IP 地址更改。因此，您应该为 NUT 服务器配置静态 IP 地址、使用 DHCP 分配固定 IP 地址保留，或根据您的网络使用 DNS。

此外，如果需要身份验证，您需要用户名和密码以便此集成登录 NUT 服务器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

设置集成需要以下信息：

```yaml
Host:
  description: "您的 NUT 服务器的 IP 地址或主机名。"
Port:
  description: "您的NUT服务器的网络端口。NUT服务器的默认端口是'3493'。"
Username:
  description: "登录NUT服务器的用户名。用户名是可选的。"
Password:
  description: "登录NUT服务器的密码。密码是可选的。"
```

您可以在安装后更新这些设置。为此，通过 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 重新配置 NUT 设备，选择要更新的 NUT 设备的 `[mdi:dots-vertical]`，然后选择 **Reconfigure**。

## 支持的功能

:::note
此 NUT 集成使用 NUT 协议从 NUT 服务器检索"变量"。只有您的设备可用的传感器和诊断传感器才会添加到 Home Assistant。

:::
:::important
为设备配置的用户名和密码必须在 NUT 服务器上被授予 `instcmds` 权限才能使用按钮和开关。如果未指定用户凭据，按钮和开关将不可用。有关配置信息，请参阅 [NUT 服务器文档](https://networkupstools.org/documentation.html)。

:::
### 传感器

传感器提供有关 NUT 设备的信息。

可能提供以下传感器：

- **Alarms**：UPS 警报
- **Battery charge (%)**：电池电量
- **Charging status**：电池充电器的状态，可用状态有：`charging`、`discharging`、`floating`、`resting`、`unknown`、`disabled` 和 `off`
- **Input current (A)**：输入电流
- **Input load (%)**：(ePDU) 输入负载
- **Input voltage (V)**：输入电压
- **Load (%)**：UPS 负载
- **Outlet apparent power (VA)**：所有插座的视在功率
- **Outlet current (A)**：所有插口的电流
- **Outlet real power (W)**：所有插口的有功功率
- **Outlet voltage (V)**：所有插口的电压
- **Output phases**：输出相位
- **Output voltage (V)**：输出电压
- **Status**："Status data" 的人类可读版本（见下文）
- **Status data**：UPS 状态

**Status data** 传感器被转换为一个名为 **Status** 的人类可读虚拟传感器。

某些电力设备提供有关单个插口的监控信息。每个此类插口可能提供以下传感器：

- **Outlet NAME current (A)**：指定插口的电流
- **Outlet NAME description**：指定插口的描述
- **Outlet NAME power (VA)**：指定插口的视在功率
- **Outlet NAME real power (W)**：指定插口的有功功率

有关这些传感器报告值的更多信息，可以在 Network UPS Tools 存储库文档的 [variable names](https://github.com/networkupstools/nut/blob/master/docs/nut-names.txt) 中找到。

### 诊断传感器

诊断传感器提供有关 NUT 设备的额外信息。

:::important
此集成的大多数诊断传感器默认情况下是禁用的，以减少 Home Assistant 的存储开销。标有星号 \* 的诊断传感器默认启用。要使用禁用的传感器，您需要先启用它们。有关如何执行此操作的信息，请参阅[启用或禁用实体](/home-assistant/common-tasks/general/#enabling-or-disabling-entities)文档。

:::
:::note
下表和 NUT 文档中，某些诊断传感器值被描述为"opaque by mfg"。这意味着传感器返回的值可能因制造商而异。

:::
可能提供以下诊断传感器：

- **Ambient humidity (%)**\*：环境相对湿度
- **Ambient humidity status**\*：相对于阈值的环境湿度状态，可用状态有：`good`、`warning-low`、`critical-low`、`warning-high` 和 `critical-high`
- **Ambient temperature (°C)**\*：环境温度
- **Ambient temperature status**\*：相对于阈值的环境温度状态，可用状态有：`good`、`warning-low`、`critical-low`、`warning-high` 和 `critical-high`
- **Apparent power (VA)**：视在功率的当前值
- **Battery alarm threshold**：电池警报阈值
- **Battery capacity (Ah)**：电池容量
- **Battery chemistry**：电池化学成分（制造商不透明）
- **Battery current (A)**：电池电流
- **Battery date**：电池安装或上次更换日期（制造商不透明）
- **Battery manuf date**：电池制造日期（制造商不透明）
- **Battery runtime (secs)**：设备估计的剩余电池运行时间
- **Battery temperature (°C)**：电池温度
- **Battery voltage (V)**：电池电压
- **Beeper status**：UPS 蜂鸣器状态，可用状态有：`enabled`、`disabled` 和 `muted`
- **Efficiency (%)**：UPS 效率（输出与输入电流之比）
- **External contacts**：UPS 外部接触传感器（制造商不透明）
- **High battery voltage (V)**：最大电池电压（100% 电量）
- **High voltage transfer (V)**：高压转换点
- **Input L1 current (A)**：输入 L1 电流
- **Input L1 line frequency (Hz)**：输入 L1 线路频率
- **Input L1 real power (W)**：输入 L1 所有 (ePDU) 相位有功功率的电流总和值
- **Input L1-N voltage (V)**：输入 L1-N 电压
- **Input L2 current (A)**：输入 L2 电流
- **Input L2 line frequency (Hz)**：输入 L2 线路频率
- **Input L2 real power (W)**：输入 L2 所有 (ePDU) 相位有功功率的电流总和值
- **Input L2-N voltage (V)**：输入 L2-N 电压
- **Input L3 current (A)**：输入 L3 电流
- **Input L3 line frequency (Hz)**：输入 L3 线路频率
- **Input L3-N voltage (V)**：输入 L3-N 电压
- **Input L3 real power (W)**：输入 L3 所有 (ePDU) 相位有功功率的电流总和值
- **Input bypass L1 current (A)**：输入旁路 L1 电流
- **Input bypass L1 real power (W)**：输入旁路 L1 有功功率值
- **Input bypass L1-N voltage (V)**：输入旁路 L1-N 电压
- **Input bypass L2 current (A)**：输入旁路 L2 电流
- **Input bypass L2 real power (W)**：输入旁路 L2 有功功率值
- **Input bypass L2-N voltage (V)**：输入旁路 L2-N 电压
- **Input bypass L3 current (A)**：输入旁路 L3 电流
- **Input bypass L3 real power (W)**：输入旁路 L3 有功功率值
- **Input bypass L3-N voltage (V)**：输入旁路 L3-N 电压
- **Input bypass current (A)**：输入旁路电流
- **Input bypass frequency (Hz)**：输入旁路线路频率
- **Input bypass phases**：输入旁路线路相位
- **Input bypass real power (W)**：输入旁路有功功率值
- **Input bypass voltage (V)**：输入旁路电压
- **Input current status**：相对于阈值的电流状态，可用状态有：`good`、`warning-low`、`critical-low`、`warning-high` 和 `critical-high`
- **Input frequency (Hz)**：输入线路频率
- **Input frequency status**：频率状态，可用状态有：`good` 和 `out-of-range`
- **Input nominal frequency (Hz)**：标称输入线路频率
- **Input phases**：输入线路相位
- **Input power (VA)**：所有 (ePDU) 相位视在功率的电流总和值
- **Input power sensitivity**：输入功率灵敏度
- **Input real power (W)**：所有 (ePDU) 相位有功功率的电流总和值
- **Input voltage status**：相对于阈值的状态
- **Language**：前面板使用的语言（制造商不透明）
- **Load reboot timer (secs)**：负载重启前的时间
- **Load restart delay (secs)**：重启负载前等待的间隔
- **Load shutdown timer (secs)**：负载关机前的时间
- **Load start timer (secs)**：负载启动前的时间
- **Low battery runtime (secs)**：UPS 切换到低电池 (LB) 时的剩余电池运行时间
- **Low battery setpoint (%)**：UPS 切换到低电池 (LB) 时的剩余电池电量
- **Low battery voltage (V)**：触发 FSD 状态的最小电池电压
- **Low voltage transfer (V)**：低压转换点
- **Minimum battery runtime to start (secs)**：断电后 UPS 重启所需的最小电池运行时间
- **Minimum battery to start (%)**：断电后 UPS 重启所需的最小电池电量
- **Nominal battery voltage (V)**：标称电池电压
- **Nominal input voltage (V)**：标称输入电压
- **Nominal output current (A)**：标称输出电流
- **Nominal output frequency (Hz)**：标称输出频率
- **Nominal output power (VA)**：标称输出视在功率
- **Nominal output real power (W)**：标称输出有功功率
- **Nominal output voltage (V)**：标称输出电压
- **Nominal power (VA)**：视在功率标称值
- **Nominal real power (W)**：有功功率标称值
- **Number of bad batteries**：坏电池组数量
- **Number of batteries**：内部电池组数量
- **Output L1 current (A)**：输出 L1 电流
- **Output L1 power percent (%)**：输出 L1 相对于最大负载的视在功率百分比
- **Output L1 real power (W)**：输出 L1 有功功率
- **Output L1-N voltage (V)**：输出 L1-N 电压
- **Output L2 current (A)**：输出 L2 电流
- **Output L2 power percent (%)**：输出 L2 相对于最大负载的视在功率百分比
- **Output L2 real power (W)**：输出 L2 有功功率
- **Output L2-N voltage (V)**：输出 L2-N 电压
- **Output L3 current (A)**：输出 L3 电流
- **Output L3 power percent (%)**：输出 L3 相对于最大负载的视在功率百分比
- **Output L3 real power (W)**：输出 L3 有功功率
- **Output L3-N voltage (V)**：输出 L3-N 电压
- **Output apparent power (VA)**：输出视在功率
- **Output current (A)**：输出电流
- **Output frequency (Hz)**：输出频率
- **Output phases**：输出相位
- **Output real power (W)**：输出有功功率
- **Overload setting (%)**：UPS 切换到过载状态时的负载
- **Real power (W)**：有功功率当前值
- **Reboot on battery**：UPS 从电池冷启动
- **Self test date**：上次自检日期（制造商不透明）
- **Self test interval (secs)**：自检之间的间隔
- **Self test result**：上次自检结果（制造商不透明）
- **Shutdown ability**：启用或禁用 UPS 关机能力
- **Start on ac**：通电或重新通电时 UPS 启动
- **Start on battery**：允许从电池启动 UPS
- **System identifier**：UPS 系统标识符（制造商不透明）
- **Total battery current (A)**：总电池电流
- **UPS reboot delay (secs)**：重启 UPS 前等待的间隔
- **UPS shutdown delay (secs)**：使用延迟命令关机后等待的间隔
- **UPS temperature (°C)**：UPS 温度
- **UPS type**：UPS 类型（制造商不透明）
- **Voltage transfer reason**：上次切换到电池的原因（制造商不透明）
- **Warning battery setpoint (%)**：UPS 切换到"警告"状态时的电池电量
- **Watchdog status**：UPS 看门狗状态

以下诊断传感器可能可用于每个单独监控的插口：

- **Outlet NAME current status**：指定插口相对于阈值的电流状态

### 按钮

此 NUT 集成将为您的设备可用的 NUT 服务器命令添加按钮。

每个可切换插口提供以下按钮：

- **Power cycle outlet NAME**：循环指定插口的电源

### 开关

此 NUT 集成将为您的设备可用的 NUT 服务器命令添加开关。

每个可切换插口提供以下开关：

- **Power outlet NAME**：打开/关闭指定插口的电源

## 数据更新

集成使用 polling 从 NUT 服务器检索数据。默认轮询间隔为每 60 秒一次。如果需要，您也可以[定义自定义轮询间隔](/home-assistant/common-tasks/general/#defining-a-custom-polling-interval)。

## 动作

:::important
为设备配置的用户名和密码必须在 NUT 服务器上被授予 `instcmds` 权限才能使用按钮和开关。如果未指定用户凭据，设备 actions 将不可用。有关配置信息，请参阅 [NUT 服务器文档](https://networkupstools.org/documentation.html)。

:::
每个支持的无参数 NUT [命令](https://networkupstools.org/docs/user-manual.chunked/apcs03.html) 都有一个可用的动作。

## 自动化示例

可以创建 Home Assistant automations 来使用 NUT 监控一个或多个电力设备并对其采取行动。

以下示例说明了如何在 Home Assistant 自动化中使用此集成。此示例只是一个起点，您可以将其作为灵感来创建自己的自动化。

### UPS 电源故障通知

以下示例在受监控的 UPS 失去电源并开始使用电池时向您的移动设备发送通知。

#### 前提条件

- 必须安装并配置 NUT 集成。
- 您的移动设备必须配置通知。
- 在下面的示例中，NUT 服务器设备是 `ups`，状态传感器名为 `ups_status`。您必须更改 YAML 传感器名称以匹配您的系统。

#### YAML 示例

```yaml
# UPS 电源故障时发送通知
automation:
  alias: "NUT Power failure notification"
  triggers:
    - trigger: state
      entity_id:
        - sensor.ups_status
      to: "On Battery, Battery Discharging"
  actions:
    - action: notify.notify
      data:
        title: "UPS power failure"
        message: "The UPS lost power and is now on battery"
```

## 已知限制

并非所有 NUT 功能都可通过此集成使用。以下是已知限制：

- 此 NUT 集成仅支持 NUT "变量"和"命令"的子集。
- 此 NUT 集成仅支持检索（而非设置）NUT "变量"。
- 此 NUT 集成不支持需要参数的 NUT "命令"。

## 故障排除

### 使用 NUT 列出所有变量

NUT 服务器提供有关电力设备的"变量"。如果您对运行 NUT 服务器的系统有命令行访问权限，可以使用 `upsc` 命令直接查询 NUT。

以下是 NUT 服务器配置了名为 `my_ups` 的设备的示例：

```bash
$ upsc my_ups
ups.timer.reboot: 0
battery.voltage: 27.0
ups.firmware.aux: L3 -P
ups.mfr: American Power Conversion
battery.runtime.low: 120
ups.delay.shutdown: 20
ups.load: 19
ups.realpower.nominal: 600
battery.charge.warning: 50
battery.charge.low: 10
ups.vendorid: 051d
ups.timer.shutdown: -1
ups.test.result: No test initiated
ups.firmware: 868.L3 -P.D
battery.mfr.ups.serial: 3B1519X19994
ups.productid: 0002
battery.runtime: 2552
battery.voltage.nominal: 24.0
battery.type: PbAc
ups.mfr.ups.status: OL
ups.model: Back-UPS RS1000G
ups.beeper.status: disabled
battery.charge: 100
input.sensitivity: medium
input.transfer.low: 88
input.transfer.high: 147
input.voltage: 121.0
input.voltage.nominal: 120
input.transfer.reason: input voltage out of range
output.current: 1.10
output.frequency: 60.20
output.voltage: 121.50
output.voltage.nominal: 120
```

### 使用 NUT 列出所有命令

NUT 服务器提供用于控制电力设备的命令。如果您对运行 NUT 服务器的系统有命令行访问权限，可以使用 `upscmd -l` 直接查询 NUT 获取可用的远程命令。

以下是 NUT 服务器配置了名为 `my_ups` 的设备的示例：

```bash
$ upscmd -l my_ups
Instant commands supported on UPS [my_ups]:
beeper.disable - Disable the UPS beeper
beeper.enable - Enable the UPS beeper
test.battery.start.quick - Start a quick battery test
test.battery.stop - Stop the battery test
```

### 用户凭据和权限

要通过 NUT 集成执行设备动作，您必须在配置中指定用户凭据。这些凭据存储在 `upsd.users` 文件中，这是 NUT 服务器配置的一部分。此文件定义了访问 UPS 设备的用户的用户名、密码和权限。

如果未为给定设备指定用户凭据，则不会有任何动作可用。

确保您指定的用户具有执行所需命令的权限。以下是 `upsd.users` 文件中具有命令权限的用户示例：

```text
[my_user]
    password = my_password
    actions = SET
    instcmds = ALL
```

在此示例中，用户 `my_user` 有权执行所有命令（`instcmds = ALL`）。

请注意，Home Assistant 无法在不执行的情况下确定用户是否可以访问特定动作。如果您尝试执行用户没有权限的动作，将在运行时抛出异常。

## 移除集成

此集成遵循标准的集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.