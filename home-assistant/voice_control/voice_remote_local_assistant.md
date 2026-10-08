# 入门 - 本地

使用 Assist 最简单、最高效的方式，是利用 [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/index.md) 中提供的语音服务，包括语音转文本和文本转语音。

如果您想搭建完全本地化的语音助手，请按照本页的设置流程操作。

## 前提条件

要让 Assist 能够与您的 Home Assistant 交互，您的环境需要具备听取语音、理解语音，并进行语音回复的能力。

在 Home Assistant 中，Assist 流水线由多个组件组成，这些组件共同构成一个语音助手。对于每个组件，您都可以选择不同的方案。

* 要负责收听和回复，需要您的手机安装 Home Assistant 应用，或使用支持语音唤醒的设备
* 要负责理解语音，需要集成语音转文本和文本转语音软件
* 要把这些组件整合在一起运行，需要 Home Assistant Operating System

## 语音转文本和文本转语音选项

有一些语音转文本和文本转语音方案可以完全在本地运行，不会把数据发送到外部服务器处理。

### 语音转文本引擎

目前可在本地运行的语音转文本方案有两种：**Speech-to-Phrase** 和 **Whisper**。

#### Speech-to-Phrase

[Speech-to-Phrase](https://github.com/OHF-voice/speech-to-phrase) 是一种封闭式语音模型。

* 它只会转录自己已知的内容
* 即使在 Home Assistant Green 或 Raspberry Pi 4 上，转录速度也非常快，通常不到 1 秒
* 只支持 Assist 的一部分语音命令
  * 像购物清单、计时器命名、广播等更开放式的内容，默认无法直接使用
* Speech-to-Phrase 支持[多种语言](https://github.com/OHF-voice/speech-to-phrase?tab=readme-ov-file#supported-languages)
* 这些特性让它非常适合家庭控制场景

#### Whisper

[Whisper](https://github.com/openai/whisper) 是一种开放式语音模型。

* 它会尽量转录所有听到的内容
* 代价是处理速度较慢：
  * 在 Raspberry Pi 4 上，处理一条语音命令大约需要 8 秒
  * 在 Intel NUC 上，则可以在 1 秒内完成
* 支持[多种语言](https://github.com/openai/whisper#available-models-and-languages)
* Whisper 更适合以下情况：
  1. 您家中有较强的硬件性能
  2. 您计划把语音系统扩展到简单家庭控制之外，例如与基于 LLM 的代理配合使用

### 文本转语音引擎

在文本转语音方面，我们开发了 [Piper](https://github.com/OHF-Voice/piper1-gpl)。Piper 是一个快速的本地神经网络文本转语音系统，声音效果很好，并针对 Raspberry Pi 4 做了优化。它支持[多种语言](https://rhasspy.github.io/piper-samples/)。在 Raspberry Pi 上使用中等质量模型时，它可以在 1 秒内生成约 1.6 秒的语音。

请务必确认这些方案在您所使用语言中的表现，因为不同语言之间的效果差异可能较大。

## 安装本地 Assist 流水线

如果您想尽快启用本地 Assist 流水线，请按以下步骤操作：

1. 安装文本转语音和语音转文本应用。
   * 安装您选择的语音转文本应用：**Speech-to-Phrase** 或 **Whisper**。
   * 安装 **Piper** 用于文本转语音。
   * 启动这些应用。
   * 应用启动后，前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 中的集成页面。
     * 您现在应该能看到这两个服务都被 [Wyoming 集成](/home-assistant/integrations/wyoming/index.md) 发现。
       ![Whisper 和 Piper 集成](/home-assistant/images/assist/piper-whisper-install-new-02.png)
   * 对每个集成都选择 **添加**。
   * 现在，您已经集成了本地语音转文本引擎（**Speech-to-Phrase** 或 **Whisper**）以及文本转语音引擎（**Piper**）。

2. 设置您的助手。

   * 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)，然后选择 **添加助手**。
     ![输入语音助手名称](/home-assistant/images/assist/piper-whisper-install-05.png)

     * **故障排除**：如果这里没有显示任何助手，说明您没有使用默认配置。此时，您需要在 `configuration.yaml` 文件中添加以下内容：

       ```yaml
       # Example configuration.yaml entry
       assist_pipeline:
       ```

   * 输入一个名称，使用任何对您有意义的名称即可。

   * 选择您希望使用的语言。

   * 在 **对话代理** 下，选择 **Home Assistant**。

   * 在 **语音转文本** 下，选择您在前一步中安装的引擎（**Whisper** 或 **Speech-to-Phrase**），然后选择语言。

   * 在 **文本转语音** 下，选择 **Piper**，然后选择语言。
     * 根据语言不同，您可能还可以选择不同的语言变体。

3. 完成后，您的语音命令就可以在本地设备上处理了。

4. 如果您还没有这样做，请[将设备暴露给 Assist](/home-assistant/voice_control/voice_remote_expose_devices/index.md)。
   * 否则，您将无法通过语音控制这些设备。

## 微调 Whisper 和 Piper 设置

如果您想进一步优化性能或准确率，可以查看下面的视频。视频由 Rhasspy、Piper 和 Wyoming 的创建者 Mike Hansen 讲解。

<lite-youtube videoid="Tk-pnm7FY7c" videoStartAt="1589" videotitle="配置本地 Assist 流水线"></lite-youtube>

相关选项也在应用本身中提供了文档。前往 **Whisper** 或 **Piper** 应用，然后打开 **文档** 页面。

此外，建议您查看关于[在自动化中使用 Piper](/home-assistant/voice_control/using_tts_in_automation/index.md)的专门教程。

## 进一步了解 Speech-to-Phrase

您可以阅读 [Voice Chapter 9](/home-assistant/blog/2025/02/13/voice-chapter-9-speech-to-phrase/)，了解我们为什么引入 Speech-to-Phrase，以及为什么它非常适合家庭控制。

<lite-youtube videoid="k6VvzDSI8RU" videotitle="Voice Chapter 9"></lite-youtube>

## 后续步骤

* 如果您想获得更好的语音交互体验，请查看[最佳实践](/home-assistant/voice_control/best_practices/index.md)
* 配置好 Assist 后，您就可以开始使用它了
  * 您可以通过已连接的设备与 Assist 对话，例如 [Android](/home-assistant/voice_control/android/index.md)、[iOS](/home-assistant/voice_control/apple/index.md)，或 [Voice Preview Edition](https://support.nabucasa.com/hc/en-us/categories/24451727188125-Home-Assistant-Voice-Preview-Edition)
