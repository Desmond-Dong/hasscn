---
title: Folder
description: 用于监控文件夹内容的传感器。
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.64
ha_domain: folder
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

用于监控文件夹内容的传感器。请注意，文件夹路径必须添加到 [allowlist_external_dirs](/home-assistant/integrations/homeassistant/#allowlist_external_dirs) 中。您也可以选择为文件夹中的文件应用一个[通配符过滤器](https://docs.python.org/3.6/library/fnmatch.html)。该传感器的状态值是符合过滤条件的文件总大小，单位为 MB。
该传感器还会通过属性公开以下信息：符合条件的文件数量、这些文件的总字节数，以及以逗号分隔的文件路径列表。

## 配置

要在您的安装中启用 `folder` 传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
sensor:
  - platform: folder
    folder: /config
```

```yaml
folder:
  description: 文件夹路径。
  required: true
  type: string
filter:
  description: 要应用的过滤器。
  required: false
  default: "`*`"
  type: string
```
