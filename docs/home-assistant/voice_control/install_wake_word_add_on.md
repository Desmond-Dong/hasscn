---
title: 启用唤醒词
---

本教程介绍如何在 Home Assistant 中*启用*唤醒词，但不包含如何*使用*唤醒词的内容。

如果要*使用*唤醒词，您需要额外的硬件。一个低成本选项是 [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit)。如需设置，请参考[$13 的 Home Assistant 语音助手](/home-assistant/voice_control/thirteen-usd-voice-remote/)。请注意，Home Assistant Voice Preview 目前不支持自定义唤醒词。

## 启用唤醒词

启用唤醒词包含 2 个步骤：

1. 安装 **openWakeWord** 应用（旧称加载项）。
2. 为指定语音助手启用唤醒词。

### 前提条件

- 已安装 Home Assistant Operating System 的 Home Assistant 2023.10 或更高版本
- [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/) 或手动配置的[本地 Assist 流水线](/home-assistant/voice_control/voice_remote_local_assistant)

### 安装 openWakeWord 应用

1. 前往 [**设置** > **应用** > **openWakeWord**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openwakeword)，然后选择 **安装**。
2. **启动** 该应用。
3. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
   - 在 **已发现** 下，您现在应该能看到 **Wyoming** 集成中的 **openWakeWord** 组件。
   - 选择 **配置**，然后选择 **提交**。
   - **结果**：您已成功安装 openWakeWord 应用和 Wyoming 集成。

### 为语音助手启用唤醒词

1. 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)
2. 选择助手：
   - 如果要为现有助手启用唤醒词，请选择该助手并继续执行第 6 步。
   - 如果要创建新的助手，请选择 **添加助手**。
3. 为助手命名，例如使用您打算启用的唤醒词名称。
4. 选择您将用于与 Home Assistant 对话的语言。
   - 如果 **文本转语音** 和 **语音转文本** 部分没有提供语言选择器，表示您尚未设置 Assist 流水线。
   - 请设置 [Home Assistant Cloud](https://www.nabucasa.com) 或手动配置的 [Assist 流水线](/home-assistant/voice_control/voice_remote_local_assistant)。
5. 在 **文本转语音** 下，选择您希望 Home Assistant 对您说话时使用的语言和声音。
6. 要定义唤醒词引擎，请在对话框右上角选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **添加流式唤醒词**。
   - **故障排除**：如果您看不到三点 `[mdi:dots-vertical]` 菜单，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，并确认已添加 **Wyoming** 集成中的 **openWakeWord** 组件。
   - **结果**：页面底部现在会出现新的 **流式唤醒词引擎** 部分。
   - 选择 **openwakeword**，然后选择 **ok nabu**。
   - 如果您创建的是新助手，请选择 **创建**。
   - 如果您编辑的是现有助手，请选择 **更新**。
   - **结果**：您现在拥有了一个会监听唤醒词的语音助手。
7. 首次使用时，建议先使用 **ok nabu** 测试设置。
   - 全部设置完成后，您可以[创建自己的唤醒词](/home-assistant/voice_control/create_wake_word/)。

## 相关主题

### 关于唤醒词和助手

- [创建自己的唤醒词](/home-assistant/voice_control/create_wake_word/)
- [关于唤醒词](/home-assistant/voice_control/about_wake_word/)
- [创建云端助手](/home-assistant/voice_control/voice_remote_cloud_assistant/)
- [创建本地助手](/home-assistant/voice_control/voice_remote_local_assistant)

### 用于唤醒词的额外硬件

- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit)
  - [教程：$13 的 Home Assistant 语音助手](/home-assistant/voice_control/thirteen-usd-voice-remote/)
- [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html)
  - [教程：ESP32-S3-BOX-3 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/)
