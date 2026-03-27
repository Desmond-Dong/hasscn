---
title: NAD
description: 'The NAD integration allows you to control an NAD receiver(https://nadelectronics.com/) through RS232, TCP and Telnet from Home Assistant. 本页属于 Home。'

ha_category:
  - Media player
ha_release: 0.36
ha_iot_class: Local Polling
ha_domain: nad
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# NAD

The **NAD** integration allows you to control an [NAD receiver](https://nadelectronics.com/) through RS232, TCP and Telnet from Home Assistant.

请注意，RS232 接口仅在 NAD T748v2 上进行了测试，但它应该可以与其他 NAD 接收器配合使用。
Telnet 接口已使用 NAD T787 和 NAD C658 进行了测试。

## Configuration

To add an NAD receiver to your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry for RS232 configuration
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
```

```yaml
# Example configuration.yaml entry for Telnet configuration
media_player:
  - platform: nad
    type: Telnet
    host: "IP_ADDRESS"
```

```yaml
# Example configuration.yaml entry for TCP configuration
media_player:
  - platform: nad
    type: TCP
    host: "IP_ADDRESS"
```

```yaml
type:
  description: Type of communication. Valid types are `RS232`, `Telnet` or `TCP`
  required: false
  default: RS232
  type: string
serial_port:
  description: The serial port. (for `RS232` type only)
  required: false
  default: /dev/ttyUSB0
  type: string
host:
  description: The IP address of your amplifier. (for `TCP` and `Telnet` types)
  required: false
  type: string
port:
  description: The port number of the device. (for `Telnet` type only)
  required: false
  default: 53
  type: integer
name:
  description: Name of the device.
  required: false
  default: NAD Receiver
  type: string
min_volume:
  description: Minimum volume in dB to use with the slider.
  required: false
  default: -92
  type: integer
max_volume:
  description: Maximum volume in dB to use with the slider.
  required: false
  default: -20
  type: integer
sources:
  description: A list of mappings from source to source name. Valid sources are `1 to 12`. (for `RS232` and `Telnet` types)
  required: false
  type: [list, string]
volume_step:
  description: The amount in dB you want to increase the volume with when pressing volume up/down. (for `TCP` type only)
  required: false
  default: 4
  type: integer
```

“min_volume”和“max_volume”选项可以防止您误点击滑块，这样当您从 -92dB 到 +20dB 时，您就不会炸毁扬声器。您仍然可以强制使用高于或低于使用加号和减号按钮设置的值的音量。

:::important
On Linux the user running Home Assistant needs `dialout` permissions to access the serial port.
This can be added to the user by doing `sudo usermod -a -G dialout <username>`.
Be aware that the user might need to logout and logon again to activate these permissions.

:::
完整配置的示例：

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
    name: "NAD Receiver"
    min_volume: -60
    max_volume: -20
    sources:
      1: "Kodi"
      2: "TV"
```
