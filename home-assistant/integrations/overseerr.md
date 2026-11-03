# Seerr

Seerr 是一项可让您管理媒体请求，并将这些请求与 Plex、Jellyfin、Radarr 和 Sonarr 集成的服务。**Seerr** 集成允许您接入自己的 [Seerr](https://seerr.dev/) 实例。此集成向后兼容 [Overseerr](https://github.com/sct/overseerr)。

## 配置

要将 **Seerr** 服务添加到您的 Home Assistant 实例，请使用此 My 按钮：

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=seerr)

<details>
<summary>手动配置步骤</summary>

* 打开您的 Home Assistant 实例。
* 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
* 在右下角，选择 [**添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=seerr)。
* 在列表中选择 **Seerr**。
* 按照屏幕上的说明完成设置。

</details>

```yaml
URL:
    description: "The URL of your Seerr instance."
    required: true
    type: string
API key:
    description: "The API key of your Seerr instance, which can be found in the Seerr settings."
    required: true
    type: string
```

## 支持的版本

此集成支持最新版本的 Seerr。

## 支持的功能

Seerr 集成为 Home Assistant 提供了几个实体。
以下是这些实体的概述。

### 事件

Seerr 提供了一个用于媒体更新的事件实体。
该实体可能发生的事件有：

* `待处理`
* `已批准`
* `可用`
* `失败`
* `拒绝`
* `自动批准`

有关请求的相关数据存储在属性中。

### 传感器

该集成提供了 Seerr 中存储的请求和问题的统计信息。

#### 请求传感器

传感器用于：

* 请求总数
* 电影请求
* 电视请求
* 待处理的请求
* 拒绝请求
* 处理请求
* 可用的请求

#### 问题传感器

传感器用于：

* 总问题数
* 未解决的问题
* 已关闭的问题
* 视频问题
* 音频问题
* 字幕问题

## 动作

Seerr 集成具有以下操作：

### 请求动作

* `seerr.get_requests` - 获取媒体请求列表

### 获取请求

使用 `seerr.get_requests` 动作获取媒体请求列表。

* **config\_entry\_id**（*必需*）：要从中获取数据的 Seerr 配置条目的 ID。
* **status**（*可选*）：用于过滤结果的状态。
* **sort\_order**（*可选*）：对结果进行排序的排序顺序（“添加”/“修改”）。
* **requested\_by**（*可选*）：根据请求者的用户 ID 过滤请求。

## 使用场景

该集成可用于构建自动化，以帮助并通知您新的媒体请求和问题。

## 自动化示例

<details>
<summary>有新请求时向我发送推送通知</summary>

```yaml
alias: "Overseerr push notification"
description: "Send me a push notification on a new media request"
triggers:
  - trigger: state
    entity_id:
      - event.overseerr_last_media_event
    not_from:
      - unknown
      - unavailable
conditions:
  - condition: template
    value_template: >-
      {{ state_attr('event.overseerr_last_media_event', 'event_type') ==
      'pending' }}
actions:
  - action: notify.mobile_app
    metadata: {}
    data:
      message: >-
        {{ state_attr('event.overseerr_last_media_event', 'subject') }} has been
        requested
```

</details>

<details>
<summary>未解决问题超过阈值时发送通知</summary>

```yaml
alias: "Notify when too many open issues"
description: "Alert when open issues in Overseerr exceed 10"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.overseerr_open_issues
    above: 10
actions:
  - action: notify.mobile_app
    data:
      message: >-
        Warning: {{ states('sensor.overseerr_open_issues') }} open issues in Overseerr!
      title: "High Issue Count"
```

</details>

<details>
<summary>使用统计传感器跟踪音频问题趋势</summary>

```yaml
alias: "Monitor audio issue trends"
description: "Create a statistics sensor to track audio issue trends over time"
sensor:
  - platform: statistics
    name: "Audio Issues Statistics"
    entity_id: sensor.overseerr_audio_issues
    state_characteristic: mean
    max_age:
      days: 7
    sampling_size: 100
```

</details>

<details>
<summary>视频问题激增时发出警报</summary>

```yaml
alias: "Video issues spike alert"
description: "Notify when video issues increase significantly"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.overseerr_video_issues
    above: 5
actions:
  - action: notify.mobile_app
    data:
      message: >-
        Video issues are elevated: {{ states('sensor.overseerr_video_issues') }} issues detected
      title: "Video Quality Alert"
```

</details>

<details>
<summary>每日报告问题情况</summary>

```yaml
alias: "Daily Overseerr issue summary"
description: "Send a daily report of all issue types"
triggers:
  - trigger: time
    at: "09:00:00"
conditions:
  - condition: numeric_state
    entity_id: sensor.overseerr_total_issues
    above: 0
actions:
  - action: notify.mobile_app
    data:
      title: "Overseerr Daily Report"
      message: >-
        Total Issues: {{ states('sensor.overseerr_total_issues') }}
        Open: {{ states('sensor.overseerr_open_issues') }}
        Closed: {{ states('sensor.overseerr_closed_issues') }}
        Video: {{ states('sensor.overseerr_video_issues') }}
        Audio: {{ states('sensor.overseerr_audio_issues') }}
        Subtitle: {{ states('sensor.overseerr_subtitle_issues') }}
```

</details>

<details>
<summary>为字幕问题创建仪表板徽章</summary>

```yaml
type: entity
entity: sensor.overseerr_subtitle_issues
name: Subtitle Issues
icon: mdi:subtitles
```

</details>

## 数据更新

加载集成时，它将尝试在 Seerr 中配置 Webhook 以向 Home Assistant 提供更新。
这使得集成成为基于推送的集成。

当集成收到有关请求的更新时，它会更新统计信息以确保它们是最新的。
此外，集成每 5 分钟检查一次更新。

## 已知限制

使用集成有一些已知的限制：

* Seerr 一次只能设置一个 Webhook。
  这意味着您一次只能有一个 Home Assistant 实例连接到您的 Seerr 实例。
* 集成无法在启用 <abbr title="cross-site request forgery">CSRF</abbr> 保护的情况下运行。在 Overseerr 中，前往 **设置** 并关闭 **CSRF 保护**。

## 删除集成

此集成遵循标准集成删除，不需要额外的步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择该集成卡片。
2. 在设备列表中，选择您要删除的集成实例。
3. 在该条目旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。

## 故障排除

<details>
<summary>无法注册 Seerr 回调</summary>

请确保您的 Seerr 实例能够访问 Home Assistant 实例。

</details>
