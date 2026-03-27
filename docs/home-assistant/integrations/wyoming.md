---
title: Wyoming Protocol
description: 'Wyoming 集成使用一种轻量协议(https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md)将外部语音服务连接到 Home Assistant。这使得 Assist(/home-assistant/voicecontrol/)。'
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@synesthesiam'
ha_domain: wyoming
ha_integration_type: service
ha_platforms:
  - assist_satellite
  - binary_sensor
  - conversation
  - number
  - select
  - stt
  - switch
  - tts
  - wake_word
ha_config_flow: true
ha_zeroconf: true
---
# Wyoming Protocol

**Wyoming** 集成使用一种[轻量协议](https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md)将外部语音服务连接到 Home Assistant。这使得 [Assist](/home-assistant/voice_control/) 可以使用多种本地的[语音转文本](/home-assistant/integrations/stt/)、[文本转语音](/home-assistant/integrations/tts/)和[唤醒词检测](/home-assistant/integrations/wake_word/)系统，例如：

- Speech-to-Phrase [![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_speech-to-phrase)
- Whisper [![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_whisper)
- Piper [![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_piper)
- openWakeWord [![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openwakeword)

### 安装本地语音流水线

Home Assistant 的 Wyoming、Piper 和 Whisper 应用（以前称为附加组件）可用于创建完全本地化的语音流水线。要了解具体做法，请按照[安装本地语音流水线](/home-assistant/voice_control/voice_remote_local_assistant/)中的步骤操作。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 卫星设备

[远程语音卫星设备](https://github.com/rhasspy/wyoming-satellite)可以通过 Wyoming 协议连接到 Home Assistant。这些卫星设备通常运行在 Raspberry Pi 上，并由 Home Assistant 通过 [Zeroconf](/home-assistant/integrations/zeroconf) 自动发现。


### 音频设置

以下设置用于控制卫星设备麦克风输入的音频处理：

- Noise suppression
    - 降噪级别（使用 [webrtc]）。级别越高，越可能出现音频失真。
- Auto gain
    - 根据环境噪声自动调节音量（使用 [webrtc]）。设置值为目标 dBFS。
- Mic volume
    - 应用于麦克风音频采样的固定倍数。2.0 表示音量加倍，0.5 表示减半。高于 1.0 的值可能增加噪声或导致音频失真。

[webrtc]: https://github.com/rhasspy/webrtc-noise-gain
