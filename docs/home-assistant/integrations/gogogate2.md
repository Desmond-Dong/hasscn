---
title: Gogogate2 and ismartgate
description: 关于如何将 Gogogate2 和 iSmartGate 车库门遮盖集成到 Home Assistant 的说明。
ha_category:
  - Cover
ha_release: 0.67
ha_iot_class: Local Polling
ha_domain: gogogate2
ha_codeowners:
  - '@vangorra'
ha_config_flow: true
ha_homekit: true
ha_platforms:
  - cover
  - sensor
ha_dhcp: true
ha_integration_type: hub
---

**Gogogate2 and ismartgate** 集成可让您通过 Home Assistant 控制支持 Gogogate2 和 iSmartGate 的车库门及大门。Home Assistant 中的设备名称会根据 GogoGate2 或 iSmartGate 移动应用中定义的名称自动生成。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 支持的设备

- Gogogate 2
- ismartgate PRO
- ismartgate LITE
- ismartgate MINI
