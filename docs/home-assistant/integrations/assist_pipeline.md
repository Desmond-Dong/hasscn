---
title: Assist pipeline
description: Assist 流程集成。
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@synesthesiam'
  - '@arturpragacz'
ha_domain: assist_pipeline
ha_integration_type: system
ha_quality_scale: internal
ha_platforms:
  - select
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /voice_control/voice_remote_local_assistant/
    title: Configuring a voice pipeline
  - docs: /voice_control/
    title: Assist
---

**Assist pipeline** 集成为 Home Assistant 中的 [Assist](/home-assistant/voice_control/) 语音助手提供基础能力。

对于大多数用户，无需手动安装此集成。Assist pipeline 集成属于默认配置的一部分，并会在其他集成需要时自动设置。
如果您没有使用默认集成，则需要将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
assist_pipeline:
```

有关更多信息，请参阅[配置语音流程](/home-assistant/voice_control/voice_remote_local_assistant/)的操作步骤。
