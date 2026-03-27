---
title: MeteoAlarm
description: 'MeteoAlarm 集成允许您监控来自 MeteoAlarm(https://www.meteoalarm.org)（EUMETNET）的欧洲天气警报。要使用此二值传感器，您需要从 MeteoAlarm(https://feeds.meteoalarm.org) 获取国家和省份名称。'
ha_category:
  - Binary sensor
ha_release: 0.93
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@rolfberkenbosch'
ha_domain: meteoalarm
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: legacy
---
# MeteoAlarm

**MeteoAlarm** 集成允许您监控来自 [MeteoAlarm](https://www.meteoalarm.org)（EUMETNET）的欧洲天气警报。要使用此二值传感器，您需要从 [MeteoAlarm](https://feeds.meteoalarm.org) 获取国家和省份名称。请注意，国家名称必须与以 `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-` 开头的 URL 中显示的名称完全一致，包括名称中使用的连字符。否则可能导致错误或数据不正确。

您可以使用 [MeteoAlarm EMMA_ID Region explorer tool](https://saratoga-weather.org/meteoalarm-map/) 查找省份名称。

如果存在警报，二值传感器状态会显示警告消息。详细信息可在属性中查看。

## 配置

要启用此二值传感器，请将以下内容添加到您的 "`configuration.yaml`" 中：

```yaml
binary_sensor:
  - platform: meteoalarm
    country: "netherlands"
    province: "Groningen"
```

```yaml
name:
  description: 二值传感器名称
  required: false
  default: meteoalarm
  type: string
country:
  description: 您国家的英文全名（小写）
  required: true
  type: string
province:
  description: 省份
  required: true
  type: string
language:
  description: "您的语言的 ISO 代码。请注意，这仅适用于当前国家。例如，'nl-NL' 或 'nl-BE' 仅适用于荷兰或比利时。"
  required: false
  type: string
  default: "en-US"
```


输出示例

以下是状态为 "on" 时的示例。

```yaml
attribution: Information provided by MeteoAlarm
language: en-GB
category: Met
event: Severe forest-fire warning
responseType: Monitor
urgency: Immediate
severity: Severe
certainty: Likely
effective: 2019-05-02T22:00:00+00:00
onset: 2019-05-02T22:00:00+00:00
expires: 2019-05-03T21:59:00+00:00
senderName: Stig Carlsson
headline: Orange forest-fire for Hedmark, Oppland
description: High grass and heather fire hazard in areas without snow until significant amount of precipitation.
Consequences: Vegetation is very easily ignited and very large areas may be affected.
instruction: Be very careful with open fire. Follow the instructions from the local authorities. Emergency services should assess a necessary level of alertness.
awareness_level: 3; orange; Severe
awareness_type: 8; forest-fire
unit_of_measurement:
friendly_name: meteoalarm
icon: mdi:alert
```

共有以下几个警戒级别：

- 2; yellow; Moderate
- 3; orange; Severe
- 4; red; High

自动化示例


```yaml
automation:
  - alias: "Alert me about weather warnings"
    triggers:
      - trigger: state
        entity_id: binary_sensor.meteoalarm
        from: "off"
    actions:
      - action: notify.notify
        data:
          title: "{{state_attr('binary_sensor.meteoalarm', 'headline')}}"
          message: "{{state_attr('binary_sensor.meteoalarm', 'description')}} is effective on {{state_attr('binary_sensor.meteoalarm', 'effective')}}"
```


:::note
此集成与 MeteoAlarm 没有任何关联，它通过 XML feed 从网站获取数据。请自行承担使用风险。

:::
