---
title: Image processing
description: 关于如何使用 Home Assistant 设置图像处理的说明。
ha_category:
  - Image processing
ha_release: 0.36
ha_domain: image_processing
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

图像处理功能使 Home Assistant 能够处理来自[摄像头](/home-assistant/integrations/#camera)的图像。仅支持摄像头实体作为来源。

:::note Building block integration
This image processing is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this image processing building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the image processing building block offers.
:::

## 图像处理实体的状态

对于人脸识别应用，图像处理实体的状态可以是检测到的人名，或检测到的运动类型。

此外，实体还可以具有以下状态：

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## ALPR

ALPR 实体具有车辆计数属性 `vehicles`，所有识别到的车牌都会存储在 `plates` 属性中。

当 OpenALPR 识别到新的车牌后，会触发 `found_plate` 事件。

```yaml
# Example configuration.yaml automation entry
automation:
- alias: "Open garage door"
  triggers:
    - trigger: event
      event_type: image_processing.found_plate
      event_data:
        entity_id: openalpr.camera_garage_1
        plate: BE2183423
...
```

将提供以下事件属性（取决于平台）：`entity_id`、`plate`、`confidence`

## 人脸

人脸实体具有人脸计数属性 `total_faces`，所有人脸数据都存储在 `faces` 属性中。

当人脸实体检测到人脸后，会触发 `detect_face` 事件。

```yaml
# Example configuration.yaml automation entry
automation:
- alias: "Known person in front of my door"
  triggers:
    - trigger: event
      event_type: image_processing.detect_face
      event_data:
        entity_id: image_processing.door
        name: "Hans Maier"
...
```

将提供以下事件属性（取决于平台）：`entity_id`、`name`、`confidence`、`age`、`gender`、`motion`、`glasses`

## `scan_interval` 与资源优化

图像处理集成会按照 `scan_interval` 指定的固定周期处理摄像头图像。由于默认 `scan_interval` 为 10 秒，如果摄像头图像没有变化，就可能导致不必要的频繁处理。您可以在配置中添加 `scan_interval: 10000` 来覆盖该值（将间隔设置为 10000 秒），然后在实际需要处理时再调用 `image_processing.scan` 操作。

```yaml
# Example configuration.yaml
sensor:
- platform: _AN_IMAGE_PROCESSING_PLATFORM_
  scan_interval: 10000
...
automation:
- alias: "Scan for faces when motion detected"
  triggers:
    - trigger: state
      entity_id: sensor.door_motion_sensor
      to: "on"
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.door
...
```
