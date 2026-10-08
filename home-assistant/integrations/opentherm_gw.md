The **OpenTherm Gateway** integration is used to control the [OpenTherm Gateway](https://otgw.tclcode.com/) from Home Assistant.

此集成将为每个配置的网关添加三个设备到 Home Assistant。集成的主要控制是单个“气候”实体，可以在添加的“OpenTherm Thermostat”设备上找到该实体。所有添加的设备都有“sensor”和“binary\_sensor”实体的集合，默认情况下这些实体是禁用的。要启用它们，请按照[启用实体](/home-assistant/common-tasks/general/index.md#enabling-or-disabling-entities)上的步骤操作。

:::note
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.

:::

## Configuration

To add the **OpenTherm Gateway** device to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=opentherm_gw)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=opentherm_gw).
* From the list, select **OpenTherm Gateway**.
* Follow the instructions on screen to complete the setup.

</details>

可以使用以下配置选项：

```yaml
name:
  description: "The friendly name used for the OpenTherm Gateway and its entities. This is used to generate the display name of the created device and all related entities.<br/>Examples: `Thermostat`, `Living Room`"
path or url:
  description: "Path to the OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html). This is usually either a path to a serial device in `/dev/` if the gateway is connected via serial or USB, or a URL in the form of `socket://[IP address]:[port]` if it is connected over the network.<br/>Examples: `/dev/ttyUSB0`, `socket://192.168.0.250:25238`"
id:
  description: "The `gateway_id` for this OpenTherm Gateway. This is used to identify this specific gateway in action and to generate the entity IDs for the entities related to this gateway. The entered value will be slugified, i.e. all spaces and special characters will be converted to underscores and any accents will be removed from their characters. The default value is the slugified version of the `name` given above.<br/>Examples: `thermostat`, `living_room`"
```

:::important
Please make sure no other device or application is connected to the OpenTherm Gateway at the same time as Home Assistant. This is not a supported scenario and may lead to unexpected results.

:::
:::note
The precision and floor\_temperature settings that were supported in configuration.yaml entries have been lost upon import of the `configuration.yaml` entry into the Integrations panel. You can now configure them as per the following Options paragraph.

:::

# Options

可以通过 Web 界面中的集成设置进一步配置 OpenTherm Gateway。

The following options are available:

```yaml
Read Precision:
  description: "The desired read precision for this device. Used to display the current temperature on the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
Set Precision:
  description: "The desired set precision for this device. Used as step size for setting temperature setpoint from the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
Temporary Setpoint Override Mode:
  description: "The desired setpoint override mode. When Temporary Setpoint Override Mode is set to on, the thermostat will be able to cancel the setpoint override after a program change. When the option is set to off, the Setpoint Override Mode will be ‘Constant’ and a manual temperature adjustment on the thermostat is needed to cancel the setpoint override."
Floor Temperature:
  description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Enable this setting to override this behavior and round to the lower value according to the configured precision."
```

## Entities

### Button

该集成将以下按钮添加到您的 Home Assistant 实例：

#### 取消房间设定点覆盖

按下“OpenTherm 恒温器”设备上的此按钮可取消活动的房间设定点覆盖。请注意，它不会更改目标温度，只会将控制权返回给恒温器。

#### Restart

“OpenTherm Gateway”设备上的重新启动按钮可用于重新启动 OpenTherm Gateway。

### Select

在“OpenTherm Gateway”设备上可以找到多个“选择”配置实体。这些可用于配置 OpenTherm 网关的 LED 和 GPIO 引脚。有关可用模式的更多信息，请参阅 [LED 模式](#led-modes) 和 [GPIO 模式](#gpio-modes) 部分或 OpenTherm Gateway 的[命令文档](https://otgw.tclcode.com/firmware.html#configuration)。

## Actions

### 操作`opentherm_gw.reset_gateway`

Reset the OpenTherm Gateway.

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |

### 操作 `set_central_heating_ovrd`

在网关上设置中央供暖超控选项。
当覆盖控制设定点（通过温度值非“0”的 [set\_control\_setpoint](#action-opentherm_gwset_control_setpoint) 操作）时，网关会自动启用中央供暖覆盖以开始加热。然后，该操作可用于控制中央供暖超驰状态。
要将中央供暖控制权返回给恒温器，请使用温度值为“0”的 [set\_control\_setpoint](#action-opentherm_gwset_control_setpoint) 操作。
**只有在编写自己的软件恒温器时才需要这个。**

| Data attribute | Optional | Description                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                      |
| `ch_override`          | no       | The desired value for the central heating override. Use `0` to disable or `1` to enable. |

:::warning
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

:::

### 操作 `opentherm_gw.set_clock`

向 OpenTherm Gateway 提供时间和星期几。此处提供的值将在恒温器发出下一个日期/时间请求时转发至恒温器。 OpenTherm Gateway 无法准确记录时间，因此它只会保留此处提供的信息最多约 61 秒。

| Data attribute | Optional | Default      | Description                                                              |
| ---------------------- | -------- | ------------ | ------------------------------------------------------------------------ |
| `gateway_id`           | no       | N/A          | The `gateway_id` as specified during configuration.                      |
| `date`                 | yes      | Today's date | Date from which the day of week will be extracted. Format: `YYYY-MM-DD`. |
| `time`                 | yes      | Current time | Time in 24h format.                                                      |

### 操作 `opentherm_gw.set_control_setpoint`

:::caution
Improper use of this action may continuously keep your central heating system active, resulting in an overheated house and a significant increase in gas and/or electricity consumption.

:::
在 OpenTherm Gateway 上设置中央供暖控制设定点覆盖。
在正常情况下，恒温器将计算并控制锅炉的集中供暖设定值。将此设置为 0 以外的任何值将启用覆盖并允许 OpenTherm Gateway 控制此设置。当超控处于活动状态时，OpenTherm Gateway 还将请求您的锅炉激活中央加热回路。有关锅炉实际支持的最大和最小设定点值，请参阅“slave\_ch\_max\_setp”和“slave\_ch\_min\_setp”[传感器](#sensors)。由于长时间启用此设置可能会产生潜在后果，因此当 Home Assistant 关闭或重新启动时，覆盖将被禁用。
**只有在编写自己的软件恒温器时才需要这个。**

| Data attribute | Optional | Description                                                                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                             |
| `temperature`          | no       | The central heating setpoint. Values between `0.0` and `90.0` are accepted, but your boiler may not support the full range. Set to `0` to disable the override. |

:::warning
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

:::

### 操作 `opentherm_gw.set_hot_water_ovrd`

在 OpenTherm Gateway 上设置生活热水启用选项。
控制生活热水启用选项。如果锅炉有
已配置为让房间单元控制何时保持
少量水预热，该命令可以影响
那个。

| Data attribute | Optional | Description                                                                                                                                    |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                            |
| `dhw_override`         | no       | The domestic hot water override state. Value should be `0` or `1` to enable the override in off or on state, or `"A"` to disable the override. |

### 操作 `opentherm_gw.set_hot_water_setpoint`

在 OpenTherm Gateway 上设置生活热水设定点。并非所有锅炉都支持此功能。

| Data attribute | Optional | Description                                                                                                                                                                                                                                                       |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                                                                                                                               |
| `temperature`          | no       | The domestic hot water setpoint to set on the gateway. Values between `0` and `90` are accepted, but not all boilers support this range. Check the values of the `slave_dhw_min_setp` and `slave_dhw_max_setp` sensors to see the supported range on your boiler. |

### 操作 `opentherm_gw.set_gpio_mode`

配置 OpenTherm 网关上的 GPIO 行为。
有关可能模式的说明，请参阅 [GPIO 模式](#gpio-modes)

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |
| `id`                   | no       | The GPIO ID; `A` or `B`.                            |
| `mode`                 | no       | The GPIO mode to be set.                            |

### 操作 `opentherm_gw.set_led_mode`

配置 OpenTherm Gateway 上 LED 的功能。
有关可能模式的列表及其说明，请参阅 [LED 模式](#led-modes)

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |
| `id`                   | no       | The LED ID, accepted values are `A` through `F`.    |
| `mode`                 | no       | The LED mode to be set.                             |

### 操作 `opentherm_gw.set_max_modulation`

:::warning
Improper use of this action may impair the performance of your central heating system.

:::
设置 OpenTherm Gateway 上的最大调制级别覆盖。
在正常情况下，恒温器将控制锅炉的最大调节水平。将此设置为“-1”以外的任何值都将启用覆盖并允许 OpenTherm Gateway 控制此设置。由于启用此设置可能会产生潜在后果，因此当 Home Assistant 关闭或重新启动时，覆盖将被禁用。
**只有在编写自己的软件恒温器时才需要这个。**

| Data attribute | Optional | Description                                                                                                |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                        |
| `level`                | no       | The maximum modulation level. Accepted values are `-1` through `100`. Set to `-1` to disable the override. |

:::warning
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

:::

### 操作`opentherm_gw.set_outside_temp`

向恒温器提供外部温度。
如果您的恒温器无法显示室外温度且不支持 OTC（室外温度校正），则此操作无效。请注意，并非所有恒温器都能显示完整支持的范围。

| Data attribute | Optional | Description                                                                                                                                                                           |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                                                   |
| `temperature`          | no       | The outside temperature to provide to the thermostat. Accepted values are `-40.0` through `64.0`. Any value above `64.0` will clear a previously configured value (suggestion: `99`). |

### 操作 `opentherm_gw.set_setback_temp`

在 OpenTherm Gateway 上配置设定温度。
您在此处提供的值将用于 GPIO“home”(5) 和“away”(6) 模式。

| Data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                |
| `temperature`          | no       | The setback temperature. Accepted values are `0.0` through `30.0`. |

### 操作`opentherm_gw.send_transparent_command`

<div class='注意警告'>
此操作使用不当可能会损害中央供暖系统的性能。
</div>

向 OpenTherm 网关发送透明的[命令](https://otgw.tclcode.com/firmware.html)。

| Data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                |
| `transp_cmd`           | no       | The serial command to be sent to the OpenTherm Gateway.            |
| `transp_arg`           | no       | The serial command argument to be sent to the OpenTherm Gateway.   |

## GPIO modes

Possible modes and their meaning for the GPIO pins are listed here:
{% comment %}
Bulletpoints and numbers to match the LED mode layout below.
{% endcomment %}

* 0.输入 - 新刷新芯片上两个端口的默认设置。
* 1.接地 - 永久低输出 (0V)。可用于电源 LED。
* 2\. Vcc - 永久高输出 (5V)。可用作其他 GPIO 端口使用的某些外部电路的防短路电源。
* 3\. LED E - 如果您想呈现 4 个以上 LED 功能，则需要额外的 LED。
* 4\. LED F - 如果您想呈现 5 个以上 LED 功能，则需要一个额外的 LED。
* 5.主页 - 当拉低时将恒温器设置为设定温度。
* 6.离开 - 当拉高时将恒温器设置为设定温度。
* 7\. DS1820（仅限 GPIO 端口 B）- 用于测量外部温度的 DS18S20 或 DS18B20 温度传感器的数据线。 GPIO 端口 B 和 Vcc 之间应连接一个 4k7 电阻。

## LED modes

此处列出了可能的 LED 模式及其含义：

* R. 从恒温器或锅炉接收 OpenTherm 消息。
* X. 将 OpenTherm 消息传输到恒温器或锅炉。
* T. 在恒温器界面上发送或接收消息。
* B. 在锅炉接口上发送或接收消息。
* O. 远程设定点覆盖已激活。
* F. 火焰已打开。
* H. 中央供暖系统已开启。
* W. 热水已打开。
* C. 舒适模式（启用生活热水）已打开。
* E. 检测到传输错误。
* M. 锅炉需要维护。
* P. 恒温器界面上的提升功率模式处于活动状态。

## 禁用的配置实体

:::warning
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering using the information in this section.

:::
For advanced control of your heating system, some `switch` configuration entities can be found on the added `OpenTherm Gateway` device.
These entities are disabled by default, as they can cause your heating system to run continuously and/or increase your energy consumption significantly if used improperly. In most setups, these entities are not needed and should be left disabled.
