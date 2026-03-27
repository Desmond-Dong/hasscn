---
title: LaCrosse
description: 'LaCrosse 集成使用来自 Jeelink(https://www.digitalsmarties.net/products/jeelink) USB 加密狗或此 Arduino sketch(https://svn.fhem.de/trac/browser/trunk/fhem/contrib/ardu。'
ha_category:
  - DIY
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: lacrosse
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# LaCrosse

**LaCrosse** 集成使用来自 [Jeelink](https://www.digitalsmarties.net/products/jeelink) USB 加密狗或此 [Arduino sketch](https://svn.fhem.de/trac/browser/trunk/fhem/contrib/arduino/36_LaCrosse-LaCrosseITPlusReader.zip) 提供的数据。

## 已测试设备

- Technoline TX 29 IT（仅温度）
- Technoline TX 29 DTH-IT（包含湿度）
- TFA Dostmann LaCrosse 传感器（型号 30.3147.IT）

## 设置

由于传感器会在每次断电或更换电池后更改 ID，您可以使用 pylacrosse 软件包中的命令行工具 `pylacrosse` 检查当前可用的传感器 ID。

```bash
sudo pylacrosse -d /dev/ttyUSB0 scan
```

或者，在使用 Docker 容器时：

```bash
docker exec -it <containername> pylacrosse -d /dev/ttyUSB0 scan
```

如果您使用的是 Home Assistant OS，则无法使用这些方法。建议使用另一台计算机来确定 ID。

对于 TX 29 DTH-IT 传感器，您也可以直接从显示屏读取 ID，并按以下方式计算：`hex2dec(ID_on_display) / 4`。

## 配置

要在您的安装中使用兼容 `lacrosse` 的传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: lacrosse
    sensors:
      sensor_identifier:
        type: SENSOR_TYPE
        id: SENSOR_ID
```

```yaml
  device:
    description: 串口设备。
    required: true
    type: string
    default: /dev/ttyUSB0
  baud:
    description: 串口波特率。
    required: true
    type: integer
    default: 57600
  led:
    description: 启用或禁用 Jeelink LED。
    required: false
    type: boolean
    default: false
  frequency:
    description: 初始频率，以 5kHz 为步进。
    required: false
    type: integer
  datarate:
    description: "以 kbps 设置数据速率。常见设置的特殊值为：`0`：17.241 kbps，`1`：9.579 kbps，`2`：8.842 kbps。"
    required: false
    type: integer
  toggle_mask:
    description: "以下值可按位组合：`1` = 17.241 kbps，`2` = 9.579 kbps，`4` = 8.842 kbps"
    required: false
    type: integer
  toggle_interval:
    description: 启用切换模式并设置间隔秒数。
    required: false
    type: integer
  sensors:
    description: 您的传感器列表。
    required: true
    type: map
    keys:
      name:
        description: 传感器名称。
        required: false
        type: string
      type:
        description: "传感器类型。可选值：`battery`、`humidity`、`temperature`"
        required: true
        type: string
      id:
        description: 传感器的 LaCrosse ID。
        required: true
        type: integer
```

## 示例

要设置包含多个测量项的 LaCrosse 传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: lacrosse
    device: /dev/ttyUSB0
    baud: 57600
    sensors:
      kitchen_humidity:
        name: Kitchen Humidity
        type: humidity
        id: 72
      kitchen_temperature:
        name: Kitchen Temperature
        type: temperature
        id: 72
      kitchen_lacrosse_battery:
        name: Kitchen Sensor Battery
        type: battery
        id: 72
```
