# FFmpeg Motion

**FFmpeg Motion** 集成允许您在 Home Assistant 中使用任何视频源和 [FFmpeg](https://www.ffmpeg.org/) 进行运动检测。

:::note
如果 `ffmpeg` 进程损坏，传感器将不可用。要控制传感器的 FFmpeg 进程，请使用 `ffmpeg.start`、`ffmpeg.stop` 和 `ffmpeg.restart` 操作。

:::

## 运动

FFmpeg 没有运动检测过滤器，但可以使用场景过滤器来检测新场景/运动。您可以通过 'changes' 选项设置需要多少变化才能检测到运动，这是帧之间变化的百分比值。如果您想要一个非常小的 'changes' 值，也可以添加降噪过滤器。

## 配置

要将带有运动检测的 FFmpeg 添加到您的系统中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: ffmpeg_motion
    input: FFMPEG_SUPPORTED_INPUT
```

```yaml
input:
  description: FFmpeg 兼容的输入文件、流或源。
  required: true
  type: string
name:
  description: 覆盖前端摄像头的名称。
  required: false
  type: string
initial_state:
  description: 随 Home Assistant 启动 `ffmpeg`。
  required: false
  type: boolean
  default: true
changes:
  description: 两帧之间需要变化多少才能检测为运动，百分比值（较低的值更敏感）。
  required: false
  type: integer
  default: 10
reset:
  description: 未检测到新运动后重置状态的时间。
  required: false
  type: integer
  default: 20
repeat:
  description: 在 *repeat_time* 内需要检测到多少事件才能触发运动，0 表示停用。
  required: false
  type: integer
  default: 0
repeat_time:
  description: *repeat* 事件需要在多长时间内发生才能触发运动，0 秒表示停用。
  required: false
  type: integer
  default: 0
extra_arguments:
  description: 传递给 `ffmpeg` 的额外选项，例如视频降噪过滤。
  required: false
  type: string
```

要试验值（changes/100 是 `ffmpeg` 中的场景值）：

```bash
ffmpeg -i YOUR_INPUT -an -filter:v select=gt(scene\,0.1) -f framemd5 -
```

如果您在使用此传感器时遇到问题，请参阅[故障排除部分](/home-assistant/integrations/ffmpeg/index.md#troubleshooting)。

### 提示

* 使用 [crop 过滤器](https://ffmpeg.org/ffmpeg-filters.html#crop) 仅在自定义区域检测运动：

```yaml
extra_arguments: -filter:v "crop=100:100:12:34"
```
