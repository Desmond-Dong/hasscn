---
title: 意图脚本
description: 关于如何设置在意图上运行脚本的说明。
ha_category:
  - Intent
ha_release: '0.50'
ha_quality_scale: internal
ha_domain: intent_script
ha_integration_type: integration
ha_codeowners:
  - '@arturpragacz'
---

**意图脚本**集成允许你为意图配置操作和响应。任何支持意图的集成都可以触发这些意图，例如 [Alexa](/home-assistant/integrations/alexa/)（Amazon Echo）、[Dialogflow](/home-assistant/integrations/dialogflow/)（Google Assistant）和 [Snips](/home-assistant/integrations/snips/)。在 Home Assistant 内部，也可以通过[自定义语句](https://www.home-assistant.io/voice_control/custom_sentences_yaml/)触发它们。

如果你将意图脚本与 LLM 一起使用，并且包含参数，请确保在描述中写明这些参数及其类型。


```yaml
# configuration.yaml 配置示例
intent_script:
  GetTemperature:  # Intent type
    description: Return the temperature and notify the user
    speech:
      text: We have {{ states('sensor.temperature') }} degrees
    action:
      action: notify.notify
      data:
        message: Hello from an intent!
```


在一个意图中，你可以定义以下变量：

```yaml
intent:
  description: 意图名称。可以有多个条目。
  required: true
  type: map
  keys:
    description:
      description: 意图的描述。
      required: false
      type: string
    platforms:
      description: 该实体支持的域列表。
      required: false
      type: list
    action:
      description: 定义在意图触发时要运行的操作。
      required: false
      type: action
    async_action:
      description: 设置为 True 后，Home Assistant 在返回意图响应前不会等待脚本执行完成。
      required: false
      default: false
      type: boolean
    mode:
      description: 运行意图脚本时使用的[脚本模式](https://www.home-assistant.io/integrations/script/#script-modes)。用它来定义该意图是否可以并行运行多次。
      required: false
      default: single
      type: string
    card:
      description: 要显示的卡片。
      required: false
      type: map
      keys:
        type:
          description: 要显示的卡片类型。
          required: false
          default: simple
          type: string
        title:
          description: 要显示的卡片标题。
          required: true
          type: template
        content:
          description: 要显示的卡片内容。
          required: true
          type: template
    speech:
      description: 要返回的文本或模板。
      required: false
      type: map
      keys:
        type:
          description: 语音类型。
          required: false
          default: plain
          type: string
        text:
          description: 要说出的文本。
          required: true
          type: template
```

## 使用操作响应

使用 `speech` 模板时，已执行操作返回的数据可通过 `action_response` 变量获取。


```yaml
conversation:
  intents:
    EventCountToday:
      - "How many meetings do I have today"

intent_script:
  EventCountToday:
    action:
      - action: calendar.get_events
        target:
          entity_id: calendar.my_calendar
        data_template:
          start_date_time: "{{ today_at('00:00') }}"
          duration: { "hours": 24 }
        response_variable: result                     # get action response
      - stop: ""
        response_variable: result                     # and return it
    speech:
      text: "{{ action_response['calendar.my_calendar'].events | length }}"   # use the action's response
```


## 操作

可用操作：`reload`。

### 操作：重新加载

`intent_script.reload` 操作会从 YAML 配置中重新加载意图脚本，这是比重启 Home Assistant 更快的替代方案。

此操作不接受任何数据属性。
