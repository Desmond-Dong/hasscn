---
title: Image
description: 'Image 集成允许其他集成显示静态图像。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Image
ha_release: 2023.7
ha_quality_scale: internal
ha_domain: image
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Image

**Image** 集成允许其他集成显示静态图像。

:::note Building block integration
This image is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this image building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the image building block offers.
:::

## 图像实体的状态

图像实体的状态是一个时间戳，用于显示图像上次更改的日期和时间。

此外，实体还可以具有以下状态：

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

### 操作

加载后，`image` 平台会公开可调用的服务，以执行各种操作。

可用服务：`snapshot`。

#### `snapshot` 操作

从图像中抓取快照。

| Data attribute | Optional | Description                                                                    |
| -------------- | -------- | ------------------------------------------------------------------------------ |
| `entity_id`    | no       | 要抓取快照的实体名称，例如 `image.my_image`。                                  |
| `filename`     | no       | 快照文件名                                                                     |

`filename` 的路径部分必须在您的 `configuration.yaml` 文件 [`homeassistant:`](/home-assistant/docs/configuration/basic/) 部分的 `allowlist_external_dirs` 中列出。

例如，以下自动化操作会从 "yourimage" 抓取快照，并以带时间戳的文件名保存到 `/tmp`。


```yaml
actions:
  - variables:
      entity_id: image.yourimage  # Store the camera entity_id in a variable for reuse
  - action: image.snapshot
    target:
      entity_id: '{{ entity_id }}'
    data:
      filename: '/tmp/{{ entity_id }}_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```


