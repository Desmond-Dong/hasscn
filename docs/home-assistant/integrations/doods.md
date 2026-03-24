---
title: DOODS - Dedicated Open Object Detection Service
description: 使用 DOODS 检测和识别物体。
ha_category:
  - Image processing
ha_iot_class: Local Polling
ha_release: '0.100'
ha_domain: doods
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**DOODS** 图像处理集成允许您使用 [DOODS](https://github.com/snowzach/doods/) 检测和识别摄像头图像中的物体。实体的状态是检测到的物体数量，识别出的物体列在 `summary` 属性中以及数量。`matches` 属性为每个检测类别提供识别的置信度 `score` 和物体的边界 `box`。

## 设置

在使用此集成之前，DOODS 软件需要运行。运行 DOODS 软件的选项：

- 作为 [Home Assistant 应用](https://github.com/snowzach/hassio-addons)运行
- 作为 [Docker 容器](https://hub.docker.com/r/snowzach/doods)运行

## 配置

要在您的系统中启用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
image_processing:
  - platform: doods
    url: "http://<my doods server>:8080"
    detector: default
    source:
      - entity_id: camera.front_yard
```

```yaml
source:
  description: 图像源列表。
  required: true
  type: map
  keys:
    entity_id:
      description: 要获取图片的摄像头实体 ID。
      required: true
      type: string
    name:
      description: 此参数允许您覆盖 `image_processing` 实体的名称。
      required: false
      type: string
url:
    description: DOODS 服务器的 URL。
    required: true
    type: string
auth_key:
    description: DOODS 配置文件中设置的身份验证密钥或 Docker 环境变量（DOODS_AUTH_KEY）
    required: false
    type: string
timeout:
    description: 请求超时时间（秒）。
    required: false
    type: integer
    default: 90
detector:
    description: 要使用的 DOODS 检测器。
    required: true
    type: string
confidence:
    description: 未明确设置的任何检测物体的默认置信度。
    required: false
    type: float
area:
    description: 全局检测区域。此框中的物体将被报告。图像顶部为 0，底部为 1。从左到右相同。
    required: false
    type: map
    keys:
      top:
        description: 从图像顶部定义的顶部线条百分比。
        required: false
        type: float
        default: 0
      left:
        description: 从图像左侧定义的左边线条百分比。
        required: false
        type: float
        default: 0
      bottom:
        description: 从图像顶部定义的底部线条百分比。
        required: false
        type: float
        default: 1
      right:
        description: 从图像左侧定义的右边线条百分比。
        required: false
        type: float
        default: 1
      covers:
        description: 如果为 true，检测必须完全在此框内。如果为 false，框内检测的任何部分都会触发。
        required: false
        type: boolean
        default: true
file_out:
    description: 集成保存处理后图像（包括边界框）的[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)。`camera_entity` 可用作触发源摄像头的 `entity_id` 字符串。
    required: false
    type: list
labels:
    description: 关于所选标签模型的信息。
    required: false
    type: map
    keys:
      name:
        description: 要选择进行检测的物体标签。
        required: true
        type: string
      confidence:
       description: 所选标签的最小置信度。
       required: false
       type: float
      area:
        description: 自定义检测区域。只有完全在此框内的物体才会被报告。图像顶部为 0，底部为 1。从左到右相同。
        required: false
        type: map
        keys:
          top:
            description: 从图像顶部定义的顶部线条百分比。
            required: false
            type: float
            default: 0
          left:
            description: 从图像左侧定义的左边线条百分比。
            required: false
            type: float
            default: 0
          bottom:
            description: 从图像顶部定义的底部线条百分比。
            required: false
            type: float
            default: 1
          right:
            description: 从图像左侧定义的右边线条百分比。
            required: false
            type: float
            default: 1
          covers:
            description: 如果为 true，检测必须完全在此框内。如果为 false，框内检测的任何部分都会触发。
            required: false
            type: boolean
            default: true
```

## 支持的标签

检测器 `default` 和 `tensorflow` 都使用[此文件](https://raw.githubusercontent.com/amikelive/coco-labels/master/coco-labels-2014_2017.txt)中的标签。

## 示例配置


```yaml
# 示例高级 configuration.yaml 条目
image_processing:
  - platform: doods
    scan_interval: 1000
    url: "http://<my doods server>:8080"
    timeout: 60
    detector: default
    auth_key: 2up3rL0ng4uthK3y
    source:
      - entity_id: camera.front_yard
    file_out:
      - "/tmp/{{ camera_entity.split('.')[1] }}_latest.jpg"
      - "/tmp/{{ camera_entity.split('.')[1] }}_{{ now().strftime('%Y%m%d_%H%M%S') }}.jpg"
    confidence: 50
    # 此全局检测区域是所有标签所必需的
    area:
      # 排除图像顶部 10%
      top: 0.1
      # 排除图像右侧 5%
      right: 0.95
      # 整个检测必须在此框内
      covers: true
    labels:
      - name: person
        confidence: 40
        area:
          # 排除图像顶部 10%
          top: 0.1
          # 排除图像右侧 15%
          right: 0.85
          # 此区域内检测的任何部分都会触发
          covers: false
      - car
      - truck
```


## 优化资源

[图像处理集成](/home-assistant/components/image_processing/)以 `scan_interval` 给定的固定周期处理摄像头的图像。如果摄像头上的图像没有变化，这会导致过度处理，因为默认的 `scan_interval` 是 10 秒。您可以通过在配置中添加 `scan_interval: 10000`（将间隔设置为 10,000 秒）来覆盖此设置，然后在您实际想要执行处理时调用 `image_processing.scan` 操作。

```yaml
# 示例高级 configuration.yaml 条目
image_processing:
  - platform: doods
    scan_interval: 10000
    source:
      - entity_id: camera.driveway
      - entity_id: camera.backyard
```

```yaml
# 示例高级 automations.yaml 条目
- alias: "Doods scanning"
  triggers:
     - trigger: state
       entity_id:
         - binary_sensor.driveway
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.doods_camera_driveway
```