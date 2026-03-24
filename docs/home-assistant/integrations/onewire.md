---
title: 1-Wire
description: "有关如何将一根线 (1-wire) 传感器集成到 Home Assistant 中的说明。"

ha_category:
  - DIY
ha_release: 0.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@garbled1'
  - '@epenet'
ha_domain: onewire
ha_platforms:
  - binary_sensor
  - diagnostics
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_zeroconf: true
ha_quality_scale: silver
---

The **1-Wire** integration supports sensors that use the 1-wire bus for communication.

每个 1-wire 设备都有一个（全局）唯一 ID，用于标识总线上的设备。前两位数字标识设备系列，后 14 位数字是在制造过程中为其指定的全球唯一编号。

不同的系列具有不同的功能并且可以测量不同的数量。

每个 1-wire 组件数据表都描述了该组件提供的不同属性。 [owfs 软件](https://github.com/owfs/owfs) 添加了一些额外的工具，使 DIY 实现者更容易使用该组件。

### Supported devices:

#### Binary sensors:

| Family | Device           | Physical Quantity  |
| -------|:-----|:-----|
| 05     | [DS2405](https://datasheets.maximintegrated.com/en/ds/DS2405.pdf)  | 1 sensed <sup>[4](#note_4)</sup> |
| 12     | [DS2406](https://datasheets.maximintegrated.com/en/ds/DS2406.pdf)  | 2 sensed (sensed.A/B) <sup>[4](#note_4)</sup> |
| 29     | [DS2408](https://datasheets.maximintegrated.com/en/ds/DS2408.pdf)  | 8 sensed (sensed.0-7) <sup>[4](#note_4)</sup> |
| 3A     | [DS2413](https://datasheets.maximintegrated.com/en/ds/DS2413.pdf)  | 2 sensed (sensed.A/B) <sup>[4](#note_4)</sup> |
| EF     | [HobbyBoard](https://hobbyboards.com/)                             | Hub Branch State <sup>[3](#note_3) [4](#note_4)</sup> |

#### Select:

| Family | Device           | Physical Quantity  |
| -------|:-----|:-----|
| 28     | [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)          | Temperature resolution          |

#### Sensors:

| Family | Device           | Physical Quantity  |
| -------|:-----|:-----|
| 10     | [DS18S20](https://www.maximintegrated.com/en/products/sensors/DS18S20.html)  | Temperature                     |
| 12     | [DS2406](https://datasheets.maximintegrated.com/en/ds/DS2406.pdf)            | Temperature and pressure when using TAI-8570 <sup>[1](#note_1)</sup> |
| 1D     | [DS2423](https://datasheets.maximintegrated.com/en/ds/DS2423.pdf)            | Counter                         |
| 20     | [DS2450](https://datasheets.maximintegrated.com/en/ds/DS2450.pdf) | 4 x Voltage         |
| 22     | [DS1822](https://datasheets.maximintegrated.com/en/ds/DS1822.pdf)            |                                 |
| 26     | [DS2438](https://datasheets.maximintegrated.com/en/ds/DS2438.pdf)            | Temperature, Voltage, Current (pressure when using B1-R1-A, illuminance when using S2-R1-A, humidity when using compatible Honeywell or Humirel sensor) <sup>[2](#note_2)</sup> |
| 28     | [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)          | Temperature                     |
| 30     | [DS2760](https://pdfserv.maximintegrated.com/en/ds/DS2760.pdf)            | Temperature, Voltage, Thermocouple Type K <sup>[2](#note_2)</sup> |
| 3B     | [DS1825](https://datasheets.maximintegrated.com/en/ds/DS1825.pdf)            | Temperature                     |
| 42     | [DS28EA00](https://datasheets.maximintegrated.com/en/ds/DS28EA00.pdf)        | Temperature                     |
| 7E     | [EDS00xx](https://www.embeddeddatasystems.com/assets/images/supportFiles/manuals/EN-UserMan%20%20OW-ENV%20Sensor%20v13.pdf)        | Temperature/Humidity/Barometric pressure/Light <sup>[6](#note_6)</sup>|
| A6     | Secondary family code for [DS2438](https://datasheets.maximintegrated.com/en/ds/DS2438.pdf)            | Temperature, Voltage, Current (pressure when using B1-R1-A, illuminance when using S2-R1-A, humidity when using compatible Honeywell or Humirel sensor) <sup>[2](#note_2)</sup> |
| EF     | [HobbyBoard](https://hobbyboards.com/)                                       | Temperature, Humidity, Moisture, Wetness <sup>[3](#note_3)</sup> |  

#### Switches:

| Family | Device           | Physical Quantity  |
| -------|:-----|:-----|
| 05     | [DS2405](https://datasheets.maximintegrated.com/en/ds/DS2405.pdf)  | 1 PIO <sup>[4](#note_4)</sup> |
| 12     | [DS2406](https://datasheets.maximintegrated.com/en/ds/DS2406.pdf)  | 2 latches (latch.A/B) and 2 PIOs (PIO.A/B) <sup>[4](#note_4)</sup> |
| 29     | [DS2408](https://datasheets.maximintegrated.com/en/ds/DS2408.pdf)  | 8 latches (latch.0-7) and 8 PIOs (PIO.0/7) <sup>[4](#note_4)</sup> |
| 3A     | [DS2413](https://datasheets.maximintegrated.com/en/ds/DS2413.pdf)  | 2 PIOs (PIO.A/B) <sup>[4](#note_4)</sup> |
| EF     | [HobbyBoard](https://hobbyboards.com/)                             | Hub Branch Enable, Moisture Sensor Type <sup>[3](#note_3) [4](#note_4)</sup> |

#### Bridges:

| Family | Device           | Physical Quantity |
| -------|:-----|:-----|
| 1F     | [DS2409](https://datasheets.maximintegrated.com/en/ds/DS2409.pdf)  | None <sup>[5](#note_5)</sup>

Notes:

- <a name="note_1">TAI-8570</a> 压力传感器基于 AAG Electronica 的 1 线复合器件。它在 1 线组件之上还包含气压计、湿度计和照度传感器。此 onewire 平台可以读取并显示来自该设备的值，但传感器将默认为禁用<sup>[4](#note_4)</sup>。

- <a name="note_2">对于爱好者</a>来说，使用 DS2438 或 DS2760 系列智能电池监视器作为多用途测量节点是很常见的，只需向 DS2438 或 DS2760 添加一些标准组件，即可将温度、湿度、电流、热电偶温度和亮度置于 1 线总线上。对于不同的组件类型，owfs 中有实现的现成算法。这些是由 owfs 软件公开的，可以通过该平台读取。 B1-R1-A/压力作为大气压力传感器暴露。 S2-R1-A/照度作为照度传感器出现。有关这些属性的更详细说明，请参阅 owfs 文档 [DS2438](https://owfs.org/index_php_page_ds2438.html)、[DS2760](https://owfs.org/index_php_page_ds2760.html)。
  对于这些组件，更基本的量（温度、VAD、VDD 和 IAD）作为单独的传感器导出。请注意，某些传感器将默认处于禁用状态<sup>[4](#note_4)</sup>。

- <a name="note_3">Hobbyboards</a> 是一家销售各种 DIY 板的公司。该公司已经离开市场一段时间了，因此无法提供有关董事会的信息。该平台有其中一些的实现。

- <a name="note_4">默认情况下禁用某些传感器</a>以避免总线过载。这些可以通过打开配置中的集成页面、列出 1-Wire 集成器件并更新实体来激活。

- <a name="note_5">桥接设备没有传感器</a>。在发现过程中，会在“aux”和“main”分支中搜索其他 1-wire 设备。

- <a name="note_6">嵌入式数据系统制造的多传感器</a>。目前仅支持 EDS0066（温度/气压）和 EDS0068（温度/湿度/气压/光照）。  
## 与 1 线总线接口

1-Wire 总线可以使用 owfs 和 owserver 通过网络连接与远程 1-wire 主机连接。

## Interface adapter setup

Linux 主机上的“owserver”是 [owfs 1-Wire 文件系统](https://owfs.org/) 的一部分。使用 1 线接口适配器时，您可以访问运行“owserver”的远程或本地 Linux 主机上的传感器。默认情况下，“owserver”在端口 4304 上运行。使用“host”选项指定远程服务器的主机或 IP，并使用可选的“port”选项更改默认端口。

## Configuration

To add the **1-Wire** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=onewire)

1-Wire can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=onewire).
- From the list, select **1-Wire**.
- Follow the instructions on screen to complete the setup.

</details>

```yaml
Host:
  description: The hostname or IP address of your OWServer instance.
Port:
  description: The port of your OWServer instance.
  default: 4304
```

## Options

To define options for 1-Wire, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of 1-Wire are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Device selection:
  description: The precision of the `DS18B20` temperature sensors can be configured for individual devices. The lower the precision, the faster the sensor will respond, but with less accuracy. The selected precision is reflected in the `device_path` attribute of the sensor entities.
```

### Entities and attributes

平台启动后，将搜索 1-wire 总线以查找可用的 1-wire 设备。在 Bridge 设备上，会递归搜索“aux”和“main”分支。对于该平台处理的每个设备（请参阅上面支持的设备列表），该平台会为其测量的每个物理量添加一个传感器。传感器的名称是设备 ID，并附加其测量的物理量。不支持的传感器会在日志中注明警告消息。

`传感器.28.FF5C68521604_温度`

每个传感器将在状态变量中显示其值，并且出于演示目的，模拟值四舍五入到一位小数，计数时四舍五入为整数。

每个传感器还公开一些附加属性。

```text
device_file: /28.FF5C68521604/temperature              << Device path in owfs file system (or on Rpi system directory)
raw_value: 31.9375                                     << The raw measurement numbers as red from device. Not rounded.
unit_of_measurement: °C                              
friendly_name: 28.FF5C68521604 Temperature
```

## Removing the integration

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## Troubleshooting

### 温度报告为 85°C

“DS18B20”上的读数为 85°C 可能表示有效值，也可能表示接线问题或断电。

> 85°C 是`DS18B20`的上电复位值。当充当电源的微小内部电容器耗尽时，它可以报告这样的值。

目前无法区分有效和无效的 85°C 值。如果这些值报告不正确，第一步是检查接线（可能确保温度传感器通电，而不是使用寄生电源）。

If all else fails, then a template can be used to filter out the incorrect values:

```jinja
{% if states('sensor.28_a05966040000_temperature') | float != 85 %}
  {{ states('sensor.28_a05966040000_temperature') }}
{% else %}
  None
{% endif %}
```

