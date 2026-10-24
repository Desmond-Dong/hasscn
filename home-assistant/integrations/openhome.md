# Linn / OpenHome

**Linn / OpenHome** 集成允许您将符合 [OpenHome](http://openhome.org/) 标准的渲染器连接到 Home Assistant，例如 [Linn Products Ltd](https://www.linn.co.uk) 的 HiFi 流媒体播放器。它让您可以控制媒体播放、音量和输入源，并查看当前正在播放的内容。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 本地音频播放动作示例

```yaml
actions:
  - action: media_player.play_media
    target:
      entity_id: media_player.linn_bedroom
    data:
      media_content_id: "http://172.24.32.13/Doorbell.mp3"
      media_content_type: music
```

## Web 流播放动作示例

```yaml
actions:
  - action: media_player.play_media
    target:
      entity_id: media_player.linn_bedroom
    data:
      media_content_id: "http://media-ice.musicradio.com:80/ClassicFMMP3"
      media_content_type: music
```

## 动作

### 媒体控制动作

可用动作：`invoke_pin`

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `entity_id` | 是 | 要在其上调用 pin 的 OpenHome 设备名称。 |
| `pin` | 否 | 要调用的 pin。 |
