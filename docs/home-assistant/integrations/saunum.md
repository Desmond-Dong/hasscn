---
title: Saunum
description: 'Saunum 集成可将你的 Saunum Leil(https://saunum.com/en/product/control-devices/) 桑拿控制单元接入 Home Assistant。Saunum(https://saunum.com/) 是一家爱沙尼亚公司。'
ha_iot_class: Local Polling
ha_release: 2025.12
ha_codeowners:
  - '@mettolen'
ha_domain: saunum
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: platinum
related:
  - url: https://www.saunum.com/
    title: Saunum
  - url: https://saunum.com/en/product/control-devices/
    title: Saunum Leil product page
ha_category:
  - Climate
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
---
# Saunum

**Saunum** 集成可将你的 [Saunum Leil](https://saunum.com/en/product/control-devices/) 桑拿控制单元接入 Home Assistant。[Saunum](https://saunum.com/) 是一家爱沙尼亚公司，专注于带有智能功能的先进桑拿加热器和控制系统。

借助 Leil 控制单元，你可以精确控制温度、自定义桑拿体验，并监控桑拿运行状态。

## 支持的设备

已知此集成支持以下设备：

- Saunum Leil 触摸屏控制面板

## 先决条件

设置此集成前，你需要：

1. 已安装 Saunum Leil 桑拿控制单元，并将其连接到你的网络。
2. 知道控制单元的 IP 地址。你可以在 Leil 触摸面板上找到：
   - 前往 **Settings** > **Modbus Settings**
   - 记下显示的 IP 地址


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "你的 Saunum Leil 控制单元的 IP 地址。你可以在 Leil 触摸面板的 **Settings** > **Modbus Settings** 中找到它。"
```

<details>
<summary>更改温度单位</summary>


Home Assistant 中显示的温度单位由 Home Assistant 系统设置控制，而不是由此集成或 Leil 触摸面板设置控制。

要在摄氏度和华氏度之间切换：

1. 前往 [**Settings** > **System** > **General**](https://my.home-assistant.io/redirect/general/)。
2. 在 **Unit system** 下，选择：
   - **Metric** 表示摄氏度（°C）
   - **Imperial** 表示华氏度（°F）
3. 温度实体会自动更新为你选择的单位显示。

Saunum Leil 控制单元原生使用摄氏度运行，即使你在 Leil 触摸面板显示设置中选择了华氏度也是如此。当 Home Assistant 选择 Imperial 单位制时，会自动将温度转换并显示为华氏度。温度范围如下：

- 摄氏度：40-100°C
- 华氏度：104-212°F


</details>

## 使用桑拿

### 开始一次桑拿会话

1. 将 **Sauna** 气候实体设为加热模式，以**开启会话**。
2. 使用气候实体的温度调节控件**调整目标温度**（40-100°C / 104-212°F）。
3. （可选）**调整风扇模式**，以控制桑拿空气循环风扇速度。

启动后，桑拿会开始加热到目标温度，并在达到配置的持续时间后自动关闭。在会话进行期间，你无法更改桑拿类型、桑拿时长或风扇时长设置。

:::note
当桑拿门处于打开状态时，你无法启动桑拿会话。控制单元会出于安全原因阻止加热启动。尝试开始加热前，请先关闭桑拿门。你可以使用 **Door open** 二进制传感器监控门状态。

:::
### 桑拿类型预设模式

Saunum Leil 控制单元支持三种桑拿类型预设，可分别保存不同的温度、桑拿时长和风扇时长配置。这些预设可让你快速以不同设置开始桑拿会话。

你可以使用气候实体的预设模式控件选择当前预设。该预设决定启动桑拿会话时温度、持续时间和风扇设置的默认值。

:::note
仅当桑拿会话未激活时，才可以更改预设模式（桑拿类型）。

:::
#### 自定义预设名称

预设名称可以直接在 Saunum Leil 控制单元上配置。你也可以在 Home Assistant 中自定义预设名称，使其与你设备上的名称保持一致：

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 中的 Saunum 集成。
2. 为你的 Saunum Leil 设备选择 **Configure**。
3. 为三个桑拿类型预设分别输入自定义名称，使其与你在 Leil 触摸面板中配置的名称一致，例如 **Finnish Sauna**、**Quick Session**、**Deep Heat**。
4. 选择 **Submit** 保存更改。

自定义预设名称会立即显示在气候实体的预设模式选择器中，让你更容易识别并选择偏好的桑拿配置。

### 风扇模式设置

桑拿加热器内置通风风扇，可帮助空气循环并保持温度分布均匀。你可以在桑拿会话进行期间使用气候实体的风扇模式控件调整风扇速度：

- **Off** (0)：关闭风扇
- **Low** (1)：低速
- **Medium** (2)：中速
- **High** (3)：高速

:::note
仅当桑拿会话处于激活状态时（加热模式开启），才可以更改风扇模式。桑拿关闭时，风扇模式设置不可用。

:::
:::warning
**火灾和烫伤风险**：将毛巾、衣物或清洁用品等可燃物留在桑拿加热器上方或附近，可能引燃并导致火灾，进而造成财产损失、严重伤害或死亡。高温的桑拿表面也可能造成严重烫伤。

不要让正在加热的桑拿长时间无人看管。始终确保通风良好，切勿将可燃物放在桑拿加热器附近或其上方。开始加热前，请确保桑拿区域内没有可燃物。

<details>
<summary>远程控制安全指南</summary>


通过 Home Assistant 远程控制桑拿时：

- 开始远程加热前，务必确认桑拿内无人。
- 确保桑拿内部及周围没有遗留可燃物。
- 设置合适的会话时长，避免长时间无人值守运行。
- 定期查看报警传感器，确认是否存在安全问题。
- 桑拿表面，尤其是靠近加热器的位置，可能导致严重烫伤。桑拿高温时请务必小心。


</details>


:::
## 支持的功能

**Saunum** 集成会提供以下实体。

### 气候

- **Sauna**
  - **说明**：桑拿的主要气候控制实体，可用于设置目标温度并控制加热。
  - **功能**：温度控制、HVAC 模式（off、heat）、风扇模式（off、low、medium、high）、预设模式（桑拿类型选择）。

### 灯光

- **Sauna light**
  - **说明**：如果照明连接到控制单元，可用于控制桑拿灯光。
  - **功能**：打开或关闭桑拿灯。

### 数值实体

- **Sauna duration**
  - **说明**：配置桑拿会话在自动关闭前可运行多长时间。
  - **单位**：分钟
  - **范围**：1-720 分钟（0-12 小时）
  - **默认值**：未设置时为 120 分钟（2 小时）
  - **备注**：在桑拿会话激活期间无法更改。

- **Fan duration**
  - **说明**：配置桑拿空气循环风扇在自动关闭前运行多长时间。
  - **单位**：分钟
  - **范围**：1-30 分钟
  - **默认值**：未设置时为 15 分钟
  - **备注**：在桑拿会话激活期间无法更改。

### 传感器

- **Temperature**
  - **说明**：桑拿内部当前温度。
  - **单位**：取决于你的 Home Assistant 单位系统，可显示为 °C（摄氏度）或 °F（华氏度）。

- **Heater elements active**
  - **说明**：当前激活的加热元件数量（0-3）。
  - **用途**：监控加热强度和功耗。

- **On time**
  - **说明**：Leil 触摸屏控制面板自上次重启以来的累计运行时间。
  - **单位**：秒
  - **备注**：此传感器默认禁用。如果你想跟踪使用统计，请在实体设置中启用它。

### 二进制传感器

- **Door open**
  - **说明**：指示当前桑拿门是否打开。
  - **设备类别**：Door
  - **用途**：用于出于安全和自动化目的监控桑拿门状态。

- **Door open during heating alarm**
  - **说明**：当加热器正在运行时打开桑拿门所触发的安全报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：重要安全警报，用于防止过热并确保安全运行。

- **Door open too long alarm**
  - **说明**：当桑拿门长时间保持打开状态时触发的报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：提醒你可能存在能源浪费或门未关闭的问题。

- **Thermal cutoff alarm**
  - **说明**：当因温度过高而触发热保护断路时产生的关键安全报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：需要立即处理，表示存在严重过热情况。

- **Internal temperature alarm**
  - **说明**：当内部电子元件温度过高时触发的报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：表示控制单元可能存在通风或散热问题。

- **Temperature sensor shorted alarm**
  - **说明**：表示温度传感器发生短路的诊断报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：表示传感器故障，需要技术维护。

- **Temperature sensor disconnected alarm**
  - **说明**：表示温度传感器断开连接或开路的诊断报警。
  - **设备类别**：Problem
  - **类别**：Diagnostic
  - **用途**：表示传感器连接有问题，需要技术维护。

:::important
请定期查看报警类二进制传感器。任何处于活动状态的报警传感器都表示存在潜在的安全或运行问题，应立即处理。触发安全报警时，桑拿加热器会自动关闭。

:::
## 操作

**Saunum** 集成提供以下操作。

### 操作：Start session

`saunum.start_session` 操作可使用自定义时长、目标温度和风扇时长来启动桑拿会话。与气候实体相比，此操作提供了更细粒度的控制，让你可以在一次调用中指定所有会话参数。

- **数据属性**: `entity_id`
  - **说明**: Saunum 气候实体的实体 ID。
  - **必需**: 是

- **数据属性**: `duration`
  - **说明**: 会话时长，使用时间段格式表示，例如 `{"hours": 2}`。默认值为 2 小时。
  - **必需**: 否

- **数据属性**: `target_temperature`
  - **说明**: 目标温度，单位为摄氏度（40-100）。默认值为 80。
  - **必需**: 否

- **数据属性**: `fan_duration`
  - **说明**: 风扇时长，使用时间段格式表示，例如 `{"minutes": 10}`。默认值为 10 分钟。
  - **必需**: 否

:::note
当桑拿门打开时，你无法启动桑拿会话。控制单元会出于安全原因阻止加热启动。

:::
#### 示例

```yaml
action: saunum.start_session
target:
  entity_id: climate.saunum_leil
data:
  duration:
    hours: 2
  target_temperature: 80
  fan_duration:
    minutes: 10
```

## 自动化

以下是一些你可以使用 Saunum 集成创建的自动化示例。

### 桑拿就绪通知与灯光联动

当达到目标温度时，发送通知并打开桑拿灯。

<!-- markdownlint-disable MD034 -->
[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fsauna-ready-notification-with-light-saunum%2F986784)
<!-- markdownlint-enable MD034 -->

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Sauna ready notification with light"
description: >-
  Sends a notification and turns on the sauna light when the target
  temperature is reached.

mode: restart

variables:
  sauna_climate: climate.saunum_leil
  notification_title: "Sauna is Ready!"
  notification_message: "Your sauna has reached {target_temperature}°C. Enjoy!"

triggers:
  - trigger: state
    entity_id: climate.saunum_leil
    to: "heat"
    from: "off"
    id: session_start

actions:
  - wait_template: >-
      {% set current = state_attr(sauna_climate, 'current_temperature') | float(0) %}
      {% set target = state_attr(sauna_climate, 'temperature') | float(0) %}
      {{ current >= target }}
    continue_on_timeout: false
  - action: light.turn_on
    target:
      entity_id: light.saunum_leil
  - action: notify.mobile_app_your_phone
    data:
      title: "{{ notification_title }}"
      message: >-
        {% set target_temperature = state_attr(sauna_climate, 'temperature') | int %}
        {{ notification_message.replace('{target_temperature}', target_temperature | string) }}

```


</details>

## 数据更新

**Saunum** 集成默认每 1 分钟从控制单元 polls 一次数据。

## 已知限制

- 此集成使用 Modbus TCP 协议与控制单元通信。请确保你的网络允许通过 502 端口通信。
- 当桑拿会话处于激活状态时，无法更改桑拿时长、风扇时长和桑拿类型。
- 此集成不提供重启功能，如有需要，可通过 Leil 触摸屏控制面板执行。

## 故障排除

<details>
<summary>无法连接到设备</summary>


**症状：** "Failed to connect to the device"

尝试设置集成时，你会收到连接失败的错误消息。

这通常意味着控制单元在你的网络中不可达，或者 Modbus TCP 设置不正确。

要解决此问题，请尝试以下步骤：

1. 确认控制单元已通电并连接到你的网络。
2. 在 Leil 触摸面板上检查 IP 地址：
   - 前往 **Settings** > **Modbus Settings**。
   - 确认 IP 地址与你输入的一致。
3. 确保 Home Assistant 实例可以访问控制单元：
   - 尝试从 Home Assistant 主机系统 ping 该 IP 地址。
   - 检查是否有防火墙或网络隔离阻止通信。
4. 确认 **502** 端口可访问：
   - 检查路由器和防火墙设置。
5. 确保没有其他设备或软件已经通过同一个 Modbus 连接与控制单元通信。


</details>

<details>
<summary>实体显示为 unavailable</summary>


**症状：** 所有实体都显示为 "unavailable"

成功设置后，实体已经出现，但状态显示为 unavailable。

这表明集成最初连接成功，但现在无法与控制单元通信。

1. 检查控制单元是否仍然通电。
2. 确认 Home Assistant 与控制单元之间的网络连接正常。
3. 检查控制单元的 IP 地址是否发生变化（DHCP）：
   - 可以考虑在路由器中为控制单元设置静态 IP 地址。
   - 如果 IP 地址已变化，请使用新地址删除并重新添加该集成。
4. 如果通信问题仍然存在，请重启 Saunum Leil 控制单元。


</details>

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
