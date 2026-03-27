---
title: Palazzetti
description: 'Palazzetti 集成可接入配备 Connection Box(https://palazzettigroup.com/research-and-development/app/) 的 Palazzetti(https://palazzettigroup.com/) 炉具。'
ha_category:
  - Climate
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dotvav'
ha_domain: palazzetti
ha_platforms:
  - button
  - climate
  - diagnostics
  - number
  - sensor
ha_integration_type: device
ha_dhcp: true
---
# Palazzetti

**Palazzetti** 集成可接入配备 [Connection Box](https://palazzettigroup.com/research-and-development/app/) 的 [Palazzetti](https://palazzettigroup.com/) 炉具。

该集成通过设备的本地 API 进行访问。[WPalaControl](https://github.com/Domochip/WPalaControl) 设备具有兼容的 API，也受此集成支持。

## 前提条件

- 您需要将 Connection Box 网桥或 WPalaControl 接入 Home Assistant 可访问的网络。
- 您需要满足以下其一条件：
  - 知道网络中 Connection Box 或 WPalaControl 的 IP 地址或主机名。
  - 或将 Connection Box 或 WPalaControl 配置为通过 DHCP 接入与 Home Assistant 相同的网络。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "Connection Box 的 IP 地址或主机名。您可以在路由器中找到它，或在 Palazzetti 应用中的 **Settings** > **Diagnostic information** > **Ethernet** 或 **Wifi** 下找到。"
  required: true
  type: string
```

## 气候

Palazzetti 集成提供一个 climate 实体，让您可以读取室温、启动和停止炉具、设置目标温度，以及设置风扇速度。

### 集成动作

此集成支持以下动作（请参阅 [Climate](/home-assistant/integrations/climate/)）。

- [`set_temperature`](/home-assistant/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/home-assistant/integrations/climate/#action-climateset_hvac_mode)
  - `heat` 表示加热模式
  - `off` 表示关闭炉具
- [`set_fan_mode`](/home-assistant/integrations/climate/#action-climateset_fan_mode)
  - `0` 到 `5` 表示逐级增大的风扇速度
  - `High` 表示可用的最高风扇速度
  - `Auto` 表示由炉具自动设置最佳风扇速度

## 按钮

对于支持该功能的炉具，此集成提供一个 Silent 按钮，用于触发静音模式。

## 数值实体

当设备支持时，Palazzetti 集成可控制以下项目：

- 炉具的燃烧功率，范围为 `1` 到 `5`
- 左侧和右侧风扇的速度

## 传感器

对于支持这些数据的产品，Palazzetti 集成提供以下传感器：

状态传感器：

- 状态（当前运行状态）可能具有以下值：
  - `off`: Off
  - `off_timer`: Timer-regulated switch off
  - `test_fire`: Ignition test
  - `heatup`: Pellet feed
  - `fueling`: Ignition
  - `ign_test`: Fuel check
  - `burning`: Operating
  - `burning_mod`: Operating - Modulating
  - `unknown`: Unknown
  - `cool_fluid`: Stand-by
  - `fire_stop`: Switch off
  - `clean_fire`: Burn pot cleaning
  - `cool`: Cooling in progress
  - `cleanup`: Final cleaning
  - `ecomode`: Ecomode
  - `chimney_alarm`: Chimney alarm
  - `grate_error`: Grate error
  - `pellet_water_error`: Pellet probe or return water error
  - `t05_error`: T05 error disconnected or faulty probe
  - `hatch_door_open`: Feed hatch or door open
  - `pressure_error`: Safety pressure switch error
  - `main_probe_failure`: Main probe failure
  - `flue_probe_failure`: Flue gas probe failure
  - `exhaust_temp_high`: Too high exhaust gas temperature
  - `pellet_finished`: Pellets finished or ignition failed
  - `firewood_finished`: Firewood finished
  - `cooling`: Cooling
  - `general_error`: General error
  - `door_open`: Door open
  - `temp_too_high`: Temperature too high
  - `cleaning_warning`: Cleaning warning
  - `fuel_error`: Fuel error
  
温度传感器：

- 出风温度（°C）
- 木材燃烧温度（°C）
- 室温（°C）
- 回水温度（°C）
- 水箱温度（°C）
- 水路温度 1（°C）
- 水路温度 2（°C）

燃料传感器：

- 颗粒燃料数量（kg - 累计消耗量）
- 颗粒燃料液位（cm - 当前余量）

## 可能的使用场景

- 控制运行状态、温度和风扇。
- 在颗粒燃料不足、耗尽，或炉具报错时接收提醒。
- 基于是否有人在家自动启动或关闭炉具。

## 自动化

您可以通过以下自动化示例快速开始。

### 当最后一个人离家时自动降低温度

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Lower the temperature when last person leaves"
description: "当最后一个人离开家时降低温度"
mode: single
triggers:
  - trigger: state
    entity_id:
      - zone.home
    to: 0
actions:
  - action: climate.set_temperature
    data:
      temperature: 16
    target:
      entity_id: climate.my_stove
```

 
</details>

## 已知限制

此集成目前**尚不支持**以下功能和传感器：

- 配备这些功能的炉具型号上的灯光和门实体
- 主风扇以外的风扇控制
- 燃烧功率控制

## 故障排除

<details>
<summary>开关功能并不总是可用</summary>

在某些运行阶段，无法打开或关闭炉具。只有当炉具状态处于以下状态之一时，此操作才可用：`off`、`off_timer`、`burning`、`burning_mod`、`cool_fluid`、`clean_fire`、`cooling`、`ecomode`、`firewood_finished`。

</details>

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
