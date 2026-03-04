---
title: "获取库操作"
---

# MA get_library 操作

此操作允许您从库中检索项目的完整详细信息

!<a href="/assets/screenshots/service-call/get_library.png" target="_blank"><img src="/assets/screenshots/service-call/get_library.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

可以看到有大量的筛选选项可用。

收藏选项以三种方式工作：

- 如果左侧未选中该选项，则将返回收藏和非收藏项目
- 如果左侧选中该选项但右侧的开关关闭，则只返回非收藏项目
- 如果左侧选中该选项但右侧的开关打开，则只返回收藏项目 

返回的 JSON 非常广泛。<a href="https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data" target="_blank" rel="noopener noreferrer">返回的数据可在模板中使用</a>。

## 示例

在此示例中，创建了10个随机音轨的队列。

```
script:
  create_random_queue:
    mode: single
    sequence:
      - service: music_assistant.get_library
        data:
          limit: 10
          media_type: track
          config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
          order_by: random
        response_variable: random_tracks
      - repeat:
          count: "{{ random_tracks['items'] | length }}"
          sequence:
            - action: music_assistant.play_media
              data:
                media_id: "{{ random_tracks['items'][repeat.index - 1].uri }}"
                media_type: track
                enqueue: add
              target:
                entity_id: media_player.ma_kitchen_speaker
```

