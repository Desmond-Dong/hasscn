---
title: ADS
description: 'ADS（Automation Device Specification，自动化设备规范）集成描述了一个与设备无关、与现场总线无关的接口，用于在运行 TwinCAT(https://www.beckhoff.com/en-en/products/automation/twincat/) 的。'
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Light
  - Sensor
  - Switch
  - Valve
ha_release: '0.60'
ha_iot_class: Local Push
ha_domain: ads
ha_platforms:
  - binary_sensor
  - cover
  - light
  - select
  - sensor
  - switch
  - valve
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@mrpasztoradam'
ha_quality_scale: legacy
---
# ADS

**ADS**（Automation Device Specification，自动化设备规范）集成描述了一个与设备无关、与现场总线无关的接口，用于在运行 [TwinCAT](https://www.beckhoff.com/en-en/products/automation/twincat/) 的 [Beckhoff](https://www.beckhoff.com/) 自动化设备与其他实现该接口的设备之间通信。

目前 Home Assistant 支持以下设备类型：

- [二值传感器](#binary-sensor)
- [灯光](#light)
- [传感器](#sensor)
- [开关](#switch)
- [遮盖](#cover)
- [选择器](#select)
- [阀门](#valve)

<!-- omit in toc -->
## 配置

要启用 ADS，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
ads:
  device: "127.0.0.1.1.1"
  port: 801
```

```yaml
device:
  description: 标识设备的 AMS NetId。
  required: true
  type: string
port:
  description: 设备上运行 AMS 服务器的端口，通常为 801 或 851。
  required: true
  type: integer
ip_address:
  description: ADS 设备的 IP 地址，如果未设置，将使用设备 ID 的前 4 个字节。
  required: false
  type: string
```

<!-- omit in toc -->
## 动作

ADS 集成会注册 `write_by_name` 动作，让您可以向 ADS 设备上的变量写入值。

```json
{
    "adsvar": ".myvariable",
    "adstype": "int",
    "value": 123
}
```

动作参数：

- **adsvar**：ADS 设备上的变量名称。要在 *TwinCAT2* 中访问全局变量，请使用前导点 `.myvariable`；在 TwinCAT3 中请使用 `GBL.myvariable`。
- **adstype**：指定变量的类型。使用以下之一：`int`、`byte`、`uint`、`bool`
- **value**：将写入变量的值。

## 二值传感器

`ads` 二值传感器平台可用于监控 ADS 设备上的布尔值。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: ads
    adsvar: .boolean1
```

```yaml
adsvar:
  description: 您要在 ADS 设备上访问的变量名称。
  required: true
  type: string
name:
  description: 前端中灯光的标识符。
  required: false
  type: string
device_class:
  description: 设置[设备类别](/home-assistant/integrations/binary_sensor/)，更改前端显示的设备状态和图标。
  required: false
  type: string
```

## 灯光

`ads` 灯光平台允许您控制连接的 ADS 灯光。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: ads
    adsvar: GVL.enable_light
    adsvar_brightness: GVL.brightness
    adsvar_color_temp_kelvin: GVL.color_temp_kelvin
    min_color_temp_kelvin: 2700
    max_color_temp_kelvin: 6500
```

```yaml
adsvar:
  required: true
  description: 开灯的布尔变量名称
  type: string
adsvar_brightness:
  required: false
  description: 控制亮度的变量名称，在 PLC 端使用无符号整数
  type: string
adsvar_color_temp_kelvin:
  required: false
  description: 控制色温（开尔文）的变量名称，在 PLC 端使用无符号整数
  type: string
min_color_temp_kelvin:
  required: false
  description: 最小色温（开尔文）（默认为 2000）
  type: integer
max_color_temp_kelvin:
  required: false
  description: 最大色温（开尔文）（默认为 6500）
  type: integer
name:
  required: false
  description: 前端中灯光的标识符
  type: string
```

## 传感器

`ads` 传感器平台允许读取 ADS 设备上数值变量的值。变量可以是 *BOOL*、*BYTE*、*INT*、*UINT*、*SINT*、*USINT*、*DINT*、*UDINT*、*WORD*、*DWORD*、*REAL* 或 *LREAL* 类型。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: ads
    adsvar: GVL.temperature
    unit_of_measurement: "°C"
    adstype: int
```

```yaml
adsvar:
  required: true
  description: 您要访问的变量名称。
  type: string
adstype:
  required: false
  description: ADS 变量的数据类型，可能的值有 bool、byte、int、uint、sint、usint、dint、udint、word、dword、real 和 lreal。
  default: int
  type: string
name:
  required: false
  description: 传感器的标识符。
  type: string
factor:
  required: false
  description: 在 Home Assistant 中显示之前除以存储值的因子。
  default: 1
  type: integer
```

*factor* 可用于实现固定小数位。例如，如果要显示带有两位小数的固定小数值，请将 *factor* 设置为 100。变量值 `123` 将显示为 `1.23`。

## 开关

`ads` 开关平台访问连接的 ADS 设备上的布尔变量。变量通过其名称标识。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: ads
    adsvar: .global_bool
```

```yaml
adsvar:
  required: true
  description: 您要在 ADS 设备上访问的变量名称。
  type: string
name:
  required: false
  description: 前端中开关的标识符。
  type: string
```

## 遮盖

`ads` 遮盖平台允许您控制连接的 ADS 遮盖。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
cover:
  - platform: ads
    name: Curtain master bed room
    adsvar: covers.master_bed_room_is_closed
    adsvar_open: covers.master_bed_room_open
    adsvar_close: covers.master_bed_room_close
    adsvar_stop: covers.master_bed_room_stop
    device_class: curtain
```

```yaml
adsvar:
  required: true
  description: 返回遮盖当前状态的布尔变量名称（`True` = 已关闭）
  type: string
adsvar_position:
  required: false
  description: 返回当前遮盖位置的变量名称，在 PLC 端使用字节变量
  type: string
adsvar_set_position:
  required: false
  description: 设置新遮盖位置的变量名称，在 PLC 端使用字节变量
  type: string
adsvar_open:
  required: false
  description: 触发遮盖打开的布尔变量名称
  type: string
adsvar_close:
  required: false
  description: 触发遮盖关闭的布尔变量名称
  type: string
adsvar_stop:
  required: false
  description: 触发遮盖停止的布尔变量名称
  type: string
name:
  required: false
  description: 前端中遮盖的标识符
  type: string
device_class:
  required: false
  description: 设置[设备类别](/home-assistant/integrations/cover/)，更改前端显示的设备状态和图标。
  type: device_class
```

## 选择器

`ads` 选择器实体访问连接的 ADS 设备上的 ENUM（int）变量。变量通过其名称标识。您需要在 TwinCAT PLC 中设置相应的 ENUM。建议使用从 `0` 开始的显式值。

```yaml
TYPE E_SampleA :
(
    e1 := 0,
    e2 := 1,
    e3 := 2,
);
END_TYPE
```

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
select:
  - platform: ads
    adsvar: MAIN.eMyEnum
    options:
      - "Off"
      - "Setup"
      - "Automatic"
      - "Manual"
      - "Guest"
      - "Error"
```

```yaml
adsvar:
  required: true
  description: 您要在 ADS 设备上访问的变量名称。
  type: string
options:
  required: true
  description: 可供选择的选项。
  type: string
name:
  required: false
  description: 前端中选择器的标识符。
  type: string
```

## 阀门

`ads` 阀门实体访问连接的 ADS 设备上的布尔变量。变量通过其名称标识。

要使用您的 ADS 设备，首先需要设置您的 [ADS 中心](#configuration)，然后将以下内容添加到您的 "`configuration.yaml`"
文件：

```yaml
# 示例 configuration.yaml 条目
valve:
  - platform: ads
    adsvar: MAIN.bValveControl
```

```yaml
adsvar:
  required: true
  description: 您要在 ADS 设备上访问的变量名称。
  type: string
name:
  required: false
  description: 前端中阀门的标识符。
  type: string
```
