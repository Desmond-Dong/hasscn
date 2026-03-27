---
title: Home Assistant Cloud
description: 'Home Assistant Cloud 允许您快速将本地 Home Assistant 与各种云服务集成，例如：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: '0.60'
ha_category:
  - Backup
  - Speech-to-text
  - Text-to-speech
  - Voice
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: cloud
ha_platforms:
  - binary_sensor
  - conversation
  - stt
  - tts
ha_integration_type: system
related:
  - url: https://support.nabucasa.com/hc/categories/24734619902749
    title: Home Assistant Cloud user documentation
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Setting up a voice Assistant with Home Assistant Cloud
---
# Home Assistant Cloud

Home Assistant Cloud 允许您快速将本地 Home Assistant 与各种云服务集成，例如：

- [Amazon Alexa](https://support.nabucasa.com/hc/articles/25619363899677)
- [Google Assistant](https://support.nabucasa.com/hc/articles/25619376817053)
- [安全远程访问](https://support.nabucasa.com/hc/sections/26496346499997)
- [语音转文字](https://support.nabucasa.com/hc/articles/29718084245149)
- [文字转语音](https://support.nabucasa.com/hc/articles/25619386304541)
- [异地备份位置](https://support.nabucasa.com/hc/sections/26353804834973)
- [Webhooks 支持](https://support.nabucasa.com/hc/articles/25619382358685)
- 用于摄像头流的 [更好的 WebRTC](https://support.nabucasa.com/hc/articles/25619464018461)

## 配置

此集成默认启用，除非您从配置中禁用或删除了 [`default_config:`](/home-assistant/integrations/default_config/) 行。如果是这种情况，以下示例显示如何手动启用此集成：

```yaml
# 示例 configuration.yaml 条目以启用云集成
cloud:
```

有关更多配置选项，请参阅 [NabuCasa](https://www.nabucasa.com/config/)。

启用后，请前往 Home Assistant 中的设置页面，创建账户并登录。如果您没有看到 **设置** 面板，请确保在 `configuration.yaml` 文件中启用了以下选项。

```yaml
config:
```
