---
title: Numato USB GPIO Expander
description: "有关如何将 Numato GPIO 扩展器集成到 Home Assistant 的说明。"

ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_release: '0.110'
ha_iot_class: Local Push
ha_domain: numato
ha_codeowners:
  - '@clssn'
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: legacy
---

The **Numato USB GPIO Expander** integration is the base for all related GPIO platforms of the
[Numato 32 Port USB GPIO expander](https://numato.com/product/32-channel-usb-gpio-module-with-analog-inputs):

- [二进制传感器](#binary-sensor)
- [传感器](#传感器)
- [开关](#开关)

所有 Numato 设备的整体配置都位于常规设置中
这种整合。以下简约示例配置了几个
binary_sensor，ID 为 0 的单个设备的开关和传感器端口。

```yaml
numato:
  devices:
    - id: 0
      binary_sensors:
        ports:
          2: Window Livingroom Open
          3: Window Livingroom Glassbreak
          4: Doorbell
      sensors:
        ports:
          1:
            name: Soil Moisture Ficus
      switches:
        ports:
          5: Relay Light Outdoor
          6: Relay Circulation Pump
          7: Door Opener
```

```yaml
discover:
  description: List of OS device files (/dev/...) to try during discovery
  required: false
  default: List of /dev/ttyACM0 .. /dev/ttyACM9
  type: list
devices:
  description: List of Numato 32 Port USB GPIO devices.
  required: true
  type: list
  keys:
    id:
      description: ID configured in the device (not the Linux device since this can change).
      required: true
      type: integer
    binary_sensors:
      description: Configuration of ports for the `binary_sensor` platform
      type: map
      keys:
        invert_logic:
          description: Whether to invert the logic, so a high voltage level is interpreted as false.
          required: false
          default: false
          type: boolean
        ports:
          description: Map of port numbers to names.
          required: true
          type: map
          keys:
            "port: name":
              description: The port numbers and corresponding names.
              required: true
              type: string
    sensors:
      description: Configuration of ports for the `sensor` platform
      type: map
      keys:
        ports:
          description: Map of port numbers to ADC configurations.
          required: true
          type: map
          keys:
            "port: adc_config":
              description: The port number and corresponding ADC configuration.
              required: true
              type: map
              keys:
                name:
                  description: Name of the ADC sensor port.
                  required: true
                  type: string
                source_range:
                  description: Range within the ADC's resolution to map values from.
                  required: false
                  default: [0, 1024]
                  type: list
                destination_range:
                  description: Range to map values from the source range to in a linear fashion.
                  required: false
                  default: [0.0, 100.0]
                  type: list
                unit:
                  description: Unit of the destination values.
                  required: false
                  type: string
                  default: \%
    switches:
      description: Configuration of ports for the `sensor` platform
      type: map
      keys:
        invert_logic:
          description: Whether to invert the logic, so a value of true leads to a low voltage level at the output.
          required: false
          default: false
          type: boolean
        ports:
          description: Map of port numbers to names.
          required: true
          type: map
          keys:
            "port: name":
              description: The port numbers and corresponding names.
              required: true
              type: string
```

## Binary sensor

`numato` 二进制传感器平台允许您操作您的 GPIO
[Numato](https://numato.com) 二进制输入模式下的 32 端口 USB GPIO 扩展器。

:::caution
As the Numato devices do not have internal pull-up or pull-down circuitry,
be careful not to destroy a port by creating a short circuit. Refer to the
[Numato documentation](https://numato.com/docs/32-channel-usb-gpio-module-with-analog-inputs/#gpio-with-switches-8)
on how to connect a switch to an input port, for example.

:::
## Sensor

“numato”传感器平台允许您操作 USB GPIO 的一些 GPIO
扩展器处于模拟输入模式。

Numato 设备具有许多内置模数转换器 (ADC)
将VCC和GND之间的电压电平转换为10位整数值。阅读
[IO 端口](#io-ports) 部分了解要使用的端口的限制。

默认情况下，ADC 的整个 10 位范围将映射到介于
0.0 和 1.0。使用可选的“source_range”从特定范围映射并
`destination_range` 指定代表实体的值范围
状态。

## Switch

“numato”开关平台允许您操作您的 GPIO
[Numato](https://numato.com) 输出模式下的 32 端口 USB GPIO 扩展器。

## IO ports

本配置中使用的IO端口号指的是端口号
印在PCB上。请注意，传感器平台可以在端口上配置
仅限 1-7。这些是 32 端口设备上唯一配备 ADC 的端口。

有关GPIO布局的详细信息，请查看[Numato 32 GPIO
文档]（https://numato.com/docs/32-channel-usb-gpio-module-with-analog-inputs）。

## Device IDs

此集成使用内部设备 ID 来识别设备，即
_不是_ Linux 设备路径。 Linux 设备路径（例如，`/dev/ttyACM0`）可以
例如，当您断开并重新连接设备时，或者如果您
将设备连接到不同的 USB 端口。

内部设备ID默认为0。如果您只有一台设备，您应该
不需要关心改变它。如果您有多个设备，则它们的 ID 为
Home Assistant 启动期间显示在控制台日志中。

### Configure the Device ID

按照以下步骤配置您的 Numato 设备的 ID。虽然你可以使用
任何连接到您的设备并与之通信的终端仿真器，
以下步骤基于使用_GNU Screen_。在 Debian 或基于 Ubuntu 的操作系统上
像`sudo apt install screen`一样安装_Screen_。

1. 仅插入要为其分配 id 的一个设备，以便它将获得 /dev/ttyACM0
2. 等待几秒钟，因为您的 Linux 操作系统可能正在尝试识别
   插入后立即将设备用作调制解调器
3. 运行 `screen /dev/ttyACM0`
4.输入“id get”查看当前ID
5. 输入“id set 00000005”并按 Enter 键分配 ID 5
6. 输入“id get”进行验证并期待“00000005”作为回复
7. 使用以下命令退出屏幕：Ctrl-a + \ 并使用 `y` 确认

请注意，在与设备通信期间，ID 值严格为 32
位十六进制数字（8 个十六进制数字），带有前导“0”填充。

提示：最好将带有 ID 的粘性标签贴在 PCB 上
为了避免设备及其端口配置的混淆，因为这
很容易毁掉你的设备。

:::warning
Numato devices used by Home Assistant are expected to be exclusive to Home
Assistant and remain permanently connected.

:::
