---
title: FFmpeg
description: 关于如何在 Home Assistant 中集成 FFmpeg 的说明。
ha_category:
  - Image processing
ha_release: 0.29
ha_domain: ffmpeg
ha_platforms:
  - camera
ha_integration_type: system
---

**FFmpeg** 集成允许其他 Home Assistant 集成处理视频和音频流。

此集成支持自 3.0.0 以来的所有 FFmpeg 版本。如果您运行 Home Assistant Operating System 或使用 Home Assistant Container，这已经为您预安装了。在所有其他情况下，请确保您的系统上安装了 FFmpeg。

## 配置

要设置它，请将以下信息添加到您的 "`configuration.yaml`" 文件中：

```yaml
ffmpeg:
```

```yaml
ffmpeg_bin:
  description: `ffmpeg` 二进制文件的名称或路径。
  required: false
  default: "`ffmpeg`"
  type: string
```

### 故障排除

在大多数情况下，`ffmpeg` 会自动检测读取视频或音频流或文件所需的所有选项。但在极少数情况下，您可能需要设置选项来帮助 `ffmpeg`。

首先，检查您的流是否可以在 Home Assistant 之外被 `ffmpeg` 播放（使用选项 `-an` 或 `-vn` 禁用视频或音频流）：

```bash
ffmpeg -i INPUT -an -f null -
```

现在您应该能够看到出了什么问题。以下列表包含一些常见问题和解决方案：

- `[rtsp @ ...] UDP timeout, retrying with TCP`：您需要在配置中设置 RTSP 传输：`input: -rtsp_transport tcp -i INPUT`
- `[rtsp @ ...] Could not find codec parameters for stream 0 (Video: ..., none): unspecified size`：FFmpeg 需要更多数据或时间进行自动检测（默认为 5 秒）。您可以设置 `analyzeduration` 和/或 `probesize` 选项来尝试给 FFmpeg 更多余地。如果找到所需的值，可以这样设置：`input: -analyzeduration xy -probesize xy -i INPUT`。更多信息可以在[这里](https://www.ffmpeg.org/ffmpeg-formats.html#Description)找到。

#### USB 摄像头

对于 `INPUT`，需要一个有效的源。USB 摄像头是测试视频设置的简单方法。要获取连接到系统的所有可用 USB 摄像头，例如，在 Linux 机器上使用 v4l2 工具。

```bash
$ v4l2-ctl --list-devices
UVC Camera (046d:0825) (usb-0000:00:14.0-1):
  /dev/video1

Integrated Camera (usb-0000:00:14.0-10):
  /dev/video0
```

使用您的 USB 设备 `/dev/video1` 录制测试视频：

```bash
$ ffmpeg -i /dev/video1 -codec:v libx264 -qp 0 lossless.mp4
[...]
Input #0, video4linux2,v4l2, from '/dev/video1':
  Duration: N/A, start: 43556.376974, bitrate: 147456 kb/s
    Stream #0:0: Video: rawvideo (YUY2 / 0x32595559), yuyv422, 640x480, 147456 kb/s, 30 fps, 30 tbr, 1000k tbn, 1000k tbc
[...]
Output #0, mp4, to 'lossless.mp4':
  Metadata:
    encoder         : Lavf57.41.100
    Stream #0:0: Video: h264 (libx264) ([33][0][0][0] / 0x0021), yuv422p, 640x480, q=-1--1, 30 fps, 15360 tbn, 30 tbc
    Metadata:
      encoder         : Lavc57.48.101 libx264
    Side data:
      cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: -1
Stream mapping:
  Stream #0:0 -> #0:0 (rawvideo (native) -> h264 (libx264))
Press [q] to stop, [?] for help
frame=  223 fps= 40 q=-1.0 Lsize=   16709kB time=00:00:07.40 bitrate=18497.5kbits/s dup=58 drop=0 speed=1.32x
```