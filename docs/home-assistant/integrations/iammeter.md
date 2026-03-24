---
title: IamMeter
description: 关于如何在 Home Assistant 中集成 IAMMETER 传感器的说明。
ha_category:
  - Energy
  - Sensor
ha_release: 0.107
ha_iot_class: Local Polling
ha_domain: iammeter
ha_codeowners:
  - '@lewei50'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[IAMMETER](https://www.iammeter.com/) 提供双向单相电表（[WEM3080](https://www.iammeter.com/products/single-phase-meter)）和双向三相电力监测器（[WEM3080T](https://www.iammeter.com/products/three-phase-meter)）。这两种设备都可以集成到 Home Assistant。
[WEM3050T](https://www.iammeter.com/products/3phase-meter-3050t) 是 IAMMETER 于 2023 年 11 月发布的最新三相/分相电表。
除云服务外，WEM3050T 几乎提供了 WEM3080T 的所有功能。
WEM3050T 可通过 WEM3080T 支持的[所有方法](https://community.home-assistant.io/t/485520)集成到 Home Assistant。
由于默认不提供云服务，WEM3050T 的价格远低于 WEM3080T。

## 配置

要在您的安装中使用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: iammeter
    host: IP_ADDRESS_OF_HOST
```

```yaml
host:
  description: IAMMETER 的 IP 地址。
  required: true
  type: string
port:
  description: IAMMETER 的端口。
  required: false
  default: 80
  type: integer
name:
  description: 传感器实体的名称。
  required: false
  type: string
  default: IamMeter
```

## 传感器

此库中可用的传感器：

### 单相电表（WEM3080/WEM3162）

| name                 | Unit | Description                  |
| -------------------- | ---- | :--------------------------- |
| wem3080_voltage      | V    | Voltage.                     |
| wem3080_current      | A    | current.                     |
| wem3080_power        | W    | active power.                |
| wem3080_importenergy | kWh  | Energy consumption from grid |
| wem3080_exportgrid   | kWh  | Energy export to grid        |

### 三相电表（WEM3080T）

| name                    | Unit | Description           |
| ----------------------- | ---- | :-------------------- |
| wem3080t_voltage_a      | V    | A phase voltage       |
| wem3080t_current_a      | A    | A phase current       |
| wem3080t_power_a        | W    | A phase active power  |
| wem3080t_importenergy_a | kWh  | A phase import energy |
| wem3080t_exportgrid_a   | kWh  | A phase export energy |
| wem3080t_frequency_a    | Hz   | A phase frequency     |
| wem3080t_pf_a           |      | A phase power factor  |
|                         |      |                       |
| wem3080t_voltage_b      | V    | B phase voltage       |
| wem3080t_current_b      | A    | B phase current       |
| wem3080t_power_b        | W    | B phase active power  |
| wem3080t_importenergy_b | kWh  | B phase import energy |
| wem3080t_exportgrid_b   | kWh  | B phase export energy |
| wem3080t_frequency_b    | Hz   | B phase frequency     |
| wem3080t_pf_b           |      | B phase power factor  |
|                         |      |                       |
| wem3080t_voltage_c      | V    | C phase voltage       |
| wem3080t_current_c      | A    | C phase current       |
| wem3080t_power_c        | W    | C phase active power  |
| wem3080t_importenergy_c | kWh  | C phase import energy |
| wem3080t_exportgrid_c   | kWh  | C phase export energy |
| wem3080t_frequency_c    | Hz   | C phase frequency     |
| wem3080t_pf_c           |      | C phase power factor  |
