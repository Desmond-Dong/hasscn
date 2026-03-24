---
title: Flexit
description: 关于如何将 Flexit 空调设备集成到 Home Assistant 的说明。
ha_category:
  - Climate
ha_release: 0.47
ha_iot_class: Local Polling
ha_domain: flexit
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

将 [Flexit](https://www.flexit.no/en/) 空调装置集成到家庭助理中。

需要 CI66 Modbus 适配器 [CI66](https://www.flexit.no/en/products/air_handling_units_700-5000_m-h/accessories_ahu/modbusadapter_ci66/modbus_adapter_ci66_k2-c2-uni/)

要启用此集成，请将以下行添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
climate:
  - platform: flexit
    slave: 21
```

```yaml
奴隶：
描述：modbus 适配器的从站 ID，使用 DIP 开关设置。
必填：真实
类型：整数
姓名：
描述：空调机组的显示名称。
必填：假
类型：字符串
中心：
描述：该从站所在集线器的名称。
必填：假
默认：默认
类型：字符串
```

:::important
此集成需要设置 [Modbus](/home-assistant/integrations/modbus/) 集成才能工作。

:::
完整配置示例，包括 modbus 设置，如下所示：

CI66 上的 DIP 开关设置：
1=开、2=开、3=关、4=开、5=关、6=开、7=开、8=开

```yaml
# Full example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 56000
  stopbits: 1
  bytesize: 8
  parity: E

climate:
  - platform: flexit
    name: Main A/C
    slave: 21
```
