---
title: Tessie
description: 'Tessie 集成会公开与你的 Tessie(https://tessie.com/) 订阅关联的 Tesla 车辆和能源产品中的各种命令与传感器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary Sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device Tracker
  - Lock
  - Media Player
  - Number
  - Sensor
  - Update
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
---
# Tessie

**Tessie** 集成会公开与你的 [Tessie](https://tessie.com/) 订阅关联的 Tesla 车辆和能源产品中的各种命令与传感器。

## 你可以如何使用此集成

此集成可让你通过 Home Assistant 对 Tesla 车辆和能源产品进行全面控制与监控：

### 车辆控制

- 监控电池电量、续航、充电状态和位置
- 控制空调系统（加热、制冷、座椅加热、方向盘加热）
- 锁定或解锁车门，并控制车窗、后备箱、前备箱和充电口
- 开始或停止充电，并设置充电上限
- 启用哨兵模式、代客模式和除霜模式
- 闪灯、鸣笛，以及触发 HomeLink
- 跟踪车辆位置和导航目的地
- 安装软件更新

### 能源产品监控与控制

- 监控电池功率、电网功率、太阳能功率和负载消耗
- 查看能源储备和荷电状态
- 控制备份储备和运行模式
- 管理电网充电和 Storm Watch 设置
- 监控电网服务和虚拟电厂（VPP）参与情况

## 支持的设备

此集成支持所有 Tesla 车型和能源产品：

### 车辆

- Model 3
- Model Y
- Model S
- Model X
- Cybertruck

### 能源产品

- Powerwall 2/3
- Powerwall+
- Solar Inverters

## 先决条件

你必须拥有有效的 [Tessie](https://my.tessie.com/) 订阅，生成一个 [Tessie Access Token](https://my.tessie.com/settings/api)，并通过生成 [Tesla Virtual Key](https://www.tesla.com/_ak/tessie.com) 授予 Tessie 访问你的 Tesla 车辆的权限。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::


集成设置完成后，所有已连接的 Tesla 车辆和能源产品都会自动添加到 Home Assistant。请注意，目前不支持通过 UI 重新配置。如果你需要更改 API 令牌或重新连接账户，则需要删除并重新添加此集成。

## 车辆实体

### 二进制传感器

此集成会为与你车辆相关的多项指标创建二进制传感器实体：

#### 充电状态

- Battery charging
- Battery heater
- Preconditioning enabled
- Scheduled charging enabled
- Trip charging enabled

#### 空调状态

- Auto seat climate left
- Auto seat climate right
- Auto steering Wheel climate
- Overheat protection enabled
- Overheat protection running

#### 车辆状态

- Dashcam recording
- Front driver window
- Front passenger door
- Front passenger window
- Rear driver door
- Rear driver window
- Rear passenger door
- Rear passenger window
- Tire pressure warning front left
- Tire pressure warning front right
- Tire pressure warning rear left
- Tire pressure warning rear right
- User present

### 按钮

此集成会创建按钮实体，用于控制车辆的多个功能：

- Flash lights
- HomeLink
- Honk horn
- Keyless driving
- Play fart
- Wake

### 气候

此集成会创建一个气候实体来控制车辆空调系统。该实体可以：

- 更改驾驶员设定温度
- 切换到三种保持模式之一：Keep、Dog 和 Camp
- 打开或关闭

副驾驶设定温度会显示为传感器，但无法通过 Tessie 修改。

### Cover

此集成会创建 cover 实体，用于控制车辆的多个部分：

- 打开或关闭后备箱
- 打开或关闭充电口
- 打开前备箱
- 通风或关闭车窗
- 通风或关闭天窗

### 设备追踪器

此集成会为车辆当前位置和导航目的地创建设备追踪器实体。

### 锁

此集成会创建锁实体，用于锁定和解锁车辆，以及控制：

- Charge cable
- Speed limit

### 媒体播放器

此集成会创建媒体播放器实体，用于显示每辆车当前正在播放的内容。

### 数值实体

此集成会创建数值实体，用于控制：

- Charge current
- Charge limit
- Speed limit

### 选择实体

此集成会创建选择实体，用于控制每个座椅加热器。你可以将每个座椅加热器设置为 Off、Low、Medium 或 High。

对于配备了通风座椅的车辆，还会额外创建选择实体来控制每个通风座椅。

加热座椅：

- Front left
- Front right
- Rear center (if installed)
- Rear left (if installed)
- Rear right (if installed)
- Third row left (if installed)
- Third row right (if installed)

通风座椅：

- Front left
- Front right

### 传感器

此集成会为与你车辆相关的多项指标创建传感器实体：

#### 电池健康状态

- Battery module temperature max
- Battery module temperature min
- Battery pack current
- Battery pack voltage
- 剩余能量
- Lifetime energy used
- Phantom drain

#### 充电状态

- Battery charging
- Battery level
- Battery range
- Battery range estimate (disabled)
- Battery range ideal (disabled)
- Charge cable (disabled)
- Charge energy added
- Charge port latch (disabled)
- Charge rate
- Charger current
- Charger power
- Charger voltage
- 剩余能量

#### 空调状态

- Driver temperature setting
- Inside temperature
- Outside temperature
- Passenger temperature setting

#### 驾驶状态

- Destination
- Distance to arrival
- Power
- Shift state
- Speed
- State of charge at arrival
- Time to arrival
- Traffic delay

#### 车辆状态

- Odometer
- Online
- Tire pressure front left
- Tire pressure front right
- Tire pressure rear left
- Tire pressure rear right

### 开关

此集成会创建开关实体，用于控制车辆的多个功能：

- Charge
- Defrost mode
- Sentry mode
- Steering wheel heater
- Valet mode

### 更新

此集成会显示车辆软件更新及其安装进度。更新必须在下载完成后，才能从 Home Assistant 安装。

## 能源实体

### 二进制传感器

- Backup capable
- Grid services enabled
- Grid services active
- Grid status
- Storm watch active

### 数值实体

- Backup reserve
- Off grid reserve

### 选择实体

- Allow export
- Operation mode

### 传感器

- Battery power
- 剩余能量
- Generator power
- Grid power
- Grid services power
- Island status
- Load power
- Percentage charged
- Solar power
- Total pack energy
- Version
- 车辆
- <abbr title="Virtual power plant">VPP</abbr> backup reserve
- Fault state code
- Power
- State code

#### 能源历史

- Battery charged from generator (disabled)
- Battery charged from grid (disabled)
- Battery charged from solar (disabled)
- Battery discharged (disabled)
- 电池供能消耗（默认禁用）
- 发电机供能消耗（默认禁用）
- 电网供能消耗（默认禁用）
- 太阳能供能消耗（默认禁用）
- Generator exported (disabled)
- Grid exported from battery (disabled)
- Grid exported from generator (disabled)
- Grid exported from solar (disabled)
- Grid imported
- Grid services exported (disabled)
- Grid services imported (disabled)
- Solar exported (disabled)
- Total battery charged
- Total battery discharged
- Total grid exported
- Total home usage
- Total solar generated

### 开关

- Allow charging from grid
- Storm watch

## 能源仪表板

能源历史传感器提供累计能量值（kWh），可直接用于[能源仪表板](/home-assistant/docs/energy/)。

另外，你也可以基于 `Battery power` 和 `Grid power` 传感器，通过 [Template Sensor](/home-assistant/integrations/template/) 将正负值拆分为导入和导出值，以此计算能量流向。
然后，`Load power`、`Solar power` 以及这些模板传感器可以使用 [Riemann Sum](/home-assistant/integrations/integration/) 将瞬时功率值（kW）转换为累计能量值（kWh），
从而用于能源仪表板。

## 示例

以下是一些使用 Tessie 集成的常见自动化示例：

### 出发前预热或预冷车辆

此自动化会在预定出发时间前 15 分钟对你的 Tesla 进行预热或预冷：

```yaml
automation:
  - alias: "Precondition Tesla before work"
    triggers:
      - trigger: time
        at: "07:45:00"
    conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.my_tesla
        data:
          temperature: 21
```

### 在低谷时段开始充电

此自动化会在电价最低时开始充电：

```yaml
automation:
  - alias: "Charge Tesla during off-peak hours"
    triggers:
      - trigger: time
        at: "23:00:00"
    conditions:
      - condition: numeric_state
        entity_id: sensor.my_tesla_battery_level
        below: 80
      - condition: state
        entity_id: binary_sensor.my_tesla_battery_charging
        state: "off"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.my_tesla_charge
```

### 电量达到目标时停止充电

此自动化会在达到目标电量时停止充电：

```yaml
automation:
  - alias: "Stop Tesla charging at 80%"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_tesla_battery_level
        above: 79
    conditions:
      - condition: state
        entity_id: binary_sensor.my_tesla_battery_charging
        state: "on"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.my_tesla_charge
```

### 到家时打开车库门

此自动化会在你的 Tesla 到家时打开车库门：

```yaml
automation:
  - alias: "Open garage when Tesla arrives"
    triggers:
      - trigger: zone
        entity_id: device_tracker.my_tesla_location
        zone: zone.home
        event: enter
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.garage_door
```

### 充电完成时发送通知

此自动化会在车辆充电完成后发送通知：


```yaml
automation:
  - alias: "Notify when Tesla charging complete"
    triggers:
      - trigger: state
        entity_id: binary_sensor.my_tesla_battery_charging
        from: "on"
        to: "off"
    conditions:
      - condition: numeric_state
        entity_id: sensor.my_tesla_battery_level
        above: 79
    actions:
      - action: notify.mobile_app
        data:
          message: "Tesla charging is complete at {{ states('sensor.my_tesla_battery_level') }}%"
```


## 故障排除

### 操作返回错误

如果车辆操作在 Home Assistant 中返回错误，你应先尝试在 Tessie 应用中执行相同操作。该应用会引导你修复命令签名或权限范围等常见问题。

### 命令签名

大多数 2021 年及以后生产的 Tesla 车辆都需要启用命令签名以提升安全性。命令签名可以确保发送到车辆的命令都经过加密签名和验证。

要启用命令签名：

1. 在移动设备上打开 Tessie 应用。
2. 前往车辆设置。
3. 按照提示设置 [Tesla Virtual Key](https://www.tesla.com/_ak/tessie.com)。
    - 这会在你的车辆上安装 Tessie 的唯一加密指纹。

配置完成后，所有来自 Tessie 的命令（包括通过 Home Assistant 发送的命令）都会使用 Tessie 的私钥进行签名。车辆会在执行前验证每条命令，因此即使你的 API 令牌泄露，也能防止未授权访问。

命令签名兼容以下车型：

- Model 3 and Model Y (all years)
- Model S and Model X (2021 or newer)

### 缺少权限范围或访问权限

Tessie 需要特定的 Tesla 账户权限才能正常工作。如果某些功能无法使用，你可能需要确认账户已授予所需的权限范围：

- **Vehicle Information** - 获取车辆数据所必需，例如电量、空调状态等
- **Vehicle Location** - 跟踪车辆位置所必需
- **Vehicle Commands** - 控制车辆所必需，例如锁定、解锁、空调等
- **Vehicle Charging Management** - 控制充电所必需
- **Energy Product Information** - 获取能源产品数据所必需
- **Energy Product Commands** - 控制能源产品所必需，例如 Powerwall、Solar

要验证或更新权限：

1. 登录你的 [Tessie 账户](https://my.tessie.com/)
2. 检查 Tesla 账户连接设置
3. 如有需要，重新认证以授予缺失权限

如果问题仍然存在，请尝试在 Home Assistant 中删除并重新添加此集成。

### 数据未更新

如果车辆数据未按预期更新，可能与你的 Tessie 字段配置有关。某些车辆字段的更新频率会受到订阅等级和字段设置影响。你可以在 [Tessie 账户设置](https://my.tessie.com/settings) 中调整这些设置。

能源产品数据通常会定期更新，不受这些限制影响。

## 已知限制

- **副驾驶温度控制**：副驾驶设定温度会显示为传感器，但无法通过 Tessie 或 Home Assistant 修改。只有驾驶员温度可以控制。
- **字段更新频率**：某些车辆数据字段的更新频率可能会受到 Tessie 订阅等级和字段配置设置影响。
- **无法重新配置**：此集成无法通过 UI 重新配置。若要更改 API 令牌或设置，必须删除并重新添加此集成。
- **软件更新**：车辆软件更新只有在已下载到车辆后，才能从 Home Assistant 安装。

## 诊断

Tessie 集成支持[诊断数据收集](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)，可帮助排查问题。如果你在使用集成时遇到问题，可以下载诊断信息并在报告问题时一并提交。

诊断数据包含 Tessie 为你的设备返回的全部 API 数据副本。这些信息对开发者调查问题会很有帮助。

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
