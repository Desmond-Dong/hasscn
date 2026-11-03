# DLNA Digital Media Renderer

**DLNA Digital Media Renderer** 集成允许您控制 [DLNA Digital Media Renderer](https://www.dlna.org/)，例如支持 DLNA 的电视或收音机。

请注意，某些设备（如三星电视）对播放源相当挑剔。TTS 操作可能无法与这些设备配合使用。如果 play\_media 操作不起作用，请尝试从 DLNA/DMS（如 [MiniDLNA](https://sourceforge.net/projects/minidlna/)）播放。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 选项

DLNA DMR 设备的选项可以通过 **设置** > **设备与服务** > **DLNA Digital Media Renderer** > **配置** 进行设置。

```yaml
Event listener port:
  description: "用于监听 DLNA 设备发送的事件的本地端口。如果未设置，将分配一个随机端口。如果您出于防火墙或 NAT 原因需要特定的传入端口，请使用此选项。"
Event listener callback URL:
  description: "DLNA 设备发送的事件的本地 URL 目标。格式应为 `http://{host}:{port}/notify`，其中关键字 `{host}` 和 `{port}` 将自动填充，但也可以在此处明确设置，例如 `http://192.88.99.1:5555/notify`。如果 Home Assistant 看到的本地 IP 地址或端口不是设备应连接的地址（由于网络地址转换 NAT），请使用此选项。"
Poll for device availability:
  description: "定期尝试连接到 DLNA 设备，即使它不可用。如果 Home Assistant 未接收到设备发送的 SSDP 广播（例如当您的网络上的 IP 多播出现问题时），请启用此选项。"
Show incompatible media when browsing:
  description: "浏览媒体时，显示所有媒体文件和链接，即使设备报告它与媒体类型不兼容。"
```

## 操作

DLNA 设备可以支持一系列功能。根据设备本身，可能支持以下 [media\_player](/home-assistant/integrations/media_player/index.md#actions) 操作：

* `media_player.volume_up`、`media_player.volume_down` 和 `media_player.volume_set`
* `media_player.volume_mute`
* `media_player.media_play`
* `media_player.media_pause` 和 `media_player.media_play_pause`
* `media_player.media_stop`
* `media_player.media_next_track`
* `media_player.media_previous_track`
* `media_player.play_media`
* `media_player.shuffle_set`
* `media_player.repeat_set`
* `media_player.select_sound_mode`

## 播放媒体

大多数 DLNA DMR 设备可以从本地 HTTP 服务器播放媒体。为获得最佳效果，请使用 HTTP 而不是 HTTPS，并使用 IP 地址而不是主机名来引用服务器，例如 `http://192.168.1.1:8080/song.mp3`。

### 媒体源

DLNA Digital Media Renderer 集成可以浏览任何已配置的[媒体源](/home-assistant/integrations/media_source/index.md)。显示的媒体将根据 DLNA DMR 设备的功能进行过滤。

## 移除集成

此集成遵循标准的集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
