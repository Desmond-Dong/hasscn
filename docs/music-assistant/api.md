---
title: API
---

# API <img src="/assets/icons/api-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 提供强大的 API 来控制您的音乐媒体库、管理播放器和流式传输音频。无论您是构建自定义界面、与家庭自动化集成还是创建音乐应用，API 都能让您完全控制。

API 文档是自动生成的，可在 http://YOUR_MA_SERVER_IP:8095/api-docs 查看


## 示例

<a href="https://github.com/orgs/music-assistant/discussions/4438" target="_blank" rel="noopener noreferrer">从播放列表播放随机曲目</a>

<a href="https://github.com/orgs/music-assistant/discussions/1240#discussioncomment-12396494" target="_blank" rel="noopener noreferrer">将当前队列保存为播放列表</a>

<details><summary>获取所有可用的播放器设置</summary>

```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "config/players/get",
  "args": {
    "player_id": "RINCON_48A6B820191201400"
  }
}'
```
```yaml
rest_command:
  ma_get_player_settings:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "config/players/get",
        "args": {
          "player_id": "{{ player_id }}"
        }
      }
    content_type:  'application/json; charset=utf-8'
```

</details>

<details><summary>设置一个或多个播放器设置</summary>

```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "config/players/save",
  "args": {
    "player_id": "RINCON_48A6B820191201400",
    "values": {
        "airplay_mode": true
    }
  }
}'
```
```yaml
rest_command:
  ma_set_player_settings:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "config/players/save",
        "args": {
          "player_id": "b8:27:eb:8a:b8:8e",
          "values": {
            "crossfade": true
          }
        }
      }
    content_type:  'application/json; charset=utf-8'
```

</details>

<details><summary>将项目添加到收藏夹</summary>

item 需要是 URI 或分享 URL

```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/favorites/add_item",
  "args": {
    "item": "spotify://track/1234567"
  }
}'
```
</details>

<details><summary>获取专辑曲目</summary>

```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/albums/album_tracks",
  "args": {
    "item_id": "1",
    "provider_instance_id_or_domain": "library",
    "in_library_only": true
  }
}'
```
```yaml
rest_command:
  ma_album_tracks:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "music/albums/album_tracks",
        "args": {
          "item_id": "{{ item_id }}",
          "provider_instance_id_or_domain": "{{ provider_instance_id_or_domain }}",
          "in_library_only": "{{ in_library_only }}"
        }
      }
    content_type:  'application/json; charset=utf-8'
```
</details>

<details><summary>获取完整项目详情（通过 URI）</summary>

```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/item_by_uri",
  "args": {
    "uri": "spotify://track/1234"
  }
}'
```
</details>

<details><summary>获取最近播放的项目</summary>

limit 和 media_types 是可选的
```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/recently_played_items",
  "args": {
    "limit": 10,
    "media_types": ["track", "album"]
  }
}'
```
</details>

<details><summary>获取进行中的项目（有声读物、播客剧集）</summary>

返回正在播放的有声读物和播客剧集列表。
limit 是可选的
```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/in_progress_items",
  "args": {
    "limit": 10
  }
}'
```
</details>

<details><summary>开始同步</summary>

开始运行（全部或选定的）音乐提供者的同步。
  media_types：仅同步这些媒体类型。None 表示全部。
  providers：仅同步这些提供者实例。None 表示全部。
```bash
curl --location 'http://192.168.1.1:8095/api' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR......I' \
--data '{
  "message_id": "1",
  "command": "music/sync",
  "args": {
    "media_types": ["track", "album"],
    "providers": ["filesystem--1234"]
  }
}'
```
</details>

<details><summary>刷新播放列表</summary>

```yaml
rest_command:
  ma_refresh_playlist:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "music/playlists/playlist_tracks",
        "args": {
          "item_id": "1234",
          "provider_instance_or_domain": "builtin",
          "force_refresh": true
        }
      }
    content_type:  'application/json; charset=utf-8'
```
</details>


<details><summary>更改播放器的淡入淡出状态</summary>

player_id 可以在单个播放器设置的顶部找到

```yaml
rest_command:
  ma_set_player_settings:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "config/players/save",
        "args": {
          "player_id": "b8:27:eb:8a:b8:8e",
          "values": {
            "crossfade": true
          }
        }
      }
    content_type:  'application/json; charset=utf-8'
```
</details>

<details><summary>获取队列中的所有项目</summary>

`queue_id` 将与 `player_id` 相同，除非播放器已分组。要确认，请创建一个调用 `player_queues/all` 的 `rest_command` 并查看返回的信息。如果省略，`limit` 默认为 500。建议不要设置大于 500 的值，以避免破坏您的系统。实际限制将取决于主机上可用的资源。`offset` 也可以省略。

```yaml
rest_command:
  ma_get_full_queue:
    url: http://192.168.1.1:8095/api
    method: POST
    headers:
      accept: "application/json, text/html"
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR......I"
    payload: >
      {
        "message_id": "1",
        "command": "player_queues/items",
        "args": {
          "queue_id": "b8:27:eb:8a:b8:8e",
          "limit": 500,
          "offset": 0
        }
      }
    content_type:  'application/json; charset=utf-8'
```
</details>
