---
title: Generic Camera
description: 'Generic Camera 集成允许您将任何 IP 摄像头或其他 URL 集成到 Home Assistant 中。可以使用模板动态生成 URL。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Camera
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: generic
ha_platforms:
  - camera
  - diagnostics
ha_codeowners:
  - '@davet2001'
ha_config_flow: true
ha_integration_type: device
---
# Generic Camera

**Generic Camera** 集成允许您将任何 IP 摄像头或其他 URL 集成到 Home Assistant 中。可以使用模板动态生成 URL。

Home Assistant 将通过其服务器提供图像，使您可以在网络外部查看您的 IP 摄像头。端点为 `/api/camera_proxy/camera.[name]`。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您必须在 **Still Image URL** 或 **Stream Source URL** 字段中至少输入一个 URL，其他字段为可选。

URL 字段中允许使用[模板](/home-assistant/docs/configuration/templating/)，可用于选择不同的图像或根据传感器状态参数化 URL。模板有效性和网络访问将在配置步骤中检查。

```yaml
Still Image URL:
  description: "您的摄像头提供图像的 URL，例如 `http://192.168.1.21:2112/`。可以是[模板](/home-assistant/docs/configuration/templating/)。URL 中允许使用用户名和密码，但如果没有提供，将在认证时使用 `Username` 和 `Password` 设置。必须提供 still_image_url 或 stream_source 中的至少一个。"
Stream Source:
  description: "您的摄像头提供实时流的 URL，例如 `rtsp://192.168.1.21:554/`。可以是[模板](/home-assistant/docs/configuration/templating/)。URL 中允许使用用户名和密码，但如果没有提供，将在认证时使用 `Username` 和 `Password` 设置。必须提供 still_image_url 或 stream_source 中的至少一个。请注意，如果没有 still_image_url，只有配置了 [stream 集成](/home-assistant/integrations/stream/) 才能使用 stream_source。"
Username:
  description: 访问摄像头的用户名。请注意，这适用于 still_image_url 和 stream_source。
Password:
  description: 访问摄像头的密码。请注意，这适用于 still_image_url 和 stream_source。
Advanced settings:
  description: 高级设置仅在特殊情况下需要。除非您知道自己在做什么，否则请保持不变。
  keys:
    Frame Rate:
      description: 流的帧率（FPS）。可能导致网络流量大增和/或摄像头负载过重。
    Verify SSL certificate:
      description: 启用或禁用 SSL 证书验证。设置为 false 以使用仅支持 http 的摄像头，或者您有自签名 SSL 证书但未安装 CA 证书以启用验证。
    RTSP transport protocol:
      description: "将 RTSP 传输协议设置为 `tcp`、`udp`、`udp_multicast` 或 `http`。"
    Authentication:
      description: "认证请求的类型 `basic` 或 `digest`。"
    Limit refetch to URL change:
      description: 将远程图像的重新获取限制为 URL 更改时。仅在使用模板获取远程图像时相关。
    Use wallclock as timestamps:
      description: （仅限[高级模式](/home-assistant/blog/2019/07/17/release-96/#advanced-mode)）重写摄像头时间戳。这可能有助于解决 Wi-Fi 摄像头或某些品牌摄像头（例如 EZVIZ）的播放或崩溃问题。
```

<p class='img'>
  <a href='/home-assistant/examples/google_maps_card/'>
    <img src='/home-assistant/images/integrations/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
    显示 Generic 摄像头平台指向动态 Google 地图图像的示例。
  <img src='/home-assistant/images/integrations/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
  显示 Generic 摄像头平台指向动态 Google 地图图像的示例。
</p>

## 示例

在本节中，您可以找到一些如何使用此摄像头平台的实际情况示例。

### 美国国家气象局的天气图

您可以将网络上的 GIF 显示为静态图像。

- Still Image URL: `https://radar.weather.gov/ridge/standard/CONUS_0.gif`

### 本地图像

您可以使用此平台显示静态图像。只需将图像放在这里：`/config/www/your_image.png`

- Still Image URL: `https://127.0.0.1:8123/local/your_image.png`

### 从一个 Home Assistant 实例共享摄像头源到另一个

如果您运行多个 Home Assistant 实例（假设称为"主机"和"接收"实例），您可能希望在接收实例上显示主机实例的摄像头源。您可以使用 [REST API](https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id) 访问主机（IP 地址 127.0.0.5）上的摄像头源，并通过以下配置在接收实例上显示：

- Still Image URL: `https://127.0.0.5:8123/api/camera_proxy/camera.live_view`

### 来自仅支持 HTTP 的摄像头的图像

要访问仅通过 HTTP 可用的摄像头，您必须关闭 SSL 验证。

- Still Image URL: `http://example.org/your_image.png`

### 实时流

要访问同时具有快照和实时流 URL 的摄像头，使用 [stream](/home-assistant/integrations/stream/) 集成。

- Still Image URL: `http://194.218.96.92/jpg/image.jpg`
- Stream Source: `rtsp://user:pass@194.218.96.92:554`

如果摄像头只有实时流 URL 而没有快照 URL，[stream](/home-assistant/integrations/stream/) 集成也可以从实时流 URL 生成静态图像。

- Stream Source: `rtsp://user:pass@194.218.96.92:554`

### 安全访问摄像头

要访问需要安全认证的摄像头以获取静态图像或实时流（以我的 HIK 为例）。

- Still Image URL: `http://192.168.1.100/ISAPI/Streaming/Channels/101/picture`
- Stream Source: `rtsp://USERNAME:PASSWORD@192.168.1.100:554/Streaming/Channels/102`
- Verify SSL: `false`
- Username: `user`
- Password: `pass`
- Authentication: `digest`