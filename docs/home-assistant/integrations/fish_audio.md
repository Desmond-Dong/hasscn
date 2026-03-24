---
title: Fish Audio
description: 关于如何为 Home Assistant 设置 Fish Audio 集成的说明。
ha_category:
  - Text-to-speech
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_domain: fish_audio
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@noambav'
ha_quality_scale: bronze
---

**Fish Audio** 集成为 Home Assistant 带来了高质量的语音克隆和多种公共声音。它提供文字转语音（<abbr title="text-to-speech">TTS</abbr>）服务，允许您创建富有表现力、类人的语音。

Fish Audio 定位为领先的语音克隆服务。它具有先进的 `s1` 模型系列，支持情感和语调标记，使语音更加自然。

## 前提条件

- 需要 [Fish Audio](https://fish.audio) 账户。
- 您需要一个 API 密钥，可以从 [Fish Audio API 密钥仪表板](https://fish.audio/app/api-keys)创建。
- 您的 Home Assistant 实例必须具有互联网访问权限才能访问 Fish Audio API。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

设置是一个两步过程。首先，您使用 API 密钥配置集成，然后您可以添加一个或多个声音。

### 初始设置

系统会要求您提供 [Fish Audio](https://fish.audio) API 密钥。提供后，集成将被添加。

### 添加声音

要添加文字转语音（TTS）声音，请在集成卡片上选择 **添加 TTS 声音** 按钮。您可以重复此过程来添加多个声音。

添加声音的过程涉及两个步骤：

1. 声音筛选：
   - 首先，您将选择是只查看您的私有克隆声音，还是也查看 Fish Audio 推荐的公共声音。
2. 声音配置：
   - 根据您的筛选选择，您将在下一个屏幕上看到以下选项：
      - **声音**：从可用声音的下拉列表中选择一个声音。您也可以输入来自 Fish Audio 网站的自定义声音 ID。
      - **AI 语音模型**：选择默认后端模型。`s1` 是最新和最先进的模型。`s1` 和 `v1.6` 模型都支持[情感标记](#using-with-large-language-models-llms)。
      - **延迟模式**：选择 `normal`（更好质量）或 `balanced`（更快速度）。
      - **名称**：设置将创建的 TTS 实体的名称。

您添加的每个声音都会创建一个新的 TTS 实体。

### 语言和口音

Fish Audio 根据输入文本确定口语语言，而不是声音的固定语言设置。这意味着您可以将英文文本提供给西班牙语声音，它将以西班牙口音说英语。同样，向英语声音提供西班牙语文本将导致以英语口音说西班牙语。

目前支持的语言包括：

- 阿拉伯语
- 中文
- 英语
- 法语
- 德语
- 日语
- 韩语
- 西班牙语
- 任意：选择 **任意** 允许 Fish Audio 根据输入文本自动确定口语语言，启用上述跨语言口音行为。

## 文字转语音（TTS）

`tts.speak` 服务允许您在自动化和脚本中使用 Fish Audio 声音。选择 `tts.fish_audio` 实体，选择一个媒体播放器，然后输入您的消息。

YAML 中 `tts.speak` 服务调用的示例：

```yaml
actions:
  - action: tts.speak
    target:
      entity_id: tts.fish_audio
    data:
      media_player_entity_id: media_player.living_room_speaker
      message: "Hello, this is a test of my new voice!"
      options:
        voice_id: "802e3bc2b27e49c2995d23ef70e6ac89"
        backend: "s1"
        latency: "normal"
```

### 在 Assist 管道中使用

您创建的 TTS 实体可以设置为您的 Assist 管道的声音。这允许您的语音助手使用高质量的 Fish Audio 声音进行响应。

要配置此设置：

1. 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)。
2. 选择您要配置的助手。
3. 在 **文字转语音** 部分，从下拉菜单中选择您创建的声音之一。

您的助手现在将使用您为 Fish Audio 集成配置的默认声音和模型进行语音响应。

### 与大型语言模型（LLM）一起使用

`s1` 和 `v1.6` 模型能够通过使用特殊的情感和语调标记来产生高度表现力的语音。要与大型语言模型（LLM）一起使用此功能，您可以在提示中添加说明，指导 LLM 在其响应中生成这些标记。有关可用标记的完整列表和更高级的示例，您可以参考[情感控制文档](https://docs.fish.audio/developer-guide/core-features/emotions)来帮助您制作完美的提示。

例如，您可以将您的主要请求与一组 LLM 说明结合起来，如下所示：

**提示：**
> 宣布房子现在进入电影模式。灯光已调暗，窗帘已关闭。

**LLM 的说明：**

```text
通过在文本前插入标记来应用情感控制。

- 使用情感标记：(angry)、(sad)、(excited)、(surprised)、(sarcastic)、(joyful)、(empathetic)
- 使用语调标记：(in a hurry tone)、(shouting)、(screaming)、(whispering)、(soft tone)
- 使用特殊标记：(laughing)、(chuckling)、(sobbing)、(sighing)、(panting)、(crowd laughing)
- 可选地使用标记添加拟声词，例如："Ha,ha,ha" 表示笑声。
- 将标记立即放在它们修饰的对话之前。
- 如果未指定标记，默认为中性。
```

LLM 可能会生成如下响应：

`(soft tone) 电影模式已激活。灯光已调暗，窗帘已关闭。(empathetic) 享受演出吧。`

## 故障排除

### 没有私有声音出现

#### 症状："没有可用的私有声音"

尝试在启用"仅私有模型"选项的情况下添加声音时，您的克隆声音不会出现在声音选择列表中。

#### 描述

这意味着您在 Fish Audio 账户中创建的私有声音尚无法通过 API 使用，或者它们尚未创建。

#### 解决方案

要解决此问题，请尝试以下步骤：

1. 确保您已在 [Fish Audio 账户](https://fish.audio/app/my-voices/)中创建了克隆声音。
2. 确保声音已完全处理并准备使用。
3. 创建后等待几分钟，让新声音通过 API 可用。

### TTS 实体显示为双重命名

如果 TTS 实体命名为"Adam"，它可能在界面中显示为"Adam Adam"。这是目前已知的 issue。
  
## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.