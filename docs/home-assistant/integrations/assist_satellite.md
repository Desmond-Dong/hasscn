---
title: Assist Satellite
description: '这是一个面向远程卫星设备的集成，这些设备使用 Assist(/home-assistant/voicecontrol/) 来控制并与 Home Assistant 交互。这使其他集成能够以一致的方式表示这些卫星设备。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Voice
ha_release: '2024.10'
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
  - '@arturpragacz'
ha_domain: assist_satellite
ha_integration_type: entity
ha_quality_scale: internal
---
# Assist Satellite

这是一个面向远程卫星设备的集成，这些设备使用 [Assist](/home-assistant/voice_control/) 来控制并与 Home Assistant 交互。这使其他集成能够以一致的方式表示这些卫星设备。

:::note Building block integration
This assist satellite is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this assist satellite building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the assist satellite building block offers.
:::

## 动作

Assist satellite 实体会公开额外的动作，以便您在自动化或脚本中远程控制卫星设备。这些动作可以通过 UI 创建，也可以在 YAML 中使用（示例如下）。

### 动作：播报

`assist_satellite.announce` 动作允许您在卫星设备上播报一条消息或媒体 ID。如果要播报的是文本消息，它会先通过卫星设备所配置[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)中的[文本转语音](/home-assistant/integrations/tts)系统转换为媒体 ID。


[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=assist_satellite.announce)

YAML 示例：

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
```

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  media_id: ITEM_ID
```

播报前会自动播放提示音。您可以通过设置 `preannounce_media_id` 使用自己的声音覆盖它，或者将 `preannounce` 设为 `false` 以完全禁用提示音。

YAML 示例：

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
  preannounce_media_id: ITEM_ID  # custom chime
```

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
  preannounce: false  # chime disabled
```

### 动作：开始对话

`assist_satellite.start_conversation` 动作允许您先在卫星设备上播报一条消息或媒体 ID，然后监听一条或多条语音指令。卫星设备配置的[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)必须使用受支持的[对话代理](/home-assistant/integrations/conversation)，例如 [OpenAI](/home-assistant/integrations/openai_conversation) 或 [Google Generative AI](/home-assistant/integrations/google_generative_ai_conversation)。内置的 Assist 对话代理目前还不支持对话。

如果要播报的是文本消息，它会先通过卫星设备所配置[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)中的[文本转语音](/home-assistant/integrations/tts)系统转换为媒体 ID。

`extra_system_prompt` 会传递给卫星设备所配置[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)中的[对话代理](/home-assistant/integrations/conversation)。对于大语言模型（LLM），这段内容会附加到发送给模型的提示词后面，从而让模型理解像“是”或“不是”这类回答的上下文。

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=assist_satellite.start_conversation)

YAML 示例：

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
```

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_media_id: ITEM_ID
```

在开始消息或媒体播放前会自动播放提示音。您可以通过设置 `preannounce_media_id` 使用自己的声音覆盖它，或者将 `preannounce` 设为 `false` 以完全禁用提示音。

YAML 示例：

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
  preannounce_media_id: ITEM_ID  # custom chime
```

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
  preannounce: false  # chime disabled
```

### 动作：提问

`assist_satellite.ask_question` 动作允许您在卫星设备上提出一个问题，监听回答，并将其与预定义的可能答案列表进行匹配。匹配结果的信息会存储在 `response_variable` 中，以便您的自动化或脚本执行后续适当操作。

问题可以以文本或媒体 ID 的形式提供。如果使用文本，它会先通过卫星设备所配置[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)中的[文本转语音](/home-assistant/integrations/tts)系统转换为媒体 ID。

用户回答的音频会通过卫星设备所配置[语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)中的[语音转文本](/home-assistant/integrations/stt)系统转写。

`answers` 以对象列表的形式提供，结构如下：

- `id` - 答案的唯一 ID
- `sentences` - [句子模板](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#sentence-templates-syntax)列表

句子模板可以包含通配 `{slots}`，这些值会存储在答案的 `slots` 字段中。例如，`play {album} by {artist}` 可以匹配 “play the white album by the beatles”，其中 “white album” 会存入 `slots.album`，“the beatles” 会存入 `slots.artist`。

匹配到的答案会存储在 `response_variable` 中，结构如下：

- `id` - 匹配答案的唯一 ID（如果未匹配则为 `None`）
- `sentence` - 用户的回复文本
- `slots` - 匹配答案中通配 `{slots}` 的值

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=assist_satellite.ask_question)

YAML 示例：


```yaml
actions:
  - action: assist_satellite.ask_question
    data:
      question: "Welcome home! What kind of music would you like to listen to?"
      entity_id: assist_satellite.my_entity
      answers:
        - id: jazz
          sentences:
            - "[some] jazz [music] [please]"
            - "something spicy"
        - id: rock
          sentences:
            - "[some] rock [music] [please]"
            - "something with a beat"
        - id: nothing
          sentences:
            - "nothing [for now] [please]"
            - "nevermind"
            - "cancel"
    response_variable: answer
  - choose:
      - conditions:
          - condition: template
            value_template: "{{ answer.id == 'jazz' }}"
        sequence:
          - action: play_jazz_action
      - conditions:
          - condition: template
            value_template: "{{ answer.id == 'rock' }}"
        sequence:
          - action: play_rock_action
    default:
      - action: assist_satellite.announce
        data:
          message: "OK, maybe some other time."
        target:
          entity_id: assist_satellite.my_entity
```


问题也可以不是文本，而是一个媒体 ID：

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  question_media_id: ITEM_ID
  answers: ANSWERS
response_variable: answer
```

提问前会自动播放提示音。您可以通过设置 `preannounce_media_id` 使用自己的声音覆盖它，或者将 `preannounce` 设为 `false` 以完全禁用提示音。

YAML 示例：

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  preannounce_media_id: ITEM_ID  # custom chime
  question: QUESTION
  answers: ANSWERS
response_variable: answer
```

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  preannounce: false  # chime disabled
  question: QUESTION
  answers: ANSWERS
response_variable: answer
```

如果省略 `answers`，用户的回复文本将直接出现在 `response_variable` 的 `sentence` 字段中。

YAML 示例：


```yaml
actions:
  - action: assist_satellite.ask_question
    data:
      question: "Say something"
      entity_id: assist_satellite.my_entity
    response_variable: answer
  - action: assist_satellite.announce
    data:
      message: "You said {{ answer.sentence }}"
    target:
      entity_id: assist_satellite.my_entity
```


