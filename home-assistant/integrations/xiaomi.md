# Xiaomi

本节介绍如何将 [Xiaomi 路由器](http://miwifi.com)或 Xiaomi 摄像头集成到 Home Assistant 中。

## 摄像头

**Xiaomi** 摄像头集成可让你在 Home Assistant 中使用 Xiaomi 摄像头。

### 前提条件

* 要成功使用此集成，Home Assistant 主机应支持多个并发读取。
  * 每增加一个同时使用 Home Assistant 的用户，系统就会每 10 秒与摄像头建立一次连接。通常这不会有问题。

#### 准备设备

1. 要将摄像头集成到 Home Assistant 中，你需要在设备上安装自定义固件。
   * 安装固件时，请按照对应型号的说明文档操作：
   * [Yi 720p](https://github.com/fritz-smh/yi-hack)
   * [Yi Home 17CN / 27US / 47US / 1080p Home / Dome / 1080p Dome](https://github.com/shadow-1/yi-hack-v3)
   * [Recent Yi 1080p Home / 1080p Dome](https://github.com/roleoroleo/yi-hack-MStar)
   * [Xiaofang 1080p Camera](https://github.com/samtap/fang-hacks)
2. 安装完成后，请确保已启用 FTP。

:::warning
目前，支持的最高自定义固件版本为 0.1.4-beta2。更高版本的固件使用 [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd)，其中有一个 bug，会导致 FFmpeg 无法正确渲染视频文件。

:::
:::important
如果你使用的是 Raspbian，请不要忘记在平台上安装 `ffmpeg` 支持，否则将无法看到视频。

:::
:::note
对于 Yi 720p 和 Xiaofang 摄像头，当 Home Assistant 通过 FTP 读取时，摄像头写入的实时流格式不受支持，因此此平台会获取 1 分钟前保存的视频。

:::
:::tip
如果你启用了 RTSP 服务器，就可以通过其他 Home Assistant 摄像头平台连接到摄像头。不过，这个 RTSP 服务器会禁用非常实用的米家应用。为了同时保留 Home Assistant 兼容性 *以及* 原生应用的可用性，此平台通过 FTP 获取视频。

:::

### 配置

要启用摄像头，请将以下内容添加到你的 `configuration.yaml` 文件中：

```yaml
camera:
  - platform: xiaomi
    name: Camera
    host: "192.168.1.100"
    model: "yi"
    password: YOUR_PASSWORD
```

```yaml
name:
  description: 摄像头的易读名称。
  required: true
  type: string
host:
  description: 摄像头的 IP 地址或主机名。
  required: true
  type: template
model:
  description: Xiaomi 摄像头的型号，目前支持 `yi` 和 `xiaofang`。
  required: true
  type: string
password:
  description: 摄像头上 FTP 服务器的密码（见上文）。由于当前固件不允许设置 FTP 密码，这里可以填写任意字符串。
  required: true
  type: string
path:
  description: 原始 MP4 文件的路径。
  required: false
  type: string
  default: /media/mmcblk0p1/record
username:
  description: 可访问 FTP 服务器的用户名。
  required: false
  type: string
  default: root
ffmpeg_arguments:
  description: 传递给 `ffmpeg` 的额外选项。
  required: false
  type: string
```

:::important
`path:` 的默认值并不适用于所有摄像头。你可能需要添加此键，并填写设备的准确路径。

:::

### 图像质量

所有被 [`ffmpeg` 摄像头](/home-assistant/integrations/camera.ffmpeg/index.md)支持的选项，都可以通过 `ffmpeg_arguments` 配置参数使用。

其中一个特别有用的调整项与视频尺寸有关。由于 Yi 视频通常比较大，尤其是在 1080p 摄像头上，以下配置可以将其缩小到更易于处理的大小：

```yaml
camera:
  - platform: xiaomi
    name: My Camera
    host: "192.168.1.100"
    model: "xiaofang"
    password: YOUR_PASSWORD
    path: /home/camera/feed
    ffmpeg_arguments: "-vf scale=800:450"
```

### 主机名模板

主机名或 IP 地址既可以直接填写固定值，也可以从现有实体属性中获取。

```yaml
camera:
  - platform: xiaomi
    name: Front Camera
    host: "{{ states.device_tracker.front_camera.attributes.ip }}"
    model: "yi"
    password: 1234
    path: /tmp/sd/record
```

## 路由器

**Xiaomi** 路由器集成通过检查连接到 [Xiaomi](http://miwifi.com) 路由器的设备来提供在家状态检测。

### 配置

要在你的安装中使用 Xiaomi 路由器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: xiaomi
    host: YOUR_ROUTER_IP
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: "你的路由器 IP 地址，例如 `192.168.0.1`。"
  required: true
  type: string
username:
  description: 管理员用户名。
  required: false
  default: admin
  type: string
password:
  description: 管理员账户的密码。
  required: true
  type: string
```

有关如何配置要跟踪的人员，请参阅[设备追踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。

### 兼容性测试

要确认你的路由器是否兼容，请访问 `http://YOUR_ROUTER_IP/api/misystem/devicelist`。
你应该会看到当前连接到路由器的设备列表。

不过，一些用户反馈，即使前面的 URL 无法使用，他们仍然可以将 Mi Router 3 集成到 Home Assistant 中。例如，一些使用 Mi Router 3 且固件版本为 2.10.46 Stable 的用户已成功完成集成，可用于测试集成的替代 URL 是 `http://YOUR_ROUTER_IP/cgi-bin/luci/api/misystem/devicelist`。访问该页面时，应显示 `{"code":401,"msg":"Invalid token"}` 消息。
