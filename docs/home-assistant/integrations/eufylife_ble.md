---
title: EufyLife
description: 关于将您的 EufyLife 蓝牙设备与 Home Assistant 集成的说明。
ha_release: '2023.2'
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: eufylife_ble
ha_platforms:
  - sensor
ha_integration_type: device
---

**EufyLife** 集成允许您将 Eufy 智能秤与 Home Assistant 集成。

## 支持的设备

- [Smart Scale (T9140)](https://support.eufy.com/s/product/a085g000000Nm5FAAS/smart-scale(t9140))
- [Smart Scale C1 (T9146)](https://us.eufy.com/products/t9146)
- [Smart Scale P1 (T9147)](https://us.eufy.com/products/t9147)
- [Smart Scale P2 (T9148)](https://us.eufy.com/products/t9148)
- [Smart Scale P2 Pro (T9149)](https://us.eufy.com/products/t9149111)

:::note
此集成不支持 P2 和 P2 Pro 的 Wi-Fi 功能。它只能通过蓝牙连接到您的智能秤。

:::
## 功能

所有智能秤型号都提供体重传感器实体和实时体重传感器实体。实时体重实体在秤进行体重测量时实时更新。体重实体仅在秤完成体重测量时更新最终体重值。

Smart Scale P2 Pro 还提供心率传感器实体，将显示秤测量的最新心率。

一旦启用 [蓝牙](/home-assistant/integrations/bluetooth) 集成并正常运行，EufyLife 集成将自动发现设备。或者，按照以下步骤手动添加集成。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::