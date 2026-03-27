---
title: Sighthound
description: '使用 Sighthound Cloud(https://www.sighthound.com/products/cloud) 检测摄像头图像中的人物。Sighthound Developer 套餐（非商业用途免费）每月允许处理 5000 张图像。如果您每月需要处理更多图像。'
ha_category:
  - Image processing
ha_release: 0.105
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@robmarkcole'
ha_domain: sighthound
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Sighthound

使用 [Sighthound Cloud](https://www.sighthound.com/products/cloud) 检测摄像头图像中的人物。Sighthound Developer 套餐（非商业用途免费）每月允许处理 5000 张图像。如果您每月需要处理更多图像，则需要注册生产账户（即 Basic 或 Pro 账户）。

此集成会添加一个图像处理实体，其状态为图像中检测到的人数。每检测到一名人员，就会触发一个 `sighthound.person_detected` 事件。事件数据中包括触发该事件的图像处理实体 `entity_id` 以及检测到的人员边界框。

如果配置了 `save_file_folder`，每次新检测到人员时，都会在指定文件夹中保存一张名为 `sighthound_{camera_name}_latest.jpg` 的标注图像；如果该文件已存在则会覆盖。保存的图像会显示检测到人员的边界框，可通过 [Local File](/home-assistant/integrations/local_file/) 摄像头在 Home Assistant 前端展示，也可用于通知。如果将 `save_timestamped_file` 配置为 `true`，则标注图像会以包含检测时间的文件名进行保存。

请注意，默认情况下该集成不会自动扫描图像，而是需要您调用 `image_processing.scan` 操作，例如通过由运动触发的自动化来调用。

## 配置

要在您的安装中启用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
image_processing:
  - platform: sighthound
    api_key: "MY_API_KEY"
    source:
      - entity_id: camera.my_cam
```

```yaml
api_key:
  description: 您的 Sighthound Cloud API 密钥。
  required: true
  type: string
account_type:
  description: 如果您使用的是付费账户，请填 `prod`。
  required: false
  type: string
save_file_folder:
  description: 用于保存标注图像的文件夹。
  required: false
  type: string
save_timestamped_file:
  description: 以包含检测时间的文件名保存处理后的图像。需要先配置 `save_file_folder`。
  required: false
  default: false
  type: boolean
source:
  description: 图像源列表。
  required: true
  type: map
  keys:
    entity_id:
      description: 用于获取图片的摄像头实体 ID。
      required: true
      type: string
    name:
      description: 此参数允许您覆盖 `image_processing` 实体的名称。
      required: false
      type: string
```

要验证集成是否成功，请检查是否出现了类似 `image_processing.sighthound_my_cam` 的新实体。

## 处理图像

当您想处理一张图像时，需要调用 `image_processing.scan` 操作，并监听 `sighthound.person_detected` 和/或 `sighthound.vehicle_detected` 事件。

以下示例使用两个自动化：

- 第一个自动化会在检测到运动时触发。它调用 `image_processing.scan` 操作，将摄像头图像发送到 Sighthound 服务器进行处理。

- 第二个自动化会由 `sighthound.vehicle_detected` 事件触发，并向手机发送通知。

```yaml
# Example automations.yaml entry
- alias: "Entrance motion image processing"
  description: "Send a camera image to sighthound, when motion is detected at the entrance"
  triggers:
    - trigger: device
      type: motion
      device_id: YOUR_DEVICE_ID
      entity_id: binary_sensor.my_motion_sensor
      domain: binary_sensor
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.sighthound_my_cam

- alias: "Arriving vehicle notification"
  description: "Send a notification to a phone, when a vehicle is detected at the entrance"
  triggers:
    - trigger: event
      event_type: sighthound.vehicle_detected
  actions:
    - action: notify.mobile_app_my_iphone
      data:
        message: "Somebody has just arrived by car."
```
