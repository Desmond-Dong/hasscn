# VLC media player via Telnet

**VLC media player via Telnet** 集成允许您通过内置的 telnet 接口控制 [VLC 媒体播放器](https://www.videolan.org/vlc/index.html)。

该集成可以控制网络中任何启用了 telnet 接口的 VLC 实例。
要在 VLC 播放器中启用 telnet 接口，请参阅 [VLC 官方文档](https://wiki.videolan.org/Documentation:Modules/telnet/)。同时请记得在运行 VLC 的设备上添加防火墙规则，允许用于该服务端口的入站连接。

如果 VLC 运行在使用非英文区域设置的主机上，调整音量时可能会出现错误。
这与不同地区小数分隔符的使用差异有关。
建议在启动 VLC 之前将区域设置为 `en_US`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

使用 `media_player.play_media` 操作时，目前仅支持 `music` 媒体类型。

## Home Assistant 加载项

您可以通过官方 [VLC 加载项](https://github.com/home-assistant/addons/blob/master/vlc/DOCS.md)，在 Home Assistant 安装中运行 VLC 媒体播放器。
借助它，您可以播放来自局域网、互联网，或保存在 Home Assistant 安装中 `/share` 和 `/media` 文件夹里的本地文件与播放列表。
