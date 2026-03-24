---
title: Deutscher Wetterdienst (DWD) Weather Warnings
description: 关于如何将德国气象局天气预警集成到 Home Assistant 的说明。
ha_category:
  - Weather
ha_config_flow: true
ha_release: 0.51
ha_iot_class: Cloud Polling
ha_domain: dwd_weather_warnings
ha_codeowners:
  - '@runningman84'
  - '@stephan192'
ha_platforms:
  - sensor
ha_integration_type: service
---

**Deutscher Wetterdienst Weather Warnings** 集成使用 [Deutscher Wetterdienst (DWD)](https://www.dwd.de) 作为当前和提前天气预警的数据来源。配置后的传感器每 15 分钟检查一次数据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Warncell ID or name:
  description: 区域标识符。可以是 warncell ID（整数）或 warncell 名称。强烈建议使用 warncell ID，因为 warncell 名称有时并不唯一。有效的 warncell ID 和名称列表可在[这里](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/cap_warncellids_csv.html)找到。部分 warncell 已过时但仍列在清单中。如果设置失败，请在列表中查找发音相近的 warncell。如果 warncell 名称不唯一，返回的 `region_name` 中会附加 `" (not unique used ID)!"`。
Device tracker entity:
  description: 用于识别 warncell 的 `device_tracker` 实体。该实体 *必须* 包含 `latitude` 和 `longitude` 属性。此字段与 `Warncell ID or name` 二选一填写即可，不能同时填写。
```

### 属性

| 属性 | 说明 |
| ------------ | -------------------------------------- |
| `last_update` | *(time)* 上次从 DWD 获取更新的时间和日期（UTC）。 |
| `region_name` | *(str)* 请求的区域名称。如果配置中提供了名称，这里应与该区域名称一致。 |
| `region_id` | *(int)* DWD 分配的区域 ID。如果配置中提供了 ID，这里应与该区域 ID 一致。 |
| `warning_count` | *(int)* 已发布的预警数量。可能同时存在多个预警。 |
| `warning_<x>` | *(list)* 完整的预警对象，以下属性会作为其嵌套属性提供。 |
| `warning_<x>_level` | *(int)* 发布的预警级别（0 - 4）。<br/>0：无预警 <br/>1：天气预警 <br/>2：显著天气预警<br/>3：恶劣天气预警<br/>4：极端恶劣天气预警 |
| `warning_<x>_type` | *(int)* 发布的预警类型。更多信息可在[这里](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/warning_codes_pdf.pdf?__blob=publicationFile&v=5)查看。 |
| `warning_<x>_name` | *(str)* 与预警类型对应的预警名称，以简短字符串表示。 |
| `warning_<x>_headline` | *(str)* 天气预警的官方标题。 |
| `warning_<x>_start` | *(time)* 预警开始时间和日期（UTC）。 |
| `warning_<x>_end` | *(time)* 预警结束时间和日期（UTC）。 |
| `warning_<x>_description` | *(str)* 预警详情。 |
| `warning_<x>_instruction` | *(str)* DWD 有时会提供关于该预警应采取防范措施的有用信息。 |
| `warning_<x>_parameters` | *(list)* 附加预警参数列表。更多信息可在[这里](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/warning_codes_pdf.pdf?__blob=publicationFile&v=5)查看。 |
| `warning_<x>_color` | *(str)* DWD 预警颜色，编码格式为 `#rrggbb`。 |

:::note
属性名中的 `x` 是从 `1` 开始的预警计数器。

:::
### 自动化示例

以下示例会将 DWD 预警级别高于 2 的预警标题及其描述播报到您的本地媒体播放器。


```yaml
alias: "DWD 3 级预警"
description: "DWD 3 级预警播报"
triggers:
  - entity_id: sensor.<your_city>_current_warning_level
    above: 2
    trigger: numeric_state
conditions:
  - condition: state
    entity_id: sensor.<your_city>_current_warning_level
    state: "3"
  - condition: time
    after: "06:20:00"
  - condition: time
    before: "22:00:00"
actions:
  - data:
      volume_level: 0.14
    target:
      device_id: <your_device_id>
    action: media_player.volume_set
  - target:
      entity_id: media_player.<your_mediaplayer>
    data:
      message: >
        警告！当前有 {{
        state_attr('sensor.<your_city>_current_warning_level',
        'warning_count') }} 条来自 DWD 的天气预警。 {%
        for i in range(0,
        (state_attr('sensor.<your_city>_current_warning_level',
        'warning_count')|int) + 1 | int ) %}
          {% set headline = state_attr('sensor.<your_city>_current_warning_level', 'warning_' ~ i ~ '_headline') %}
          {% set description = state_attr('sensor.<your_city>_current_warning_level', 'warning_' ~ i ~ '_description') %}
          {% set instruction = state_attr('sensor.stadt_osnabruck_current_warning_level', 'warning_' ~ i ~ '_instruction') %}
          {% if headline and description %} 
            第 {{ i }} 条预警：
          {% if headline %} {{ headline }} {% endif %}
          {% if description %} {{ description }} {% endif %}
          {% if instruction %} {{ instruction }} {% endif %}
          {% endif %}
        {% endfor %}
    action: tts.google_translate_say
    enabled: true
mode: single
```


请将 `<your_city>`、`<your_device_id>` 和 `<your_mediaplayer>` 替换为您自己的实体名称。
