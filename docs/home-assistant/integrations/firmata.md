---
title: Firmata
description: 'Firmata(https://github.com/firmata/protocol) 可用于将模拟和数字输入输出添加到 Home Assistant 中。这样一来，您就可以接入按钮、开关、运动探测器、继电器控制、传感器、电位器、调光器等设备。该集成目前可以通过串口或 USB 串口连接到 Firmata。'
ha_category:
  - Binary sensor
  - DIY
  - Light
  - Sensor
  - Switch
ha_release: 0.114
ha_iot_class: Local Push
ha_codeowners:
  - '@DaAwesomeP'
ha_domain: firmata
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---
# Firmata

[Firmata](https://github.com/firmata/protocol) 可用于将模拟和数字输入输出添加到 Home Assistant 中。这样一来，您就可以接入按钮、开关、运动探测器、继电器控制、传感器、电位器、调光器等设备。该集成目前可以通过串口或 USB 串口连接到 Firmata 开发板。

Firmata 是一种面向微控制器的标准协议。大多数这类开发板都支持数字和模拟输入输出。[Arduino](https://www.arduino.cc/) 以及兼容 Arduino 的微控制器开发板是最常用于 Firmata 的开发板。

目前，Home Assistant 支持以下设备类型：

- [Binary sensor](#binary_sensors)
- [Light](#lights)
- [Sensor](#sensors)
- [Switch](#switches)

## 配置

您需要先向开发板上传 [Firmata 固件](https://github.com/firmata/)。请向开发板上传任意 `StandardFirmata` 示例程序；关于如何上传示例程序，请参阅 [Arduino 文档](https://www.arduino.cc/en/Main/Howto)。Firmata 可在 Arduino IDE 的 Library Manager 中获取。您也可以使用 [Firmata Express](https://github.com/MrYsLab/FirmataExpress)。

要将 Arduino 开发板接入 Home Assistant，请将以下部分添加到 `configuration.yaml` 文件中：

:::warning
Firmata 不会在断电重启之间保存最后状态。这意味着每次通电时，引脚都会被设为 off/low，并且在每次初始化后，它们会被设置为您在 YAML 中配置的默认值。

:::
:::warning
Firmata 在初始化期间可能会让引脚在 HIGH/LOW 之间切换。如果您的引脚不能被意外切换，您可能需要修改自己的 Firmata 示例程序；如果您使用的是继电器板，也可以将某个输出引脚作为 VCC。详情请参阅该 issue：[Make initial pin value configurable](https://github.com/firmata/arduino/issues/166)。


:::
您可以配置多个 Firmata 开发板。每个开发板支持以下选项：

```yaml
serial_port:
  description: 开发板连接到 Home Assistant 主机的端口。建议使用 `by-id` 引用，而不是像 `/dev/ttyACM0` 或 `/dev/ttyUSB0` 这样的数字编号设备名，因为前者在重启后不会变化。如果您使用的是 Home Assistant Operating System，可在 [Settings > System > Hardware](https://my.home-assistant.io/redirect/hardware/) 面板的 Hardware 对话框中找到已连接串口设备列表。
  required: true
  type: string
serial_baud_rate:
  description: Arduino 示例程序使用的波特率。如果您使用 Firmata Express，则无需设置此选项。**如果您使用默认的 StandardFirmata，则应将其设为 `57600`。**
  required: false
  type: integer
arduino_instance_id:
  description: 如果您使用 Firmata Express，则此值应与您在示例程序中设置的实例编号一致。
  required: false
  type: integer
arduino_wait:
  description: 初始等待 Arduino 响应的时间，单位为秒。某些首次连接时响应较慢的开发板可能需要设置此选项。
  required: false
  type: integer
sleep_tune:
  description: 发送命令后等待 Arduino 回复的时间，单位为秒。通常很少需要调整。
  required: false
  type: float
sampling_interval:
  description: 发送给 Firmata 的采样间隔，单位为毫秒。大多数 Firmata 示例程序会忽略小于 10 毫秒的间隔。
  required: false
  type: integer
switches:
  description: 要配置的数字高低电平输出
  required: false
  type: list
  keys:
    name:
      description: 在 Home Assistant 中创建的实体名称
      required: true
      type: string
    pin:
      description: 开发板上的数字或模拟引脚编号。
      required: true
      type: [integer, string]
    pin_mode:
      description: 数字或模拟引脚的输出模式。对于开关，此项必须设为 `OUTPUT`。当前尚未实现其他输出模式。
      required: true
      type: string
    initial:
      description: 初始化后引脚的初始输出。请注意，如果启用了 `negate`，该值会被反转。
      required: false
      default: False
      type: boolean
    negate:
      description: 反转数字引脚的输出
      required: false
      default: False
      type: boolean
lights:
  description: 要配置的 PWM/模拟输出
  required: false
  type: list
  keys:
    name:
      description: 在 Home Assistant 中创建的实体名称
      required: true
      type: string
    pin:
      description: 开发板上的数字或模拟引脚编号。请注意，大多数开发板并不支持在所有数字和模拟引脚上进行模拟或 PWM 输出。
      required: true
      type: [integer, string]
    pin_mode:
      description: 数字或模拟引脚的输出模式。对于灯光，此项必须设为 `PWM`。当前尚未实现其他输出模式。
      required: true
      type: string
    initial:
      description: 初始化后引脚的初始输出。该值应为 Home Assistant 风格的 0 到 255 之间的数值；如果配置了 `minimum` 和 `maximum`，此值会按该范围进行缩放。
      required: false
      default: 0
      type: integer
    minimum:
      description: 发送的最小 PWM/模拟值（含）。这是引脚允许输出的最低值。Home Assistant 的亮度值（0 到 255）会以此值作为范围下限进行缩放。
      required: false
      default: 0
      type: integer
    maximum:
      description: 发送的最大 PWM/模拟值（含）。这是引脚允许输出的最高值。Home Assistant 的亮度值（0 到 255）会以此值作为范围上限进行缩放。
      required: false
      default: 255
      type: integer
binary_sensors:
  description: 要配置的数字或模拟高低电平输入
  required: false
  type: list
  keys:
    name:
      description: 在 Home Assistant 中创建的实体名称
      required: true
      type: string
    pin:
      description: 开发板上的数字或模拟引脚编号。对于模拟引脚，必须使用其对应的数字编号。请使用与您的开发板相对应的引脚定义。例如，在 Arduino Uno 上，A2 对应的数字引脚编号是 16。
      required: true
      type: [integer, string]
    pin_mode:
      description: 数字或模拟引脚的输入模式。支持的模式有 `INPUT` 和 `PULLUP`。请查阅开发板规格，以确认哪些引脚支持可选的内部上拉电阻。
      required: true
      type: string
    negate:
      description: 反转数字或模拟引脚的输入
      required: false
      default: False
      type: boolean
sensors:
  description: 要配置的模拟输入
  required: false
  type: list
  keys:
    name:
      description: 在 Home Assistant 中创建的实体名称
      required: true
      type: string
    pin:
      description: 开发板上的模拟引脚编号。应采用 `A0`、`A1` 等形式。
      required: true
      type: string
    pin_mode:
      description: 模拟引脚的输入模式。对于传感器，此项必须设为 `ANALOG`。当前尚未实现其他输入模式。
      required: true
      type: string
    differential:
      description: 触发更新所需的最小差值。只有当新旧数值差的绝对值大于或等于此选项时，更新才会在 Home Assistant 中注册。**默认值为 `40`，以防止未连接的引脚频繁更新并堵塞 Home Assistant 历史记录。** 如果您希望记录所有更新，请将其设为 `1`。更新的速度取决于开发板发送数据的速度，通常会非常快。可设置的最小值为 `1`。
      required: false
      default: 40
      type: integer
```

:::note
如果您对同一个引脚进行了重复配置，集成在尝试设置第二个实体时会失败，并记录错误日志。

:::
:::note
若要反转灯光输出，请将 `maximum` 设为 `0`，并将 `minimum` 设为 `255`。

:::
```yaml
# Example firmata configuration.yaml entry
firmata:
  - serial_port: /dev/serial/by-id/usb-Teensyduino_USB_Serial_358320-if00
    serial_baud_rate: 57600
    switches:
      - name: my_light
        pin_mode: OUTPUT
        pin: 4
        negate: true
      - name: my_other_output
        pin_mode: OUTPUT
        pin: 5
        initial: true
      - name: my_light2
        pin_mode: OUTPUT
        pin: A6
        initial: true
        negate: true
    lights:
      - name: my_dimmable_light
        pin_mode: PWM
        pin: 6
      - name: my_subset_light
        pin_mode: PWM
        pin: 10
        initial: 0
        minimum: 127
        maximum: 200
      - name: my_inverted_light
        pin_mode: PWM
        pin: 11
        minimum: 255
        maximum: 0
    binary_sensors:
      - name: my_motion
        pin_mode: INPUT
        pin: 2
      - name: my_door
        pin_mode: PULLUP
        pin: 3
        negate: true
      - name: my_other_door
        pin_mode: INPUT
        pin: 16   # A2
        negate: true
    sensors:
      - name: my_sensor
        pin: A0
        pin_mode: ANALOG
        differential: 40
```
