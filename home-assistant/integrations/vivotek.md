# VIVOTEK

**VIVOTEK** 集成允许您将 VIVOTEK IP 摄像头接入 Home Assistant。

Home Assistant 会通过自身服务器提供图像，因此即使您身处外网，也可以查看 IP 摄像头画面。对应端点为 `/api/camera_proxy/camera.[name]`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
ip_address:
  description: 摄像头的 IP 地址，例如 `192.168.1.2`。
port:
  description: 端口号。
name:
  description: 摄像头名称。
username:
  description: 访问摄像头所用的用户名。
password:
  description: 访问摄像头所用的密码。
authentication:
  description: "请求认证类型，可选 `basic` 或 `digest`。"
security_level:
  description: 访问摄像头用户的安全级别。可为 `admin` 或 `viewer`。
ssl:
  description: 启用或禁用 SSL。如果摄像头仅支持 HTTP，请设为 `false`。
verify_ssl:
  description: 启用或禁用 SSL 证书验证。如果摄像头仅支持 HTTP，或者您使用的是自签名 SSL 证书且未安装 CA 证书，请设为 `false`。
framerate:
  description: 视频流的每秒帧数（FPS）。该设置可能导致较高的网络流量和摄像头负载。
stream_path:
  description: 该参数允许您覆盖默认流路径。默认值为 `live.sdp`。
```

### 操作

加载完成后，`camera` 平台会公开可调用的操作，用于执行各种功能。

可用操作包括：`enable_motion_detection`、`disable_motion_detection`、`snapshot` 和 `play_stream`。

#### 操作：播放视频流

`play_stream` 操作用于将摄像头的实时视频流播放到选定的媒体播放器上。需要先设置 [`stream`](/home-assistant/integrations/stream.md) 集成。

| Data attribute | Optional | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | 要从中获取视频流的实体名称，例如 `camera.front_door_camera`。 |
| `media_player`         | no       | 要播放视频流的媒体播放器名称，例如 `media_player.living_room_tv`。 |
| `format`               | yes      | `stream` 集成和所选 `media_player` 支持的视频流格式。默认值：`hls` |

例如，下面的自动化操作会将 `hls` 实时视频流发送到您的 Chromecast。

```yaml
actions:
  - action: camera.play_stream
    target:
      entity_id: camera.yourcamera
    data:
      media_player: media_player.chromecast
```

#### 操作 `enable_motion_detection`

启用摄像头的运动侦测。目前，该操作会启用摄像头上配置的第一个事件。

| Data attribute | Optional | Description                                                                       |
| ---------------------- | -------- | --------------------------------------------------------------------------------- |
| `entity_id`            | yes      | 要启用运动侦测的实体名称，例如 `camera.front_door_camera`。 |

#### 操作 `disable_motion_detection`

禁用摄像头的运动侦测。目前，该操作会禁用摄像头上配置的第一个事件。

| Data attribute | Optional | Description                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------- |
| `entity_id`            | yes      | 要禁用运动侦测的实体名称，例如 `camera.front_door_camera`。 |

#### 操作 `snapshot`

从摄像头拍摄快照。

| Data attribute | Optional | Description                                                                                                   |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | 要拍摄快照的实体名称，例如 `camera.front_door_camera`。 |
| `filename`             | no       | 文件名模板。可使用变量 `entity_id`，例如 `/tmp/snapshot_{{ entity_id }}`。 |

`filename` 中的路径部分必须已添加到 `configuration.yaml` 文件中 [`homeassistant:`](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs) 部分的 `allowlist_external_dirs` 列表里。

例如，下面的自动化操作会从 `front_door_camera` 拍摄快照，并以带时间戳的文件名保存到 `/tmp`。

```yaml
actions:
  - action: camera.snapshot
    target:
      entity_id: camera.front_door_camera
    data:
      filename: '/tmp/yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```
