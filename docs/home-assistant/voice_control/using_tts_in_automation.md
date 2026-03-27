---
title: 在自动化中使用 Piper TTS
description: '本教程介绍如何创建一个文本转语音操作。这里我们会使用本地文本转语音引擎 Piper 和媒体播放器实体。这样一来，Home Assistant 就可以在自动化中通过媒体播放器向您播报内容。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 在自动化中使用 Piper TTS

本教程介绍如何创建一个文本转语音操作。这里我们会使用本地文本转语音引擎 Piper 和媒体播放器实体。这样一来，Home Assistant 就可以在自动化中通过媒体播放器向您播报内容。

1. 前往 **[设置 > 自动化与场景](https://my.home-assistant.io/redirect/automation/)**，然后选择 **创建自动化**。
2. 选择 **创建新自动化**，然后选择 **添加操作**。
3. 在下拉菜单中搜索或选择 **TTS: Speak**。
   ![选择 TTS 操作](/home-assistant/images/assist/speak-action.png)
4. 如果要使用完全本地的文本转语音处理，请在 **选择实体** 中选择 **piper**。
   ![选择 Piper](/home-assistant/images/assist/select-entity.png)
5. 选择此自动化要使用的媒体播放器。
6. 输入您希望此自动化播报的文本。
   ![输入要播报的文本](/home-assistant/images/assist/media-message.png)
7. 现在，这个文本转语音操作已经可以在脚本或自动化中使用了。
8. 保存该操作。
