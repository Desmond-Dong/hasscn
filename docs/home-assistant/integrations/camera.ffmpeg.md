---
title: "FFmpeg Camera"
description: "关于如何通过 FFmpeg 将视频源作为摄像头集成到 Home Assistant 的说明。"
ha_category:
  - Camera
ha_release: 0.26
ha_iot_class: Local Polling
ha_domain: ffmpeg
---

**FFmpeg 摄像头**集成允许您通过 [FFmpeg](https://www.ffmpeg.org/) 将任何视频源用作 Home Assistant 中的摄像头。此视频源必须支持多次同时读取，因为对于每个并发的 Home Assistant 用户，每 10 秒都会建立一个到源的连接。通常这不会有问题。

## 配置

要在您的安装中启用 FFmpeg 源，您必须首先配置 [FFmpeg 集成](/home-assistant/integrations/ffmpeg/)，然后将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
camera:
  - platform: ffmpeg
    input: FFMPEG_SUPPORTED_INPUT
```

```yaml
input:
  description: FFmpeg 兼容的输入文件、流或源。
  required: true
  type: string
name:
  description: 覆盖您摄像头的名称。
  required: false
  type: string
extra_arguments:
  description: 传递给 `ffmpeg` 的额外选项，例如图像质量或视频滤镜选项。
  required: false
  type: string
  default: "-pred 1"
```

### 图像质量

您可以使用 [`extra_arguments`](https://www.ffmpeg.org/ffmpeg-codecs.html#jpeg2000) `-q:v 2-32` 或无损选项 `-pred 1` 控制图像质量。默认为无损。

如果您在使用此摄像头时遇到问题，请参阅[故障排除部分](/home-assistant/integrations/ffmpeg/#troubleshooting)。
