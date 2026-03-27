---
title: Yandex Transport
description: 'Yandex Transport 集成使用 Yandex Maps(https://maps.yandex.ru/)，可为您提供某个公交站、电车站等地点距离下一班车发车的时间。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.100'
ha_codeowners:
  - '@rishatik92'
  - '@devbis'
ha_domain: yandex_transport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Yandex Transport

**Yandex Transport** 集成使用 [Yandex Maps](https://maps.yandex.ru/)，可为您提供某个公交站、电车站等地点距离下一班车发车的时间。

[Yandex Maps](https://maps.yandex.ru/) 网站可以帮助您确定公交站的 ID。您可以在地图上选择一个站点，并查看 URL：

`https://yandex.ru/maps/213/moscow/?ll=37.722565%2C55.806662&masstransit%5BstopId%5D=stop__9642962&mode=masstransit&z=16.52`

其中 stop ID 为：**stop__9642962**

如果您只想跟踪特定线路，可以在 `routes` 部分中添加。

## 配置

要启用 Yandex Transport，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yandex_transport
    stop_id: YOUR_STOP_ID
```

```yaml
stop_id:
  description: 要获取信息的交通站点 ID。
  required: true
  type: string
routes:
  description: "站点中特定公交、电车等线路的列表。它与线路编号相同，例如 `83`。如果带字母的线路包含西里尔字符，请在 `configuration.yaml` 中使用西里尔字符填写。"
  required: false
  type: list
name:
  description: 此传感器的友好名称。
  required: false
  default: Yandex Transport
  type: string
```

## 完整配置示例

下面的示例展示了配置项的写法：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yandex_transport
    name: Bus_to_subway
    stop_id: stop__9639579
    routes:
      - 63
      - 179
      - 179к
      - 154
      - 591
      - 677к
```

## 实体选项

您可以使用仪表板卡片来配置下一班车的信息显示。
要在 `default_view` 中显示相对时间，请添加以下内容：

```yaml
# Example default_view entry
views:
    cards:
      - entities:
          - entity: sensor.yandex_transport
            format: relative
        type: entities
    path: default_view
```

数据由 https://maps.yandex.ru 提供
