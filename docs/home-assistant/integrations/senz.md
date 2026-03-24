---
title: nVent RAYCHEM SENZ
description: 说明如何将 SENZ 恒温器集成到 Home Assistant 中。
ha_category:
  - Climate
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2022.5
ha_config_flow: true
ha_codeowners:
  - '@milanmeu'
ha_domain: senz
ha_platforms:
  - climate
  - diagnostics
  - sensor
ha_integration_type: hub
---

**nVent RAYCHEM SENZ** 集成可让您控制并监控 nVent RAYCHEM SENZ-WIFI 恒温器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 使用场景

- 控制并监控恒温器。
- 监控当前温度。

## 移除此集成

此集成遵循标准的集成移除流程。如果您输入过自己的凭据，系统会询问您是要保留还是删除它们。如果您想稍后再删除，可在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 的三点菜单中进行操作。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
