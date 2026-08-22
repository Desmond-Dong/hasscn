# Cambridge Audio

**Cambridge Audio** 集成允许您控制所有支持 [StreamMagic](https://www.cambridgeaudio.com/usa/en/products/streammagic) 应用的接收器和流媒体播放器。

集成自动发现所有启用的区域和源。每个区域作为媒体播放器设备添加，启用的源可作为输入使用。如果所选源支持，则支持媒体信息和控制（如播放、暂停、跳过）。集成允许您从 Home Assistant 仪表板导航预设、控制流媒体（Spotify、Tidal、Qobuz）和播放广播电台。

## 支持的设备

此集成允许您连接以下设备：

* Cambridge Audio Evo One
* Cambridge Audio Evo 75
* Cambridge Audio Evo 150
* Cambridge Audio CXN
* Cambridge Audio CXN (v2)
* Cambridge Audio CXN100
* Cambridge Audio CXR120
* Cambridge Audio CXR200
* Cambridge Audio 851N
* Cambridge Audio MXN10
* Cambridge Audio AXN10
* Cambridge Audio EXN100
* Cambridge Audio Edge NQ

较旧的基于 RS-232 串口的放大器，如 [CXA 系列](https://www.cambridgeaudio.com/usa/en/products/hi-fi/cx-series-2/cxa81)，使用不同的协议，目前不受支持。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 您设备的 IP 地址可以通过在 [StreamMagic 应用](https://www.cambridgeaudio.com/usa/en/products/streammagic)中导航到设备并选择 `Settings` → `IP address` 找到。
```

## 数据更新

Cambridge Audio 设备直接向 Home Assistant 推送数据，实现设备状态更改、媒体信息和播放状态的即时更新。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 可用的配置实体

集成提供一些实体来配置设备设置。支持以下实体：

* 显示亮度
* 前置放大器
* 提前更新
* 音频输出（扬声器选择）
* 控制总线模式
* 房间校正

### 前置放大器

当前置放大器模式启用时，Home Assistant 可以控制您前置放大器的输出音量。

### 控制总线

当控制总线模式启用时，如果您的功率放大器使用控制总线接口连接到 Cambridge Audio 网络播放器，Home Assistant 可以控制其输出音量。在这种情况下，可以禁用前置放大器模式，网络播放器将以全音量发送信号到功率放大器，可以使用音量增减控制来控制功率放大器的音量。控制总线不支持将音量设置为特定值，只能增加和减少当前音量。

## 播放媒体

Cambridge Audio 支持使用 `media_player.play_media` 动作播放多种格式。

### 示例：

Cambridge Audio 可以调用设备上保存的任何存储预设。使用预设的示例动作：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.cambridge_audio
data:
  media_content_type: "preset"
  media_content_id: "1"
```

使用 Airable 广播 ID 的示例动作：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.cambridge_audio
data:
  media_content_type: "airable"
  media_content_id: "12345678"
```

使用网络广播 URL 的示例动作：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.cambridge_audio
data:
  media_content_type: "internet_radio"
  media_content_id: "https://example.com/internet-radio/station_abcd.mp3"
```

## 浏览媒体

Cambridge Audio 集成允许您从仪表板浏览保存的预设。
所有存储的预设将被分类为播放列表、艺术家和曲目。

## 故障排除

### 跳过、随机播放和重复曲目的按钮缺失

控制功能取决于当前选择的源/服务。
界面会根据选择的源自适应设置可用的控件。

### 更改音量的功能缺失

音量控制仅在一体式放大器或具有前置放大器模式的流媒体播放器上受支持。
可能设备未配置为前置放大器模式。
可以通过在网页浏览器中导航到设备的 IP 地址进行更改，
或在 StreamMagic 应用中选择设置并将 **Pre-Amp** 设置为 **On**。

### 从 Home Assistant 无法打开设备

Cambridge Audio 设备默认启用 ECO 模式，当设备关机时会禁用网络接口。
可以通过在网页浏览器中导航到设备的 IP 地址进行更改，
或在 StreamMagic 应用中选择设置并将 **Standby Mode** 设置为 **Network standby**。
