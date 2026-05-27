# Camera

**Camera** 集成允许您在 Home Assistant 中使用 IP 摄像头。

:::note Building block integration
This camera is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this camera building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the camera building block offers.
:::

## 流媒体视频

如果您的摄像头支持，并且已设置 [`stream`](/home-assistant/integrations/stream.md) 集成，您将能够在前端和支持的媒体播放器上流式传输摄像头画面。

`Preload stream` 选项将在 Home Assistant 启动时启动摄像头源，并继续保持流活跃。这将减少在前端打开流时的延迟，以及使用 `play_stream` 操作或 Google Assistant 集成时的延迟。但是，这会消耗更多机器资源，因此如果您计划使用此功能，建议检查 CPU 使用情况。

<p class='img'>
  <img src='/home-assistant/images/integrations/camera/preload-stream.png' alt='截图：Home Assistant 前端中的预加载流选项。'>
  示例显示摄像头对话框中的预加载流选项。
</p>

## 摄像头的状态

摄像头可以有以下状态。并非所有摄像头集成都支持所有状态。

* **Streaming**：摄像头正在传输其录制的视频数据的实时回放。
* **Recording**：摄像头当前正在捕获视频内容。
* **Idle**：摄像头当前未捕获视频内容。
* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚不清楚。

## 动作

加载后，`camera` 平台将公开可调用以执行各种操作的动作。

可用动作：`enable_motion_detection`、`disable_motion_detection`、`play_stream`、`record`、`snapshot`、`turn_off` 和 `turn_on`。

### 动作：启用运动检测

`camera.enable_motion_detection` 动作允许您启用摄像头的运动检测。

| 数据属性 | 可选 | 描述                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------- |
| `entity_id`    | 是      | 要启用运动检测的实体名称，例如 `camera.living_room_camera`。 |

### 动作：禁用运动检测

`camera.disable_motion_detection` 动作允许您禁用摄像头的运动检测。

| 数据属性 | 可选 | 描述                                                                         |
| -------------- | -------- | ----------------------------------------------------------------------------------- |
| `entity_id`    | 是      | 要禁用运动检测的实体名称，例如 `camera.living_room_camera`。 |

### 动作：播放流

`camera.play_stream` 动作允许您将摄像头的实时流播放到选定的媒体播放器。需要设置 [`stream`](/home-assistant/integrations/stream.md) 集成。

| 数据属性 | 可选 | 描述                                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------------------- |
| `entity_id`    | 否       | 要获取流的实体名称，例如 `camera.living_room_camera`。                     |
| `media_player` | 否       | 要播放流的媒体播放器名称，例如 `media_player.living_room_tv`。                |
| `format`       | 是      | `stream` 集成和所选 `media_player` 支持的流格式。默认值：`hls` |

例如，自动化中的以下动作将向您的 Chromecast 发送 `hls` 实时流。

```yaml
actions:
  - action: camera.play_stream
    target:
      entity_id: camera.yourcamera
    data:
      media_player: media_player.chromecast
```

### 动作：录制

`camera.record` 动作允许您从摄像头流进行 `.mp4` 录制。需要设置 `stream` 集成。

`duration` 和 `lookback` 选项都是建议值，但对于每个摄像头应该保持一致。录制的实际长度可能会有所不同。建议您根据需要调整这些设置。

| 数据属性 | 可选 | 描述                                                                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | 否       | 要创建快照的实体名称，例如 `camera.living_room_camera`。                                                              |
| `filename`     | 否       | 录制文件名。                                                                                                                           |
| `duration`     | 是      | 目标录制长度（秒）。默认值：30                                                                                              |
| `lookback`     | 是      | 除持续时间外要包含的目标回看期（秒）。仅在当前有活动的 HLS 流时可用。默认值：0 |

`filename` 的路径部分必须是您的 "`configuration.yaml`" 文件中 [`homeassistant:`](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs) 部分的 `allowlist_external_dirs` 中的一个条目。

例如，自动化中的以下动作将从 "yourcamera" 进行录制并保存到 /tmp，文件名带有时间戳。

```yaml
actions:
  - variables:
      my_camera_id: camera.yourcamera  # 将摄像头 entity_id 存储在变量中以供重用
  - action: camera.record
    target:
      entity_id: '{{ my_camera_id }}'
    data:
      filename: '/tmp/{{ my_camera_id }}_{{ now().strftime("%Y%m%d-%H%M%S") }}.mp4'
```

### 动作：快照

`camera.snapshot` 动作允许您从摄像头拍摄快照。

| 数据属性 | 可选 | 描述                                                                                                        |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entity_id`    | 否       | 要创建快照的实体名称，例如 `camera.living_room_camera`。                                  |
| `filename`     | 否       | 快照文件名。                                                                                                |

`filename` 的路径部分必须是您的 "`configuration.yaml`" 文件中 [`homeassistant:`](/home-assistant/integrations/homeassistant/index.md) 部分的 `allowlist_external_dirs` 中的一个条目。

例如，自动化中的以下动作将从 "yourcamera" 拍摄快照并保存到 /tmp，文件名带有时间戳。

```yaml
actions:
  - variables:
      my_camera_id: camera.yourcamera  # 将摄像头 entity_id 存储在变量中以供重用
  - action: camera.snapshot
    target:
      entity_id: '{{ my_camera_id }}'
    data:
      filename: '/tmp/{{ my_camera_id }}_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```

### 动作：关闭

`camera.turn_off` 动作允许您关闭摄像头。并非所有摄像头型号都支持此动作，请查阅各个摄像头页面。

| 数据属性 | 可选 | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| `entity_id`    | 是      | 要关闭的实体名称，例如 `camera.living_room_camera`。 |

### 动作：打开

`camera.turn_on` 动作允许您打开摄像头。并非所有摄像头型号都支持此动作，请查阅各个摄像头页面。

| 数据属性 | 可选 | 描述                                                        |
| -------------- | -------- | ------------------------------------------------------------------ |
| `entity_id`    | 是      | 要打开的实体名称，例如 `camera.living_room_camera`。 |

### 测试是否工作

测试 `camera` 平台是否正确设置的一种方法是使用 **开发者工具** 中的 **动作**。从 **动作** 下拉菜单中选择您的动作，在 **数据** 字段中输入类似以下示例的内容，然后选择 **执行动作**。

```yaml
entity_id: camera.living_room_camera
```
