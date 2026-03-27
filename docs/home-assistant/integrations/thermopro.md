---
title: ThermoPro
description: '将 ThermoPro(https://buythermopro.com/) 设备集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@h3ss'
ha_domain: thermopro
ha_config_flow: true
ha_platforms:
  - button
  - sensor
ha_integration_type: device
---
# ThermoPro

将 [ThermoPro](https://buythermopro.com/) 设备集成到 Home Assistant 中。

## 支持的设备

- [TP357 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp357-bluetooth-hygrometer-thermometer)
- [TP358 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp358-bluetooth-indoor-thermometer-hygrometer)
- [TP359 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp359-bluetooth-indoor-hygrometer-thermometer)
- [TP393 Bluetooth Indoor Thermometer Hygrometer](https://device.report/manual/3622300)
- [TP960 TempSpike Bluetooth Meat Thermometer](https://buythermopro.com/products/tp960-tempspike-bluetooth-meat-thermometer)
- [TP962 Twin TempSpike Bluetooth Meat Thermometer](https://buythermopro.com/products/tp962-twin-tempspike-bluetooth-meat-thermometer)
- [TP970 TempSpike Plus Bluetooth Meat Thermometer](https://buythermopro.com/products/tp970-tempspike-plus-bluetooth-meat-thermometer)

启用且可正常工作的 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，ThermoPro 集成会自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 按钮

这些操作允许您通过 Home Assistant 为受支持的设备（TP358、TP393）设置时间。

### 按钮 `Set Date&Time`

将目标设备上的日期和时间设置为系统时间，使用 24 小时制。
设备本身支持显示 12 小时制（AM/PM），但当前尚未实现对此格式的设置。

例如，下面的自动化会每天为温度计设置日期和时间。


```yaml
mode: single
triggers:
  - trigger: time
    at: "03:03:03"
conditions: []
actions:
  - action: button.press
    target:
      entity_id: button.tp_358_xxxx_your_device_set_date_time
    data: {}
```


