---
title: Folder watcher
description: 用于监控文件系统变化的集成。
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.67
ha_quality_scale: internal
ha_platforms:
  - event
ha_domain: folder_watcher
ha_integration_type: integration
---

**文件夹观察程序**集成添加了 [Watchdog](https://pythonhosted.org/watchdog/) 文件系统监控。

它为这些受监视的事件类型创建事件实体：

- `closed`
- `created`
- `deleted`
- `modified`
- `moved`

必须将配置的文件夹添加到 [allowlist_external_dirs](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)。请注意，默认情况下，文件夹监视是递归的，这意味着子文件夹的内容也会受到监视。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 模式

使用 [fnmatch](https://docs.python.org/3.6/library/fnmatch.html) 的模式匹配可用于将文件系统监控限制为仅与配置模式匹配的文件。
作为监视特定文件的示例，例如 YAML 和文本文件添加 `*.yaml` 和 `*.txt`。

## 自动化

事件实体包含的属性有：
- `event_type`：与过滤器的 `event_type` 匹配（`created`、`moved`、`modified`、`deleted`、`closed` 之一）
- `path`：文件的完整路径（例如“/hello/world.txt”）
- `file`：文件名（例如“world.txt”）
- `folder`：文件夹路径（例如“/hello”）

当 `event_type` 为 `moved` 时，文件详细信息适用于源文件，并且包括目标详细信息：
- `dest_path`：移动文件的完整路径（例如“/hello/world.txt”）
- `dest_file`：移动文件的名称（例如“world.txt”）
- `dest_folder`：文件夹移动路径（例如“/hello”）

可以使用模板对文件系统事件数据触发自动化。以下自动化将发送一条通知，其中包含添加到该文件夹​​的新文件的名称和文件夹：


```yaml
#Send notification for new image (including the image itself)
automation:
  alias: "New file alert"
  triggers:
    - trigger: state
      entity_id: event.created
  actions:
    - action: notify.notify
      data:
        title: New image captured!
        message: "Created {{ trigger.to_state.attributes.file }} in {{ trigger.to_state.attributes.folder }}"
        data:
          file: "{{ trigger.to_state.attributes.file }}"
```


