---
title: Brottsplatskartan
description: 关于如何将 brottsplatskartan.se 集成到 Home Assistant 的说明。
ha_category:
  - Sensor
  - Social
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: brottsplatskartan
ha_platforms:
  - sensor
ha_integration_type: service
---

**Brottsplatskartan** 集成允许跟踪特定区域发生的已报告事件。事件包括向 [Brottsplatskartan](https://brottsplatskartan.se) 报告的任何内容。传感器仅统计当天的事件。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 注意事项

### 区域

Brottsplatskartan 捕获一个区域内的所有事件，例如 Stockholms län。如果定义了区域参数，则忽略任何纬度和经度参数。

### 纬度和经度

使用纬度和经度监控区域时，半径设置为 5 公里。无法将半径明确设置为其他值。