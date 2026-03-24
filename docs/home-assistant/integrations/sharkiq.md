---
title: Shark IQ
description: 将您的 Shark IQ 扫地机器人与 Home Assistant 集成。
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@JeffResc'
  - '@funkybunch'
  - '@TheOneOgre'
ha_domain: sharkiq
ha_platforms:
  - vacuum
ha_integration_type: hub
---

**Shark IQ** 集成允许您控制 [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) 扫地机器人。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

当前支持以下 [`vacuum`](/home-assistant/integrations/vacuum/) 操作：

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `set_fan_speed`

### 房间定向清扫

除了 [`vacuum`](/home-assistant/integrations/vacuum/) 操作外，此集成还支持房间定向清扫。
这样您可以选择要清扫的特定房间，而不是进行全屋清扫。

```yaml
action: sharkiq.clean_room
data:
  rooms:
    - "Entry"
    - "Living Room"
target:
  entity_id: vacuum.my_vacuum
```
**Important Note:** 房间列表必须与 Shark Clean 应用中显示的名称 _完全一致_。如果您想确认该操作可识别的准确名称，请在 Home Assistant 中查看 Shark 扫地机器人的 `Rooms` 属性。这里会填入机器人已配置的房间名称，操作也会按这些名称进行识别。

如果您想在操作的 UI 中使用区域选择器，则需要让区域名称与扫地机器人 `Rooms` 属性中的显示完全一致。您也可以使用 Home Assistant 的 [Developer tools](https://www.home-assistant.io/docs/tools/dev-tools/) 查看该属性。
<p class='img'>
<img src='/home-assistant/images/integrations/sharkiq/sharkiq-room-service-attributes.png' />
</p>

## 故障排查

### 集成频繁断开

如果该集成频繁断开，而您又使用了 [Pi-hole](https://pi-hole.net/) 或 [AdGuard](https://adguard.com) 之类的广告拦截工具，请将 `ads-field.aylanetworks.com` 添加到允许列表中。连接需要该域名，但由于其子域名中包含 `ads`，可能会被自动拦截。

如果 `pause` 对您无效，则说明您的扫地机器人不支持该操作。`stop` 可提供类似功能。
