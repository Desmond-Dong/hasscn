---
title: "搜索操作"
---

# MA search 操作

此操作在所有提供商中进行全局搜索

!<a href="/assets/screenshots/service-call/search1.png" target="_blank"><img src="/assets/screenshots/service-call/search1.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

这将返回类似这样的内容

!<a href="/assets/screenshots/service-call/search2.png" target="_blank"><img src="/assets/screenshots/service-call/search2.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

然后您可以使用模板提取所需内容，然后使用 `play_media` 服务调用。例如：

```
script:
  search_ma:
    mode: queued
    alias: "点唱机 MA 搜索"
    sequence:
      - action: music_assistant.search
        data:
          limit: 8
          name: "{{ states.input_text.jukebox_search.state}}"
        response_variable: results
      - action: input_text.set_value
        data:
          entity_id: input_text.jukebox_track_1
          value: '{{ results.tracks[0].name }}'
      - action: input_text.set_value
        data:
          entity_id: input_text.jukebox_artist_1
          value: '{{ results.tracks[0].artists[0].name }}'
```

