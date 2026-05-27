# SlimProto (Squeezebox players)

**SlimProto** 集成允许您直接通过 Home Assistant 控制 [Squeezebox](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29) 音乐播放器，而无需 Logitech Media Server 之类的外部媒体服务器。借助该集成，您可以控制 Squeezebox 硬件设备，如 Classic、Transporter、Duet、Boom、Radio 和 Touch，也可以控制软件播放器，如 [Squeezelite](https://github.com/ralph-irving/squeezelite)、[PiCorePlayer](https://www.picoreplayer.org/) 或 [Max2Play](https://www.max2play.com/en/)。对于真正热衷 DIY 的玩家，甚至还有 [ESP32 版本的播放器](https://github.com/sle118/squeezelite-esp32)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
此集成会直接与运行 “SLIM” 协议的播放器通信，实际上相当于让 Home Assistant 充当媒体服务器，因此您不再需要 Logitech Media Server 或 Roon 之类的外部媒体服务器。这意味着您要播放的媒体需要能够在 Home Assistant 中获取，例如通过 [Radio Browser](/home-assistant/integrations/radio_browser.md) 集成或自定义的 [Music Assistant](https://github.com/music-assistant/hass-music-assistant) 集成提供。

:::

## 仅提供基础支持

此集成旨在尽可能保持简单，只提供从 Home Assistant 对播放器进行基础控制，以及向播放器发送流媒体 URL 的能力。

截至目前，以下功能尚不支持：

* 播放器分组（同步多房间音频）——将在后续版本中加入。
* 显示屏支持（适用于官方 Squeezebox 硬件）——如果需求足够，可能会在后续版本中加入。

## 高级：播放器事件

播放器发出的、但集成本身未处理的事件（例如按下播放器上的 “next track” 按钮）会被转发到 Home Assistant 事件总线，供您进一步处理，例如通过自动化来响应。

发送到事件总线的事件名称为 `slimproto_event`。
