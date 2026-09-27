# AI Task

**AI Task** 集成允许您借助 AI 来配置 Home Assistant。

:::note Building block integration
This ai task is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this ai task building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the ai task building block offers.
:::

对于每个任务，您可以设置首选的 AI 任务实体。这允许您为不同目的使用不同的 AI 模型，例如生成文本、总结信息，甚至控制设备。当动作中省略实体 ID 时，将使用首选的 AI 任务实体。

## AI 任务实体状态

AI 任务实体的状态是一个时间戳，显示该 AI 任务上次使用的日期和时间。

## 动作 `ai_task.generate_data`

使用 AI 生成数据。

| 数据属性 | 可选 | 描述                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `task_name`            | 否       | 用于标识文本生成任务类型的字符串（例如，"home summary"、"alert notification"）。 |
| `instructions`         | 否       | 包含 AI 生成文本时需要遵循的具体指令的字符串。                               |
| `entity_id`            | 是       | 指向 LLM 任务实体 `entity_id` 的字符串。如果未指定，则使用默认 LLM 任务。      |
| `structure`            | 是      | 定义输出数据结构的字典。设置后，AI 将返回具有指定字段的结构化数据。每个字段可以有 `description`、`selector` 和可选的 `required` 属性。 |
| `attachments`          | 是      | 要包含在任务中的附件列表。每个附件是 [媒体选择器](/home-assistant/docs/blueprint/selectors/index.md#media-selector) 的输出。 |

响应变量是一个包含以下键的字典：

* `data`：生成的文本或结构化数据（取决于是否指定了 `structure`）。
* `conversation_id`：用于任务的对话 ID。

## 动作 `ai_task.generate_image`

使用 AI 生成图像。

| 数据属性 | 可选 | 描述                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `task_name`            | 否       | 用于标识图像生成任务类型的字符串（例如，"floor map"、"weather visualization"）。 |
| `instructions`         | 否       | 包含 AI 生成图像时需要遵循的具体指令的字符串。                               |
| `entity_id`            | 是       | 指向 LLM 任务实体 `entity_id` 的字符串。如果未指定，则使用默认 LLM 任务。      |
| `attachments`          | 是      | 要包含在任务中的附件列表。每个附件是 [媒体选择器](/home-assistant/docs/blueprint/selectors/index.md#media-selector) 的输出。 |

响应变量是一个包含以下键的字典：

* `media_source_id`：生成图像的 [媒体源](/home-assistant/integrations/media_source/index.md) 内容 ID。
* `url`：生成图像的 URL，不包含主机部分。URL 仅在一小时内有效。
* `revised_prompt`：某些模型会改写指令以添加更多细节或上下文。这是图像模型实际使用的提示词。
* `model`：用于图像生成的图像模型。
* `mime_type`：图像的 MIME 类型。
* `width`：图像宽度。
* `height`：图像高度。
* `conversation_id`：用于任务的对话 ID。

图像也将保存在第一个媒体目录中，并可通过媒体源集成浏览。

文件命名约定：

* 格式：`{date}_{time}_{sanitized_task_name}.{ext}`
* 示例：`2025-01-19_123456_home-security-camera.png`

## 示例

### 计算摄像头上的物品的模板实体

```yaml
template:
  - triggers:
      - trigger: homeassistant
        event: start
      - trigger: time_pattern
        minutes: "/5"  # 每 5 分钟更新一次
    actions:
      - action: ai_task.generate_data
        data:
          task_name: "{{ this.entity_id }}"
          instructions: >-
            这是我鹅舍的内部。里面有多少只鸟（鸡、鹅和鸭子）？
          structure:
            birds:
              selector:
                number:
          attachments:
            media_content_id: media-source://camera/camera.chicken_coop
            media_content_type: image/jpeg
        response_variable: result
    sensor:
      - name: "鸡"
        state: "{{ result.data.birds }}"
        state_class: total
```

其他想法：检测可用停车位数量、计算房间人数或检测门是否打开。

### 结构化输出示例

```yaml
# 示例：生成天气和室内舒适度报告
script:
- alias: "天气和舒适度报告"
  sequence:
    - action: ai_task.generate_data
      data:
        task_name: "天气舒适度报告"
        instructions: |
          根据当前情况：
          - 室外温度：{{ states('sensor.outdoor_temperature') }}°C
          - 天气状况：{{ states('weather.home') }}
          - 室内温度：{{ states('sensor.living_room_temperature') }}°C
          - 室内湿度：{{ states('sensor.living_room_humidity') }}%

          生成一个有趣的天气描述并评估室内舒适度。
        structure:
          weather_description:
            description: "对当前室外天气的幽默描述"
            required: true
            selector:
              text:
          indoor_comfort:
            description: "评估室内与室外相比的舒适程度"
            required: true
            selector:
              text:
      response_variable: comfort_report
    - action: notify.persistent_notification
      data:
        title: "🏠 家庭气候报告"
        message: |
          🌤️ **室外天气：**
          {{ comfort_report.data.weather_description }}

          🛋️ **室内舒适度：**
          {{ comfort_report.data.indoor_comfort }}
```

### 简单文本生成示例

```yaml
# 示例：车库门未关时生成通知
automation:
- alias: "车库门通知"
  triggers:
    - trigger: state
      entity_id: cover.garage_door
      to: 'on'
      for:
        minutes: 10
  actions:
    - action: ai_task.generate_data
      data:
        task_name: "车库门未关提醒"
        instructions: "生成一个有趣的通知，提醒车库门未关"
      response_variable: generated_text
    - action: notify.persistent_notification
      data:
        message: "{{ generated_text.data }}"
```

### 天气可视化示例

```yaml
# 示例：最新的天气图像
automation:
  - alias: "天气变化时更新图像"
    triggers:
      - trigger: state
        entity_id: weather.home
    actions:
      - alias: "使用 AI Task 生成图像"
        action: ai_task.generate_image
        response_variable: generated_image
        data:
          task_name: weather visualization
          instructions: >-
            天气为 {{ states("weather.home") }} 时的纽约

      - alias: "发送手动事件以更新图像实体"
        event: new_weather_image
        event_data:
          url: '{{ generated_image.url }}'

template:
  - trigger:
      - alias: "生成新天气图像时更新图像"
        trigger: event
        event_type: new_weather_image
    image:
      - name: "AI 生成的纽约图像"
        url: "http://localhost:8123{{ trigger.event.data.url }}"
```
