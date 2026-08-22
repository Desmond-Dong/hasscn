---
title: "Assist satellite 实体"
sidebar_label: Assist satellite
---

Assist Satellite 实体表示设备的由 Assist pipeline 驱动的语音助手功能。拥有此类实体的设备允许用户使用语音控制 Home Assistant。

Assist satellite 实体派生自 [`homeassistant.components.assist_satellite.AssistSatelliteEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/assist_satellite/__init__.py)。

## 属性

| 名称                 | 类型                   | 默认值           | 描述                                                           |
|----------------------|------------------------|-------------------|-----------------------------------------------------------------------|
| `pipeline_entity_id` | `str \| None` | `None` | 带有 [pipeline id](/developers/voice/pipelines) 的 `select` 实体的 Id，或 `None`。 |
| `vad_sensitivity_entity_id` | `str \| None` | `None` | 带有 [语音活动检测灵敏度](https://github.com/home-assistant/core/blob/dev/homeassistant/components/assist_pipeline/vad.py) 的 `select` 实体的 Id，或 `None`。 |
| `tts_options` | `dict \| None` | `None` | 在回复时传递给 [text-to-speech 系统](https://www.home-assistant.io/integrations/tts/) 的选项。 |

## 状态

`AssistSatelliteEntity` 的状态跟随其当前正在运行的 [pipeline](/developers/voice/pipelines)。`AssistSatelliteState` 枚举存储了可能的状态。

:::tip
当 text-to-speech 响应**播放完毕**时，必须在你的实体上调用 `tts_response_finished` 方法，以返回 `IDLE` 状态。
:::

| 常量     | 描述                                                              |
|--------------|--------------------------------------------------------------------------|
| `IDLE`       | 设备正在等待用户输入，例如唤醒词或按键。 |
| `LISTENING`  | 设备正在将语音指令的音频流式传输到 Home Assistant。      |
| `PROCESSING` | Home Assistant 正在处理语音指令。                          |
| `RESPONDING` | 设备正在播放回复。                                         |

## 支持的功能

支持的功能通过使用 `AssistSatelliteEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值      | 描述                                       |
|------------|---------------------------------------------------|
| `ANNOUNCE` | 设备支持远程触发的公告。实现 `async_announce` 方法以播放 `AssistSatelliteAnnouncement` 中提供的 `media_id`。此方法应仅在设备上的公告播放完毕后才返回。 |
| `START_CONVERSATION` | 设备支持远程触发的对话，即播放公告然后听取一个或多个语音指令。实现 `async_start_conversation` 方法以播放 `AssistSatelliteAnnouncement` 中提供的 `media_id`，然后听取语音指令。此方法应仅在公告播放完毕后才返回。 |

## 方法

### 运行 pipeline 和处理事件

Satellite 实体应仅使用 `async_accept_pipeline_from_satellite` 方法运行 [Assist pipeline](/developers/voice/pipelines)。通过实现 `on_pipeline_event` 方法来处理 [来自 pipeline 的事件](/developers/voice/pipelines#events)。

运行 pipeline 时，satellite 实体的 [状态](#states) 会自动更新，`RESPONDING` 到 `IDLE` 除外。当 satellite 在设备上播放完回复后，开发者必须调用 `tts_response_finished` 方法。

### 获取配置

`async_get_configuration` 方法必须返回一个（缓存的）`AssistSatelliteConfiguration`。如果实体必须与设备通信以检索配置，这应在初始化期间完成。

有一个 [websocket 命令](#getting-the-satellite-configuration) 可用于获取实体的配置。

### 设置配置

`async_set_configuration` 方法更新设备的配置，并且只有在设备和 Home Assistant 的 `AssistSatelliteConfiguration` 同步后才返回。

有一个 [websocket 命令](#setting-the-active-wake-words) 可用于设置活动的唤醒词。

### 公告

如果设备具有 `ANNOUNCE` [支持的功能](#supported-features)，则应实现 `async_announce` 方法，以公告 `AssistSatelliteAnnouncement` 内提供的 `media_id`。如果提供了 `preannounce_media_id`，应在 `media_id` 之前播放。
`async_announce` 方法应仅在设备上的公告播放完毕后才返回。

有一个 [announce 操作](https://home-assistant.io/integrations/assist_satellite#action-assist_satelliteannounce) 可用于自动化公告。

### 开始对话

如果设备具有 `START_CONVERSATION` [支持的功能](#supported-features)，则应实现 `async_start_conversation` 方法，以执行以下操作：

1. 公告 `AssistSatelliteAnnouncement` 内的 `preannounce_media_id`（如果已提供）
2. 公告 `AssistSatelliteAnnouncement` 内提供的 `media_id`，然后
3. 听取一个或多个后续的语音指令

`async_start_conversation` 方法应仅在设备上的公告播放完毕后才返回。对话将在用户和 satellite 之间继续。

有一个 [start conversation 操作](https://home-assistant.io/integrations/assist_satellite#action-assist_satellitestart_conversation) 可用于自动化对话。

## WebSocket API

### 拦截唤醒词

该集成提供了一个 websocket API，用于拦截唤醒词的检测并向用户公告。语音向导使用此功能来帮助用户上 hand 并熟悉唤醒词。

```json
{
  "type": "assist_satellite/intercept_wake_word",
  "entity_id": "assist_satellite.living_room"
}
```

实体 id 必须是支持 `ANNOUNCE` 功能的 Assist satellite 实体。

一旦检测到唤醒词，将返回如下响应：

```json
{
  "wake_word_phrase": "okay nabu"
}
```

### 获取 satellite 配置

可以使用以下命令获取 satellite 的当前配置，包括可用和活动的唤醒词：

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

`active_wake_words` 列表包含 `available_wake_words` 中唤醒词的 ids。

`pipeline_entity_id` 包含控制设备将运行的 pipeline 的 select 实体的 id。
`vad_entity_id` 包含具有语音活动检测器 (VAD) 灵敏度级别的 select 实体的 id。

### 设置活动的唤醒词

使用以下命令设置活动的唤醒词：

```json
{
  "type": "assist_satellite/set_wake_words",
  "entity_id": ENTITY_ID,
  "wake_word_ids": ["1234", "5678"]
}
```

`wake_word_ids` 必须包含来自 `assist_satellite/get_configuration` 命令的 `available_wake_words` 列表中的 ids。
`wake_word_ids` 的大小也不应超过 `max_active_wake_words`。
