# RSS feed template

**RSS feed template** 集成可以将 Home Assistant 中的任意信息导出为静态 RSS feed。这样就能通过 RSS 阅读器在多种类型的设备上显示这些信息。虽然 Home Assistant 的原生应用并不普遍，但几乎所有平台都有原生 RSS 阅读器可用。

例如，在 Android 上，可以使用 “Simple RSS Widget” 应用在主屏幕上显示温度信息。

```yaml
# configuration.yaml 示例条目
rss_feed_template:
  # 可通过 <Home Assistant url>/api/rss_template/garden 访问
  # 示例：https://localhost:8123/api/rss_template/garden
  garden:
    requires_api_password: false
    title: "Garden {{ as_timestamp(now())|timestamp_custom('%H:%M', True) }}"
    items:
    - title: "Outside temperature"
      description: "{% if is_state('sensor.temp_outside','unknown') %}---{% else %}{{states('sensor.temp_outside')}} °C{% endif %}"
```

```yaml
requires_api_password:
  description: 如果为 true 且设置了 API 密码，则必须通过 `?api_password=...` 参数传入密码。
  required: false
  default: true
  type: boolean
feed_id:
  description: "该键用作 feed 的 ID。可通过 /api/rss_template/feed_id 访问该 feed（例如：`garden`）。"
  required: true
  type: string
title:
  description: feed 标题，会按 [template](/home-assistant/docs/configuration/templating/) 解析。
  required: false
  type: template
items:
  description: feed 条目列表。
  required: true
  type: list
  keys:
    title:
      description: 条目标题，会按 [template](/home-assistant/docs/configuration/templating/) 解析。
      required: false
      type: template
    description:
      description: 条目描述，会按 [template](/home-assistant/docs/configuration/templating/) 解析。
      required: false
      type: template
```
