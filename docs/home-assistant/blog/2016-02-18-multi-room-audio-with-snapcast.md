---
title: Multi-房间 audio with Snapcast, Mopidy, and Home Assistant
description: '你是否想在家里的每个房间听音乐，并且由一个音源统一控制？那多房间音频就是你要找的方案。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# Multi-房间 audio with Snapcast, Mopidy, and Home Assistant

你是否想在家里的每个房间听音乐，并且由一个音源统一控制？那多房间音频就是你要找的方案。

多房间音频可以通过在每个房间放置一台连接扬声器的电脑来实现。每台电脑上运行用于播放和控制音频的服务。采用这种 DIY 方案时，电脑和扬声器类型都可以自由选择。你可以使用连接有源音箱的桌面电脑、接入电视和功放的 HTPC、带功放或 DAC 的树莓派，甚至 Android 设备。

除了 Home Assistant 外，你还需要两个关键软件包。第一个是 [Mopidy](https://www.mopidy.com/)，这是一个音乐服务器，可以播放本地文件，也可以连接 Spotify 这类流媒体音乐服务。第二个是 [Snapcast](https://github.com/badaix/snapcast/)，它可以让网络中的音频流保持同步播放。两者都可以集成到 Home Assistant 中。每个房间的音频设备会运行一个 Snapcast 客户端实例，并可选运行一个 Mopidy 实例。你的服务器则运行一个专门用于 Snapcast 的 Mopidy 实例以及 Snapcast 服务器。

最后，你还需要一个播放器来控制 Mopidy。任何兼容 MPD 的播放器都可以使用，另外也有多个 [Mopidy-only web-based options](https://docs.mopidy.com/en/latest/ext/web/#ext-web)。在 Android 上，[Remotedy](https://play.google.com/store/apps/details?id=se.anil.remotedy) 尤其好用，因为你可以在一个界面里访问多个 Mopidy 实例。

Home Assistant 会提供每个房间设备的状态和音量控制。如果你想在所有房间（所有客户端）播放音乐，就访问服务器上的 Mopidy 实例。如果你只想在某个房间播放，就访问该房间对应的 Mopidy 实例。如果你使用 Mopidy 的网页界面，还可以通过 weblink 组件把各实例链接加入 Home Assistant。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-02-snapcast/diagram.png'>
</p>

<!--more-->

## 准备工作

- [安装](https://www.mopidy.com/) Mopidy (2.0.0 or greater)
- [Download](https://github.com/badaix/snapcast/releases/) and [安装](https://github.com/badaix/snapcast/tree/v0.5.0-beta-1#安装) Snapcast (0.5.0 or greater)

## 配置 Mopidy

Mopidy 可以通过多个配置文件运行，每个配置文件都在前一个文件的基础上扩展。当你需要运行多个功能不同的实例时，这种方式非常有用。

### 核心.conf

这个基础配置会被所有实例共享：

```text
[mpd]
hostname = ::

[http]
hostname = ::

[audio]
output = alsasink

[spotify]
username = <redacted>
password = <redacted>
```

### local.conf

在有本地媒体文件的电脑上，增加本地配置：

```text
[local]
media_dir = <your/music/here>
```

### snapcast.conf

最后，与 Snapcast 连接的 Mopidy 实例需要特殊配置。如果你的电脑上还运行了第二个 Mopidy 实例，请使用不同端口以避免冲突。音频输出会发送到一个命名管道，Snapcast 会从这里读取。请注意，你可能需要根据系统和音频源调整音频输出参数。

```text
[mpd]
hostname = ::
port = 6601

[http]
hostname = ::
port = 6681

[audio]
output = audioresample ! audio/x-raw,rate=48000,channels=2,format=S16LE ! audioconvert ! wavenc ! filesink location=/tmp/snapfifo
```

## 运行 Mopidy

运行某个房间专用实例：

```bash
mopidy --config $CONF_DIR/core.conf
```

运行带本地媒体的房间专用实例：

```bash
mopidy --config $CONF_DIR/core.conf:$CONF_DIR/local.conf
```

运行连接 Snapcast 的专用实例（含本地媒体）：

```bash
mopidy --config $CONF_DIR/core.conf:$CONF_DIR/local.conf:$CONF_DIR/snapcast.conf
```

## 运行 Snapcast

在运行 Snapcast 配置版 Mopidy 的同一台服务器上启动 `snapserver`。

```bash
snapserver   # or use systemd
```

在负责播放音频的电脑上启动 `snapclient`。

```bash
snapclient   # or use systemd, add -h <server host> if necessary
```

## 配置 Snapcast

Snapcast 有很多配置项，但与 Home Assistant 相关性最高的是客户端名称。你可以在 snapserver 的配置文件中设置，默认路径是 `~/.config/Snapcast/settings.json`。请只在 `snapserver` 未运行时编辑该文件。修改其中 JSON 的 `name` 值后，客户端就会在 Home Assistant 里以这个名称显示。

## 配置 Home Assistant

使用 [mpd] 和 [snapcast] 组件。你也可以选择使用 [weblink]，以便快速访问 Mopidy 的网页界面。

```yaml
media_player:
- platform: snapcast
  host: xxxxx
- platform: mpd
  server: xxxx
  location: Multi-Room Controller
- platform: mpd
  server: xxx
  location: Room 1

weblink:
  entities:
  - name: Multi-Room Player
    url: xxxx
```

[snapcast]: /integrations/snapcast
[mpd]: /integrations/mpd
