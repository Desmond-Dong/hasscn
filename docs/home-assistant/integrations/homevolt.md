---
title: Homevolt
description: 本地连接 Homevolt 电池以在 Home Assistant 中显示传感器。
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_domain: homevolt
ha_platforms:
  - diagnostics
  - sensor
  - switch
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
  - '@liudger'
ha_integration_type: device
ha_release: 2026.3
ha_quality_scale: silver
ha_zeroconf: true
---

**Homevolt** 集成可让 Home Assistant 通过本地网络读取 Homevolt 电池的数据，无需云端。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

必须在 Homevolt 设备上显式启用 API 访问；请联系 Tibber 客服以激活 API。
配置时需要填写设备 IP 地址，以及设备上设置的密码（如有）。

```yaml
Host:
 description: "Homevolt 设备的 IP 地址或主机名。您可以在路由器中查看，或通过设备发现功能获取。"
Password:
 description: "Homevolt 设备的密码（若设备启用了密码保护）。如果未设置密码，请留空。"
```

## Sensors

此集成会创建设备上报的传感器，包括：

- 功率（W）和电量（Wh/kWh）
- 电压（V）和电流（A）
- 温度（°C）和频率（Hz）
- 电池/百分比（%）
- 信号强度（dB）
- 文本、计数或计划类状态值

## Swtiches

此集成会创建由设备上报的开关实体，包括：

- 本地模式：启用或禁用本地控制模式

## Troubleshooting

- `Failed to connect`：确认 IP 地址正确、设备已通电，且可在网络中访问。
- `Invalid authentication`：检查设备密码是否正确；若未设置密码，请留空。

## Removing the integration

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
