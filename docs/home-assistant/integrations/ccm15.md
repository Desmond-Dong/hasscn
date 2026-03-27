---
title: Midea ccm15 AC Controller
description: 'CCM15 集成允许您将 Midea CCM15(https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) 设备集成到 Home Assistant 中。'
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: ccm15
ha_platforms:
  - climate
  - diagnostics
ha_integration_type: hub
---
# Midea ccm15 AC Controller

**CCM15** 集成允许您将 [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) 设备集成到 Home Assistant 中。

目前 Home Assistant 支持以下设备类型：

- [配置](#配置)
- [气候](#气候)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 气候

每个数据控制器最多支持 64 个 `climate` 设备。