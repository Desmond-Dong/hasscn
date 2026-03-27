---
title: "Notify using TTS"
description: '通知 TTS 平台允许您使用 TTS 集成 speak(/home-assistant/integrations/tts/action-speak) 或旧版 say(/home-assistant/integrations/tts/action-say-legacy) 操作和。'

ha_category:
  - Notifications
ha_release: 0.117
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: notify
---
# Notify using TTS

通知 TTS 平台允许您使用 TTS 集成 [speak](/home-assistant/integrations/tts/#action-speak) 或旧版 [say](/home-assistant/integrations/tts/#action-say-legacy) 操作和 [media_player](/home-assistant/integrations/media_player) 来提醒您重要事件。此集成提供了一个简单的界面，可在您的自动化和警报中使用。

为了使用此集成，您必须已安装和配置 TTS 平台，以及与 TTS 平台配合使用的 media_player。

要在您的安装中启用此平台，请考虑使用 [google_translate](/home-assistant/integrations/google_translate/) 和示例“media_player.living_room”的以下示例。

In your `configuration.yaml` file type:

```yaml
notify:
  - platform: tts
    name: in_the_living_room
    entity_id: tts.google_en_com
    media_player: media_player.living_room
```

```yaml
  name:
    description: The name of the notify action.
    required: true
    type: string
  entity_id:
    description: "The `entity_id` of the TTS entity to target. Either use `entity_id` or `tts_service` to target a TTS platform."
    required: exclusive
    type: string
  tts_service:
    description: "The `service_name` of a TTS platform. Either use `entity_id` or `tts_service` to target a TTS platform."
    required: exclusive
    type: string
  media_player:
    description: "The `entity_id` of a media_player."
    required: true
    type: string
  language:
    description: "The `language` to be passed to the TTS `speak` or `say` action."
    required: false
    type: string
```
