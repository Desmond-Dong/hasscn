# RFLink

**RFLink** 集成支持使用 [RFLink gateway firmware](https://www.rflink.nl/download.php) 的设备，例如 [Nodo RFLink Gateway](https://www.nodo-shop.nl/21-rflink-)。RFLink Gateway 是运行在 Arduino Mega 上的固件，可借助低成本硬件（Arduino + transceiver）与大量 RF 无线设备进行双向通信。

此集成已在以下硬件/软件组合上完成测试：

* Nodo RFLink Gateway V1.4/RFLink R46

### 设备支持

433 MHz 频段被许多厂商使用。它们大多采用各自的协议/标准，通过这一频段与灯光开关、窗帘、气象站、报警器以及各种传感器通信。

RFLink Gateway 支持多种 RF 频段，并可配合多种低成本硬件使用。[其官网](https://www.rflink.nl) 提供了 433MHz、868MHz 和 2.4 GHz 所用发射器、接收器与 transceiver 模块的详细信息。

:::note
R44 之后的版本新增了对 IKEA Ansluta、Philips Living Colors Gen1 和 MySensors 设备的支持。

:::
RFLink 支持的完整设备列表可在[这里](https://www.rflink.nl/devlist.php)查看。

尽管 RFLink 支持很多设备，但并非所有设备都已在此集成中测试或实现。如果你的设备被 RFLink 支持、但当前集成尚未支持，欢迎自行测试并补充支持。

## 配置

要在你的安装中启用 RFLink，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
```

```yaml
port:
  description: The path to RFLink USB/serial device or TCP port in TCP mode.
  required: true
  type: string
host:
  description: Switches to TCP mode, connects to host instead of to USB/serial.
  required: false
  type: string
wait_for_ack:
  description: Wait for RFLink to acknowledge commands sent before sending new command (slower but more reliable).
  required: false
  default: true
  type: boolean
ignore_devices:
  description: List of device IDs to ignore. Supports wildcards (`*`, `?`).
  required: false
  type: [list, string]
reconnect_interval:
  description: Time in seconds between reconnect attempts.
  required: false
  default: 10
  type: integer
tcp_keepalive_idle_timer:
  description: Time in seconds to wait since last data packet was seen before a TCP KEEPALIVE is sent. Value of 0 will disable this feature.
  required: false
  default: 3600
  type: integer
```

### 完整示例

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
```

### TCP 模式

TCP 模式允许你通过 TCP/IP 网络连接 RFLink 设备。如果把 RFLink 设备放在 HA 服务器旁边并不理想或不方便（例如接收效果不好），这种方式会很有用。

下面的命令可用于在另一台主机（Linux）上通过 TCP 暴露 USB/serial 接口。各参数以空格分隔，关于参数的更多说明可参考 [Debian manpages](https://manpages.debian.org/stretch/socat/socat.1.en.html)。

* `/dev/ttyACM0,b57600,rawer` 指定设备路径、`b57600` 速率为 57600 波特，并通过 `rawer` 让 socat 忽略端口上的控制序列（例如以“最原始”的方式透传数据，而不是处理像 control-C 这类会让 socat 退出的控制字符）。
* `TCP-LISTEN:1234,reuseaddr,range=192.168.0.0/16` 表示在指定端口（这里是 1234，可按需修改）上监听 IPV4。`reuseaddr` 的细节[相对复杂](https://stackoverflow.com/a/3233022/1049701)，但它能让客户端（Home Assistant）在连接中断后更快重连。另一个重要的安全选项是 `range=192.168.0.0/16`，它限制 socat 只接受特定 IP 范围的连接；`/16` 子网掩码表示范围是 192.168.0.0 到 192.168.255.255。请按你的局域网环境调整。

```bash
socat /dev/ttyACM0,b57600,rawer TCP-LISTEN:1234,reuseaddr,range=192.168.0.0/16
```

也可以使用其他方式将串口接口通过 TCP 暴露出来（例如 ESP8266 或 Arduino Wifi shield）。核心原则是将串口数据流直接映射到 TCP 数据流。

已测试可用的方案包括：在 NodeMCU（ESP8266 Wifi 模块）上运行 Wifi serial bridge [esp-link V2.2.3](https://github.com/jeelabs/esp-link/releases/tag/v2.2.3)，并将 ESP8266 的 TXD0（pin D10）和 RXD0（pin D9）分别连接到 Arduino MEGA 2560 的 RX（Pin 2）和 TX（Pin 3）。

:::tip
由于逻辑电平不同，3.3V 的 NodeMCU 与 5V 的 Arduino MEGA 2560 之间需要加电平转换器。串口引脚已测试可使用 BSS138 双向逻辑电平转换器；对于 CC2500 transceiver（用于 IKEA Ansluta 和 Philips Living Colors），推荐使用此[链接](https://aliexpress.com/item/32238089139.html)中的模块。

:::
:::tip
重新刷写 Arduino MEGA 时，请先断开 ESP8266，以避免编程过程出现问题。

:::

```yaml
# Example configuration.yaml entry
rflink:
  host: 192.168.0.10
  port: 1234
  tcp_keepalive_idle_timer: 600
```

### 自动添加设备

如果希望设备被自动发现，需要在配置中加入以下内容。
当你按下实体遥控器上的按键时，RFLink 会检测到该信号，设备应会被自动添加到 Home Assistant。

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    automatic_add: true
sensor:
  - platform: rflink
    automatic_add: true
```

[RFLink Switches](#switch) and [RFLink Binary Sensors](#binary-sensor) cannot be added automatically.

RFLink 集成无法区分 `binary_sensor`、`switch` 和 `light`。因此，所有可切换设备默认都会以 `light` 的形式自动添加。不过，一旦知道设备 ID，就可以在 Home Assistant 中把它手动配置为 `switch` 或 `binary_sensor`，例如用于放到其他分组或设置更友好的名称。

### 忽略设备

RFLink 平台可以在平台级别彻底忽略某个设备。当邻居也在使用 433 MHz 设备时，这会很有帮助。

For example:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
    - kaku_1_*
```

该配置会忽略 ID 为 `000001` 的 `newkaku` 设备的 `1` 号按键、所有 `digitech` 协议设备，以及 `kaku` 协议中拨码轮 ID 为 `1` 的所有开关。

### 反转 cover

可以在 `configuration.yaml` 中添加选项，让设备以反转模式工作：

```yaml
# Example configuration.yaml entry for inverted RTS cover
cover:
  - platform: rflink
    devices:
      # Rfloader created remote control which is used by Home Assistant
      RTS_0a0a0a_1:
        name: "Blind office"
        aliases: 
          - rts_0f1f2f_01 # ID of the remote control (Somfy smove in this case)
        type: inverted
```

此配置使用 `0a0a0a` 控制反向百叶窗（发送 UP 表示关闭，发送 Down 表示打开），并监听 `0f1f2f` 遥控器发出的命令。

### 设备识别错误

如果你发现设备被错误识别，例如协议识别不对、ON/OFF 对调，或者被识别成两次 ON 命令，可以借助 RFLink Rev 46（2017-03-11）引入的 `RF Signal Learning` 机制来解决。[详见这里。](https://www.rflink.nl/faq.php#RFFind)

### 技术概览

* `rflink` Python 模块是一个基于 asyncio 的 transport/protocol，会在 RFLink gateway 收到每个有效/受支持的数据包时触发回调。
* 本集成使用该回调，将“rflink packet events”分发到 [Home Assistant 的事件总线](/home-assistant/docs/configuration/events/index.md)，供各实体/平台实现订阅。
* 平台实现负责在启用时，为首次出现的入站 packet ID 创建新设备。
* 各设备实体负责匹配对应 packet ID，并根据数据包内容进行解析和执行动作；通用实体逻辑由此主组件维护。

### 调试日志

如果需要调试或排查问题上下文，可以使用以下配置片段为 RFLink 启用 debug 日志：

```yaml
# Example configuration.yaml entry
logger:
  default: error
  logs:
    rflink: debug
    homeassistant.components.rflink: debug
```

启用后，你将看到类似下面的输出：

```bash
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: 20;00;Nod
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: o RadioFrequencyLink - R
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: FLink Gateway V1.1 - R45
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: ;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got packet: 20;00;Nodo RadioFrequencyLink - RFLink Gateway V1.1 - R45;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] decoded packet: {'firmware': 'RFLink Gateway', 'revision': '45', 'node': 'gateway', 'protocol': 'unknown', 'hardware': 'Nodo RadioFrequencyLink', 'version': '1.1'}
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got event: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
17-03-07 20:12:05 DEBUG (MainThread) [homeassistant.components.rflink] event of type unknown: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
```

## Binary sensor

RFLink 集成无法区分 `binary_sensor`、`switch` 和 `light`。因此，所有可切换设备默认都会被自动添加为 `light`。

RFLink binary\_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

知道 `binary_sensor` 的 ID 之后，就可以在 Home Assistant 中将其配置为二值传感器，例如将其隐藏或设置更友好的名称。

将设备配置为 `binary_sensor`：

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0: {}
```

```yaml
devices:
  description: A list of binary sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: list
        device_class:
          description: Sets the [class of the device](/home-assistant/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
          required: false
          type: string
        off_delay:
          description: For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
          required: false
          type: integer
        force_update:
          description: Sends update events even if the value has not changed. Useful for sensors that only sends `On`.
          required: false
          type: boolean
          default: false
```

### 传感器状态

起初，二值传感器的状态是未知的。当收到传感器更新后，状态就会确定，并显示在前端中。

### Binary sensor 的设备支持

See [device support](#device-support)

### 更多配置示例

多个传感器，带自定义名称、device class 和 `off_delay`

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0:
         name: PIR Entrance
         device_class: motion
         off_delay: 5
       pt2262_00174758_0:
         name: PIR Living Room
         device_class: motion
         off_delay: 5
```

## Cover

配置好 RFLink hub 后，`cover` 设备会被自动发现并添加，但 Somfy RTS 设备除外。

### 设置 Somfy RTS 设备

你需要使用随附的 RFlinkLoader（仅支持 Windows）手动添加 Somfy RTS。

按下原装 Somfy 遥控器上的 Learn 按钮，并在 3 秒内输入以下代码。随后百叶窗会短暂上下动作一次：

```text
10;RTS;02FFFF;0412;3;PAIR;
```

百叶窗会再次上下动作，这表示 RFLink 已经与 RTS 电机配对成功。
要验证是否成功，请再次输入以下代码并查看是否有记录。

```text
10;RTSSHOW;
```

```text
RTS Record: 0 Address: FFFFFF RC: FFFF
RTS Record: 1 Address: FFFFFF RC: FFFF
RTS Record: 2 Address: FFFFFF RC: FFFF
RTS Record: 3 Address: 02FFFF RC: 0018
RTS Record: 4 Address: FFFFFF RC: FFFF
RTS Record: 5 Address: FFFFFF RC: FFFF
RTS Record: 6 Address: FFFFFF RC: FFFF
RTS Record: 7 Address: FFFFFF RC: FFFF
RTS Record: 8 Address: FFFFFF RC: FFFF
RTS Record: 9 Address: FFFFFF RC: FFFF
RTS Record: 10 Address: FFFFFF RC: FFFF
RTS Record: 11 Address: FFFFFF RC: FFFF
RTS Record: 12 Address: FFFFFF RC: FFFF
RTS Record: 13 Address: FFFFFF RC: FFFF
RTS Record: 14 Address: FFFFFF RC: FFFF
RTS Record: 15 Address: FFFFFF RC: FFFF
```

配置好 RFLink Somfy RTS 后，你还需要像配置其他 RFLink 设备一样，把该 `cover` 添加到 `configuration.yaml` 文件中。

RFLink cover IDs are composed of: protocol, id, and gateway. For example: `RTS_0100F2_0`.

知道 `cover` 的 ID 后，就可以在 Home Assistant 中配置它，例如加入其他分组或设置更友好的名称。

将设备配置为 `cover`：

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0100F2_0: {}
      bofumotor_455201_0f: {}
```

```yaml
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink cover devices.
      required: false
      default: false
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink cover devices.
      required: false
      default: 1
      type: integer
devices:
  description: A list of covers.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: False
          type: boolean
        signal_repetitions:
          description: The number of times every RFLink command should repeat.
          required: false
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        group_aliases:
          description: The `aliases` which only respond to group commands.
          required: false
          type: [list, string]
        no_group_aliases:
          description: The `aliases` which do not respond to group commands.
          required: false
          type: [list, string]
        type:
          description: The option to invert (`inverted`) on/off commands sent to the RFLink device or not (`standard`).
          required: false
          type: string
```

### 设置 KAKU ASUN-650 设备

在 RFLink 中，ON 和 DOWN 命令用于关闭 `cover`，OFF 和 UP 命令用于打开 `cover`。而 KAKU（COCO）ASUN-650 的逻辑正好相反：它使用 ON 打开、使用 OFF 关闭。

RFLink 的 `cover` 设备有一个名为 `type` 的属性，可使用两个值：

* `standard`：不反转发送给 RFLink 设备的 on/off 命令。
* `inverted`：反转发送给 RFLink 设备的 on/off 命令。

下面的配置示例展示了如何使用 `type` 属性：

```yaml
# Example configuration.yaml entry that shows how to
# use the type property.
cover:
  - platform: rflink
    devices:
      newkaku_xxxxxxxx_x:
        name: kaku_inverted_by_type
        type: inverted
      newkaku_xxxxxxxx_y:
        name: kaku_not_inverted_by_type
        type: standard
      newkaku_xxxxxxxx_z:
        name: kaku_inverted_by_default
      nonkaku_yyyyyyyy_x:
        name: non_kaku_inverted_by_type
        type: inverted
      nonkaku_yyyyyyyy_y:
        name: non_kaku_not_inverted_by_type
        type: standard
      nonkaku_yyyyyyyy_z:
        name: non_kaku_not_inverted_by_default
```

上述配置说明 `type` 属性可以省略。当 ID 以 `newkaku` 开头时，集成会自动反转 on/off 命令；当 ID 不以 `newkaku` 开头时，则不会反转。

### 设置非 RTS cover

请在 `light` 域中配置 `automatic_add`（是的，就是 `light` 域）：

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    automatic_add: true
```

当你按下遥控器按钮时，一个新的 `light` 会出现在[实体列表](https://my.home-assistant.io/redirect/entities/)中。

你也可以开启 rflink 日志，并查找对应的 `device_id`，例如：`dooya_v4_654321_0f` 或 `brelmotor_3b35c7_47`。

```yaml
# Example configuration.yaml entry
logger:
  logs:
    rflink: debug
    homeassistant.components.rflink: debug
```

知道 `device_id` 后，就可以删除 `light` 域中的配置，并把该设备改为 `cover`：

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      dooya_v4_654321_0f:
        name: "Room blinds"
```

### Cover 的设备支持

See [device support](#device-support).

## 更多配置示例

多个 `cover`，带自定义名称和 `aliases`

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0A8720_0:
        name: enanos
        aliases:
          - rts_31e53f_01
          - rts_32e53f_01
      RTS_30E542_0:
        name: comedor
        aliases:
          - rts_33e53f_01
          - rts_fa872e_01
      RTS_33E542_0:
        name: dormitorio
        aliases:
          - rts_30e53f_01
          - rts_32e53f_01
      RTS_32E542_0:
        name: habitaciones
        fire_event: true
```

## Light

配置好 RFLink hub 后，灯光设备会被自动发现并添加。

RFLink binary\_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

知道灯的 ID 后，就可以在 HA 中配置它，例如加入其他分组或设置更友好的名称。

将设备配置为 `light`：

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      NewKaku_02a48800_0: {}
      newkaku_0000c6c2_1: {}
      Ansluta_ce30_0: {}
      Maclean_0d82_01: {}
```

```yaml
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink switch devices (see below).
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink switch devices (see below).
      required: false
      default: 1
      type: integer
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of lights.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        type:
          description: "Override automatically detected type of the light device, can be: switchable, dimmable, hybrid or toggle. See [Light Types](#light-types) below."
          required: false
          default: switchable
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event when this device is turned on or off.
          required: false
          default: false
          type: boolean
        signal_repetitions:
          description: Repeat every RFLink command this number of times.
          required: false
          default: 1
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
```

### 灯光状态

起初，灯的状态是未知的。当灯通过前端或遥控器被打开/关闭后，其状态会变为已知，并显示在前端中。

有时一盏灯会被多个遥控器控制，每个遥控器都在灯中写入了自己的编码。为了在通过其他遥控器切换时也能正确跟踪状态，请把对应遥控器编码加入 `aliases`：

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

来自任一别名 ID 的 on/off 命令都会更新灯的当前状态。但通过前端发送命令时，只会使用主 ID。

### 灯光类型

灯光设备有多种形式。有些只支持开关，有些支持调光。某些可调光设备在重复接收 `on` 命令时表现并不好，可能会进入脉冲闪烁状态，直到再次按下 `on`（例如 KlikAanKlikUit）。为适配不同情况，RFLink 集成支持多种灯光类型：

* *Hybrid*：发送 `dim` 后再发送 `on`，关闭时发送 `off`。这样既能让可调光设备以指定亮度打开，也能让普通开关灯正常开启。但这种类型不适合配合 signal repetition 使用，因为多次 `on` 可能会让调光器进入“蹦迪模式”。
* *Switchable*：只发送 `on` 和 `off` 命令。既适用于普通开关灯，也适用于部分可调光设备；但可调光设备在 signal repetition 下可能仍有问题。
* *Dimmable*：只发送 `dim` 和 `off` 命令。它不适用于纯开关型设备，因为这类设备无法理解 `dim` 命令；但对调光设备来说不会引发 signal repetition 问题。
* *Toggle*：只发送 `on` 命令来切换设备状态。有些开关（例如 Livolo 灯开关）使用同一个 `on` 命令同时实现开和关：灯开着时再发一次 `on` 会关灯，灯关着时发 `on` 会开灯。如果设备状态未知，则默认视为关闭。

默认情况下，新灯会被分配为 `switchable` 类型。支持调光的协议会被分配为 `hybrid` 类型。目前只有 `newkaku` 协议会被自动识别为可调光。若要让你的调光设备获得支持，请参考设备支持部分。

### 隐藏/忽略灯光

当 RFLink gateway 在无线环境中截获命令时，灯光设备会被自动添加。为了避免前端过于杂乱，可以使用以下方法：

* 禁止自动添加尚未配置的新设备（将 `automatic_add` 设为 `false`）。
* 使用 [customizations](/home-assistant/getting-started/customizing-devices/) 隐藏不需要的设备。
* [在平台级别忽略设备](#ignoring-devices)。

### Light 的设备支持

See [device support](#device-support)

### 更多配置示例

多个灯光设备，带 `signal_repetitions` 和自定义名称

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    automatic_add: true
    devices:
      NewKaku_02a48800_0:
        name: Kitchen
        type: hybrid
      newkaku_0000c6c2_1:
        name: Living room
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
      Ansluta_ce30_0:
        name: Kitchen Under Counter Lights
      Maclean_0d82_01:
        name: Bedroom Lamp
```

## Sensor

配置好 RFLink hub 后，传感器会被自动发现并添加。

RFLink sensor IDs are composed of: protocol, ID and type (optional). For example: `alectov1_0334_temp`. Some sensors emit multiple types of data. Each will be created as its own.

知道传感器 ID 后，就可以在 Home Assistant 中配置它，例如加入其他分组或设置更友好的名称。

将设备配置为 `sensor`：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    devices:
      alectov1_0334_temp: {}
```

```yaml
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        sensor_type:
          description: Override automatically detected type of sensor. For list of [values](#sensor-types) see below.
          required: true
          type: string
        unit_of_measurement:
          description: Override automatically detected unit of sensor.
          required: false
          type: string
        aliases:
          description: "Alternative RFLink IDs this device is known by."
          required: false
          type: [list, string]
```

### 传感器类型

`sensor_type` 可用值：

* average\_windspeed
* barometric\_pressure
* battery
* co2\_air\_quality
* command
* current\_phase\_1
* current\_phase\_2
* current\_phase\_3
* distance
* doorbell\_melody
* firmware
* hardware
* humidity
* humidity\_status
* kilowatt
* light\_intensity
* meter\_value
* noise\_level
* rain\_rate
* revision
* temperature
* timestamp
* total\_rain
* uv\_intensity
* version
* voltage
* watt
* weather\_forecast
* windchill
* winddirection
* windgusts
* windspeed
* windtemp

### 隐藏/忽略传感器

当 RFLink gateway 在无线环境中截获命令时，传感器会被自动添加。为了避免前端过于杂乱，可以使用以下方法：

* 禁止自动添加尚未配置的新传感器（将 `automatic_add` 设为 `false`）。
* [在平台级别忽略设备](#ignoring-devices)。

### Sensor 的设备支持

See [device support](#device-support)

### 更多配置示例

多个传感器，禁用 `automatic_add` 并使用 `aliases`

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    automatic_add: false
    devices:
      oregontemp_0d93_temp:
        sensor_type: temperature
      oregontemp_0d93_bat:
        sensor_type: battery
      tunex_c001_temp:
        sensor_type: temperature
        aliases:
          - xiron_4001_temp
      tunex_c001_hum:
        sensor_type: humidity
        aliases:
          - xiron_4001_hum
      tunex_c001_bat:
        sensor_type: battery
        aliases:
          - xiron_4001_bat
```

## Switch

RFLink 集成无法区分 `switch`、`binary_sensor` 和 `light`。因此，所有可切换设备默认都会被自动添加为 `light`。

RFLink binary\_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

知道 `switch` 的 ID 后，就可以在 HA 中将其配置为开关设备，例如加入其他分组或设置更友好的名称。

将设备配置为 `switch`：

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1: {}
      conrad_00785c_0a: {}
```

```yaml
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink switch devices (see below).
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink switch devices (see below).
      required: false
      default: 1
      type: integer
devices:
  description: A list of switches.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: false
          type: boolean
        signal_repetitions:
          description: Set default `signal_repetitions` for RFLink switch devices (see below).
          required: false
          default: 1
          type: integer
        group:
          description: Allow switch to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
```

### 开关状态

起初，开关状态是未知的。当开关通过前端或无线遥控器被打开/关闭后，其状态会变为已知，并显示在前端中。

有时一个开关会被多个无线遥控器控制，每个遥控器都在开关中写入了自己的编码。为了在通过其他遥控器切换时也能正确跟踪状态，请把对应遥控器编码加入 `aliases`：

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

来自任一别名 ID 的 on/off 命令都会更新开关的当前状态。但通过前端发送命令时，只会使用主 ID。

### Switch 的设备支持

See [device support](#device-support)

#### 更多配置示例

多个开关，带 signal repetitions 和自定义名称

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
      conrad_00785c_0a:
        name: Motion sensor kitchen
```
