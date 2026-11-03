# Assist 的唤醒词

唤醒词是一些特殊词语或短语，用来告诉语音助手接下来将会说出命令。设备随后会从被动聆听切换为主动聆听。常见示例包括：Hey Google、Hey Siri 或 Alexa。Home Assistant 也支持自己的唤醒词，例如 Okay Nabu。

如果你想进一步了解这个主题，请查看[Home Assistant 对唤醒词的实现方式](/home-assistant/voice_control/about_wake_word/index.md)。

## 启用唤醒词

本教程介绍如何在 Home Assistant 中*启用*唤醒词，但不包含如何*使用*它的说明。

要*使用*唤醒词，你需要一些额外硬件。一个低成本选择是 [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit)。要完成设置，请参阅[$13 语音助手 for Home Assistant](/home-assistant/voice_control/thirteen-usd-voice-remote/index.md)。

启用唤醒词分为 2 个步骤：

1. 安装 **openWakeWord** 应用。
2. 为特定语音助手启用唤醒词。

### 前提条件

* Home Assistant 版本 2023.10 或更高版本，且通过 Home Assistant Operating System 安装
* Assist 已配置为使用 [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/index.md) 或手动配置的[本地 Assist 管线](/home-assistant/voice_control/voice_remote_local_assistant.md)
* 我们推荐的所有[最佳实践](/home-assistant/voice_control/best_practices.md)。

### 安装 openWakeWord 应用

1. 前往 [**设置** > **应用** > **openWakeWord**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openwakeword) 并选择 **安装**。
2. **启动** 该应用。
3. 前往 [**设置** > **设备 & 服务**](https://my.home-assistant.io/redirect/integrations/)。
   * 在 **Discovered** 下，你现在应该能看到 **Wyoming** 集成中的 **openWakeWord** 组件。
   * 选择 **配置**，然后点击 **Submit**。
   * **结果**：你已成功安装 **openWakeWord** 应用和 **Wyoming** 集成。

### 为语音助手启用唤醒词

1. 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)
2. 选择 Assistant：
   * 如果要为现有语音助手启用唤醒词，请选择该语音助手并继续执行第 6 步。
   * 如果要创建新的语音助手：选择 **Add 语音助手**。
3. 给你的语音助手起个名字，例如你打算使用的唤醒词。
4. 选择你将用于与 Home Assistant 对话的语言。
   * 如果 **Text-to-speech** 和 **Speech-to-text** 部分没有提供语言选择器，说明你尚未设置 Assist 管线。
   * 请设置 [Home Assistant Cloud](https://www.nabucasa.com) 或手动配置的 [Assist 管线](/home-assistant/voice_control/voice_remote_local_assistant.md)。
5. 在 **Text-to-speech** 下，选择 Home Assistant 对你说话时要使用的语言和声音。
6. 要定义唤醒词引擎，请在对话框右上角选择三点菜单 `[mdi:dots-vertical]`，然后选择 **Add streaming wake word**。
   * **故障排除**：如果你看不到三点菜单 `[mdi:dots-vertical]`，请前往 [**设置** > **设备 & 服务**](https://my.home-assistant.io/redirect/integrations/) 并确认已添加 **Wyoming** 集成中的 **openWakeWord** 组件。
   * **结果**：现在你会在页面底部看到一个新的 **Streaming wake word engine** 部分。
   * 选择 **openwakeword**，然后选择 **ok nabu**。
   * 如果你创建的是新语音助手，请选择 **Create**。
   * 如果你编辑的是现有语音助手，请选择 **更新**。
   * **结果**：你现在拥有了一个会监听唤醒词的语音助手。
7. 首次运行时，建议先使用 **ok nabu**，仅用于测试设置。
   * 完成所有设置后，你就可以创建自己的唤醒词。

## 试试看！

目前有两种简单方式可以开始使用唤醒词：

* 按照[设置 $13 语音助手](/home-assistant/voice_control/thirteen-usd-voice-remote/index.md)的指南操作。这个教程使用小巧的 ATOM Echo，通过 openWakeWord 检测唤醒词。
* 按照[设置 ESP32-S3-BOX-3 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/index.md)的指南操作。这个教程使用带显示屏、体积更大的 S3-BOX-3 设备。它可以使用 openWakeWord 检测唤醒词，也可以使用 microWakeWord 进行设备端唤醒词检测。

## 创建你自己的唤醒词

你现在可以创建自己的唤醒词并在 Home Assistant 中使用。下面的流程将指导你训练一个模型。该模型使用由我们的本地神经网络文本转语音系统 [Piper](https://github.com/OHF-Voice/piper1-gpl) 生成的语音片段来进行训练。

*想进一步了解整个过程如何工作？请查看 David Scripka 的 [openWakeWord](https://github.com/dscripka/openWakeWord) 项目。*

根据词语不同，为你自己的唤醒词训练模型可能需要多次尝试和一些微调。本指南会一步一步带你完成整个过程。

### 前提条件

* 最新版本的 Home Assistant，且通过 Home Assistant Operating System 安装
* [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit)
* 已成功完成[$13 语音助手 for Home Assistant](/home-assistant/voice_control/thirteen-usd-voice-remote/index.md)教程

### 创建你自己的唤醒词

1. 想一个唤醒词。
   * 选择一个不常被使用的词或短语（3-4 个音节），以免误触发 Assist。
   * 目前仅支持英语唤醒词。

2. 打开[唤醒词训练环境](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb?usp=sharing#scrollTo=1cbqBebHXjFD)。

3. 在第 1 节中，在 **target\_word** 字段里输入你的唤醒词。
   ![Enter wake word in target field](/home-assistant/images/assist/wake_word_enter_target_word.png)

4. 在 **target\_word** 旁边的代码区域中，选择播放按钮。第一次运行可能需要最多 30 秒。
   * 如果没有看到播放按钮，请确认光标放在 **target\_word** 字段中。
     ![Select play button](/home-assistant/images/assist/wake_word_press_play_button.png)
   * 如果仍然没有显示，请确认文档右上角显示的是 **Connected**。
     * 如果未连接，请选择 **Connect to a hosted runtime**。
       ![Connect to hosted runtime](/home-assistant/images/assist/wake_word_connect_to_hosted_runtime.png)
   * **结果**：你的唤醒词发音正在被创建。

     * 完成后，你会在本节底部看到一个音频文件。请试听它。

     ![Listen to demo of your wake word](/home-assistant/images/assist/wake_word_listen_demo.png)

5. 如果这个词听起来不正确：
   * 按照文档中的说明调整拼写，然后再次点击播放。
   * 这个词应当听起来像你平时的发音。

6. 一旦你对结果满意，请在屏幕顶部菜单中选择 **Runtime** > **Run all**。
   * 这大约需要一个小时。期间你可以去做别的事情，但请保持浏览器标签页打开。
     ![Runtime: run all](/home-assistant/images/assist/wake_word_runtime_run_all.png)
   * **结果**：流程完成后，你的下载文件夹中应该会有 2 个文件：
     * `.tflite` 和 `.onnx` 文件（实际只会用到 `.tflite`）

7. 恭喜！你刚刚使用机器学习创建了自己的唤醒词模型！
   * 下一步是将它添加到 Home Assistant。

### 将你的个人唤醒词添加到 Home Assistant

1. 确保你已经[安装 Samba 应用](/home-assistant/common-tasks/os/index.md#configuring-access-to-files)。
2. 在电脑上，通过 Samba 访问你的 Home Assistant 服务器。
   * 打开 `share` 文件夹并创建一个新文件夹 `openwakeword`，这样你就会得到 `/share/openwakeword`。
3. 将你刚创建好的唤醒词模型文件（`.tflite`）放入该文件夹。
4. 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)。
   * 你可以创建一个新语音助手并选择 **Add 语音助手**。
   * 或者编辑现有语音助手。
5. 在 **Wake word** 下，选择 **openwakeword**。
   * 然后选择你自己的个人唤醒词。
   * 如果没有 **Wake word** 选项，请确认你已经安装好应用，并已成功完成[$13 语音助手 for Home Assistant](/home-assistant/voice_control/thirteen-usd-voice-remote/index.md)教程。
6. 在你的 ATOM Echo 设备上启用这个新的语音助手。
   * 前往 [**设置** > **设备 & 服务**](https://my.home-assistant.io/redirect/integrations/) 并选择 **ESPHome** 集成。
     * 在 **M5Stack ATOM Echo** 下，选择 **1 设备**。
   * 在 **配置** 下，确认 **Use wake word** 已启用。
   * 选择带有你的唤醒词的语音助手。

     ![Select the assistant with your wake word](/home-assistant/images/assist/wake_word_select_assistant.png)
7. 测试你的新唤醒词。
   * 说出你的唤醒词，然后接一个命令，例如 “打开厨房里的灯光”。
   * 当 ATOM Echo 检测到唤醒词时，它会开始闪烁蓝灯。

## 故障排除

### 唤醒词识别故障排除

1. 如果你说出唤醒词后，ATOM Echo 没有开始闪烁蓝灯，可以尝试以下方法。
2. 前往 [**设置** > **设备 & 服务**](https://my.home-assistant.io/redirect/integrations/) 并选择 **ESPHome** 集成。
   * 在 **M5Stack ATOM Echo** 下，选择 **1 设备**。
   * 在 **Controls** 下，确认 **Use wake word** 已启用。
3. 如果问题不在这里，你可能需要微调唤醒词模型。
   * 返回[唤醒词训练环境](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb?usp=sharing#scrollTo=1cbqBebHXjFD)。
   * 在文档第 3 节中，按照说明微调设置并创建新模型。

### 训练环境性能问题故障排除

Colab 空间中的运行环境使用的是 Google 提供的资源。这些资源面向小规模、非商业的个人使用场景，并不保证始终可用。
如果很多人同时使用该环境，或者请求本身消耗大量资源，执行速度可能会非常慢，甚至完全无法运行。

整个运行过程可能需要 30-60 分钟，这是预期行为。

如果执行非常慢，你可以尝试以下做法：

1. 免费方案：这个环境已经成功用于训练所有为创建和测试本流程而制作的唤醒词模型，因此它很可能也能为你工作。如果这次不行，换个时间再训练一次。也许此刻使用人数太多。
2. 你也可以付费获得更多计算资源：在右上角选择 RAM | Disk 图标。
   * 选择 **升级到 Colab Pro** 链接。
   * 选择你的套餐并按照屏幕上的说明操作。
     ![Connect to hosted runtime](/home-assistant/images/assist/wake_word_upgrade_to_colab.png)
