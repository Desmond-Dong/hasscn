# Mediaroom

**Mediaroom** 集成允许您通过 Home Assistant 控制 [Mediaroom](https://en.wikipedia.org/wiki/Ericsson_Mediaroom) 机顶盒（STB）。

要将 Mediaroom 机顶盒添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
media_player:
  - platform: mediaroom
```

```yaml
  host:
    description: 设备的主机名或 IP 地址。
    required: false
    type: string
    default: 尝试自动发现您的设备。
  name:
    description: 在前端中显示的设备名称。
    required: false
    type: string
    default: Mediaroom STB
  optimistic:
    description: 如果集成无法确定机顶盒状态，则始终将其视为 ON。
    required: false
    type: boolean
    default: false
```

请注意，所有参数都是可选的，自动发现通常会为您完成配置。

#### 使用 Mediaroom 集成

该集成最初是为目前使用 Mediaroom 平台的葡萄牙电视运营商开发的，但也应适用于其他通过 8082 端口套接字远程控制 STB 的部署环境。

在大多数情况下（单个 STB），您只需设置 *platform*，其余部分将由自动发现完成。

如果 STB 与 Home Assistant 位于同一网段，集成就能判断设备当前是开机还是关机。否则，集成将无法判断机顶盒状态，您需要添加 *optimistic* 配置项。

## 示例

### 脚本示例

`play_media` 功能可在脚本中用于切换频道：

```yaml
# Example play_media script to change channel
#
change_channel:
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.mediaroom_stb
      data:
        media_content_id: "{{ channel_number }}"
        media_content_type: "channel"
```

`play_media` 功能也可用于触发机顶盒上的操作，例如打开视频点播：

```yaml
# Example play_media script to trigger an action
#
press_button:
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.mediaroom_stb
      data:
        media_content_id: "{{ action }}"
        media_content_type: "mediaroom"
```

可用的 `media_content_id` 列表请查看[这里](https://github.com/dgomes/pymediaroom)。

### 2 台 STB 的配置示例

```yaml
# Example configuration.yaml entry for 2 STB
media_player:
  - platform: mediaroom
    host: 192.168.1.64
    name: Living Room STB
  - platform: mediaroom
    host: 192.168.1.65
    name: Bedroom STB
```
