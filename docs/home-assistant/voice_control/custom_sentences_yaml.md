---
title: 在 configuration.yaml 中设置自定义语句
description: '你可以在 configuration.yaml 文件中的 conversation(/home-assistant/integrations/conversation/) 配置里添加意图和语句：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 在 configuration.yaml 中设置自定义语句

你可以在 `configuration.yaml` 文件中的 [`conversation`](/home-assistant/integrations/conversation/) 配置里添加意图和语句：

```yaml
# Example configuration.yaml
conversation:
  intents:
    HassTurnOn:
      - "activate [the] {name}"
```

这会扩展 `HassTurnOn` 意图的默认英文语句。除了可以说“turn on the kitchen light”，你也可以说“activate the kitchen light”。

你也可以添加新的意图，并通过 [`intent_script`](/home-assistant/integrations/intent_script/) 集成为它们定义响应和动作：

```yaml
# Example configuration.yaml
conversation:
  intents:
    YearOfVoice:
      - "how is the year of voice going"

intent_script:
  YearOfVoice:
    speech:
      text: "Great! We're at over 40 languages and counting."
```

除了文本响应之外，`intent_script` 还可以触发 Home Assistant 中任何可用的 `action`，例如调用服务或触发事件。

## 在配置目录中设置语句

更高级的自定义可以在 Home Assistant 的 `config` 目录中完成。例如，放在 `config/custom_sentences/en` 中的 YAML 文件，会在请求英文语句（语言代码 `en`）时被加载。

以下示例创建了一个新的 `SetVolume` 意图，用于修改两个媒体播放器之一的音量：

```yaml
# Example config/custom_sentences/en/media.yaml
language: "en"
intents:
  SetVolume:
    data:
      - sentences:
          - "(set|change) {media_player} volume to {volume} [percent]"
          - "(set|change) [the] volume for {media_player} to {volume} [percent]"
lists:
  media_player:
    values:
      - in: "living room"
        out: "media_player.living_room"
      - in: "bedroom"
        out: "media_player.bedroom"
  volume:
    range:
      from: 0
      to: 100
```

如上所述，你随后可以使用 `intent_script` 集成为 `SetVolume` 实现动作并提供响应：

```yaml
# Example configuration.yaml
intent_script:
  SetVolume:
    action:
      service: "media_player.volume_set"
      data:
        entity_id: "{{ slots.media_player }}"
        volume_level: "{{ slots.volume / 100 }}"
    speech:
      text: "Volume changed to {{ slots.volume }}"
```

## 自定义响应

你也可以在 `config/custom_sentences/<language>` 中自定义现有意图的响应：

```yaml
# Example config/custom_sentences/en/responses.yaml
language: "en"
responses:
  intents:
    HassTurnOn:
      default: "I have turned on the {{ slots.name }}"
```

## 相关设备和安装教程

- [自定义语句主页](/home-assistant/voice_control/custom_sentences)
- [$13 的 Home Assistant 语音助手](/home-assistant/voice_control/thirteen-usd-voice-remote/)
- [S3-BOX-3 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/)
