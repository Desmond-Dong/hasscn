---
title: Google Translate text-to-speech
description: 关于如何为 Home Assistant 设置 Google 翻译文字转语音的说明。
ha_category:
  - Text-to-speech
ha_release: 0.35
ha_iot_class: Cloud Push
ha_domain: google_translate
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
---

**Google Translate text-to-speech** 集成使用非官方的 [Google Translate text-to-speech engine](https://translate.google.com/) 以自然的语音朗读文本。与名称暗示的不同，此集成仅提供文字转语音功能，不会翻译发送给它的消息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

<details>
<summary><b>支持的语言</b></summary>
  
凡是在 Google Translate 中启用了“Talk”功能的语言都受支持。以下是 Google 当前支持的语言列表。
  
| Language Code | Language                      |
| ------------- | ----------------------------- |
| af            | Afrikaans                     |
| am            | Amharic                       |
| ar            | Arabic                        |
| bg            | Bulgarian                     |
| bn            | Bengali                       |
| bs            | Bosnian                       |
| ca            | Catalan                       |
| cs            | Czech                         |
| cy            | Welsh                         |
| da            | Danish                        |
| de            | German                        |
| el            | Greek                         |
| en            | English                       |
| es            | Spanish                       |
| et            | Estonian                      |
| eu            | Basque                        |
| fi            | Finnish                       |
| fil           | Filipino (Tagalog)            |
| fr            | French                        |
| gl            | Galician                      |
| gu            | Gujarati                      |
| ha            | Hausa                         |
| hi            | Hindi                         |
| hr            | Croatian                      |
| hu            | Hungarian                     |
| id            | Indonesian                    |
| is            | Icelandic                     |
| it            | Italian                       |
| iw            | Hebrew                        |
| ja            | Japanese                      |
| jw            | Javanese                      |
| km            | Khmer                         |
| kn            | Kannada                       |
| ko            | Korean                        |
| la            | Latin                         |
| lt            | Lithuanian                    |
| lv            | Latvian                       |
| ml            | Malayalam                     |
| mr            | Marathi                       |
| ms            | Malay                         |
| my            | Myanmar (Burmese)             |
| ne            | Nepali                        |
| nl            | Dutch                         |
| no            | Norwegian                     |
| pa            | Punjabi                       |
| pl            | Polish                        |
| pt            | Portuguese (Portugal, Brazil) |
| ro            | Romanian                      |
| ru            | Russian                       |
| si            | Sinhala (Sinhalese)           |
| sk            | Slovak                        |
| sq            | Albanian                      |
| sr            | Serbian                       |
| su            | Sundanese                     |
| sv            | Swedish                       |
| sw            | Swahili                       |
| ta            | Tamil                         |
| te            | Telugu                        |
| th            | Thai                          |
| tl            | Tagalog (Filipino)            |
| tr            | Turkish                       |
| uk            | Ukrainian                     |
| ur            | Urdu                          |
| vi            | Vietnamese                    |


</details>

请查看[受支持 tld 的完整列表](https://www.google.com/supported_domains)，了解允许使用的 TLD 值。当多个方言共用同一个两位语言代码时（例如 _US、UK、AU_），此项可用于强制指定所使用的方言。

您也可以使用下方所示的受支持 BCP 47 标签，或使用 2-2 位格式来表示受支持的方言（如 `en-gb` 或 `en-us`）。以下是当前已实现的映射列表：

| Dialect | Language | TLD    |
| ------- | -------- | ------ |
| en-us   | en       | com    |
| en-gb   | en       | co.uk  |
| en-uk   | en       | co.uk  |
| en-au   | en       | com.au |
| en-ca   | en       | ca     |
| en-in   | en       | co.in  |
| en-ie   | en       | ie     |
| en-za   | en       | co.za  |
| fr-ca   | fr       | ca     |
| fr-fr   | fr       | fr     |
| pt-br   | pt       | com.br |
| pt-pt   | pt       | pt     |
| es-es   | es       | es     |
| es-us   | es       | com    |


## speak 操作

`tts.speak` 是使用 Google Translate TTS 的现代方式。添加 `speak` 操作后，选择您的 Google Translate TTS 实体（其名称通常基于创建时所选语言），再选择要接收 TTS 音频的媒体播放器实体或组，并输入要朗读的消息。

有关 `speak` 的更多选项，请参阅主 [TTS](/home-assistant/integrations/tts/#action-speak) 构建块页面中的 Speak 章节。

在 YAML 中，您的操作将如下所示：
```yaml
action: tts.speak
target:
  entity_id: tts.google_en_com
data:
  media_player_entity_id: media_player.giant_tv
  message: Hello, can you hear me now?
```

## say 操作（旧版）

:::tip
当您在 `configuration.yaml` 中配置旧版 `google_translate` text-to-speech 平台时，可以使用 `google_translate_say` 操作。我们建议新用户改为通过 UI 设置该集成，并使用 `tts.speak` 操作，将相应的 Google Translate text-to-speech 实体作为目标。
:::

`google_translate_say` 操作支持通过 `language` 设置语言，也支持通过 `options` 设置 `tld`。要朗读的文本通过 `message` 指定。自 0.92 版本起，操作名称还可以通过配置中的 `service_name` 选项定义。

对所有 `media_player` 设备实体进行播报：

```yaml
# Replace google_translate_say with <platform>_say when you use a different platform.
action: tts.google_translate_say
data:
  entity_id: all
  message: "May the force be with you."
```

对 `media_player.floor` 设备实体进行播报：

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
```

使用法语对 `media_player.floor` 设备实体进行播报：

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "Que la force soit avec toi."
  language: "fr"
```

使用英式英语对 `media_player.floor` 设备实体进行播报：

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
  language: "en-uk"
```

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
  language: "en"
  options:
    tld: co.uk
```

使用模板：


```yaml
action: tts.google_translate_say
data:
  message: "Temperature is {{states('sensor.temperature')}}."
  cache: false
```


有关在 Home Assistant 中使用文字转语音以及所有可用选项的更多信息，请参阅 [TTS 文档](/home-assistant/integrations/tts/)。
