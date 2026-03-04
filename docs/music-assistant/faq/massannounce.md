---
title: "播放公告操作"
---

# MA play_announcement 操作

此操作允许您通过 URL 向播放器发送音频公告。URL 可以通过各种方式访问。例如：

- 外部，如 `https://www.soundjay.com/door/doorbell-5.mp3` 
- 使用 <a href="https://www.home-assistant.io/integrations/http/#hosting-files" target="_blank" rel="noopener noreferrer">Home Assistant</a>，您可以将声音文件添加到您的 `www` 文件夹下，并像这样访问 `http://192.168.1.165:8123/local/audio/Apartment-door-chime-melody.mp3`
- 您可以<a href="https://www.instructables.com/Set-up-your-very-own-Web-server/" target="_blank" rel="noopener noreferrer">运行自己的 Web 服务器</a>

!<a href="/assets/screenshots/service-call/play_announcement.png" target="_blank"><img src="/assets/screenshots/service-call/play_announcement.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

> [!NOTE]
> 对于发送文本消息，请使用 HA TTS 服务调用并以 MA 媒体播放器实体为目标。在 MA 每个播放器的设置中有多个选项可用于控制公告的音量。
```
service: tts.google_say
  data:
    entity_id: media_player.ma_kitchen_speaker
    message: 这是一个测试
```

