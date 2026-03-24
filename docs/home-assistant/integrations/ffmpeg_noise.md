---
title: FFmpeg Noise
description: 关于如何集成基于 FFmpeg 的噪声二值传感器的说明
ha_category:
  - Image processing
ha_iot_class: Calculated
ha_release: 0.27
ha_domain: ffmpeg_noise
ha_platforms:
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**FFmpeg Noise** 集成允许您在 Home Assistant 中使用任何视频或音频源和 [FFmpeg](https://www.ffmpeg.org/) 进行各种传感器检测。

:::note
如果 `ffmpeg` 进程损坏，传感器将不可用。要控制传感器的 FFmpeg 进程，请使用 `ffmpeg.start`、`ffmpeg.stop` 和 `ffmpeg.restart` 操作。


:::
## 配置

要将带有噪声检测的 FFmpeg 添加到您的系统中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: ffmpeg_noise
    input: FFMPEG_SUPPORTED_INPUT
```

```yaml
input:
  description: FFmpeg 兼容的输入文件、流或源。
  required: true
  type: string
name:
  description: 覆盖摄像头的名称。
  required: false
  type: string
initial_state:
  description: 随 Home Assistant 启动 FFmpeg。
  required: false
  type: boolean
  default: true
peak:
  description: 检测噪声的阈值，单位 dB。0 很响，-100 很低。
  required: false
  type: integer
  default: -30
duration:
  description: 噪声超过峰值多长时间才能触发状态。
  required: false
  type: integer
  default: 1
reset:
  description: 没有新噪声超过峰值后重置状态的时间。
  required: false
  type: integer
  default: 20
extra_arguments:
  description: 传递给 `ffmpeg` 的额外选项，如音频频率过滤。
  required: false
  type: string
output:
  description: 允许您将此传感器的音频输出发送到 Icecast 服务器或其他 FFmpeg 支持的输出，例如在状态触发后使用 Sonos 流式传输。
  required: false
  type: string
```

要试验值：

```bash
ffmpeg -i YOUR_INPUT -vn -filter:a silencedetect=n=-30dB:d=1 -f null -
```

### 故障排除

#### 一段时间后无响应

如果噪声传感器变得无响应，请确保在配置中有 `extra_arguments: -nostats`。

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: ffmpeg_noise
    input: FFMPEG_SUPPORTED_INPUT
    extra_arguments: -nostats
```