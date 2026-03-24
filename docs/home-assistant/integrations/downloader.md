---
title: Downloader
description: 关于如何为 Home Assistant 设置下载器集成的说明。
ha_category:
  - Downloading
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: downloader
ha_codeowners:
  - '@erwindouna'
ha_integration_type: service
ha_config_flow: true
---

**Downloader** 集成提供了一个用于下载文件的操作。如果下载目录不存在，集成会报错并停止设置。该目录必须对运行 Home Assistant 的用户可写。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果路径不是绝对路径，则会假定它相对于 Home Assistant 配置目录，比如 `/config/downloads`。因此，如果您有一个名为 `/config/my_download_folder` 的文件夹，当系统提示您 **Select a location to get to store downloads** 时，请输入 `my_download_folder`。Home Assistant 会检查该目录是否存在。

### 使用操作

前往 **Developer tools**，然后进入 **Actions**，从可用操作列表中选择 `downloader.download_file`。按照以下示例填写 `data` 字段，然后选择 **Perform action**。

```json
{"url":"http://domain.tld/path/to/file"}
```

这将从给定的 URL 下载文件。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `url` | 否 | 要下载文件的 URL。 |
| `subdir` | 是 | 下载到 **download_dir** 的子目录中。 |
| `filename` | 是 | 指定文件名。 |
| `overwrite` | 是 | 是否覆盖文件，默认为 `false`。 |
| `headers` | 是 | 要添加到请求中的自定义 HTTP 请求头字典。 |

### 下载状态事件

当下载成功完成时，Home Assistant 会向事件总线发出 `downloader_download_completed` 事件，您可以基于它编写自动化。
如果下载失败，则会发出 `downloader_download_failed` 事件，表示下载未成功完成。

事件还会附带以下有效负载参数：

| 参数 | 说明 |
| --------- | ---- |
| `url` | 发起请求的 `url`。 |
| `filename` | 正在下载文件的 `name`。 |

#### 自动化示例：

```yaml
- alias: "Download Failed Notification"
  triggers:
    - trigger: event
      event_type: downloader_download_failed
  actions:
    - action: persistent_notification.create
      data:
        message: "{{trigger.event.data.filename}} download failed"
        title: "Download Failed"
 ```
