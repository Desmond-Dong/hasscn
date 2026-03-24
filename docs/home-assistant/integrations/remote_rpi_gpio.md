---
title: Raspberry Pi Remote GPIO
description: 有关如何将远程 Raspberry Pi 的 GPIO 功能集成到 Home Assistant 中的说明。
ha_category:
  - Binary sensor
  - DIY
  - Switch
ha_release: 0.94
ha_iot_class: Local Push
ha_domain: remote_rpi_gpio
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Raspberry Pi Remote GPIO** 集成是 Home Assistant 中所有相关 GPIO 平台的基础。有关各个平台的配置，请参阅对应章节。

远程 Raspberry Pi 与运行 Home Assistant 的控制计算机都必须完成配置，才能运行 `remote_rpi_gpio`。更多信息请参阅 [Configuring Remote GPIO](https://gpiozero.readthedocs.io/en/stable/remote_gpio.html)。遗憾的是，由于 [pigiod 缺少支持](https://github.com/joan2937/pigpio/issues/586)，目前该方案无法用于远程 Raspberry Pi 5 主机。

请注意，在虚拟环境中，您可能需要在启动环境时设置环境变量以指定 pin factory，例如：

`Environment = GPIOZERO_PIN_FACTORY=pigpio PIGPIO_ADDR=YOUR_RPi_IP_ADDRESS`

## 二进制传感器

`remote_rpi_gpio` 二进制传感器集成允许您读取远程 [Raspberry Pi](https://www.raspberrypi.org/) GPIO 的传感器值。

要在您的安装中使用远程 Raspberry Pi 的 GPIO，请将以下内容添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
binary_sensor:
  - platform: remote_rpi_gpio
    host: IP_ADDRESS_OF_REMOTE_PI
    ports:
      11: PIR Office
      12: PIR Bedroom
```

```yaml
host:
  description: 远程 Raspberry Pi 的 IP 地址。
  required: true
  type: string
ports:
  description: 使用的端口列表。
  required: true
  type: map
  keys:
    "port: name":
      description: 端口号（BCM 模式引脚编号）及其对应名称。
      required: true
      type: string
invert_logic:
  description: 如果为 `true`，则反转输出逻辑。
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
pull_mode:
  description: >
    要使用的内部上拉/下拉电阻类型。
    可选值为 `UP`（上拉电阻）和 `DOWN`（下拉电阻）。
    上拉默认对应 active LOW，下拉默认对应 active HIGH。可通过 invert_logic 调整。
  required: false
  type: string
  default: "`UP`"
```

有关 GPIO 布局的更多信息，请参阅 Raspberry Pi 的 Wikipedia [文章](https://en.wikipedia.org/wiki/Raspberry_Pi#J8_header_and_general_purpose_input-output_(GPIO))。

## 开关

`remote_rpi_gpio` 开关平台允许您控制[远程 Raspberry Pi](https://www.raspberrypi.org/) 的 GPIO。

要在您的安装中使用远程 Raspberry Pi 的 GPIO，请将以下内容添加到 "`configuration.yaml`" 文件中：

```yaml
# configuration.yaml 示例条目
switch:
  - platform: remote_rpi_gpio
    host: IP_ADDRESS_OF_REMOTE_PI
    ports:
      11: Fan Office
      12: Light Desk
```

```yaml
host:
  description: 远程 Raspberry Pi 的 IP 地址。
  required: true
  type: string
ports:
  description: 使用的端口数组。
  required: true
  type: list
  keys:
    port:
      description: 端口号及对应名称（GPIO 编号）。
      required: true
      type: [integer, string]
invert_logic:
  description: 如果为 true，则将输出逻辑反转为 ACTIVE LOW。
  required: false
  default: false
  type: boolean
```

有关 GPIO 布局的更多信息，请参阅 Raspberry Pi 的 Wikipedia [文章](https://en.wikipedia.org/wiki/Raspberry_Pi#J8_header_and_general_purpose_input-output_(GPIO))。

:::note
请注意，由 Home Assistant 管理的引脚应当只供 Home Assistant 独占使用。

:::
一个常见问题是：这里的 port 指什么？这个数字指的是实际的 GPIO 编号，而不是物理引脚编号。
例如，如果您的继电器连接在物理引脚 11 上，那么它的 GPIO 编号是 17。

```yaml
# configuration.yaml 示例条目
switch:
  - platform: remote_rpi_gpio
    host: 192.168.0.123
    ports:
      17: Speaker Relay
```

### 故障排除

如果您收到类似 `gpiozero.exc.BadPinFactory: Unable to load any default pin factory!` 的错误，请尝试将 `GPIOZERO_PIN_FACTORY` 环境变量从 `pigpio` 改为 `mock`，这可以解决一个[已知问题](https://forums.raspberrypi.com/viewtopic.php?p=1417922)。
