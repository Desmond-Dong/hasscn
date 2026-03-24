---
title: Text-to-speech (TTS)
description: 关于如何在 Home Assistant 中设置文字转语音 (TTS) 的说明。
ha_category:
  - Media source
  - Text-to-speech
ha_release: 0.35
ha_codeowners:
  - '@home-assistant/core'
ha_domain: tts
ha_quality_scale: internal
ha_platforms:
  - notify
ha_integration_type: entity
related:
  - url: https://www.home-assistant.io/integrations/#text-to-speech
    title: List of integrations using the TTS integration
  - url: https://www.nabucasa.com/config/tts/
    title: TTS with Home Assistant Cloud
  - url: https://www.home-assistant.io/integrations/google_translate/
    title: Google Translate TTS
  - url: https://www.home-assistant.io/integrations/microsoft/
    title: Microsoft TTS
  - url: https://www.home-assistant.io/voice_control/
    title: Home Assistant Assist
---

文字转语音（TTS）让 Home Assistant 可以对您“说话”。

:::note Building block integration
This text-to-speech (tts) is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this text-to-speech (tts) building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the text-to-speech (tts) building block offers.
:::

请查看所有使用此构建模块的 [TTS integrations](https://www.home-assistant.io/integrations/#text-to-speech)，了解如何在自动化中使用它。如果您正在使用 Home Assistant 语音助手 [Assist](https://www.home-assistant.io/voice_control/)，Assist 在回复您时就会使用 TTS。另一种使用 TTS 的方式是通过 [TTS with Home Assistant Cloud](https://www.nabucasa.com/config/tts/)。

## 文字转语音实体的状态

文字转语音实体的状态是一个时间戳，表示 TTS 上次被使用的日期和时间。

<p class='img'>
<img src='/home-assistant/images/integrations/tts/state_tts.png' alt='Screenshot showing the state of a text-to-speech entity in the developer tools' />
在开发者工具中显示文字转语音实体状态的截图。
</p>

## 操作

### 操作：Speak

`tts.speak` 操作用于将文本转语音发送到媒体播放器。现代平台会在 `tts` 域下创建实体，每个实体代表一个文字转语音服务提供方。这些实体可作为 `tts.speak` 操作的目标。

`tts.speak` 操作支持 `message`、`language`、`cache`、`media_player_entity_id` 和 `options` 选项。要朗读的文本通过 `message` 设置，输出声音的媒体播放器通过 `media_player_entity_id` 选择。语言可通过 `language` 设置，格式应符合目标实体平台的要求（请参阅具体平台文档）。关于 `cache` 选项，请参阅 [cache section](#cache)。额外设置可通过 `options` 指定，其中包括首选音频设置（详见 [preferred audio settings](#preferred-audio-settings)）以及目标实体平台支持的其他设置，例如 _voice、motion、speed_ 等（请参阅具体平台文档）。

```yaml
action: tts.speak
target:
  entity_id: tts.example
data:
  media_player_entity_id: media_player.kitchen
  message: "May the force be with you."
```

### 操作：Say（旧版）

`say` 操作用于将文本转语音发送到媒体播放器。`say` 操作支持 `message`、`language`、`cache` 和 `options` 选项。要朗读的文本通过 `message` 设置。语言可通过 `language` 设置，格式应符合平台要求（请参阅具体平台文档）。关于 `cache` 选项，请参阅 [cache section](#cache)。额外设置可通过 `options` 指定，其中包括首选音频设置（详见 [preferred audio settings](#preferred-audio-settings)）以及目标平台支持的其他设置，例如 _voice、motion、speed_ 等（请参阅具体平台文档）。自 0.92 版本起，可通过配置中的 `service_name` 选项定义该操作名称。

向所有 `media_player` 实体播放：

```yaml
# 如果使用不同平台，请将 google_translate_say 替换为 <platform>_say。
action: tts.google_translate_say
data:
  entity_id: all
  message: "May the force be with you."
```

向 `media_player.floor` 实体播放：

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
```

以法语向 `media_player.floor` 实体播放：

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "Que la force soit avec toi."
  language: "fr"
```

使用模板：


```yaml
action: tts.google_translate_say
data:
  message: "Temperature is {{states('sensor.temperature')}}."
  cache: false
```


## 缓存

可以通过 `speak` 或 `say` 操作中的 `cache` 选项控制集成缓存：设为 `True` 表示启用（默认），设为 `False` 表示禁用。长期缓存会保存在文件系统中；用于快速响应媒体播放器的内存缓存会在短时间后自动清理。

## 首选音频设置

每个 TTS 平台生成的音频样本格式可能不同，并不一定兼容所有媒体播放器。TTS 集成构建模块支持通过 `speak` 或 `say` 操作中的 `options` 选项配置首选目标音频格式。

当目标实体平台不支持一个或多个指定的首选音频格式设置时，TTS 集成构建模块会使用 [FFmpeg integration](/home-assistant/integrations/ffmpeg) 进行音频转码（有关支持的设置及取值，请参阅具体平台文档）。

可用的首选音频设置如下，全部为可选项：

- `preferred_format`：设置音频格式。如果目标实体平台不支持，则其值可以是 FFmpeg 输出文件支持的扩展名，例如 `wav`、`mp3`、`ogg` 等。
- `preferred_sample_rate`：设置采样率。如果目标实体平台不支持，则该值应为 FFmpeg `-ar` 参数支持的 Hz 数值。
- `preferred_sample_channels`：设置音频声道数。如果目标实体平台不支持，则该值应为 FFmpeg `-ac` 参数支持的数值。
- `preferred_sample_bytes`：设置音频位深采样。如果目标实体平台不支持，则只能设为 `2` 以使用 16 位音频采样（其他值会被忽略）。

以下是生成 22050Hz MP3 音频的示例：

```yaml
action: tts.speak
target:
  entity_id: tts.example
data:
  media_player_entity_id: media_player.kitchen
  message: "May the force be with you."
  options:
    preferred_format: mp3
    preferred_sample_rate: 22050
```

## REST API

### POST `/api/tts_get_url`

返回生成后的 TTS 文件 URL。必须提供 `engine_id`（即实体 ID）或 `platform` 参数，以及 `message`。另外也支持 `cache`、`language` 和 `options` 参数，作为 JSON 属性传入，其含义与 `speak` 操作中描述一致。

```json
{
  "engine_id": "tts.amazon_polly",
  "message": "I am speaking now"
}
```

如果文件生成成功，返回码为 200。响应体会包含一个带 URL 的 JSON 对象。

```json
{
  "path": "/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_tts.demo.mp3",
  "url": "http://127.0.0.1:8123/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_tts.demo.mp3"
}
```

示例 `curl` 命令：

```bash
$ curl -X POST -H "Authorization: Bearer <ACCESS TOKEN>" \
       -H "Content-Type: application/json" \
       -d '{"message": "I am speaking now", "engine_id": "amazon_polly"}' \
       http://localhost:8123/api/tts_get_url
```

## 故障排查

:::important
播放 TTS 媒体时会优先使用本地 Home Assistant URL，可通过 **[Settings > System > Network](https://my.home-assistant.io/redirect/network/)** 进行配置。
强烈建议将本地 Home Assistant URL 设为自动，这样生成的 URL 将为 `http://<local_ip>:<local_port>`。

:::
以下部分介绍一些在媒体设备上常见的问题。

### 自签名证书

如果您的 Home Assistant 实例配置为通过 SSL 访问，并且内部 URL 使用的是自签名证书，就会遇到这个问题。

`tts` 操作会向媒体设备发送一个 `https://` URL，设备会校验证书并拒绝它，因此不会播放该文件。如果您能让设备接受该证书，它就能正常播放。但许多媒体设备并不允许修改设置以接受自签名证书。最终，您可能只能选择通过 `http://` 而不是 `https://` 向本地设备提供文件。

### Google Cast 设备

Google Cast 设备（Google Home、Chromecast 等）要求媒体 URL 中的主机名必须能通过 Google 的公共 DNS 服务器解析；如果 URL 使用的是 `https` 协议，则证书必须有效且不能是自签名证书。

这些要求会带来以下问题，而只要本地 Home Assistant URL 不是 `http://<local_ip>:<local_port>`，就都可能出问题：

- 它们会[拒绝自签名证书](#self-signed-certificates)。

- 它们使用 Google 的公共 DNS 服务器解析主机名，而不是 DHCP 提供的 DNS 服务器。此外，它们也不会通过 mDNS 解析本地主机名。这意味着它们无法处理通过本地命名机制建立的主机名 URL。举例来说，假设您的 Home Assistant 实例运行在一台本地通过 DNS 被称为 `ha`、通过 mDNS 被称为 `homeassistant.local` 的机器上。您局域网内的所有设备都可以通过 `ha` 或 `homeassistant.local` 访问它。但无论怎样尝试，您的 Cast 设备都无法从 `ha` 这台机器下载媒体文件。原因是 Cast 设备会忽略本地命名设置。在这个例子中，`say` 操作会生成类似 `http://ha/path/to/media.mp3` 的 URL（如果使用 SSL 则为 `https://...`）。如果您*没有*使用 SSL，那么将内部 URL 设置为服务器的 IP 地址就可以绕开这个问题。使用 IP 地址后，Cast 设备就不需要解析主机名了。

- 如果您正在使用 SSL（例如 `https://yourhost.example.org/...`），那么您*必须*使用证书中的主机名（例如 `external_url: https://yourhost.example.org`）。不能改用 IP 地址，因为证书对该 IP 地址无效，而 Cast 设备会拒绝连接。

克服这些问题的推荐方式是：不要手动配置本地 Home Assistant URL。

### 音频不完整、损坏或无音频

当音频格式未被完全支持时，一些媒体播放器可能只能播放部分音频、播放损坏音频，甚至完全无声。在这种情况下，通常需要利用 [preferred audio settings](#preferred-audio-settings) 选项，尝试不同的音频格式、声道数、采样率和位深组合。

例如，某些 Google Cast 设备在音频采样率为 22050Hz 时会跳过开头的一小段音频。要修复这个问题，需要在 `options` 中将 `preferred_sample_rate` 设为 `44100`。
