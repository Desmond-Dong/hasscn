---
title: EHEIM Digital
description: 'EHEIM Digital 集成允许您从 Home Assistant 控制 EHEIM Digital(https://eheim.com/enGB/aquatics/eheim-digital/) 智能水族设备。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Climate
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Time
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: eheimdigital
ha_integration_type: hub
ha_platforms:
  - climate
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_quality_scale: platinum
ha_zeroconf: true
---
# EHEIM Digital

**EHEIM Digital** 集成允许您从 Home Assistant 控制 [EHEIM Digital](https://eheim.com/en_GB/aquatics/eheim-digital/) 智能水族设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "您的 EHEIM Digital 主设备的 IP 地址或主机名。默认为 `eheimdigital.local`，只有当主机名不起作用时才需要 IP 地址。"
    required: true
    type: string
```

## 数据更新

集成通过 WebSocket 本地连接到 EHEIM Digital 主设备，默认情况下每 15 秒请求所有设备的数据更新。

## 如何使用此集成

您可以使用此集成直接从 Home Assistant 控制和监控您的 EHEIM Digital 水族设备。这包括调整温度、灯光亮度和过滤速度等设置，以及监控设备状态。

- **接收通知**：获得有关重要事件的通知，例如过滤器需要维护或设备出现错误时。
- **更灵活的昼夜循环**：使用 Home Assistant 的自动化和脚本功能，为水族设备创建比原生 EHEIM Digital 界面更复杂的昼夜循环。
- **与其他设备集成**：虽然 EHEIM Digital 设备可以以有限的方式相互交互（例如，EHEIM 自动喂食器可以在喂食后暂停过滤泵），但此集成允许您将 EHEIM Digital 设备与其他智能家居设备一起自动化和控制。

## 支持的设备和实体

目前支持以下设备和实体：

### [EHEIM classicLEDcontrol+e](https://eheim.com/en_GB/aquatics/technology/lighting-control/classicledcontrol-e/classicledcontrol-e)

#### 灯光

- **亮度**：控制两个灯光通道的亮度
- **昼夜循环模式效果**：根据设备上配置的白天时间自动控制亮度

### [EHEIM thermocontrol+e](https://eheim.com/en_GB/aquatics/eheim-digital/aquarium-heaters/)

#### 气候

- **目标温度**：控制加热器的目标温度（对应于 Bio 和 Smart 模式下的日间温度）
- **预设/运行模式**：在手动、Bio 和 Smart 模式之间切换

#### 数值

- **温度偏移**：设置测量温度与实际温度之间的偏移
- **夜间温度偏移**：设置 Bio 模式下夜间温度的偏移

#### 时间

- **白天开始时间**：设置 Bio 模式下白天温度的开始时间
- **夜间开始时间**：设置 Bio 模式下夜间温度的开始时间

### [EHEIM classicVARIO+e](https://eheim.com/en_GB/aquatics/technology/external-filters/classicvario-e-250/classicvario-e-250)

#### 数值

- **手动速度**：设置手动模式下的泵速度
- **白天速度**：设置 Bio 模式下白天的泵速度
- **夜间速度**：设置 Bio 模式下夜间的泵速度

#### 选择

- **过滤器模式**：设置过滤器模式
  - **手动模式**：过滤器使用**手动速度**。
  - **脉冲模式**：过滤器使用高脉冲和低脉冲。速度通过**高脉冲速度**和**低脉冲速度**配置。持续时间通过**高脉冲持续时间**和**低脉冲持续时间**配置。
  - **Bio 模式**：过滤器使用昼夜节律。速度通过**白天速度**和**夜间速度**配置。白天和夜间的开始时间通过**白天开始时间**和**夜间开始时间**配置。

#### 传感器

- **当前泵速度**：显示当前泵速度
- **距维护剩余小时数**：显示过滤器需要维护前的剩余时间
- **错误代码**：显示设备当前的错误代码（无错误、转子卡住、过滤器中有空气）

#### 开关

- **泵**：开启和关闭过滤泵

#### 时间

- **白天开始时间**：设置 Bio 模式下白天泵速度的开始时间
- **夜间开始时间**：设置 Bio 模式下夜间泵速度的开始时间

### [EHEIM professionel5e](https://eheim.com/en_GB/aquatics/technology/external-filters/professionel-5e/)

#### 数值

- **高脉冲持续时间**：设置脉冲模式下高脉冲的持续时间
- **低脉冲持续时间**：设置脉冲模式下低脉冲的持续时间

#### 选择

- **过滤器模式**：设置过滤器模式
  - **手动模式**：过滤器使用**手动速度**。
  - **恒流模式**：过滤器使用**恒流速度**。
  - **脉冲模式**：过滤器使用高脉冲和低脉冲。速度通过**高脉冲速度**和**低脉冲速度**配置。持续时间通过**高脉冲持续时间**和**低脉冲持续时间**配置。
  - **Bio 模式**：过滤器使用昼夜节律。速度通过**白天速度**和**夜间速度**配置。白天和夜间的开始时间通过**白天开始时间**和**夜间开始时间**配置。
- **手动速度**：设置手动模式下的泵速度
- **恒流速度**：设置恒流模式下的泵速度
- **白天速度**：设置 Bio 模式下白天的泵速度
- **夜间速度**：设置 Bio 模式下夜间的泵速度
- **高脉冲速度**：设置脉冲模式下高脉冲的泵速度
- **低脉冲速度**：设置脉冲模式下低脉冲的泵速度

#### 传感器

- **当前泵速度**：显示当前泵速度
- **距维护剩余小时数**：显示过滤器需要维护前的剩余时间
- **运行时间**：显示运行时间
- **剩余关闭时间**：显示关闭泵后再次开启前的剩余时间
- **喂食后剩余关闭时间**：显示从自动喂食器收到信号后再次开启泵前的剩余时间

#### 开关

- **泵**：开启和关闭过滤泵

#### 时间

- **白天开始时间**：设置 Bio 模式下白天泵速度的开始时间
- **夜间开始时间**：设置 Bio 模式下夜间泵速度的开始时间

### 所有支持的设备

#### 数值

- **系统 LED 亮度**：控制系统 LED 的亮度

## 自动化

### 当过滤器出现错误时发送通知

您可以设置一个自动化，在过滤器出现错误时通知您。此示例使用 `notify.notify` 服务发送通知：

<details>
<summary>通知过滤器错误的示例自动化</summary>


```yaml
alias: Notify about filter error
description: "此自动化在过滤器出现错误时发送通知。"
mode: single
triggers:
  - trigger: state
    entity_id:
      - sensor.aquarienfilter_error_code
    to:
      - rotor_stuck
      - air_in_filter
conditions: []
actions:
  - action: notify.notify
    metadata: {}
    data:
      title: 过滤器有问题！
```


</details>

## 已知限制

- 此集成不支持上述列表以外的其他 EHEIM Digital 设备。更多设备将在未来更新中添加。但是，支持将不支持的设备作为主设备，支持的设备作为子设备，尽管不支持的设备在 Home Assistant 中不会显示任何实体。

## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.