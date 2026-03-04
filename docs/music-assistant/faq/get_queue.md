---
title: "获取队列操作"
---

# MA get_queue 操作

此操作允许您检索队列的详细信息

!<a href="/assets/screenshots/service-call/get_queue.png" target="_blank"><img src="/assets/screenshots/service-call/get_queue.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

返回的 JSON 非常广泛，包括有关队列中当前和下一个项目的信息。<a href="https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data" target="_blank" rel="noopener noreferrer">返回的数据可在模板中使用</a>。

## 示例

```
script:
  get_now_playing:
    mode: queued
    alias: "获取正在播放的音轨名称"
    sequence:
      - action: music_assistant.get_queue
        data:
          entity_id: media_player.ma_kitchen_speaker
        response_variable: queue_info
      - service: input_text.set_value
        data:
          entity_id: input_text.now_playing
          value: '{{ queue_info['media_player.ma_kitchen_speaker'].current_item.name[:50] }}'
```

