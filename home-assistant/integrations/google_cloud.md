# Google Cloud

**Google Cloud** 集成允许您使用 [Google Cloud Platform](https://cloud.google.com/) API 并将其集成到 Home Assistant 中。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 获取服务账户文件

1. 访问 [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager)。
2. 点击顶部的 `CREATE PROJECT` 按钮。
3. 指定方便的 `Project name` 并点击 `CREATE` 按钮。
4. [确保您的 Google Cloud Platform 项目已启用账单功能](https://cloud.google.com/billing/docs/how-to/modify-project)。
5. 通过访问以下链接之一或 [APIs 库](https://console.cloud.google.com/apis/library) 启用所需的 Cloud API，从下拉列表中选择您的 `Project` 并点击 `Continue` 按钮：

   * [Text-to-speech](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
   * [Speech-to-text](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com)
6. 设置身份验证：

   1. 访问[此链接](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
   2. 从 `Service account` 列表上方的工具栏中，选择 `Create service account`。
   3. 在 `Service account name` 字段中输入任意名称。

   如果您正在请求 text-to-speech API 密钥：

   4. 不要从角色列表中选择值。**访问此服务不需要角色**。
   5. 点击 `Create`。如果出现警告该服务账户没有角色的提示，您可以忽略。
   6. 返回 `Service account` 列表页面，点击您在第 5 步创建的服务账户以查看该服务账户的详情。
   7. 选择该服务账户详情视图中的 `Keys` 标签页。
   8. 在 `Add Key` 下拉菜单中，选择 `Create New Key`。
   9. 指定 `JSON` 密钥类型并点击 `Create`。
   10. 一个 `[serviceaccountname].json` 文件将下载到您的浏览器。
   11. 在集成设置时上传此文件。

## Google Cloud text-to-speech

[Google Cloud text-to-speech](https://cloud.google.com/text-to-speech/) 将文本转换为类人语音，支持 [50 多种语言和变体的 380 多种语音](https://cloud.google.com/text-to-speech/docs/voices)。它应用语音合成方面的突破性研究和 Google 强大的神经网络来提供高保真音频。通过这个易于使用的 API，您可以创建与用户的逼真交互，从而改变客户服务、设备交互和其他应用程序。

### 定价

Cloud text-to-speech API 根据发送给服务以合成为音频的字符数按月定价。有关最新定价，请参见[此处](https://cloud.google.com/text-to-speech/pricing)。

### Text-to-speech 配置

以下设置可以在集成的选项和 `tts.speak` 服务的 `options` 参数中配置。

```yaml
language:
  description: "语音的默认语言，例如 `en-US`。支持的语言、性别和语音列在[此处](https://cloud.google.com/text-to-speech/docs/voices)。还有一些额外的未记录但支持的语言（参见[此处](https://cloud.google.com/text-to-speech/#streaming_demo_section)的下拉菜单）。"
  required: false
  type: string
  default: en-US
gender:
  description: "语音的默认性别，例如 `male`。支持的语言、性别和语音列在[此处](https://cloud.google.com/text-to-speech/docs/voices)。"
  required: false
  type: string
  default: neutral
voice:
  description: "默认语音名称，例如 `en-US-Wavenet-F`。支持的语言、性别和语音列在[此处](https://cloud.google.com/text-to-speech/docs/voices)。**重要！如果设置，此参数将覆盖 `language` 和 `gender` 参数**。"
  required: false
  type: string
encoding:
  description: "默认音频编码器。支持的编码有 `ogg_opus`、`mp3` 和 `linear16`。"
  required: false
  type: string
  default: mp3
speed:
  description: "语音的默认速率/速度，范围为 [0.25, 4.0]。1.0 是特定语音支持的正常原生速度。2.0 是两倍快，0.5 是半速。如果未设置(0.0)，默认为原生 1.0 速度。"
  required: false
  type: float
  default: 1.0
pitch:
  description: "语音的默认音调，范围为 [-20.0, 20.0]。20 表示从原始音调提高 20 个半音。-20 表示从原始音调降低 20 个半音。"
  required: false
  type: float
  default: 0.0
gain:
  description: "语音的默认音量增益（以 dB 为单位），范围为 [-96.0, 16.0]。如果未设置，或设置为 0.0 (dB)，将以正常原生信号幅度播放。-6.0 (dB) 的值将以大约正常原生信号幅度的一半播放。+6.0 (dB) 的值将以大约正常原生信号幅度的两倍播放。强烈建议不要超过 +10 (dB)，因为超过该值的任何值通常不会有有效的响度增加。"
  required: false
  type: float
  default: 0.0
profiles:
  description: "一个标识符，用于选择应用于（后合成的）text-to-speech 的'音频效果'配置文件。效果按给定的顺序叠加应用。支持的配置文件 ID 列在[此处](https://cloud.google.com/text-to-speech/docs/audio-profiles)。"
  required: false
  type: list
  default: "[]"
text_type:
  description: "默认文本类型。支持的文本类型有 `text` 和 `ssml`。阅读更多关于那是什么以及如何使用 SSML 的信息[此处](https://cloud.google.com/text-to-speech/docs/ssml)。"
  required: false
  type: string
  default: "text"
```

### 动作 speak

`tts.speak` 动作是使用 Google Cloud TTS 动作的现代方式。添加 `speak` 动作，选择您的 Google Cloud TTS 实体，选择要发送 TTS 音频的媒体播放器实体或组，并输入要朗读的消息。

有关 `speak` 的更多选项，请参阅主 [TTS](/home-assistant/integrations/tts/index.md#action-speak) 构建块页面上的 Speak 部分。

`tts.speak` 服务调用可能如下所示：

```yaml
action: tts.speak
target:
  entity_id: tts.google_cloud
data:
  cache: true
  media_player_entity_id: media_player.living_room_display
  message: this is a test
  language: en-US
  options:
    gender: male
    voice: en-US-Wavenet-F
    encoding: linear16
    speed: 0.9
    pitch: -2.5
    gain: -5.0
    text_type: ssml
    profiles:
      - telephony-class-application
      - wearable-class-device
```

## 动作 say（旧版）

`tts.google_cloud_say` 动作可在 `configuration.yaml` 中配置旧版 `google_cloud` text-to-speech 平台时使用。我们建议新用户改为在 UI 中设置集成，并使用 `tts.speak` 动作，以相应的 Google Cloud text-to-speech 实体为目标。如果您是 `tts.google_cloud_say` 的现有用户，您仍然可以使用它，但不要删除 `configuration.yaml` 中的旧版 `google_cloud` text-to-speech 平台。如果您删除它，您将必须手动迁移到 `tts.speak`。

## Google Cloud speech-to-text

[Google Cloud speech-to-text](https://cloud.google.com/speech-to-text) 将音频转换为文本转录，支持 [125 种语言和变体](https://cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages)。

### 定价

Speech-to-text 根据服务每月成功处理的音频量定价，以一秒为增量计量。有关最新定价，请参阅 Speech-to-text v1 API 下方的[此处](https://cloud.google.com/speech-to-text/pricing)。

### Speech-to-text 配置

```yaml
stt_model:
  description: "[此处](https://cloud.google.com/speech-to-text/docs/transcription-model)的转录模型之一。默认为 `latest_short`，因为这是推荐的模型。如果您遇到：`400 Invalid recognition 'config': The requested model is currently not supported for language : <language code>`，请尝试将其更改为旧版 `command_and_search`。"
  required: false
  type: string
```
