---
title: "Assist 卫星实体"
description: 'Assist 卫星实体表示设备中由 Assist 管道驱动的语音助手能力。具有此类实体的设备可以让用户通过语音控制 Home Assistant。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: Assist 卫星
---
# Assist 卫星实体

Assist 卫星实体表示设备中由 Assist 管道驱动的语音助手能力。具有此类实体的设备可以让用户通过语音控制 Home Assistant。

Assist 卫星实体源自[`homeassistant.components.assist_satellite.AssistSatelliteEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/assist_satellite/__init__.py)。

## 特性

| 名称 | 类型 | 默认值 | 说明 |
|----------------------|------------------------|-------------------|-----------------------------------------------------------------------|
| `pipeline_entity_id` | <code>str; None</code> | <code>None</code> | 对应 `select` 实体的 ID，该实体用于选择[语音管道](/developers/voice/pipelines)；也可以为 `None`。 |
| `vad_sensitivity_entity_id` | <code>str; None</code> | <code>None</code> | 带有 [语音活动检测灵敏度](https://github.com/home-assistant/core/blob/dev/homeassistant/components/assist_pipeline/vad.py) 或 `None` 的 `select` 实体的 ID。 |
| `tts_options` | <code>dict; None</code> | <code>None</code> | 响应时传递给[文本转语音系统](https://www.home-assistant.io/integrations/tts/)的选项。 |


## 状态

`AssistSatelliteEntity` 的状态跟随当前运行的[语音管道](/developers/voice/pipelines)。`AssistSatelliteState` 枚举定义了所有可能状态。

:::tip
当文本转语音响应播放完成并需要返回 `IDLE` 状态时，您必须在实体上调用 `tts_response_finished` 方法。
:::

| 常量 | 说明 |
|--------------|--------------------------------------------------------------------------|
| `IDLE` | 设备正在等待用户输入，例如唤醒词或按下按钮。 |
| `LISTENING` | 设备正在通过语音命令将音频传输到 Home Assistant。 |
| `PROCESSING` | Home Assistant 正在处理语音命令。 |
| `RESPONDING` | 设备正在说出响应。 |

## 支持的功能

支持的功能通过使用 `AssistSatelliteEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
|------------|---------------------------------------------------|
| `ANNOUNCE` | 设备支持远程触发公告。实现 `async_announce` 方法以从 `AssistSatelliteAnnouncement` 播放提供的 `media_id`。仅当公告在设备上播放完毕后，此方法才应返回。 |
| `START_CONVERSATION` | 设备支持远程触发对话，播放公告，然后监听一个或多个语音命令。实现 `async_start_conversation` 方法，从 `AssistSatelliteAnnouncement` 播放提供的 `media_id`，然后监听语音命令。此方法仅应在公告播放完毕后返回。 |

## 方法

### 运行管道并处理事件

卫星实体应仅通过 `async_accept_pipeline_from_satellite` 方法运行[Assist 管道](/developers/voice/pipelines)。[管道事件](/developers/voice/pipelines#events)则通过实现 `on_pipeline_event` 方法处理。

当管道运行时，卫星实体的[状态](#状态)会自动更新，但 `RESPONDING` 到 `IDLE` 的切换除外。当设备播报完响应后，开发者必须调用 `tts_response_finished` 方法。

### 获取配置

`async_get_configuration` 方法必须返回（缓存的）`AssistSatelliteConfiguration`。如果实体必须与设备通信以检索配置，则应在初始化期间进行。

[WebSocket 命令](#获取卫星配置)可用于获取实体配置。

### 设置配置

`async_set_configuration` 方法更新设备的配置，并且仅在设备和 Home Assistant 的 `AssistSatelliteConfiguration` 同步后才返回。

[WebSocket 命令](#设置活动唤醒词)可用于设置活动唤醒词。

### 公告

如果设备具有 `ANNOUNCE` [支持的功能](#支持的功能)，则应实现 `async_announce` 方法，在 `AssistSatelliteAnnouncement` 中播放提供的 `media_id`。如果提供 `preannouncement_media_id`，则应先于 `media_id` 播放。
只有在公告于设备上播放完成后，`async_announce` 方法才应返回。

[公告动作](https://home-assistant.io/integrations/assist_satellite#action-assist_satelliteannounce) 可用于自动触发公告。

### 开始对话

如果设备具有 `START_CONVERSATION` [支持的功能](#支持的功能)，则应实现 `async_start_conversation` 方法，以便：

1. 在 `AssistSatelliteAnnouncement` 中播放 `preannouncement_media_id`（如果提供）
2. 在 `AssistSatelliteAnnouncement` 中播放提供的 `media_id`
3. 监听一条或多条后续语音命令

只有在公告于设备上播放完成后，`async_start_conversation` 方法才应返回。此后，用户与卫星之间的对话会继续进行。

[开始对话动作](https://home-assistant.io/integrations/assist_satellite#action-assist_satellitestart_conversation) 可用于自动发起对话。

## WebSocket API

### 拦截唤醒词

该集成提供了一个 WebSocket API，用于拦截唤醒词检测并通知用户。语音向导使用它来帮助用户登录并熟悉唤醒词。

```json
{
  "type": "assist_satellite/intercept_wake_word",
  "entity_id": "assist_satellite.living_room"
}
```

实体 ID 必须对应一个支持 `ANNOUNCE` 功能的 Assist 卫星实体。

一旦检测到唤醒词，就会返回一个响应，如下所示：

```json
{
  "wake_word_phrase": "okay nabu"
}
```

### 获取卫星配置

卫星的当前配置，包括可用和活动的唤醒词，可以通过以下方式检索：

```json
{
  "type": "assist_satellite/get_configuration",
  "entity_id": ENTITY_ID
}
```

将返回如下响应：

```json
{
  "active_wake_words": [
    "1234"
  ],
  "available_wake_words": [
    {
      "id": "1234",
      "trained_languages": [
        "en"
      ],
      "wake_word": "okay nabu"
    },
    {
      "id": "5678",
      "trained_languages": [
        "en"
      ],
      "wake_word": "hey jarvis"
    }
  ],
  "max_active_wake_words": 1,
  "pipeline_entity_id": "select.pipeline_entity",
  "vad_entity_id": "select.vad_entity"
}
```

`active_wake_words` 列表包含来自 `available_wake_words` 的唤醒词的 ID。

`pipeline_entity_id` 包含控制设备将运行的管道的选择实体的 ID。
`vad_entity_id` 包含具有语音活动检测器 (VAD) 灵敏度级别的所选实体的 ID。


### 设置活动唤醒词

使用以下命令设置活动唤醒词：

```json
{
  "type": "assist_satellite/set_wake_words",
  "entity_id": ENTITY_ID,
  "wake_word_ids": ["1234", "5678"]
}
```

`wake_word_ids` 必须包含来自 `assist_satellite/get_configuration` 命令的 `available_wake_words` 列表中的 ID。
`wake_word_ids` 的大小也不应超过 `max_active_wake_words`。
