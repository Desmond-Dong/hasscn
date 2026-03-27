---
title: Modbus
description: 'modbus(http://www.modbus.org/) 是一种用于控制 PLC（可编程逻辑控制器）和 RTU（远程终端单元）的通信协议。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Hub
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: modbus
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: 配置文件
---
[modbus](http://www.modbus.org/) 是一种用于控制 PLC（可编程逻辑控制器）和 RTU（远程终端单元）的通信协议。

集成严格遵守 [协议规范](https://www.modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf)，使用 [pymodbus](https://github.com/pymodbus-dev/pymodbus) 进行协议实现。

modbus 集成支持所有遵守 modbus 标准的设备。与设备的通信可以是串行 (rs-485)、TCP 或 UDP 连接。 Modbus 集成允许多个通信通道，例如与一个或多个 TCP 连接相结合的串行端口连接。

# 配置 Modbus 通讯

配置与 modbus 设备的 modbus 通信。这是建立对设备的访问权限所需的一般设置。

Modbus 集成允许您使用多个连接，每个连接具有多个传感器等。

modbus集成提供了许多参数来帮助与"困难"设备进行通信，这些参数与通信类型无关。

要启用此集成，请将其添加到您的"`configuration.yaml`"文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
delay:
  description: "连接建立后，发送消息前的延迟时间（秒）。
  某些 Modbus 设备在连接建立后通常需要 1-2 秒的延迟来准备通信。
  如果设备在连接后不响应消息，请尝试此参数。
  **注意：** 仅影响第一条消息。"
  required: false
  default: 0
  type: integer
message_wait_milliseconds:
  description: "请求之间等待的时间（以毫秒为单位）。"
  required: false
  default: 30 表示串行连接，0 表示所有其他连接。
  type: integer
name:
  description: "该中心的名称。必须是唯一的。"
  required: true
  type: string
timeout:
  description: "等待响应时超时（以秒为单位）。"
  required: false
  default: 5
  type: integer
type:
  description: "modbus 类型。"
  required: true
  type: list
  keys:
    tcp:
      description: "与套接字成帧器的 TCP/IP 连接，与支持以太网的设备一起使用。"
    udp:
      description: "与套接字成帧器的UDP连接，很少使用。"
    rtuovertcp:
      description: "与 rtu 成帧器的 TCP/IP 连接，在连接到 modbus 转发器时使用。"
    serial:
      description: "与 RTU 成帧器串行连接，与 TTY 端口或 USB rs485 转换器一起使用。"
```

## 配置 TCP 连接

`type: tcp` 是必需的。用于直接提供 TCP/IP 接口的设备。

```yaml
host:
  description: "您的 modbus 设备的 IP 地址或名称，例如 `192.168.1.1`。"
  required: true
  type: string
port:
  description: "用于通信的网络端口。"
  required: true
  type: integer
```

### 示例：典型的 TCP 配置

```yaml
# Example yaml: typical tcp connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502
```

### 示例：完整的 tcp 配置

```yaml
# Example yaml: full tcp connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## 配置TCP-RTU连接

`type: rtuovertcp` 是必需的。用于直接提供 TCP/IP 接口的设备。

这通常在与 modbus 转发器通信时使用，该设备
向上有一个 TCP/IP 连接，向下有一个或多个串行连接。

```yaml
host:
  description: "您的 modbus 设备的 IP 地址或名称，例如 `192.168.1.1`。"
  required: true
  type: string
port:
  description: "用于通信的网络端口。"
  required: true
  type: integer
```

### 示例：典型的 TCP-RTU 配置

```yaml
# Example yaml: typical tcp-rtu connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502
```

### 示例：完整 TCP-RTU 配置

```yaml
# Example yaml: full tcp-rtu connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## 配置 UDP 连接

`type: udp` 是必需的。这很少使用，并且仅用于非常特殊的配置。

```yaml
host:
  description: "您的 modbus 设备的 IP 地址或名称，例如 `192.168.1.1`。"
  required: true
  type: string
port:
  description: "用于通信的网络端口。"
  required: true
  type: integer
```

### 示例：典型的 udp 配置

```yaml
# Example yaml: typical udp connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502
```

### 示例：完整的 UDP 配置

```yaml
# Example yaml: full udp connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## 配置串行连接

`type: serial` 是必需的。这用于提供串行 rs485 接口的设备。

物理接口通常是 USB 串行 RS485 转换器或连接到串行端口的 RS232-RS485。

```yaml
baudrate:
  description: "串行连接的速度，更高的速度提供更好的性能。"
  required: true
  type: integer
bytesize:
  description: "每个字节的数据大小（以位为单位）。"
  required: true
  type: list
  keys:
    "5":
      description: "5 位数据，很少使用。"
    "6":
      description: "6 位数据，很少使用。"
    "7":
      description: "7 位数据，用于非常旧的设备。"
    "8":
      description: "8 位数据，标准。"
method:
  description: "连接 Modbus 的方法。"
  required: true
  type: list
  keys:
    rtu:
      description: "二进制数据传输，前面是从机 ID，后面是 crc，标准。"
    ascii:
      description: "ASCII 数据传输，前面是从机 ID，后面是 crc，用于少数设备。"
parity:
  description: "数据字节的奇偶校验。"
  required: true
  type: list
  keys:
    E:
      description: "偶校验位。"
    O:
      description: "奇数奇偶校验位。"
    N:
      description: "没有奇偶校验位，标准。"
port:
  description: "Modbus 设备连接到 Home Assistant 主机的串行端口或 USB 设备。"
  required: true
  type: string
stopbits:
  description: "数据字节的停止位。"
  required: true
  type: list
  keys:
    '1':
      description: "1 个停止位。"
    '2':
      description: "2 个停止位，标准。"
```

### 示例：典型的串行配置

```yaml
# Example yaml:  typical serial connection
modbus:
  - name: modbus_hub
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1
```

### 示例：完整串行配置

```yaml
# Example yaml: full udp connection
modbus:
  - name: modbus_hub
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```


## 配置多个连接

多种连接可以自由组合不同的通信方式：

```yaml
# Example yaml: multiple tcp connections
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS_1
    port: 2020

  - name: modbus_hub2
    type: tcp
    host: IP_ADDRESS_2
    port: 502
```


```yaml
# Example yaml: tcp connection and serial connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS_1
    port: 2020

  - name: modbus_hub2
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1
```

## 配置 Modbus 实体

modbus 实体分组在每个 modbus 通信条目下方。

**备注** 每个 modbus 设备必须至少定义 1 个实体，否则将不会加载集成。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

所有 modbus 实体都有以下参数：

```yaml
address:
  description: "线圈/寄存器的地址。请注意，这也可以以十六进制指定。例如：`0x789A`"
  required: true
  type: integer
name:
  description: "实体的名称，在实体类型中必须是唯一的。"
  required: true
  type: string
scan_interval:
  description: "更新间隔以秒为单位。
  scan_interval = 0 表示不轮询。
  实体会在启动后不久读取一次，之后按 scan_interval 读取。
  注意，重启 Home Assistant 时会恢复最后一次已知值。"
  required: false
  type: integer
  default: 15
slave:
  description: "与 `device_address` 相同"
  required: false
  type: integer
  default: 1
device_address:
  description: "设备的 ID。用于寻址 rs485 总线上的多个设备或连接到 modbus 中继器的设备。0 是广播 ID。"
  required: false
  type: integer
  default: 1
unique_id:
  description: "唯一标识该实体的 ID。
  从站将被分配 `<<unique_id>>_<<slave_index>>` 形式的 unique_id。
  如果两个实体具有相同的唯一 ID，Home Assistant 会引发异常。"
  required: false
  type: string
```

## 示例：实体分组

```yaml
# Example yaml: entities grouping
modbus:
  - type: tcp
    host: IP_ADDRESS_1
    port: 2020
    name: "modbus_hub"
    binary_sensors:
      - name: binary_sensor1
        address: 100
    climates:
      - name: "Watlow F4T"
        address: 200
    covers:
      - name: Door1
        address: 300
    fans:
      - name: Fan1
        address: 400
    lights:
      - name: light1
        address: 500
    sensors:
      - name: sensor1
        address: 600
    switches:
      - name: Switch1
        address: 700
```

下面详细介绍不同类型的实体。

## 配置二进制传感器实体

Modbus 二进制传感器允许您从线圈收集数据，根据标准，线圈具有开/关状态。

通常，一个寄存器包含 16 个线圈，根据使用的请求给出不同的地址。

```yaml
Register 512: Coil 1 - 16
Register 513: Coil 17 - 32
```

`input_type: coils` 将使用从 1 到 32 的地址，而 `input_type: input` 将使用地址 512 和 513。
因此，许多设备（尤其是较旧的设备）不与寄存器地址空间共享线圈地址空间，
并且这个 `input` 将从与 `coil` 不同的地址空间读取。该问题存在于具有以下功能的设备中：
共享地址空间，是配置实体时出现问题的常见原因。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
binary_sensors:
  description: "为此连接配置的所有二进制传感器的列表。"
  required: false
  type: map
  keys:
    device_class:
      description: "用于 UI 的 [type/class](/home-assistant/integrations/binary_sensor/#device-class)。"
      required: false
      type: string
    input_type:
      description: "请求类型 `discrete_input`、`coil`、`holding` 或 `input`"
      required: false
      default: coil
      type: string
    slave_count:
      description: "与 `virtual_count` 相同。"
      required: false
      type: integer
    virtual_count:
      description: "生成 count+1 个二进制传感器（主站 + 从站）。
      地址会自动递增。
      此参数可简化配置，并且通过单次请求替代 count+1 次请求来显著提升性能。"
      required: false
      type: integer
    unique_id:
      description: "唯一标识实体的 ID。从站将自动获得一个 <<unique_id>>_<<slave_index>> 的 unique_id。如果两个传感器具有相同的唯一 ID，Home Assistant 将引发异常。"
      required: false
      type: string
```

### 示例：典型的二进制传感器配置

```yaml
# Example yaml: typical binary_sensor
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        slave: 1
```

### 示例：完整的二进制传感器配置

```yaml
# Example yaml: binary_sensor with all options
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        device_class: door
        input_type: coil
        scan_interval: 15
        slave: 1
        slave_count: 0
        unique_id: my_relay
```

### 示例：多个相同的二进制传感器配置

```yaml
# Example of 10 identical binary_sensor
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        slave: 1
        slave_count: 10
        unique_id: my_relay
```

此配置将每 15 秒轮询一次线圈地址 100 到 110，并更新 binary_sensors：`my_relay`
和 `my_relay_1` 至 `my_relay_10`。

主设备配置（如 device_class）会自动复制到从设备。

## 配置气候实体

Modbus 气候平台允许您监控恒温器或加热器以及设置目标温度、HVAC 操作、HVAC 模式、摆动模式和风扇状态。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
climates:
  description: "此 modbus 实例中所有气候实体的列表。"
  required: false
  type: map
  keys:
    temperature_unit:
      description: "温度单位：C 或 F。"
      required: false
      default: C
      type: list
      keys:
        C:
          description: "摄氏度"
        F:
          description: "华氏度"
    precision:
      description: "温度的有效小数位数。"
      required: false
      type: integer
      default: 0
    temp_step:
      description: "步长目标温度。"
      required: false
      type: float
      default: 0.5
    max_temp:
      description: "目标温度的最大设定值。"
      required: false
      type: integer
      default: 35
    min_temp:
      description: "目标温度的最小设定值。"
      required: false
      type: integer
      default: 5
    count:
      description: "为了获取当前温度而需要读取的寄存器数量。
      **仅对 `data_type: custom` 和 `data_type: string` 有效**，其他数据类型会自动计算 count。"
      required: false
      type: integer
    data_type:
      description: "读取当前温度寄存器时的响应表示。"
      required: false
      default: int16
      type: list
      keys:
        custom:
          description: "用户定义格式，必须配置`structure:`和`count:`。"
        float16:
          description: "16 位有符号浮点数（1 个寄存器保存 1 个值）。"
        float32:
          description: "32 位有符号浮点数（2 个寄存器保存 1 个值）。"
        float64:
          description: "64 位有符号浮点数（4 个寄存器保存 1 个值）。"
        int:
          description: "**DEPRECATED** 会默默地转换为 `int16`"
        int16:
          description: "16 位有符号整数（1 个寄存器保存 1 个值）。"
        int32:
          description: "32 位有符号整数（2 个寄存器保存 1 个值）。"
        int64:
          description: "64 位有符号整数（4 个寄存器保存 1 个值）。"
        string:
          description: "必须配置 8 位字符集，`count:`。"
        uint:
          description: "**DEPRECATED** 会默默地转换为 `uint16`"
        uint16:
          description: "16 位无符号整数（1 个寄存器保存 1 个值）。"
        uint32:
          description: "32 位无符号整数（2 个寄存器保存 1 个值）。"
        uint64:
          description: "64 位无符号整数（4 个寄存器保存 1 个值）。"
    input_type:
      description: 当前温度的 Modbus 寄存器类型。
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "持有登记册。"
        input:
          description: "输入寄存器。"
    scale:
      description: "用于目标温度和当前温度的缩放系数（`output` = `scale` * `value` + `offset`）。不能与 `current_temp_scale` 或 `target_temp_scale` 同时使用。"
      required: false
      type: float
      default: 1
    offset:
      description: "目标温度和当前温度的最终偏移量（`output` = `scale` * `value` + `offset`）。不能与 `current_temp_offset` 或 `target_temp_offset` 同时使用。"
      required: false
      type: float
      default: 0
    current_temp_scale:
      description: "当前温度的比例因子（输出 = `current_temp_scale` * `value` + `current_temp_offset`）。不能与 `scale` 一起使用"
      required: false
      type: float
      default: 1.0
    current_temp_offset:
      description: "当前温度偏移量（`output` = `current_temp_scale` * `value` + `current_temp_offset`）。不能与 `offset` 同时使用。"
      required: false
      type: float
      default: 0.0
    target_temp_scale:
      description: "目标温度缩放系数（`output` = `target_temp_scale` * `value` + `target_temp_offset`）。不能与 `scale` 同时使用。"
      required: false
      type: float
      default: 1.0
    target_temp_offset:
      description: "目标温度偏移量（`output` = `target_temp_scale` * `value` + `target_temp_offset`）。不能与 `offset` 同时使用。"
      required: false
      type: float
      default: 0.0
    target_temp_register:
      description: "目标温度（设定点）的寄存器地址。使用列表，可以为每种可用的 HVAC 模式定义一个寄存器。该列表必须具有与 7 种可用的 HVAC 模式相对应的 7 个寄存器的固定大小，如下所示：寄存器 **1：HVAC 自动模式**；寄存器 **2：HVAC 制冷模式**；寄存器 **3：HVAC 干燥模式**；寄存器 **4：HVAC 仅风扇模式**；寄存器 **5：HVAC 加热模式**；寄存器 **6： HVAC 加热冷却模式**；寄存器 **7：HVAC 关闭模式** 可以为设备没有相关寄存器的模式设置重复的值。
      required: true
      type: [integer, list]
    target_temp_write_registers:
      description: "如果 `true` 使用 `write_registers` 作为目标温度 (`target_temp_register`)，否则使用 `write_register`。"
      required: false
      type: boolean
      default: false
    structure:
      description: "如果指定了 `data_type: custom` ，则需要使用双引号引起来的 Python 结构，
      用于格式化解包值的字符串。详情请参阅 Python 文档。
      例如：`>i`。"
      required: false
      type: string
      default: ">f"
    swap:
      description: "交换字节/字的顺序，**设置目标温度时对 `custom` 和 `datatype: string`** 无效"
      required: false
      default: none
      type: list
      keys:
        byte:
          description: "交换字节 AB -> BA。"
        word:
          description: "交换字 ABCD -> CDAB，**对于数据类型无效：`int16`、`uint16`**"
        word_byte:
          description: "交换字 ABCD -> DCBA，**对于数据类型无效：`int16`、`uint16`**"
    hvac_action_register:
      description: "HVAC 操作寄存器的配置"
      required: false
      type: map
      keys:
        address:
          description: "HVAC 操作寄存器的地址。"
          required: true
          type: integer
        input_type:
          description: "寄存器类型，`holding` 或 `input`"
          required: false
          default: holding
          type: string
        values:
          description: "寄存器值和 HVAC 操作之间的映射"
          required: true
          type: map
          keys:
            action_off:
              description: "与 HVAC 关闭操作相对应的值。"
              required: false
              type: [integer, list]
            action_cooling:
              description: "与 HVAC 冷却操作相对应的值。"
              required: false
              type: [integer, list]
            action_defrosting:
              description: "与 HVAC 除霜操作相对应的值。"
              required: false
              type: [integer, list]
            action_drying:
              description: "与 HVAC 干燥操作相对应的值。"
              required: false
              type: [integer, list]
            action_fan:
              description: "与 HVAC 风扇动作相对应的值。"
              required: false
              type: [integer, list]
            action_heating:
              description: "与 HVAC 加热操作相对应的值。"
              required: false
              type: [integer, list]
            action_idle:
              description: "对应于 HVAC 空闲操作的值。"
              required: false
              type: [integer, list]
            action_preheating:
              description: "与 HVAC 预热操作相对应的值。"
              required: false
              type: [integer, list]
    hvac_mode_register:
      description: "HVAC 模式寄存器的配置"
      required: false
      type: map
      keys:
        address:
          description: "HVAC 模式寄存器的地址。"
          required: true
          type: integer
        write_registers:
          description: "设置 HVAC 模式的请求类型，如果为 true，则使用 `write_registers`，否则使用 `write_register`。
            如果为某个模式指定了多个值，则仅使用第一个值写入寄存器。"
          required: false
          type: boolean
          default: false
        values:
          description: "寄存器值和 HVAC 模式之间的映射"
          required: true
          type: map
          keys:
            state_off:
              description: "对应于 HVAC 关闭模式的值。
                如果开/关状态由不同地址和/或寄存器处理，则应在配置中省略 `state_off` 状态。"
              required: false
              type: [integer, list]
            state_heat:
              description: "与 HVAC 加热模式相对应的值。"
              required: false
              type: [integer, list]
            state_cool:
              description: "对应于 HVAC 制冷模式的值。"
              required: false
              type: [integer, list]
            state_auto:
              description: "对应于 HVAC 自动模式的值。"
              required: false
              type: [integer, list]
            state_dry:
              description: "对应于 HVAC 干燥模式的值。"
              required: false
              type: [integer, list]
            state_fan_only:
              description: "对应于仅 HVAC 风扇模式的值。"
              required: false
              type: [integer, list]
            state_heat_cool:
              description: "与 HVAC 加热/冷却模式相对应的值。"
              required: false
              type: [integer, list]
    fan_mode_register:
      description: "风扇模式寄存器的配置"
      required: false
      type: map
      keys:
        address:
          description: "风扇模式寄存器的地址。（调用 write_register 的 int，调用 write_registers 的 1 个 int 列表）"
          required: true
          type: [integer, list]
        values:
          description: "寄存器值和风扇模式之间的映射
            通常用于控制以下之一：速度、方向或开/关状态。"
          required: true
          type: map
          keys:
            state_fan_on:
              description: "与风扇开启模式相对应的值。"
              required: false
              type: integer
            state_fan_off:
              description: "与风扇关闭模式相对应的值。"
              required: false
              type: integer
            state_fan_low:
              description: "与风扇低模式对应的值。"
              required: false
              type: integer
            state_fan_medium:
              description: "与风扇中等模式相对应的值。"
              required: false
              type: integer
            state_fan_high:
              description: "与高风扇模式相对应的值。"
              required: false
              type: integer
            state_fan_auto:
              description: "与风扇自动模式对应的值。"
              required: false
              type: integer
            state_fan_top:
              description: "与 Fan Top 模式相对应的值。"
              required: false
              type: integer
            state_fan_middle:
              description: "与 Fan Middle 模式对应的值。"
              required: false
              type: integer
            state_fan_focus:
              description: "与风扇聚焦模式对应的值。"
              required: false
              type: integer
            state_fan_diffuse:
              description: "与扇形漫反射模式相对应的值。"
              required: false
              type: integer
    hvac_onoff_coil:
      description: "开/关状态的地址。
        仅当开/关状态不是通过 HVAC 模式处理时，才使用此设置。
        当从该线圈读取到 0 时，HVAC 状态设为 Off；否则由 `hvac_mode_register` 决定 HVAC 状态。
        如果未定义此线圈，默认状态为 Auto。
        当 HVAC 模式设为 Off 时，向线圈写入值 0；否则写入值 1。
        **不能与 `hvac_onoff_register` 同时使用。**"
      required: false
      type: integer
    hvac_onoff_register:
      description: "开/关状态的地址。
        当从该寄存器读取到 `hvac_off_value` 定义的值时，HVAC 状态设为 Off。
        否则，HVAC 状态由 `hvac_mode_register` 决定。
        如果未定义此寄存器，默认状态为 Auto。
        当 HVAC 模式设为 Off 时，向该寄存器写入 `hvac_off_value`；否则写入 `hvac_on_value`。
        **不能与 `hvac_onoff_coil` 同时使用。**"
      required: false
      type: integer
    hvac_on_value:
      description: "将写入 `hvac_onoff_register` 以打开 HVAC 系统的值。
        如果未指定，默认值为 1。"
      required: false
      type: integer
    hvac_off_value:
      description: "将写入 `hvac_onoff_register` 以关闭 HVAC 系统的值。
        如果未指定，默认值为 0。"
      required: false
      type: integer
    swing_mode_register:
      description: "摆动模式寄存器的配置"
      required: false
      type: map
      keys:
        address:
          description: "摆动模式寄存器的地址。（调用 write_register 的 int，调用 write_registers 的 1 个 int 列表）。 - 通过保持寄存器完成读取"
          required: true
          type: [integer, list]
        values:
          description: "寄存器值和摆动模式之间的映射"
          required: true
          type: map
          keys:
            swing_mode_state_on:
              description: "与开启摆动模式相对应的值。"
              required: false
              type: integer
            swing_mode_state_off:
              description: "与摆动模式关闭相对应的值。"
              required: false
              type: integer
            swing_mode_state_horizontal:
              description: "与水平摆动模式相对应的值。"
              required: false
              type: integer
            swing_mode_state_vertical:
              description: "对应于垂直摆动模式的值。"
              required: false
              type: integer
            swing_mode_state_both:
              description: "与 Swing 模式对应的值两者。"
              required: false
              type: integer
    hvac_onoff_register:
      description: "开/关状态的地址。
        仅当开/关状态不是通过 HVAC 模式处理时，才使用此设置。
        当从该寄存器读取到 0 时，HVAC 状态设为 Off；否则由 `hvac_mode_register` 决定 HVAC 状态。
        如果未定义此寄存器，默认状态为 Auto。
        当 HVAC 模式设为 Off 时，向该寄存器写入值 0；否则写入值 1。"
      required: false
      type: integer
    write_registers:
      description: "如果`true`使用`write_registers`来控制开/关状态（`hvac_onoff_register`），否则使用`write_register`。
      请注意，目前尚不支持通过线圈控制开/关状态。"
      required: false
      type: boolean
      default: false
```

### 示例：气候配置

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    climates:
      - name: "Watlow F4T"
        address: 0x6BC2
        input_type: holding
        count: 1
        data_type: custom
        max_temp: 35
        min_temp: 15
        offset: 0
        precision: 1
        scale: 0.1
        max_temp: 30
        structure: ">f"
        target_temp_register: 2782
        target_temp_write_registers: true
        temp_step: 1
        temperature_unit: C
```

## 配置遮盖实体

`modbus` 遮盖平台允许您控制遮盖设备（例如百叶窗、卷帘或车库门）。

目前，该平台支持打开和关闭操作。您可以使用线圈或保持寄存器来控制遮盖设备。

使用 `input_type: coil` 的遮盖实体无法判断打开、关闭等中间状态。线圈仅存储两种状态："0" 表示关闭，"1" 表示打开。若要检测中间状态，可选用 `status_register` 属性。这样您可以将命令（如打开遮盖）写入线圈，并通过寄存器读取当前状态。此外，还可以为 `state_open`、`state_opening`、`state_closed` 和 `state_closing` 指定值，这些值会与从 `status_register` 读取的值进行匹配。

如果您的遮盖设备使用 `input_type: holding`（默认）发送命令，它还可以读取中间状态。要调整哪个值代表什么状态，您可以微调可选状态属性，例如 `state_open`。这些可选状态值还用于指定写入寄存器的值。如果指定可选的 `status_register` 属性，则将从 `status_register` 而不是用于发送命令的寄存器读取状态。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
covers:
  description: "为此连接配置的所有遮盖实体的列表。"
  required: true
  type: map
  keys:
    device_class:
      description: "用于在前端设置图标的遮盖设备[类型/类](/home-assistant/integrations/cover/#device-class)。"
      required: false
      type: device_class
      default: None
    input_type:
      description: "遮盖寄存器类型。"
      default: holding
      required: false
      type: list
      keys:
        holding:
          description: "持有登记册。"
        input:
          description: "输入寄存器。"
    state_open:
      description: "`status_register` 或 `register` 中的值代表遮盖已打开。
        如果你的配置使用 `register` 属性，则会将此值写入保持寄存器以打开遮盖设备。"
      required: false
      default: 1
      type: integer
    state_closed:
      description: "`status_register` 或 `register` 中的值代表遮盖已关闭。
        如果你的配置使用 `register` 属性，则会将此值写入保持寄存器以关闭遮盖设备。"
      required: false
      default: 0
      type: integer
    state_opening:
      description: "`status_register` 或 `register` 中的值代表遮盖正在打开。
        请注意，你连接的 Modbus 遮盖设备也需要支持此状态。
        如果设备不报告该状态，则无法检测到此状态。"
      required: false
      default: 2
      type: integer
    state_closing:
      description: "`status_register` 或 `register` 中的值代表遮盖正在关闭。
        请注意，你连接的 Modbus 遮盖设备也需要支持此状态。
        如果设备不报告该状态，则无法检测到此状态。"
      required: false
      default: 3
      type: integer
    status_register:
      description: "寄存器地址，将从中读取所有遮盖状态。
        如果你指定了 `register` 属性但未指定 `status_register` 属性，
        则主寄存器也会用作状态寄存器。"
      required: false
      type: integer
    status_register_type:
      description: 遮盖状态寄存器类型（保持、输入），默认保持。
      required: false
      type: list
      keys:
        holding:
          description: "持有登记册。"
        input:
          description: "输入寄存器。"
```

### 示例：Modbus 遮盖

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        device_class: door
        input_type: coil
        address: 117
        state_open: 1
        state_opening: 2
        state_closed: 0
        state_closing: 3
        status_register: 119
        status_register_type: holding
      - name: "Door2"
        address: 118
```


### 示例：由线圈控制的 Modbus 遮盖

此示例展示了使用线圈控制的 Modbus 遮盖配置。不支持打开/关闭等中间状态。每 10 秒从 Modbus 轮询一次遮盖状态。

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        coil: 1
        device_class: door
        scan_interval: 10
      - name: Door2
        slave: 2
        coil: 2
        device_class: door
        scan_interval: 10
```

### 示例：由线圈控制且从寄存器读取状态的 Modbus 遮盖

此示例展示了使用线圈控制的 Modbus 遮盖配置。实际遮盖状态从 `status_register` 读取。我们还指定了寄存器值，用于匹配正在打开、已打开、正在关闭、已关闭状态。每 10 秒从 Modbus 轮询一次遮盖状态。

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        coil: 1
        status_register: 1
        status_register_type: input
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

### 示例：由保持寄存器控制的 Modbus 遮盖

此示例展示了使用保持寄存器控制的 Modbus 遮盖配置，并可从同一寄存器读取当前状态。我们还指定了寄存器值，用于匹配正在打开、已打开、正在关闭、已关闭状态。每 10 秒从 Modbus 轮询一次遮盖状态。

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

### 示例：由保持寄存器控制且从状态寄存器读取状态的 Modbus 遮盖

此示例展示了使用保持寄存器控制的 Modbus 遮盖配置，但状态从 `status_register` 读取。在本例中，我们仅指定了 `state_open` 和 `state_closed` 的值，其余部分使用默认值。每 10 秒从 Modbus 轮询一次遮盖状态。

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        status_register: 2
        register_type: holding
        state_open: 1
        state_closed: 0
```

## 配置风扇实体

`modbus` 风扇平台允许您控制 [Modbus](http://www.modbus.org/) 线圈或寄存器。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
fans:
  description: "此 modbus 实例中所有风扇实体的列表。"
  required: true
  type: map
  keys:
    command_on:
      description: "写下打开风扇的值。"
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "写入值以关闭风扇。"
      required: false
      default: 0x00
      type: integer
    write_type:
      description: 写请求的类型。
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register 被调用。"
        holdings:
          description: "write_registers 被调用。"
        coil:
          description: "write_coil 被调用。"
        coils:
          description: "write_coils 被调用。"
    verify:
      description: "从 Modbus 设备读取以验证风扇。
        如果使用该项但不带属性，则使用开关寄存器的配置。
        如果省略该项，则不执行验证，但每次切换时都会设置风扇状态。"
      required: false
      type: map
      keys:
        address:
          description: "读取地址。"
          required: false
          default: 写地址
          type: integer
        delay:
          description: "写入和验证之间的延迟。"
          required: false
          default: 0
          type: integer
        input_type:
          description: 地址类型。
          required: false
          default: 与 `write_type` 相同
          type: list
          keys:
            coil:
              description: "线圈（1位继电器）。"
            discrete:
              description: "离散输入（1 位继电器）。"
            holding:
              description: "持有登记册。"
            input:
              description: "输入寄存器。"
        state_on:
          description: "风扇打开时的价值。"
          required: false
          default: 与 `command_on` 相同
          type: integer
        state_off:
          description: "风扇关闭时的价值。"
          required: false
          default: 与 `command_off` 相同
          type: integer
```

### 示例：风扇配置

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    fans:
      - name: "Fan1"
        address: 13
        write_type: coil
      - name: "Fan2"
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: "Register1"
        address: 11
        command_on: 1
        command_off: 0
        verify:
            input_type: holding
            address: 127
            state_on: 25
            state_off: 1
```

## 配置灯光实体

`modbus` 轻型平台允许您控制 [Modbus](http://www.modbus.org/) 线圈或寄存器。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
lights:
  description: "此 modbus 实例中所有灯光实体的列表。"
  required: true
  type: map
  keys:
    command_on:
      description: "写值来开灯。"
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "写值来关灯。"
      required: false
      default: 0x00
      type: integer
    brightness_address: 
      description: "读取/写入颜色亮度的地址。"
      required: false
      default: None
      type: integer
    color_temp_address:
      description: "读取/写入色温的地址。"
      required: false
      default: None
      type: integer
    min_temp:
      description: "开尔文色温的最低水平。"
      required: false
      default: 2000
      type: integer
    max_temp:
      description: "开尔文色温的最高水平。"
      required: false
      default: 7000
      type: integer
    write_type:
      description: "写入请求的类型。"
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register 被调用。"
        holdings:
          description: "write_registers 被调用。"
        coil:
          description: "write_coil 被调用。"
        coils:
          description: "write_coils 被调用。"
    verify:
      description: "从 Modbus 设备读取以验证灯光。
        如果使用该项但不带属性，则使用开关寄存器的配置。
        如果省略该项，则不执行验证，但每次切换时都会设置灯光状态。"
      required: false
      type: map
      keys:
        address:
          description: "读取地址。"
          required: false
          default: "与 `address` 相同"
          type: integer
        delay:
          description: 写入和验证之间的延迟。
          required: false
          default: 0
          type: integer
        input_type:
          description: 地址类型（保持/线圈/离散/输入）。
          required: false
          default: "与 `write_type` 相同"
          type: list
          keys:
            coil:
              description: "线圈（1位继电器）。"
            discrete:
              description: "离散输入输出（1 位继电器）。"
            holding:
              description: "持有登记册。"
            input:
              description: "输入寄存器。"
        state_on:
          description: "灯亮时的价值。"
          required: false
          default: "与 `command_on` 相同"
          type: integer
        state_off:
          description: "灯灭时的价值。"
          required: false
          default: "与 `command_off` 相同"
          type: integer
```

### 示例：灯光配置

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    lights:
      - name: "light1"
        address: 13
        write_type: coil
      - name: "light2"
        slave: 2
        address: 14
        write_type: coil
        brightness_address: 1006
        verify:
      - name: "light3"
        slave: 2
        address: 14
        write_type: coil
        brightness_address: 1006
        color_temp_address: 2006
      - name: "light4"
        slave: 2
        address: 14
        write_type: coil
        brightness_address: 1006
        color_temp_address: 2006
        min_temp: 2500
        max_temp: 5500
        verify:
      - name: "Register1"
        address: 11
        command_on: 1
        command_off: 0
        verify:
            input_type: holding
            address: 127
            state_on: 25
            state_off: 1
```

## 配置传感器实体

`modbus` 传感器允许您从 [Modbus](http://www.modbus.org/) 寄存器收集数据。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
sensors:
  description: "此 modbus 实例中所有传感器的列表。"
  required: true
  type: map
  keys:
    count:
      description: "要读取的寄存器数量。
      **仅对 `data_type: custom` 和 `data_type: string` 有效**，其他数据类型会自动计算 count。"
      required: false
      type: integer
    data_type:
      description: "回应代表。"
      required: false
      default: int16
      type: list
      keys:
        custom:
          description: "用户定义格式，必须配置`structure:`和`count:`。"
        float16:
          description: "16 位有符号浮点数（1 个寄存器保存 1 个值）。"
        float32:
          description: "32 位有符号浮点数（2 个寄存器保存 1 个值）。"
        float64:
          description: "64 位有符号浮点数（4 个寄存器保存 1 个值）。"
        int:
          description: "**DEPRECATED** 会默默地转换为 `int16`"
        int16:
          description: "16 位有符号整数（1 个寄存器保存 1 个值）。"
        int32:
          description: "32 位有符号整数（2 个寄存器保存 1 个值）。"
        int64:
          description: "64 位有符号整数（4 个寄存器保存 1 个值）。"
        string:
          description: "必须配置 8 位字符集，`count:`。"
        uint:
          description: "**DEPRECATED** 会默默地转换为 `uint16`"
        uint16:
          description: "16 位无符号整数（1 个寄存器保存 1 个值）。"
        uint32:
          description: "32 位无符号整数（2 个寄存器保存 1 个值）。"
        uint64:
          description: "64 位无符号整数（4 个寄存器保存 1 个值）。"
    device_class:
      description: "用于在前端设置图标的传感器的[类型/类](/home-assistant/integrations/sensor/#device-class)。"
      required: false
      type: device_class
      default: None
    input_type:
      description: "传感器的 Modbus 寄存器类型。"
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "持有登记册。"
        input:
          description: "输入寄存器。"
    min_value:
      description: "传感器的最小允许值。如果值 < min_value --> min_value。可以是浮点数或整数"
      required: false
      type: float
    max_value:
      description: "传感器的最大允许值。如果值 > max_value --> max_value。可以是浮点数或整数"
      required: false
      type: float
    nan_value:
      description: 如果 Modbus 传感器定义了 NaN 值，则可以将该值设置为以 `0x` 开头的包含一个或多个字节（例如 `0xFFFF` 或 `0x80000000`）的十六进制字符串，或者直接提供为整数。如果触发，传感器将变为 `unknown`。请注意，`nan_value` 的十六进制到整数转换当前不遵循使用 `data_type`、`structure` 或 `swap` 参数的 home-assistants Modbus 编码。
      required: false
      type: string
    zero_suppress:
      description: 抑制接近于零的值。如果 -zero_suppress <= value <= +zero_suppress --> 0。可以是浮点数或整数
      required: false
      type: float
    offset:
      description: "最终偏移量（输出 = 比例 * 值 + 偏移量）。"
      required: false
      type: float
      default: 0
    precision:
      description: "有效小数位数。"
      required: false
      type: integer
      default: 0
    scale:
      description: "比例因子（输出 = 比例 * 值 + 偏移量）。"
      required: false
      type: float
      default: 1
    slave_count:
      description: "与 `virtual_count` 相同。"
      required: false
      type: integer
    virtual_count:
      description: "生成 x+1 传感器（主传感器 + 从传感器），允许使用单个读取消息读取多个寄存器。"
      required: false
      type: integer
    state_class:
      description: "传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。"
      required: false
      type: string
    structure:
      description: "如果指定了 `data_type: custom` ，则需要使用双引号引起来的 Python 结构，
      用于格式化解包值的字符串。详情请参阅 Python 文档。
      例如：`>i`。"
      required: false
      type: string
      default: ">f"
    swap:
      description: "交换字节/字的顺序，**对 `custom` 和 `datatype: string`** 无效"
      required: false
      default: none
      type: list
      keys:
        byte:
          description: "交换字节 AB -> BA。"
        word:
          description: "交换字 ABCD -> CDAB，**对于数据类型无效：`int16`、`uint16`**"
        word_byte:
          description: "交换字 ABCD -> DCBA，**对于数据类型无效：`int16`、`uint16`**"
    unit_of_measurement:
      description: "附加价值的单位。"
      required: false
      type: string
    unique_id:
      description: 唯一标识实体的 ID。如果两个传感器具有相同的唯一 ID，Home Assistant 将引发异常。
      required: false
      type: string
```

:::note
如果将比例或偏移指定为浮点值，则将使用双精度浮点运算来计算最终值。这可能会导致大于 2^53 的值的精度损失。

:::
### 示例：传感器配置

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    sensors:
      - name: Sensor1
        unit_of_measurement: °C
        slave: 1
        address: 100
      - name: Sensor2
        unit_of_measurement: mg
        address: 110
        count: 2
      - name: Sensor3
        unit_of_measurement: °C
        slave: 1
        address: 120
        input_type: input
        data_type: float
        scale: 0.01
        offset: -273.16
        precision: 2
```


### 示例：传感器完整配置

具有默认扫描间隔的温度传感器示例：

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    sensors:
      - name: Room_1
        slave: 10
        address: 0x9A
        input_type: holding
        unit_of_measurement: °C
        state_class: measurement
        count: 1
        scale: 0.1
        offset: 0
        precision: 1
        data_type: integer
```

## 配置开关实体

`modbus` 开关平台允许您控制 [Modbus](http://www.modbus.org/) 线圈或寄存器。

冲突参数请参考[参数用法](#parameters-usage-matrix)。

```yaml
switches:
  description: "此 modbus 实例中所有开关实体的列表。"
  required: true
  type: map
  keys:
    command_on:
      description: "写入值以打开开关。"
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "写入值以关闭开关。"
      required: false
      default: 0x00
      type: integer
    write_type:
      description: 写请求的类型。
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register 被调用。"
        holdings:
          description: "write_registers 被调用。"
        coil:
          description: "write_coil 被调用。"
        coils:
          description: "write_coils 被调用。"
    verify:
      description: "从 Modbus 设备读取以验证开关。
        如果使用该项但不带属性，则使用开关寄存器的配置。
        如果省略该项，则不执行验证，但每次切换时都会设置开关状态。"
      required: false
      type: map
      keys:
        address:
          description: "读取地址。"
          required: false
          default: "与 `write address` 相同"
          type: integer
        delay:
          description: "写入和验证之间的延迟。"
          required: false
          default: 0
          type: integer
        input_type:
          description: 地址类型。
          required: false
          default: 与 `write_type` 相同
          type: list
          keys:
            coil:
              description: "线圈（1位继电器）。"
            discrete:
              description: "离散输入（1 位继电器）。"
            holding:
              description: "持有登记册。"
            input:
              description: "输入寄存器。"
        state_on:
          description: "开关打开时的值。该值必须是 `integer` 或整数列表。"
          required: false
          default: "与 `command_on` 相同"
          type: [integer, list]
        state_off:
          description: "开关关闭时的值。该值必须是 `integer` 或整数列表。"
          required: false
          default: "与 `command_off` 相同"
          type: [integer, list]
```

### 示例：开关配置

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    switches:
      - name: Switch1
        address: 13
        write_type: coil
      - name: Switch2
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: Register1
        address: 11
        command_on: 1
        command_off: 0
        verify:
            input_type: holding
            address: 127
            state_on: 25
            state_off: 1
```


### 示例：开关完整配置

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    switches:
      - name: Switch1
        address: 13
        write_type: coil
      - name: Switch2
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: Register1
        address: 11
        command_on: 1
        command_off: 0
        verify:
            input_type: holding
            address: 127
            state_on: 25
            state_off: 1
```

## 参数使用矩阵

某些参数排除其他参数，下表显示了可以组合的参数：

| 数据类型：       | custom | string | *16 | *32 | *64 |
| --------------- | ------ | ------ | --- | --- | --- |
| count           | 是    | 是    | 否  | 否  | 否  |
| structure       | 是    | 否    | 否  | 否  | 否  |
| slave_count     | 否    | 否    | 是  | 是  | 是  |
| virtual_count   | 否    | 否    | 是  | 是  | 是  |
| swap: byte      | 否    | 否    | 是  | 是  | 是  |
| swap: word      | 否    | 否    | 否  | 是  | 是  |
| swap: word_byte | 否    | 否    | 否  | 是  | 是  |


## 动作

除了特定于平台的操作之外，modbus 集成还提供两种通用写入操作。

| 动作                 | 描述                 |
| --------------------- | --------------------------- |
| modbus.write_register | 写入一个或多个寄存器 |
| modbus.write_coil     | 写入一个或多个线圈         |

描述：

| 属性 | 描述                                                                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hub`       | 集线器名称（省略时默认为 `modbus_hub`）                                                                                                                                                                                                                                            |
| `slave`     | 从机地址（0-255，省略时默认为 1）                                                                                                                                                                                                                                           |
| `address`   | 寄存器地址（例如 138）                                                                                                                                                                                                                                                          |
| `value`     | （`write_register`）单个值或 16 位值数组。单值将调用 modbus 功能码 0x06，数组将调用 modbus 功能码 0x10。值可能需要反向排序。例如，要设置 0x0004，可能需要设置 `[4,0]`，这取决于 CPU 的字节顺序 |
| `state`     | （`write_coil`）单个布尔值或布尔值数组。单个布尔值将调用 modbus 功能码 0x05，数组将调用 modbus 功能码 0x0F                                                                                                                                        |

## 示例：写入一个 float32 类型寄存器

要编写 float32 数据类型寄存器，请使用网络格式，例如 `10.0` == `0x41200000` （网络顺序浮点十六进制）。

```yaml
action: modbus.write_register
data:
  address: <target register address>
  slave: <target slave address>
  hub: <hub name>
  value: [0x4120, 0x0000]
```

## 操作 `modbus.set-temperature`

| 动作          | 描述                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 设置温度 | 设定温度。需要传入`value`，这是所需的目标温度。 `value` 应与 `data_type` 属于同一类型 |

## 动作 `modbus.set_hvac_mode`

| 动作         | 描述                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 设置暖通空调模式 | 设置 HVAC 模式。需要传入 `value` ，这是所需的模式。 `value` 应是有效的 HVAC 模式。所需状态与要写入 HVAC 模式寄存器的值之间必须存在映射。如果定义了开/关寄存器，则执行此操作还将设置开/关寄存器为适当的值。 |


## 提交问题

打开问题时，请添加您当前的配置（或缩小版本），至少包含：

 - Modbus 配置线
 - 实体（传感器等）线

为了让开发者更好地定位问题，请添加
以下行到"`configuration.yaml`"：

```yaml
logger:
  default: warning
  logs:
    homeassistant.components.modbus: debug
    pymodbus: debug
```

并重新启动 Home Assistant，重现问题，并将日志包含在问题中。

## 基于 Modbus 开发

唯一推荐的方法是继承所需的实体。
