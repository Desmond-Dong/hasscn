---
title: Stookwijzer
description: 有关如何在 Home Assistant 中使用 Stookwijzer 数据的说明
ha_category:
  - Environment
  - Sensor
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
ha_domain: stookwijzer
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**Stookwijzer** 集成会查询 [Atlas Leefomgeving Stookwijzer](https://www.atlasleefomgeving.nl/stookwijzer) API，以获取风速和空气质量指数。基于这些数值，Stookwijzer 会建议人们不要焚烧木托盘或木材，也不要使用烧烤设备，从而帮助减少周边居民的健康风险。

其状态可提供三种不同等级的建议：

- **Code Yellow**：请注意：燃烧木材会造成不适和空气污染。
- **Code Orange**：建议当前不要燃烧木材。
- **Code Red**：当前不要燃烧木材。

此外，还会提供多个传感器实体：

- **Windspeed**：包含所选位置当前风速的传感器。
- **Air Quality Index**：包含所选位置当前空气质量指数的传感器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作：获取预报

`stookwijzer.get_forecast` 操作会将 Stookwijzer 建议预报以映射形式写入 [response data](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)。

```yaml
action: stookwijzer.get_forecast
target:
  config_entry_id: 12345
response_variable: stookwijzer_forecast
```

响应数据中包含 `forecast` 字段。
`forecast` 是某些时间点上的建议预报条目列表：

| 响应数据 | 说明 | 示例 |
|--------------|-----------------------------------------------------------------------------|---------------------------|
| `datetime`   | 预报建议对应的时间。 | 2025-01-14T14:00:00+00:00 |
| `advice`     | 预报建议代码。 | code_yellow |
| `final`      | 指示该建议是否为最终结果，或后续仍可能变化。 | True |

<details>
<summary>操作响应示例</summary>


```yaml
forecast:
  - datetime: "2025-02-12T17:00:00+01:00"
    advice: code_yellow
    final: True
  - datetime: "2025-02-12T23:00:00+01:00"
    advice: code_yellow
    final: True
  - datetime: "2025-02-13T05:00:00+01:00"
    advice: code_orange
    final: False
  - datetime: "2025-02-13T11:00:00+01:00"
    advice: code_red
    final: False
```


</details>

## 示例

<details>
<summary>使用 get_forecast 的模板传感器示例</summary>


以下是包含 6 小时后和 12 小时后 Stookwijzer 预报的模板传感器示例。


```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
    action:
      - action: stookwijzer.get_forecast
        target:
          entity_id: sensor.stookwijzer_advice_code
        response_variable: advice_forecast
    sensor:
      - name: Stookwijzer forecast 6 hours
        unique_id: stookwijzer_forecast_6_hours
        state: "{{ advice_forecast['forecast'][0]['advice'] }}"
        attributes:
          final: "{{ advice_forecast['forecast'][0]['final'] }}"
          timestamp: "{{ advice_forecast['forecast'][0]['datetime'] }}"
      - name: Stookwijzer forecast 12 hours
        unique_id: stookwijzer_forecast_12_hours
        state: "{{ advice_forecast['forecast'][1]['advice'] }}"
        attributes:
          final: "{{ advice_forecast['forecast'][1]['final'] }}"
          timestamp: "{{ advice_forecast['forecast'][1]['datetime'] }}"
```


</details>
