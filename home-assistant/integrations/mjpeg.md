# MJPEG IP Camera

**MJPEG IP Camera** 集成允许您将支持通过 MJPEG（Motion JPEG）方式输出视频流的 IP 摄像头接入 Home Assistant。

## 前提条件

要使用此集成，您至少需要知道摄像头的视频流 URL。如果您不知道，可以尝试在 [iSpy Camera Connection Database](https://www.ispyconnect.com/cameras) 中查找。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
MJPEG URL:
  description: 摄像头提供视频流的 URL，例如 `http://192.168.1.21:2112/`
Still Image URL:
  description: 缩略图 URL（如果摄像头支持）。
Username:
  description: 用于访问摄像头的用户名。
Password:
  description: 用于访问摄像头的密码。
Verify SSL:
  description: 验证此摄像头的 SSL 证书。
```

此集成同时支持 basic 和 digest 身份验证；当您填写用户名和密码时，会自动检测应使用哪一种。

## MJPEG 和静态图片 URL 示例

* Blue Iris 摄像头 / Blue Iris 服务器：
  * MJPEG URL: `http://IP:PORT/mjpg/CAMERASHORTNAME/video.mjpeg`
  * Still Image URL: `http://IP:PORT/image/CAMERASHORTNAME`

* D-Link 的 DCS-930L Wireless N 网络摄像头：
  * MJPEG URL: `http://IP/video/mjpg.cgi`
  * Still Image URL: `http://IP/image.jpg`

* D-Link 的 DCS-933L Wireless N 网络摄像头：
  * MJPEG URL: `http://IP:PORT/video/mjpg.cgi`
  * Still Image URL: `http://IP:PORT/image/jpeg.cgi`

* OctoPrint（OctoPi）：
  * MJPEG URL: `http://IP/webcam/?action=stream`
  * Still Image URL: `http://IP/webcam/?action=snapshot`

* 旧款 Foscam / wanscam
  * MJPEG URL: `http://IP:PORT/videostream.cgi`（添加 `?resultion=32` 可用于 640x480，或 `?resultion=32` 用于 320x240）
  * Still Image URL: `http://IP:PORT/snapshot.cgi`
