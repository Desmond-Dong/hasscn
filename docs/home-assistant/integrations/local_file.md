---
title: Local file
description: 关于如何在 Home Assistant 中使用本地文件作为摄像头的说明。
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.22
ha_domain: local_file
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

**Local file** 摄像头集成可将磁盘中的图像文件作为摄像头接入 Home Assistant。如果该图像在文件系统中被更新，Home Assistant 中显示的图像也会随之更新。您还可以通过自动化使用 `local_file.update_file_path` 操作更新图像。

例如，`local_file` 摄像头可用于那些会将临时图像保存在本地的摄像头平台。它也可用于显示您定期生成的图表，并在 Home Assistant 中展示。

:::note
要让该集成能够读取文件，必须将文件路径添加到 [allowlist_external_dirs](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 操作：更新文件路径

`local_file.update_file_path` 操作会更改摄像头显示的文件。

| 数据属性 | 说明 |
| ---------------------- | ---------------------------------------------------- |
| `entity_id`            | 要更新的摄像头 `entity_id` 字符串。 |
| `file_path`            | 要显示的新图像文件的完整路径。 |
