---
title: 智能婴儿监护器
description: 如何打造属于你自己的智能婴儿监护器
---

作为父母，最难的事情之一就是时刻留意宝宝，确保宝宝一切安好。因此，婴儿监护器成为增长最快的婴儿用品类别之一也就不足为奇了。不过，市面上许多婴儿监护器都比较“笨”，需要你一直盯着视频画面或者持续听音频。本教程将帮助你以较低预算打造一个智能婴儿监护器，并将其集成到 Home Assistant 中。我们不再依赖婴儿监护器自带的低质量扬声器，而是使用家里现有的音箱，比如 Sonos。我们还可以发送通知（附带图片），避免你一直盯着监控画面。

当然，你也可以把这套配置当作通用监控系统，用来监听整个房屋中的噪音。

<!--more-->

### 配置

我们需要一台能够采集声音的 IP 摄像头，放在宝宝的房间里。你也可以使用接入麦克风的树莓派，并通过组播把音频发送到 Home Assistant：`ffmpeg -f alsa -i hw:1,0 -vn -f rtp rtp://236.0.0.1:2000`。在同一网络中，Home Assistant 侧的 `input` 选项可以设置为 `rtp://236.0.0.1:2000`。

接下来，我们为这台 IP 摄像头添加一个 `ffmpeg_noise` 二元传感器。这个传感器提供了一个输出 `option`，可以把输出发送到 [icecast2](http://icecast.org/) 服务器，从而通过已集成到 Home Assistant 的音箱进行播放。我们还可以在自动化中使用这个二元传感器。如果你不想在噪音传感器触发后播放音频，可以忽略 icecast2 相关配置。

:::note
在 0.38 版本中，我们将二元传感器的平台名称从 `ffmpeg` 改为 `ffmpeg_noise`。此外，所有服务都迁移到了组件下，并从 `binary_sensor.ffmpeg_xy` 重命名为 `ffmpeg.xy`。
:::

在 Raspbian Jessie 上，你可以按下面的方式配置 [FFmpeg](/home-assistant/integrations/ffmpeg) 并安装 [icecast2](http://icecast.org/) 服务器：

```bash
sudo echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
sudo apt-get update
sudo apt-get -t jessie-backports install ffmpeg
sudo apt-get install icecast2
```

我们为 babyphone 配置一个 icecast 挂载点，并更新 `/etc/icecast2/icecast.xml`：

```xml
<mount>
    <mount-name>/babyphone.mp3</mount-name>
    <stream-name>Babyphone</stream-name>

    <username>stream_user</username>
    <password>stream_pw</password>
</mount>
```

现在我们可以将噪音传感器添加到 Home Assistant 中。通过 `duration` 选项，我们把传感器的灵敏度调整为 2 秒，这样就不会因为宝宝每一次轻咳都收到大量通知。传感器会在恢复前等待 60 秒，这样可以避免短暂的哭闹间歇再次触发新的警报。

我们可以使用 300 Hz 的高通滤波器和 2500 Hz 的低通滤波器来针对人声优化音频流。这样可以滤除背景噪音等非人声声音。如果麦克风音量太低，还可以加入音量放大器（如果不需要，可以从 `extra_arguments` 中移除）。对于 icecast2，我们将音频流转换为采样率 16000 的 mp3，这也是 Sonos 音箱支持的最低采样率。我们使用 `peak` 来设置噪音检测阈值，其中 0 dB 表示非常响，-100 dB 表示很低。

```yaml
binary_sensor:
  - platform: ffmpeg_noise
    input: rtsp://user:pw@my_input/video
    extra_arguments: -filter:a highpass=f=300,lowpass=f=2500,volume=volume=2 -codec:a libmp3lame -ar 16000
    output: -f mp3 icecast://stream_user:stream_pw@127.0.0.1:8000/babyphone.mp3
    initial_state: false
    duration: 2
    reset: 60
    peak: -32
```

我们使用 `initial_state` 选项，防止 FFmpeg 进程在 Home Assistant 启动时自动运行，而只在需要时才启动。下面的自动化通过 `input_boolean` 来控制 FFmpeg 服务的状态。

```yaml
input_boolean:
  babyphone:
    name: babyphone
    initial: off

automation:
 - alias: "Babyphone on"
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: "off"
     to: "on"
   action:
     service: ffmpeg.start
     target:
       entity_id: binary_sensor.ffmpeg_noise

 - alias: "Babyphone off"
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: "on"
     to: "off"
   action:
     service: ffmpeg.stop
     target:
       entity_id: binary_sensor.ffmpeg_noise
```

### 触发警报

现在我们可以实现很多玩法。下面是一个简单的自动化示例，展示如何配合 Sonos 音箱使用。

```yaml
automation:
 - alias: "Babyphone alarm on"
   trigger:
     platform: state
     entity_id: binary_sensor.ffmpeg_noise
     from: "off"
     to: "on"
   action:
    - service: media_player.sonos_snapshot
      target:
        entity_id: media_player.bedroom
    - service: media_player.sonos_unjoin
      target:
        entity_id: media_player.bedroom
    - service: media_player.volume_set
      target:
        entity_id: media_player.bedroom
      data:
        volume_level: 0.4
    - service: media_player.play_media
      target:
        entity_id: media_player.bedroom
      data:
        media_content_type: "music"
        media_content_id: http://my_ip_icecast:8000/babyphone.mp3
    - service: light.turn_on:
      target:
        entity_id:
       - light.floor
       - light.bedroom
      data:
        brightness: 150

 - alias: "Babyphone alarm off"
   trigger:
     platform: state
     entity_id: binary_sensor.ffmpeg_noise
     from: "on"
     to: "off"
   action:
    - service: media_player.sonos_restore
      target:
        entity_id: media_player.bedroom
    - service: light.turn_off:
      target:
        entity_id:
         - light.floor
         - light.bedroom
```

### 致谢

特别感谢 [arsaboo](https://github.com/arsaboo) 协助撰写这篇博文。
