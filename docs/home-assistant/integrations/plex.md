---
title: Plex Media Server
description: 关于如何将 Plex 集成到 Home Assistant 的说明。
ha_category:
  - Button
  - Media player
  - Sensor
  - Update
featured: true
ha_release: 0.7.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: plex
ha_platforms:
  - button
  - media_player
  - sensor
  - update
ha_zeroconf: true
ha_integration_type: service
---

**Plex Media Server** integration 允许您将 Home Assistant 连接到 [Plex Media Server](https://plex.tv)。配置完成后，正在流式传输的 [Plex 客户端](https://www.plex.tv/apps-devices/) 会显示为[媒体播放器](/home-assistant/integrations/media_player/)，并通过 Home Assistant 中的[传感器](/home-assistant/integrations/sensor/)报告播放状态和资料库大小。媒体播放器将允许您控制媒体播放并查看当前播放的项目。

支持在链接的 [Sonos](/home-assistant/integrations/sonos/) 扬声器上直接播放音乐的功能在 [Sonos 播放](#sonos-playback) 部分中提供。

Home Assistant 目前支持以下设备类型：

- [Sensor](#sensor)
- [Button](#button)
- [Update](#update)
- [Media player](#media-player)

如果 Plex 服务器已通过[认领界面](https://plex.tv/claim)被 Plex 账户认领，Home Assistant 将需要身份验证才能连接。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在设置过程中，您需要以服务器管理员身份登录。集成将检查所有可能的连接 Plex 服务器的方式 - 即本地或公共地址、HTTP 或 HTTPS、通过 IP 或使用 `plex.direct` 的子域，或者如果所有其他方法都失败则使用 Plex 中继。集成将优先选择本地而非公共，安全而非不安全，按此顺序。选定的地址显示在集成页面上的 Plex 卡片上。

如果您的路由器强制执行 DNS 重绑定保护，则连接到本地 `plex.direct` 主机名可能会失败（请参阅 [Plex 文档](https://support.plex.tv/articles/206225077-how-to-use-secure-server-connections/#dnsrebinding)）。为避免这种情况，请按照文档链接中的说明配置路由器以允许 `plex.direct` 的 DNS 重绑定。

### 集成选项

提供了几个选项来调整 `media_player` 实体的行为。这些可以在集成页面的 **Plex** > **Options** 处更改。

**Use episode art**：显示电视剧集艺术图而不是电视剧艺术图。

**Monitored users**：有权访问 Plex 服务器的账户列表。只有选定的用户才会创建 `media_player` 实体。

**Ignore new managed/shared users**：启用以忽略被授予服务器访问权限的新 Plex 账户。

**Ignore Plex Web clients**：不为 Plex Web 客户端创建 `media_player` 实体。

### 手动配置

或者，您可以在配置 Plex 集成时选择"Configure Plex server manually"来手动配置 Plex 服务器连接。此选项仅对"高级模式"下的用户可用。这将允许您指定服务器连接选项，这些选项将在设置完成前进行验证。可用选项如下所述：

**Host**：您的 Plex 服务器的 IP 地址或主机名。如果提供了 'Token'，则可选。

**Port**：您的 Plex 服务器的端口。

**Use SSL**：使用 HTTPS 连接到 Plex 服务器。

**Verify SSL certificate**：验证您 Plex 服务器的 SSL 证书。如果使用 IP 连接或使用自签名证书，可能会使用此选项。

**Token**：您的 Plex 服务器的有效授权令牌。如果在没有 'Host' 的情况下提供，将从 Plex 检索连接 URL。

## 传感器

活动传感器提供当前正在从 Plex 服务器观看媒体的用户计数。点击传感器显示活跃用户和媒体流的详细信息。

资料库传感器显示每个资料库中的项目计数。根据资料库内容，传感器将在其属性中显示额外的详细信息。例如，电视剧资料库传感器将表示资料库中的剧集总数，其属性还将报告其包含的节目和季数。还会提供最后添加的媒体项目（电影、专辑或剧集）以及显示其添加到各自资料库的时间戳。

除了项目计数外，每个资料库传感器还提供最后添加的媒体项目（电影、专辑或剧集）和显示其添加时间的时间戳。

使用资料库传感器上的 `last_added_item` 属性在添加新媒体时发送通知的自动化示例：


```yaml
alias: "Plex - New media added"
triggers:
  - trigger: state
    entity_id: sensor.plex_library_movies
    id: movie
  - trigger: state
    entity_id: sensor.plex_library_music
    id: album
  - trigger: state
    entity_id: sensor.plex_library_tv_shows
    id: episode

actions:
  - action: notify.mobile_app_phone
    data:
      title: "New {{ trigger.id }} added"
      message: "{{ trigger.to_state.attributes.last_added_item }}"
```


:::important
资料库传感器默认禁用，但可以通过 Plex 集成页面启用。启用传感器后，您可能需要在填充最后添加的媒体属性之前向资料库添加新项目。

:::
## 按钮

有一个 `button.scan_clients` 实体可用于发现新的可控 Plex 客户端。这在控制 Plex 客户端应用的脚本或自动化中可能是必要的，但底层设备必须先打开。此按钮优于旧的 `plex.scan_for_clients` 动作。

脚本示例：


```yaml
play_plex_on_tv:
  sequence:
    - action: media_player.select_source
      target:
        entity_id: media_player.smart_tv
      data:
        source: "Plex"
    - wait_for_trigger:
        - trigger: state
          entity_id: media_player.smart_tv
          to: "on"
      timeout:
        seconds: 10
    - action: button.press
      target:
        entity_id: button.scan_clients_plex
    - wait_template: "{{ not is_state('media_player.plex_smart_tv', 'unavailable') }}"
      timeout: "00:00:10"
      continue_on_timeout: false
    - action: media_player.play_media
      target:
        entity_id: media_player.plex_smart_tv
      data:
        media_content_id: "{"library_name": "Movies", "title": "Zoolander"}"
        media_content_type: movie
```


## 更新

Plex Media Server 新版本的通知通过更新实体显示。提供详细的发行说明。

对于某些安装类型，如 Windows 和某些 NAS 设备，可以触发 Plex Media Server 的自动升级。

## 媒体播放器

Plex 媒体播放器平台将为每个连接的客户端设备创建媒体播放器实体。这些实体将显示媒体信息、播放进度和播放控制（如果流媒体设备支持）。

默认情况下，Plex 集成将为 Plex 服务器上的所有本地、托管和共享用户创建媒体播放器实体。要自定义要监控的用户或客户端类型，请调整[集成选项](#integration-options)下描述的"*Monitored users*"、"*Ignore new managed/shared users*"和"*Ignore Plex Web clients*"选项。

### 动作：Play media

`media_player.play_media` 动作在 Plex 客户端或其他支持的设备上播放 Plex 服务器上托管的媒体。

`media_content_id` 负载中的必填字段已标记，其他为可选。有一些特殊参数可以添加到任何查询中：

- `shuffle`：随机播放媒体的播放顺序。接受 `1` 或 `true` 以启用。
- `resume`：如果有上次部分观看的位置，则从该位置恢复播放，否则从头开始播放。
- `offset`：所需的播放开始位置（以秒为单位）。
- `allow_multiple`：搜索必须找到一个特定项目才能成功。此参数接受搜索中的多个匹配项，并将所有找到的项目排队播放。接受 `1` 或 `true` 以启用。
- `username`：本地 Plex 用户账户的用户名。仅当 Plex 服务器有多个用户并且您希望为特定用户播放媒体时才需要。
- `continuous`：Plex 将自动播放系列中的下一集。接受 `1` 或 `true` 以启用。

为[音乐](#music)、[电视剧集](#tv-episode)和[电影](#movie)提供了简化示例。有关复杂/智能搜索功能，请参阅[高级搜索](#advanced-searches)。

:::note
如果投放到非 Plex 播放器，请参阅这些链接：

- [Chromecast](/home-assistant/integrations/cast/#plex)
- [Sonos](/home-assistant/integrations/plex#sonos-playback)

:::
:::important
集成必须配置令牌才能使播放命令正常工作。如果在 Plex 服务器上使用 `List of IP addresses and networks that are allowed without auth` 选项，则可能会发生这种情况。如果需要该功能，建议在临时禁用该功能的情况下配置集成。

:::
#### 音乐

| 数据属性 | 描述                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | 客户端的 `entity_id`                                                                                                                                                                                                                                                                        |
| `media_content_id`     | 包含以下内容的引号 JSON：<br/><ul><li>`library_name`（必填）</li><li>`artist_name` 或 `artist.title`</li><li>`album_name` 或 `album.title`</li><li>`track_name` 或 `track.title`</li><li>`track_number` 或 `track.index`</li><li>`shuffle`（0 或 1）</li><li>`allow_multiple`（0 或 1）</li></ul> |
| `media_content_type`   | `MUSIC`                                                                                                                                                                                                                                                                                          |

##### 示例：

在音乐资料库中播放 Adele 专辑 25 中的 Hello

```yaml
entity_id: media_player.plex_player
media_content_type: MUSIC
media_content_id: '{ "library_name": "Music", "artist_name": "Adele", "album_name": "25", "track_name": "Hello" }'
```

在音乐资料库中随机播放 Stevie Wonder 的曲目

```yaml
entity_id: media_player.plex_player
media_content_type: MUSIC
media_content_id: '{ "library_name": "Music", "artist_name": "Stevie Wonder", "shuffle": "1" }'
```

#### 播放列表

| 数据属性 | 描述                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `entity_id`            | 客户端的 `entity_id`                                                                           |
| `media_content_id`     | 包含以下内容的引号 JSON：<br/><ul><li>`playlist_name`（必填）</li><li>`shuffle`（0 或 1）</li></ul> |
| `media_content_type`   | `PLAYLIST`                                                                                          |

##### 示例：

启用随机播放播放列表 The Best of Disco

```yaml
entity_id: media_player.plex_player
media_content_type: PLAYLIST
media_content_id: '{ "playlist_name": "The Best of Disco", "shuffle": "1" }'
```

#### 电视剧集

| 数据属性 | 描述                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 客户端的 `entity_id`                                                                                                                                                                                                                                                                                                                            |
| `media_content_id`     | 包含以下内容的引号 JSON：<br/><ul><li>`library_name`（必填）</li><li>`show_name` 或 `show.title`</li><li>`season_number` 或 `season.index`</li><li>`episode_number` 或 `episode.index`</li><li>`shuffle`（0 或 1）</li><li>`resume`（0 或 1）</li><li>`offset`（以秒为单位）</li><li>`allow_multiple`（0 或 1）</li><li>`continuous`（0 或 1）</li></ul> |
| `media_content_type`   | `EPISODE`                                                                                                                                                                                                                                                                                                                                            |

##### 示例：

从资料库 Adult TV 播放 Rick and Morty S2E5

```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "Adult TV", "show_name": "Rick and Morty", "season_number": 2, "episode_number": 5 }'
```

从资料库 Kids TV 随机播放一集芝麻街

```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "Kids TV", "show_name": "Sesame Street", "shuffle": "1" }'
```

从资料库 News TV 恢复播放 60 Minutes 的下一未看完剧集

```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "News TV", "show_name": "60 Minutes", "episode.unwatched": true, "episode.inProgress": [true, false], "resume": 1, "sort": "addedAt:asc", "maxresults": 1 }'
```

从 S2E5 开始连续播放 Rick and Morty 剧集

```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "Adult TV", "show_name": "Rick and Morty", "season_number": 2, "episode_number": 5, "continuous": 1}'
```
#### 电影

| 数据属性 | 描述                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 客户端的 `entity_id`                                                                                                                       |
| `media_content_id`     | 包含以下内容的引号 JSON：<br/><ul><li>`library_name`（必填）</li><li>`title`</li><li>`resume`（0 或 1）</li><li>`offset`（以秒为单位）</li></ul> |
| `media_content_type`   | `movie`                                                                                                                                         |

##### 示例：

从资料库 Adult Movies 播放 Blade

```yaml
entity_id: media_player.plex_player
media_content_type: movie
media_content_id: '{ "library_name": "Adult Movies", "title": "Blade" }'
```

#### 高级搜索

除了搜索特定的已知媒体外，还有许多额外的参数可用于运行更强大的搜索。当标题的简单搜索有多个匹配项时（例如电影翻拍），这也可以使用。

这些是可以包含在 `media_content_id` JSON 负载中以自定义搜索的可选键示例：

- `unwatched`：仅将搜索限制为未观看的项目（`true`、`false`）
- `actor`：限制搜索包含特定演员的电影
- `collection`：限制在命名的 Plex 收藏集中搜索（"Back to the Future"、"Indiana Jones"）
- `contentRating`：限制搜索特定的内容分级（"PG"、"R"）
- `country`：限制搜索特定的原产国
- `decade`：限制搜索特定的年代（"1960"、"2010"）
- `director`：限制搜索特定的导演
- `genre`：限制搜索特定的类型（"Animation"、"Drama"、"Sci-Fi"）
- `resolution`：限制搜索特定的视频分辨率（480、720、1080、"4k"）
- `year`：限制搜索特定的年份

更多参数和其他详细信息可以在 `plexapi` 库[文档](https://python-plexapi.readthedocs.io/en/latest/modules/library.html#plexapi.library.LibrarySection.search)中找到。

##### 示例

以下是高级搜索的示例。所有示例都显示可以在 `media_content_id` 参数中发送的内容。

请注意，某些搜索可能需要 `"maxresults": 1` 来将结果限制为单个项目。但是，"项目"可能是一组媒体，例如专辑、季、艺术家、节目等。

搜索将尝试根据搜索参数中使用最具体的媒体类型来猜测媒体类型。例如，使用 `artist.title` 和 `album.year` 的搜索将搜索特定年份发行的艺术家专辑。如果向搜索添加 `track.title`，它将尝试查找曲目。您可以使用 `libtype` 参数指定要搜索的媒体类型，可以是 `movie`、`episode`、`season`、`show`、`track`、`album` 或 `artist` 之一。如果您只知道特定曲目的名称，这在搜索专辑时可能很有用（参见下面的示例）。

```json
# Play the original instead of the 2004 remake:
{ "library_name": "Movies", "title": "The Manchurian Candidate", "year": 1962 }

# "Lazy" searches are also possible (would find the sequel, "Die Hard: With a Vengeance"):
{ "library_name": "Movies", "title": "die hard", "year": 1995 }

# Play for an artist's album where only a track name is known:
{ "library_name": "Music", "artist.title": "Stevie", "track.title": "Higher Ground" }

# Play all albums with "orange" in the title:
{ "library_name": "Music", "album.title": "orange", "allow_multiple": true }

# Watch the most recently added movie
{ "library_name": "Movies", "sort": "addedAt:desc", "maxresults": 1 }

# Play an unwatched movie from the "Bond" collection which was released in the 2000s
{ "library_name": "Movies", "collection": "Bond", "decade": 2000, "unwatched": true }

# Play the most recently added TV show which has been partially watched
{ "library_name": "TV Shows", "inProgress": true, "sort": "addedAt:desc", "maxresults": 1 }

# Listen to a random electronic album which was added over 3 years ago but hasn't been listened to for at least 3 months
{ "library_name": "Music", "addedAt<<": "3y", "album.genre": "Electronic", "album.lastViewedAt<<": "3mon", "sort": "random", "maxresults": 1 }

# Watch the worst rated movie from the 2000s starring either Nicolas Cage or Danny Devito
{ "library_name": "Movies", "actor": ["Nicolas Cage", "Danny DeVito"], "decade": 2000, "sort": "audienceRating:asc", "maxresults": 1 }
```

### 兼容性

| 客户端             | 限制                                |
| ------------------ | ------------------------------------------ |
| 远程客户端     | 控制不可用                   |
| Apple TV           | 无                                       |
| iOS                | 无                                       |
| NVidia Shield      | 无                                       |
| Plexamp            | 无（仅音乐播放）                 |
| Plex Desktop & Web | 控制不可用（截至 2022 年 6 月） |
| Plex HTPC          | 无                                       |

## Sonos 播放

要将 Plex 音乐直接播放到 Sonos 扬声器，必须满足以下要求：

1. 为您的 Plex 服务器启用远程访问。
2. Sonos 扬声器链接到您的 Plex 账户[（说明）](https://support.plex.tv/articles/control-sonos-playback-with-a-plex-app/)。
3. 配置 [Sonos](/home-assistant/integrations/sonos/) 集成。

调用 `media_player.play_media` 动作，使用 Sonos 集成设备的 `entity_id`，并在 `media_content_type` 前加上 `plex://`。支持[音乐](#music)和[播放列表](#playlist)的 `media_content_type` 值。

### 示例：

在 Sonos 扬声器上使用高级过滤播放曲目

```yaml
entity_id: media_player.sonos_speaker
media_content_type: music
media_content_id: 'plex://{ "library_name": "Music", "artist_name": "Adele", "album_name": "25", "track_name": "Hello" }'
```

在 Sonos 扬声器上播放播放列表

```yaml
entity_id: media_player.sonos_speaker
media_content_type: playlist
media_content_id: 'plex://{ "playlist_name": "Party Mix" }'
```

## 额外动作

### 动作：Refresh library

`plex.refresh_library` 动作刷新 Plex 资料库以扫描新的和更新的媒体。

| 数据属性 | 必填 | 描述                                                | 示例          |
| ---------------------- | -------- | ---------------------------------------------------------- | ---------------- |
| `server_name`          | 否       | 如果配置了多台服务器，则使用的 Plex 服务器名称。 | "My Plex Server" |
| `library_name`         | 是       | 要更新的 Plex 资料库名称。                            | "TV Shows"       |


## 注意事项

- Plex 集成支持多台 Plex 服务器。可以在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 下配置其他连接。
- 电影必须位于 Plex 资料库的 'Movies' 部分下，才能正确查看 'playing' 状态。