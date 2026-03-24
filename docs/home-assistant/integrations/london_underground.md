---
title: London Underground
description: 在 Home Assistant 中显示伦敦地铁和地上铁线路的当前状态。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.49
ha_domain: london_underground
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

**London Underground** 集成会显示伦敦地铁线路、地上铁线路以及 DLR 的状态。

线路可能报告以下状态值：
- `Special Service`
- `Closed`
- `Suspended`
- `Part Suspended`
- `Planned Closure`
- `Part Closure`
- `Severe Delays`
- `Reduced Service`
- `Bus Service`
- `Minor Delays`
- `Good Service`
- `Part Closed`
- `Exit Only`
- `No Step Free Access`
- `Change of frequency`
- `Diverted`
- `Not Running`
- `Issues Reported`
- `No Issues`
- `Information`
- `No Service`

每条线路还带有一个 `Description` 属性，用自然语言描述当前问题，这对向用户发送通知会很有帮助。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
line:
    description: "要监控的线路列表"
```

### 自动化示例：

此自动化会在 Victoria 线状态变化为重要状态时，以及在通勤即将开始前触发。为避免通知泛滥，它只会在通勤者早上在家或晚上离家时运行。


```yaml
alias: Notify Paulus if there are issues on the Victoria line
mode: single
triggers:
  - entity_id:
      - sensor.victoria
    trigger: state
  - at: "08:00:00"
    trigger: time
  - at: "16:30:00"
    trigger: time
conditions:
  - condition: not
    alias: 如果 Victoria 线当前不是轻微延误或服务正常
    conditions:
      - condition: or
        conditions:
          - condition: state
            entity_id: sensor.victoria
            state: Good Service
          - condition: state
            entity_id: sensor.victoria
            state: Minor Delays
          - condition: state
            entity_id: sensor.victoria
            state: unavailable
          - condition: state
            entity_id: sensor.victoria
            state: unknown
  - condition: or
    alias: 如果 Paulus 早上在家，或下午不在家
    conditions:
      - condition: and
        alias: 如果 Paulus 早上在家
        conditions:
          - condition: time
            before: "14:00:00"
            after: "07:00:00"
          - condition: state
            entity_id: person.paulus
            state: home
      - condition: and
        alias: 如果 Paulus 下午不在家
        conditions:
          - condition: time
            before: "19:00:00"
            after: "13:00:00"
          - condition: state
            entity_id: person.paulus
            state: home
actions:
  - data:
      title: "{{'Victoria Line: ' + states.sensor.victoria.state}}"
      message: "{{states.sensor.victoria.attributes.Description}}"
    action: notify.mobile_app_pixel_7

```


数据由 TfL Open Data [TFL](https://api.tfl.gov.uk/) 提供。
