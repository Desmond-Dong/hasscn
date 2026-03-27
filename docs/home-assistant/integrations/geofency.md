---
title: Geofency
description: '此集成用于接入 Geofency(https://www.geofency.com/)。Geofency 是一款付费 iOS 应用，允许用户配置在进入或离开地理围栏或 iBeacon 区域时发送请求。您可以将其配置为与 Home Assistant 配合使用，以更新您的位置。'
ha_category:
  - Presence detection
ha_release: 0.53
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: geofency
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Geofency

此集成用于接入 [Geofency](https://www.geofency.com/)。Geofency 是一款付费 iOS 应用，允许用户配置在进入或离开地理围栏或 iBeacon 区域时发送请求。您可以将其配置为与 Home Assistant 配合使用，以更新您的位置。

## 配置

要配置 Geofency，您必须先在配置页面的集成面板中完成设置。然后，您需要在 iOS 应用中（通过 Webhook 功能）进行配置，使其向集成在设置期间提供的 webhook URL 发送 POST 请求到您的 Home Assistant 实例。请使用默认的 POST 格式。对于移动信标，请确保启用“Update Geo-Position”功能。

Geofency 会自动生成用于地理围栏的设备追踪器名称，首次请求后，您可以在集成部分找到它。对于信标，设备名称将为 `beacon_<Geofency 中的名称>`，例如 `device_tracker.beacon_car`。

使用移动信标（可选）时，仍需要在 `configuration.yaml` 文件中添加配置项，因为这部分无法通过集成面板添加。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
mobile_beacons:
  description: 要被视为*移动*信标的名称列表。名称必须与您在 Geofency 中配置的名称一致。默认情况下，信标会被视为*固定*信标。
  required: false
  type: list
```

下面是使用移动信标时 `geofency` 集成的示例配置：

```yaml
# Example configuration.yaml entry
geofency:
  mobile_beacons:
    - car
    - keys
```

### 区域

当您进入地理围栏或固定信标时，您在 Home Assistant 中的位置名称将被设置为 Geofency 中的地理围栏或信标位置名称。当您离开地理围栏或固定信标时，您在 Home Assistant 中的位置名称将被设置为 `not home`。对于移动信标，当信标在 [zone](/home-assistant/integrations/zone/) 之外进入或离开时，位置名称将为 `not_home`；否则将设置为该区域的名称。

为了让 Geofency 与 [proximity](/home-assistant/integrations/proximity/) 集成更好地协同工作，您应在 Webhook 配置页面启用“Send Current Location”功能。这样可以确保离开事件中包含的是*当前位置*的 GPS 坐标，而不是离开区域（中心点）的坐标。
