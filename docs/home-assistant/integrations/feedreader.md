---
title: Feedreader
description: '添加一个 RSS/Atom 订阅读取器，每小时轮询一次订阅源，并将新条目发送到事件总线。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Event
  - Other
ha_release: 0.18
ha_iot_class: Cloud Polling
ha_domain: feedreader
ha_config_flow: true
ha_platforms:
  - event
ha_integration_type: service
related:
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
ha_codeowners:
  - '@mib1185'
---
# Feedreader

添加一个 RSS/Atom 订阅读取器，每小时轮询一次订阅源，并将新条目发送到事件总线。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
    description: 您要集成的 RSS/Atom 订阅源 URL。
```

## Options

To define options for Feedreader, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Feedreader are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Maximum feed entries:
  description: 每个订阅源最多提取的条目数。
```

## 用法

### 自动化

Feedreader 事件可以直接用于触发自动化动作，例如：

```yaml
automation:
  - alias: "Trigger action when new element(s) in RSS feed"
    triggers:
      - trigger: event
        event_type: feedreader
    actions:
      - action: script.turn_on
        target:
          entity_id: script.my_action
```


```yaml
automation:
  - alias: "Send notification of RSS feed title when updated"
    triggers:
      - trigger: event
        event_type: feedreader
        event_data:
          feed_url: "https://hasspodcast.io/feed/podcast"
    actions:
      - action: persistent_notification.create
        data:
          title: "New HA Podcast available"
          message: "New Podcast available - {{ as_timestamp(now()) | timestamp_custom('%I:%M:%S %p %d%b%Y', true) }}"
          notification_id: "{{ trigger.event.data.title }}"
```


`trigger.event.data` 变量至少包含以下键，具体还可能包含更多内容，这取决于已配置订阅源实际提供的数据。

| 键 | 说明 |
| --- | --- |
| `trigger.event.data.link` | 该订阅条目的 URL |
| `trigger.event.data.title` | 该订阅条目的标题 |
| `trigger.event.data.description` | 该订阅条目的描述 |
| `trigger.event.data.content` | 该订阅条目的正文内容 |

### 事件实体

系统会为每个已配置的订阅源创建一个 Event entity 实体，该实体始终表示该订阅源中的最新条目。

### 视频教程

这段视频教程介绍了如何设置 feedreader，并在 Home Assistant 的仪表板中显示新闻订阅条目列表。

<lite-youtube videoid="wqmLnjWQ4eY" videotitle="Show RSS News feeds on your Dashboard in Home Assistant!" posterquality="maxresdefault"></lite-youtube>

### 事件监听器

对于更高级的用法，也可以使用一个自定义集成来注册并监听 `feedreader` 事件类型，例如：

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

若要开始开发自定义集成，请参阅 [developers](/home-assistant/developers) 文档。

### 其他示例

如果您想要一个可直接使用的完整 Feedreader 打包示例，可以参考 [PodCast notifier](https://github.com/CCOSTAN/Home-AssistantConfig/blob/22c19375ac5dcb49e0648aa16c431537407aa5e4/config/packages/hasspodcast.yaml)。

## 移除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
