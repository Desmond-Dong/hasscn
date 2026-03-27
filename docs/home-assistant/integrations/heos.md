---
title: Denon HEOS
description: 'Denon HEOS 集成用于将 HEOS(https://www.denon.com/en-gb/category/heos/) 系统连接到 Home Assistant。HEOS 是一个无线音频生态系统， 可让您将音乐串流到 Denon(https://www.denon.com/en-us/catego。'
ha_category:
  - Media player
ha_release: 0.92
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@andrewsayre'
ha_domain: heos
ha_ssdp: true
ha_platforms:
  - diagnostics
  - media_player
ha_integration_type: hub
ha_quality_scale: platinum
ha_zeroconf: true
---
# Denon HEOS

**Denon HEOS** 集成用于将 [HEOS](https://www.denon.com/en-gb/category/heos/) 系统连接到 Home Assistant。HEOS 是一个无线音频生态系统，
可让您将音乐串流到 [Denon](https://www.denon.com/en-us/category/heos/) 和 [Marantz](https://www.marantz.com/en/world-of-marantz/heos-built-in.html) 的 HEOS Built-in 产品。

添加此集成后，您可以自动化控制支持 HEOS 的产品的播放与分组配置。例如，当场景被激活时，在接收器上设置音量并播放指定播放列表。

## 支持的功能

- 为每个支持 HEOS 的产品提供 [媒体播放器](/home-assistant/integrations/media_player) 实体，包括扬声器、功放和接收器（Denon 和 Marantz）。
- 查看当前正在播放的媒体。
- 控制播放模式（如播放/暂停）、音量、静音和随机播放。
- 播放 HEOS 收藏、播放列表、Quick Select 和 URL。
- 将输入源切换为物理输入（例如 `AUX1`）。
- 浏览 HEOS 音乐服务（例如 **Tidal**）和来源（例如 **收藏**）。
- 对 HEOS 设备进行分组和取消分组。
- 清空播放列表。

## 前提条件

1. 一个或多个[支持 HEOS 的设备](/home-assistant/integrations/heos#supported-devices)。
2. 可选：一个 [HEOS 账户](https://support.denon.com/app/answers/detail/a_id/17041)，用于访问音乐服务、播放列表和收藏。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
此集成的单个实例会将 HEOS 系统中的所有设备添加到 Home Assistant。若通过发现方式设置，它会自动选择最佳主机。如果已配置的主机离线，集成会自动重新连接并切换到 HEOS 系统中的其他主机。

:::
```yaml
Host:
    description: "您的 HEOS 设备的主机名或 IP 地址（例如 \"192.168.1.2\"）。如果您有多个设备，请输入一个通过有线连接到局域网且始终保持通电的主机。"
```

## 配置选项

此集成提供以下配置选项。输入你的 HEOS 账户登录信息后，集成将能够访问流媒体服务、播放列表、收藏及其他功能。输入或更新凭据时，集成会验证并登录你的 HEOS 账户，并在凭据有效期间确保 HEOS 系统保持登录状态。清空凭据后，HEOS 系统会从你的账户中退出登录。

1. Go to **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**.
2. Select **Denon HEOS**. Select **Configure**.
3. Enter or clear your HEOS Account credentials.
4. Select **Submit** to save the options.

```yaml
Username:
  description: "The username or e-mail address of your HEOS Account."
Password:
  description: "The password to your HEOS Account."
```

## 重新配置

完成设置后，可以通过重新配置集成来更改用于访问 HEOS 系统的主机名或 IP 地址。

1. Go to **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**.
2. Select **Denon HEOS**. Click the three dots `[mdi:dots-vertical]` menu and then select **Reconfigure**.
3. Enter a new [host name or IP address](/home-assistant/integrations/heos/#host).
4. Click Submit to complete the reconfiguration.

## 删除

此集成遵循标准的集成删除流程，无需额外步骤。

1. Go to **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**.
2. Select **Denon HEOS**. Click the three dots `[mdi:dots-vertical]` menu and then select **Delete**.

## 操作

除了标准的[媒体播放器操作](/home-assistant/integrations/media_player#actions)外，HEOS 集成还提供以下操作：

分组音量操作：`heos.group_volume_set`、`heos.group_volume_down` 和 `heos.group_volume_up`，用于已加入分组的实体。

队列操作：`heos.get_queue`、`heos.move_queue_item` 和 `heos.remove_from_queue`，用于管理播放器的队列项目。

### 操作：设置组音量

`heos.group_volume_set` 操作用于设置分组音量，同时保留各成员之间的音量比例。此操作可以对组内任意实体调用。

| Data attribute | Optional | Description                                      |
|------------------------|----------|------------------------------------------------------------------|
| `entity_id`            |      yes | A media player entity that is joined to a group.                  |
| `volume_level`         |       no | The volume level, where 0 is inaudible, 1 is the maximum volume. |

### 操作：获取队列

`heos.get_queue` 操作会返回播放器队列中的项目。此操作可用于查看目标播放器当前的播放队列。

| Data attribute | Optional | Description                                      |
|------------------------|----------|------------------------------------------------------------------|
| `entity_id`            | no      | `entity_id` of the player(s)                                     |

响应示例：

```yaml
media_player.office:
  queue:
    - queue_id: 1
      song: Alone Again
      album: After Hours
      artist: The Weeknd
      image_url: >-
        http://resources.wimpmusic.com/images/22f72311/8e9e/461e/a100/d9cfd4ddc2fa/640x640.jpg
      media_id: "134788274"
      album_id: "134788273"
    - queue_id: 2
      song: Too Late
      album: After Hours
      artist: The Weeknd
      image_url: >-
        http://resources.wimpmusic.com/images/22f72311/8e9e/461e/a100/d9cfd4ddc2fa/640x640.jpg
      media_id: "134788275"
      album_id: "134788273"
```

### 操作：移动队列项目

`heos.move_queue_item` 操作用于移动目标播放器队列中的一个或多个项目，从而重新排序播放队列。可先使用 `heos.get_queue` 操作列出播放队列。

以下是将第二个项目移动到播放队列顶部的操作数据示例：

```yaml
action: heos.move_queue_item
target:
  entity_id: media_player.family_room_receiver
data:
  queue_ids:
    - 2
  destination_position: 1
```

| Data attribute | Optional | Description                                                     |
| ---------------------- | -------- | ------------------------------------------------------- |
| `queue_ids`            | no       | The IDs (indexes) of the items in the queue to move.    |
| `destination_position` | no       | The destination position in the queue (starting at 1).  |

### 操作：从队列中移除

`heos.remove_from_queue` 操作用于从目标播放器的队列中移除一个或多个项目。可先使用 `heos.get_queue` 操作列出播放队列。操作数据示例：

```yaml
action: heos.remove_from_queue
target:
  entity_id: media_player.family_room_receiver
data:
  queue_ids:
    - 1
    - 3
```

| Data attribute | Optional | Description                                                     |
| ---------------------- | -------- | ------------------------------------------------------- |
| `queue_ids`            | no       | The IDs (indexes) of the items in the queue to remove.   |

## 示例

### 播放媒体

#### 播放收藏

你可以通过 `media_player.play_media` 操作，使用编号或名称播放 HEOS 收藏。操作数据示例：

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "favorite"
  media_content_id: "1"
```

| Data attribute | Optional | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)                                        |
| `media_content_type`   | no       | Set to the value `favorite`                                         |
| `media_content_id`     | no       | (e.g., `1`) or name (e.g., `Thumbprint Radio`) of the HEOS favorite |

#### 播放播放列表

你可以通过 `media_player.play_media` 操作播放 HEOS 播放列表。操作数据示例：

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "playlist"
  media_content_id: "Awesome Music"
```

| Data attribute | Optional | Description                   |
| ---------------------- | -------- | ----------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)  |
| `media_content_type`   | no       | Set to the value `playlist`   |
| `media_content_id`     | no       | The name of the HEOS playlist |

#### 播放 Quick Select

你可以通过 `media_player.play_media` 操作，使用编号或名称播放 HEOS Quick Select。操作数据示例：

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "quick_select"
  media_content_id": "1"
```

| Data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)                                         |
| `media_content_type`   | no       | Set to the value `quick_select`                                      |
| `media_content_id`     | no       | The quick select number (e.g., `1`) or name (e.g., `Quick Select 1`) |

#### 播放 URL

你可以通过 `media_player.play_media` 操作让 HEOS 媒体播放器播放一个 URL。HEOS 播放器必须能够访问该 URL。

:::note
由于 HEOS 固件的限制，URL（`media_content_type`）长度必须不超过 255 个字符。

:::
操作数据示例：

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "url"
  media_content_id: "http://path.to/stream.mp3"
```

| Data attribute | Optional | Description                                              |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | yes      | `entity_id` of the player(s) to play the URL     |
| `media_content_type`   | no       | Set to the value `url`                           |
| `media_content_id`     | no       | The full URL to the stream (max 255 characters)  |

#### 播放队列项目

你可以通过 `media_player.play_media` 操作播放或跳转到播放器队列中的某个项目。将 `media_content_type` 设为 `queue`，并将 `media_content_id` 设为播放队列中项目的索引（从 1 开始）。可先使用 `heos.get_queue` 操作列出播放队列。操作数据示例：

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "queue"
  media_content_id: "1"
```

| Data attribute | Optional | Description                   |
| ---------------------- | -------- | ----------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)  |
| `media_content_type`   | no       | Set to the value `queue`   |
| `media_content_id`     | no       | The queue index (e.g. `1`) |

### 对播放器进行分组

#### 加入分组

要将多个 HEOS 媒体播放器编组为同步播放，请使用 `media_player.join` 操作。

:::note
所有 `group_members` 都必须是 HEOS 媒体播放器。

:::
以下操作数据示例会将 `media_player.office` 的播放扩展到 `media_player.kitchen` 和 `media_player.bathroom`：

```yaml
action: media_player.join
data:
  entity_id: media_player.office
  group_members:
    - media_player.kitchen
    - media_player.bathroom
```

| Data attribute | Optional | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | The media player entity whose playback will be expanded to the players specified in `group_members`. |
| `group_members`        | no       | The player entities which will be synced with the playback from `entity_id`.                         |

#### 取消分组

要将某个 HEOS 播放器从分组中移除，请使用 `media_player.unjoin` 操作。

```yaml
action: media_player.unjoin
data:
  entity_id: media_player.office
```

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | yes      | Remove this media player from any player groups. |


:::note
如果 HEOS 设备无法处理某个操作，该操作可能会失败。例如，当队列为空时调用 `media_player.clear_playlist` 会导致错误。要避免这类错误中断脚本或自动化，可在操作调用中设置 [`continue_on_error: true`](/home-assistant/docs/scripts/#continuing-on-error)。

:::
## 支持的设备

Denon 和 Marantz 目前没有公开发布支持 HEOS 的设备清单，但许多接收器和 Hi-Fi 产品自 2013 年起已开始内置 HEOS。请查看你的产品型号以确认是否支持：

- Denon [online manuals](https://www.denon.com/en-us/online-manuals.html) and [product archive](https://www.denon.com/en-us/support/product-archive/)
- Marantz [online manuals](https://www.marantz.com/en-us/support/online-manuals.html) and [product archive](https://www.marantz.com/en-us/category/archive/)

## 不支持的设备

2013 年之前的 Denon 和 Marantz 产品，以及不支持联网的产品（例如黑胶唱机和部分 CD 播放器）不支持 HEOS。

## 数据更新

当数据和实体状态发生变化时，HEOS 会通过本地网络实时将数据推送到 Home Assistant。

## 已知限制

- AVR receiver features, such as zone selection/control and power on/off, cannot be controlled through this integration. Use the [Universal Media Player](/home-assistant/integrations/universal/#denon-avr--heos) to combine AVR receiver functionality with this integration.
- TTS is not supported.
- The maximum length of a URL that can be used in the `play_media` action is 255 characters due to a limitation in the HEOS firmware.

## 日志与诊断

HEOS 集成支持 [Home Assistant 调试日志与诊断](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)。诊断信息可在集成条目级别和设备级别获取。

## 故障排除

### 缺少收藏

#### 症状：“The HEOS System is not logged in: Enter credentials in the integration options to access favorites and streaming services”

集成启动时会记录上述消息，并且集成的 media_player 实体中的 `source_list` 属性会为空。此时尝试调用 `media_player.play_media` 来播放 `favorite` 或 `playlist` 会失败。集成的其他功能不受影响。

##### 说明

要访问收藏、播放列表和流媒体服务等功能，HEOS 系统必须登录到你的 HEOS 账户。当你没有在配置选项中填写凭据，且 HEOS 系统处于未登录状态时，就会出现这种情况。

##### 解决方法

如果你想访问播放列表、收藏和流媒体服务，请在[配置选项](#配置选项)中填写 HEOS 账户凭据；否则，可以忽略这条日志警告。如果已填写凭据，集成会在凭据有效期间确保 HEOS 系统保持登录状态。

### 提交配置选项时出错

#### 症状：“Invalid authentication”

##### 说明

集成无法使用提供的凭据登录 HEOS 系统。信息级日志消息会包含具体原因，例如：`User not found (10)` 或 `Invalid credentials (6)`。

##### 解决方法

请先登录 HEOS 移动应用以验证凭据，然后在配置选项中重新输入凭据并再次提交。

#### 症状：“Unexpected error”

##### 说明

登录或退出 HEOS 账户时发生了意外错误。错误级日志消息中会包含错误信息。

##### 解决方法

将集成所连接的主机断电重启后再试。如果问题仍然存在，请提交 issue，并附上错误信息。
