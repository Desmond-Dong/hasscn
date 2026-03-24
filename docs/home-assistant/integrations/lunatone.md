---
title: Lunatone
description: 关于如何将 Lunatone REST API 设备与 Home Assistant 集成的说明。
ha_category:
  - Hub
  - Light
ha_release: 2025.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@MoonDevLT'
ha_domain: lunatone
ha_config_flow: true
ha_platforms:
  - diagnostics
  - light
ha_integration_type: hub
ha_quality_scale: silver
---

**Lunatone** 集成用于接入提供 REST API 的 [Lunatone](https://www.lunatone.com) 设备。

## 支持的设备

当前支持以下设备：

- [DALI-2 IoT Gateway (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-iot-gateway/)
- [DALI-2 IoT4 Gateway (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-iot4-gateway/)
- [DALI-2 Display 4'' (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-display-4/)
- [DALI-2 Display 7'' (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-display-7/)

目前在 Home Assistant 中支持以下设备类型：

- 灯光

## 前提条件

在设置 Lunatone 集成之前，请确保您已准备好：

1. 已通电并连接到网络的网关设备。
2. 设备的 IP 地址或主机名。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
    description: "网关设备的 URL。例如：`http://10.0.0.131`"
```

## 删除集成

此集成遵循标准集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
