---
title: Pilight
description: 'Pilight(https://www.pilight.org/) 是一个模块化的开源解决方案，用于与 433 MHz 设备通信，可在各种小型计算机上运行。许多常见的协议(https://manual.pilight.org/protocols/)已经可用。'
ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_release: 0.26
ha_iot_class: Local Push
ha_domain: pilight
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Pilight

[Pilight](https://www.pilight.org/) 是一个模块化的开源解决方案，用于与 433 MHz 设备通信，可在各种小型计算机上运行。许多常见的[协议](https://manual.pilight.org/protocols/)已经可用。

此 pilight 网关通过套接字连接连接到 [pilight-daemon](https://manual.pilight.org/programs/daemon.html) 以接收和发送代码。因此，Home Assistant 不必运行在负责 RF 通信的计算机上。

接收到和支持的 RF 代码被放到 Home Assistant 的事件总线上，因此可以直接被其他集成使用（例如自动化）。此外，还提供了发送动作来发送 RF 代码。

Home Assistant 目前支持以下设备类型：

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)
- [Light](#light)

## 配置

要将 pilight 集成到 Home Assistant 中，请将以下部分添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
pilight:
```

```yaml
host:
  description: 运行 pilight-daemon 的计算机的 IP 地址，例如 192.168.1.32。
  required: false
  default: 127.0.0.1
  type: string
port:
  description: "要连接的网络端口，另请参阅：(https://manual.pilight.org/development/socket/)。"
  required: false
  default: 5001
  type: integer
send_delay:
  description: 如果您在尝试一次切换多个开关时遇到传输问题，可以定义一个发送延迟（以秒的分数表示）。当您使用 [pilight USB Nano](https://github.com/pilight/pilight-usb-nano) 作为硬件并同时打开或关闭整组多个开关时，可能会发生这种情况。测试值在 0.3 到 0.8 秒之间，具体取决于硬件。
  required: false
  default: 0.0
  type: float
whitelist:
  description: 您可以定义一个白名单，以防止将太多不需要的 RF 代码（例如邻居的气象站）放到您的 HA 事件总线上。所有定义的子部分都必须匹配。如果其中一个项目为真，则子部分匹配。
  required: false
  type: string
```

在此示例中，只有使用 daycom 或 Intertechno 协议的接收 RF 代码才会被放到事件总线上，并且仅当设备 ID 为 42 时。有关更多可能的设置，请查看 pilight [API](https://manual.pilight.org/development/) 的接收器部分。

完整的配置示例可能如下所示：

```yaml
# Example configuration.yaml entry
pilight:
  host: 127.0.0.1
  port: 5000
  send_delay: 0.4
  whitelist:  # optional
    protocol:
      - daycom
      - intertechno
    id:
      - 42
```

## 二值传感器

`pilight` 二值传感器平台实现了 [pilight 网关](#configuration) 的二值传感器功能。有两种类型的 Pilight 二值传感器配置：一种正常传感器，它周期性地发送开和关状态；另一种触发传感器，仅在事件发生时发送触发（例如许多廉价的 PIR 运动探测器）。

要在您的安装中启用 Pilight 二值传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    variable: "state"
```

```yaml
variable:
  description: 数据流中定义传感器值的变量名称。
  required: true
  type: string
payload:
  description: >
    消息负载标识符。
    只有在所有标识符匹配时才设置传感器值。
  required: true
  type: string
name:
  description: 传感器的名称。
  required: false
  type: string
payload_on:
  description: "变量 `on` 值。集成将此识别为逻辑 '1'。"
  required: false
  type: [string, float, integer]
payload_off:
  description: "变量 `off` 值。集成将此识别为逻辑 '0'。"
  required: false
  type: [string, float, integer]
disarm_after_trigger:
  description: 将传感器配置为触发类型。
  required: false
  type: boolean
  default: false
reset_delay_sec:
  description: >
    如果 `disarm_after_trigger` 设置为 true，传感器解除前的秒数。
  required: false
  type: integer
  default: 30
```

### 完整示例

完整的配置示例可能如下所示：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    name: "Motion"
    variable: "state"
    payload:
      unitcode: 371399
    payload_on: "closed"
    disarm_after_trigger: true
    reset_delay_sec: 30
```

## 传感器

此用于 433 MHz 设备的 `pilight` 传感器平台使用消息负载中的值作为传感器值。可以设置唯一标识符（例如 _uuid_）来区分多个 pilight 设备。要使用 pilight 传感器，必须设置 pilight Home Assistant 网关。

要通过 pilight 使用您的传感器，请确保它被[支持](https://manual.pilight.org/protocols/index.html)并将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    variable: temperature
    payload:
      uuid: "0000-b8-27-eb-f447d3"
```

```yaml
variable:
  description: 数据流中定义传感器值的变量名称。
  required: true
  type: string
payload:
  description: 消息负载标识符。只有在所有标识符匹配时才设置传感器值。
  required: true
  type: string
name:
  description: 传感器的名称。
  required: false
  default: Pilight Sensor
  type: string
unit_of_measurement:
  description: 定义传感器的测量单位（如果有）。
  required: false
  type: string
```

### 示例：气象站

本节展示了如何使用气象站数值的真实示例。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    name: "Temperature"
    variable: "temperature"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "°C"
  - platform: pilight
    name: "Humidity"
    variable: "humidity"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "%"
  - platform: pilight
    name: "Battery"
    variable: "battery"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "%"
```

## 开关

`pilight` 开关平台使用 [pilight](https://www.pilight.org/) 发出 433 MHz 命令来打开或关闭 433 MHz 设备。必须设置 Pilight Home Assistant 网关。

此外，可以定义触发此开关打开和关闭的 RF 命令。这允许您也使用随 433 MHz 开关附带的遥控器，而不会混淆 Home Assistant 状态。您甚至可以定义多个开/关命令，从而使用多个 RF 遥控器来切换此开关。

为确保 Home Assistant 知道您设备的实际状态，建议使用任何 433 MHz 设备都不知道的代码的 RF 遥控器。因此，您使用遥控器触发此开关向设备发送正确的 RF 代码。

要定义 Pilight 开关，请将以下行添加到您的 "`configuration.yaml`" 中：

```yaml
# Example configuration.yaml entry
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          'on': 1
        off_code:
          protocol: intertechno_old
          'off': 1
```

```yaml
switches:
  description: 包含所有命令开关的列表。
  required: true
  type: string
  keys:
    entry:
      description: 命令开关的名称。可以有多个条目。
      required: true
      type: list
      keys:
        on_code:
          description: 打开设备的代码。
          required: true
          type: list
        off_code:
          description: 关闭设备的代码。
          required: true
          type: list
        on_code_receive:
          description: 如果给定，当 pilight 接收到此命令时将打开开关。
          required: false
          type: list
        off_code_receive:
          description: 如果给定，当 pilight 接收到此命令时将关闭开关。
          required: false
          type: list
```

不同代码的变量（`on_code` 和 `off_code`）：

- **protocol** (*必需*)：要使用的协议，例如 `intertechno_old` 或 `daycom`。
- **systemcode** (*可选*)：设备的系统代码。
- **unit** (*可选*)：要使用的单元（等同于 `pilight-send --unit`）。
- **unitcode** (*可选*)：要使用的单元代码（等同于 `pilight-send --unitcode`）。
- **id** (*可选*)：设备的 ID
- **state** (*可选*)：`'on'` 或 `'off'` 必须用撇号括起来才能正确解析。
- **'off'** (*可选*)：`1` 或 `0`
- **'on'** (*可选*)：`1` 或 `0`

有关可能的代码条目，请查看 [pilight API](https://manual.pilight.org/development/)。[pilight-send](https://manual.pilight.org/programs/send.html) 允许的所有命令都可以使用。这意味着如果某个协议使用不同的参数，您应该能够用特定协议所需的正确参数替换上面的变量。例如，当使用 `elro_800_switch` 或 `mumbi` 协议时，您必须用 `unitcode` 替换变量 `unit`，否则会出现错误。

不同接收代码的变量（`on_code_receive` 和 `off_code_receive`）：

- **echo** (*可选*) 如果给定代码被接收到，设置为 `true` 以发送开/关代码。

如果您已将发送器直接与接收器配对以防止信号发送两次，这很有用。

### 示例

```yaml
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'on': 1
        off_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'off': 1
        on_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: "on"
        off_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: "off"
```

## 灯光

Pilight 调光设备可以有不同的亮度值，可以用作灯光。
调光器和开关的配置参数相同，但调光器支持最小和最大调光级别。

`dimlevel_min` 和 `dimlevel_max` 设置应在 pilight 使用的 `0` 到 `15` 范围内设置。Home Assistant 执行的任何调光（最可能在 `0` 到 `100` 范围内）将转换为 Pilight 中可用配置范围的百分比。

```yaml
lights:
  description: 包含所有命令灯光的列表。
  required: true
  type: string
  keys:
    entry:
      description: 命令灯光的名称，与开关相同。可以有多个条目。
      required: true
      type: list
```

### 示例

```yaml
light:
  - platform: pilight
    lights:
      test2:
        dimlevel_min: 2
        dimlevel_max: 14
        on_code:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          'on': 1
        off_code:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          'off': 1
        on_code_receive:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          state: "on"
        off_code_receive:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          state: "off"
```

## 故障排除

- 经过测试的 RF 收发器硬件列表可在[此处](https://manual.pilight.org/electronics/)获取。这在购买前可能有用。
- 当协议被 pilight 知道时，发送命令很简单，但接收命令可能相当困难。由于发送硬件或 RF 接收器中的不同时序，代码可能无法正确识别。如果发生这种情况，请按照以下步骤操作：

1. 从源代码[安装](https://manual.pilight.org/installation.html) pilight（不用担心，这非常简单），并在弹出菜单中仅激活您期望的协议。这会减少误报。
2. 通过运行 `pilight-debug` 检查您设备 + RF 接收器的实际时序。记住 `pulslen` 参数。
3. 转到 pilight 源代码的 `libs/pilight/protocols/433.92` 子文件夹并打开您协议的 .c 文件。搜索 `MIN_PULSE_LENGTH`、`MAX_PULSE_LENGTH ` 和 `AVG_PULSE_LENGTH`。更改脉冲长度以匹配您测量的长度。通过重新运行 `$ sudo ./setup.sh` 重新编译并安装 pilight。