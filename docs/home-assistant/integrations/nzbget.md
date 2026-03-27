---
title: NZBGet
description: 'NZBGet 集成允许您在 Home Assistant 中通过 NZBGet(https://nzbget.net/) 监控和控制下载任务。它还允许您基于这些信息设置自动化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Downloading
ha_iot_class: Local Polling
ha_release: 0.17
ha_config_flow: true
ha_codeowners:
  - '@chriscla'
ha_domain: nzbget
ha_platforms:
  - sensor
  - switch
ha_integration_type: service
---
# NZBGet

**NZBGet** 集成允许您在 Home Assistant 中通过 [NZBGet](https://nzbget.net/) 监控和控制下载任务。它还允许您基于这些信息设置自动化。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成会创建以下传感器：

- `nzbget_article_cache`：文章缓存大小，单位 MB。
- `nzbget_average_speed`：自服务器启动以来的平均下载速度，单位 MB/s。
- `nzbget_download_paused`：下载是否已暂停。
- `nzbget_speed`：当前下载速度，单位 MB/s。
- `nzbget_queue_size`：剩余待下载大小，单位 MB。
- `nzbget_disk_free`：NZBGet 存储位置的可用磁盘空间。
- `nzbget_post_processing_jobs`：后处理队列中的 Par 任务或后处理脚本任务数量。
- `nzbget_post_processing_paused`：后处理是否已暂停。
- `nzbget_uptime`：NZBGet 服务器运行时长。
- `nzbget_size`：自服务器启动以来已下载的数据量，单位 MB。
- `nzbget_speed_limit`：下载队列速度限制，单位 MB/s。

## 事件自动化

NZBGet 集成会持续监控 nzbget 的下载历史。当某项下载完成时，会在 Home Assistant 事件总线上触发一个可用于自动化的事件。

可能的事件包括：

- `nzbget_download_complete`

该事件包含已下载 nzb 的名称、分类和状态。

以下是一个在下载完成后发送 Telegram 消息的自动化示例：


```yaml
- alias: "Completed Torrent"
  triggers:
    - trigger: event
      event_type: nzbget_download_complete
      event_data:
        category: tv
  actions:
    - action: notify.telegram_notifier
      data:
        title: "Download completed!"
        message: "{{trigger.event.data.name}}"
```


## 操作

可用操作：

- `pause`：暂停下载队列。
- `resume`：恢复下载队列。
- `set_speed`：设置下载队列速度限制。

### 操作：Set speed

`nzbget.set_speed` 操作用于设置下载队列速度限制。

| Data attribute | Optional | Description                                                                                     |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `speed`                | yes      | 设置下载速度限制，单位为 Kb/s。`0` 表示禁用速度限制。默认值为 `1000`。 |
