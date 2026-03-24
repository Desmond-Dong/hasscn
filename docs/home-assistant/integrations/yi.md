---
title: Yi Home Cameras
description: 关于如何将视频流（通过 FFmpeg）作为摄像头集成到 Home Assistant 的说明。
ha_category:
  - Camera
ha_release: 0.56
ha_iot_class: Local Polling
ha_codeowners:
  - '@bachya'
ha_domain: yi
ha_platforms:
  - camera
ha_integration_type: device
ha_quality_scale: legacy
---

**Yi Home Cameras** 集成可让您在 Home Assistant 中使用 [Yi Home Cameras](https://www.yitechnology.com/)。具体来说，此平台支持基于 Hi3518e 芯片组的 Yi Home Cameras，包括：

- Yi Home 17CN / 27US / 47US
- Yi 1080p Home
- Yi Dome
- Yi 1080p Dome

要成功使用此平台，Home Assistant 主机应能够处理多个并发读取。对于每个同时访问 Home Assistant 的用户，系统都会每 10 秒与摄像头建立一次连接。通常这不会成为问题。

## 准备设备

### 安装替代固件

要将摄像头集成到 Home Assistant，必须先在设备上安装自定义固件。相关说明可参阅 [yi-hack-v3 GitHub 项目](https://github.com/shadow-1/yi-hack-v3)。
如果您使用的是 2019/2020 版本摄像头，请使用 [yi-hack-MStar GitHub 项目](https://github.com/roleoroleo/yi-hack-MStar) 或 [yi-hack-Allwinner GitHub 项目](https://github.com/roleoroleo/yi-hack-Allwinner)。在这种情况下，请将摄像头配置为 ONVIF，并阅读对应 wiki 获取更多细节。

安装完成后，请确保您已在设备上启用 FTP 和 Telnet。

:::important
目前，无需额外修改即可支持的最高自定义固件版本是 0.1.4-beta2。高于此版本的固件使用 [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd)，其中存在一个 bug，会导致 FFmpeg 无法正确渲染视频文件。若要使用更高版本的固件，您还必须按照[此变通方法](https://github.com/shadow-1/yi-hack-v3/issues/129#issuecomment-361723075)回退到 ftpd。

:::
:::tip
如果您使用高于 0.1.4-beta2 的版本，可以通过在 `/home/yi-hack-v4` 目录中创建指向 `/tmp` 的符号链接来简单解决 FTP 问题（目录名可能会因版本不同而变化）。例如，通过 SSH 访问 Yi 摄像头后执行命令：`ln -s /tmp tmp`。

:::
:::important
Raspbian 用户：不要忘记在您的平台上安装 FFmpeg 支持，否则将无法看到视频。

:::
:::tip
某些 Yi 替代固件会启用实验性的 RTSP 服务器，这样您就可以通过 Home Assistant 的其他摄像头平台连接摄像头。不过，这个 RTSP 服务器会禁用非常实用的 Yi Home 原生应用。为了同时保留 Home Assistant 兼容性和原生应用支持，此平台通过 FTP 获取视频。

:::
### 更改 FTP 密码

安装自定义固件后，必须为 FTP 服务器添加密码。操作步骤如下：

1. 使用 Telnet 连接摄像头：`telnet <IP ADDRESS>`。
2. 输入用户名 `root`，密码留空。
3. 输入 `passwd` 并按 `<Enter>`。
4. 连续输入两次新密码。
5. 退出 Telnet。

## 配置平台

要启用此平台，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
camera:
  - platform: yi
    name: Camera
    host: "192.168.1.100"
    password: my_password_123
```

```yaml
name:
  description: 摄像头的易读名称。
  required: true
  type: string
host:
  description: 摄像头的 IP 地址或主机名。
  required: true
  type: string
password:
  description: 摄像头上 FTP 服务器的密码。由于当前固件不允许设置 FTP 密码，这里可以填写任意字符串。
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
  description: 传递给 `ffmpeg` 的额外选项（例如图像质量或视频滤镜选项）。
  required: false
  type: string
```

## 图像质量

任何 [`ffmpeg` 摄像头](/home-assistant/integrations/camera.ffmpeg/) 支持的选项，都可以通过 `ffmpeg_arguments` 配置参数使用。

一个特别实用的调整项是视频尺寸。由于 Yi 视频通常比较大（尤其是 1080p 摄像头），以下配置可将其缩小到更易处理的大小：

```yaml
camera:
  - platform: yi
    name: My Camera
    host: "192.168.1.100"
    password: my_password_123
    path: /home/camera/feed
    ffmpeg_arguments: "-vf scale=800:450"
```
