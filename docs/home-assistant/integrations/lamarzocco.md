---
title: La Marzocco
description: '此集成通过调用 La Marzocco 云 API 与 La Marzocco(https://lamarzocco.com/it/en/) 咖啡机交互。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2024.2
ha_category:
  - Binary sensor
  - Calendar
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: lamarzocco
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_bluetooth: true
ha_dhcp: true
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
ha_quality_scale: platinum
---
此集成通过调用 La Marzocco 云 API 与 [La Marzocco](https://lamarzocco.com/it/en/) 咖啡机交互。

如果您的 Home Assistant 主机支持 [DHCP 发现](https://www.home-assistant.io/integrations/dhcp/)，您的咖啡机会被自动发现。否则，只要咖啡机处于 Home Assistant 主机的蓝牙范围内，且 [Bluetooth](/home-assistant/integrations/bluetooth) 集成已完整加载，也同样可以被发现。

## 前提条件

- 要在 Home Assistant 中配置您的咖啡机，必须先使用官方 La Marzocco 应用将其添加到您的账户中。
- 仅支持使用用户名和密码登录。如果您当前使用的是社交账号登录，则需要创建新的 La Marzocco 账户，并将咖啡机转移到该账户下，才能使用此集成。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
  description: "您用于登录 La Marzocco 应用的用户名。"
Password:
  description: "您用于登录 La Marzocco 应用的密码。"
```

## 选项

要为 La Marzocco 设置选项，请按以下步骤操作：

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of La Marzocco are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Use Bluetooth:
  description: Allows you to manually disable Bluetooth communication with the machine (if available). This can be used to avoid longer timeouts, e.g., when your machine is only sometimes in range.
Offline mode:
  description: Allows you to enable the offline mode manually. Requires use of Bluetooth. Also see [Data updates](#data-updates).
```

## 数据更新

默认情况下，此集成会从云端接收设备总体状态的推送更新。如果无法做到，它会每 15 秒向云端查询一次机器的一般信息更新，每 15 分钟查询一次新的统计数据，每 30 分钟查询一次更新后的日程安排，每 8 小时查询一次固件更新。

如果你的主机可以访问蓝牙适配器，且咖啡机在范围内，集成还可以通过蓝牙请求更新。如果网络不可用，或者你启用了 **离线模式** 选项，这个蓝牙模式会自动启动。
在 **离线模式** 下，大多数实体会变为不可用。只有下表（[可用平台与实体](#available-platforms--entities)）中标有 <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> 的实体仍然可用。在 **离线模式** 下，Home Assistant 会每 60 秒向你的咖啡机请求一次更新。

# 可用平台与实体 {#available-platforms--entities}

<iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> = La Marzocco Cloud
<iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> = Bluetooth

## 按钮

| Button name | Description | Available for machines | Controllable through |
|-------------|-------------| ---------------------- | -------------------- |
| **Start backflush** | Starts the backflush process on your machine. You got 15 seconds to turn the paddle after activation. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | 


## 数值

| Number name | Description | Available for machines | Controllable through | Remarks |
|-------------|-------------| ---------------------- |--------------------- | ------- |
| **Coffee target temperature** | Temperature the coffee boiler is set to | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> | - |
| **Steam target temperature** | Temperature the steam boiler is set to | `GS3 AV`, `GS3 MP` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> | - |
| **Smart standby time** | Time until the machine will automatically stand by (if enabled) | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Preinfusion time** | Duration of preinfusion | `Linea Micra`, `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | only available when machine is in mode `Preinfusion` |
| **Prebrew time on** | Duration which prebrew will be on | `Linea Micra`, `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | only available when machine is in mode `Prebrew` |
| **Prebrew time off** | Duration which prebrew will wait | `Linea Micra`, `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | only available when machine is in mode `Prebrew` |
| **Brew by weight Dose 1** | Weight when the machine will stop while being in *Dose 1* for Brew by weight | `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | only available when machine is paired with a scale |
| **Brew by weight Dose 2** | Weight when the machine will stop while being in *Dose 2* for Brew by weight | `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | only available when machine is paired with a scale |


## 开关

| Switch name | Description | Available for machines | Controllable through |
|-------------|-------------| ---------------------- | -------------------- |
| **Main**      | Allows to turn machines on-/off | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |
| **Steam boiler** | Allows to enable/disable the steam boiler | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> |
| **Smart standby enabled** | Whether smart standby is on (machine will automatically stand by after given time) | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |

## 二进制传感器

| Binary sensor name | Description | Available for machines |  Retrievable from | Remarks |
|------------------- |-------------| ---------------------- | ----------------- | ------- |
| **Water tank empty** | Indicates whether the water tank needs a refill. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Brewing active** | Is on if you are in the process of making coffee. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Backflush enabled** | Is on if you started the backflushing process. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon>| - |
| **WebSocket connected** | Track your connection to the cloud WebSocket for real time updates. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon>| Disabled by default. |

## 传感器

| Sensor name | Description | Available for machines |  Retrievable from | Remarks |
|------------------- |-------------| ---------------------- | ----------------- | ------- |
| **Coffee boiler ready time** | Indicates when the coffee boiler will be ready for brewing. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Steam boiler ready time** | Indicates when the steam boiler will be ready for brewing. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Brew start time** | If a brew is running, tells the exact start time of that brew. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Total coffees made** | How many coffees have been made in total. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Total flushes done** | How often the machine has been flushed. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |
| **Last cleaning time** | Indicates when the machine was last cleaned with a **Backflush**. | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> | - |

## 更新

| Update name | Description | Available for machines | Retrievable from |
|-------------|-------------| ---------------------- |---------------- | 
| **Gateway firmware** | Firmware status of the gateway |  `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> |
| **Machine firmware** | Firmware status of the machine |  `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> |

## 选择项

| Select name | Description | Options | Available for machines | Controllable through |
|-------------|-------------| --------| ---------------------- | -------------------- |
| **Prebrew/-infusion mode** | Whether to use prebrew, preinfusion, or neither | `Disabled`, `Prebrew`, `Preinfusion` | `Linea Micra`, `Linea Mini`, `GS3 AV` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> |
| **Steam level** | The level your steam boiler should run at | `1`,`2`,`3` | `Linea Micra`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |
| **Smart standby mode** | The smart standby mode, that decides from which events the timer to standby will run. | `Last brewing`, `Power on` | `all` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon>  |
| **Brew by weight dose mode** | Select the brew by weight mode of your machine | `Continuous`, `Dose 1`, `Dose 2` | `Linea Mini`, `Linea Mini R` | <iconify-icon inline title="La Marzocco Cloud" icon="material-symbols:cloud-outline"></iconify-icon> |

## 日历

此集成为咖啡机的自动开关机计划提供了一个日历实体。它只用于显示计划，不能直接通过日历修改计划。
该计划会以循环事件形式显示：如果你将机器设置为每周一 8:00 开机、9:00 关机，那么日历中会为所有周一显示对应事件。在某一天关闭自动开关机功能时，该天不会在日历中显示事件。另外，如果你全局禁用了自动开关机功能（例如通过 “Auto on/off” 开关），日历中也不会显示任何事件。

## 支持的设备

目前仅支持 **“Home”** 系列设备：

- `Linea Mini`
- `Linea Mini R`
- `Linea Micra`
- `GS3 AV`
- `GS3 MP`

## 可能的使用场景

- 通过语音控制咖啡机，无需打开应用即可快速调整锅炉温度。
- 在开始萃取时控制智能咖啡秤（去皮/启动计时器）。
- 在咖啡机萃取期间打开机器旁的灯光。

## 自动化

你可以从以下自动化示例开始。

### 机器开启时打开蒸汽锅炉

我经常早上喝奶咖、下午喝意式浓缩，但总会忘记重新打开蒸汽锅炉，因此这个自动化可确保机器开机时蒸汽锅炉也会一并开启。

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: Turn steamboiler on when machine is turned on
description: Ensure the steamboiler is on, when the machine gets turned on
triggers:
  - trigger: state
    entity_id:
      - switch.mr000000
    from: "off"
    to: "on"
conditions:
  - condition: state
    entity_id: switch.mr000000_steam_boiler
    state: "off"
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.mr000000_steam_boiler
    data: {}
mode: single

```


</details>
  
## 已知限制

- 仅支持 La Marzocco 原生应用账户，不支持社交账号登录（Google、Apple 和 WeChat）。
- 目前只能查看在 La Marzocco Home 应用中配置的计划，无法在 Home Assistant 中直接编辑这些计划。当然，你仍然可以在 Home Assistant 中创建原生自动化来实现相同功能。

## 故障排除

<details>
<summary>问题：无法连接到咖啡机</summary>


请先检查 La Marzocco Home 应用中是否可以连接到你的咖啡机。如果也无法连接，请移除该咖啡机并重新添加（按照 La Marzocco 应用中的说明操作）。

</details>

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在该条目旁选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
