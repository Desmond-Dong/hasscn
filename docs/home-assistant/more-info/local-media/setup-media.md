---
title: 设置本地媒体源
description: 'Home Assistant 有一个本地媒体文件夹。放置在此文件夹中的任何音频或视频文件都可以通过媒体浏览器访问。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 设置本地媒体源

Home Assistant 有一个本地媒体文件夹。放置在此文件夹中的任何音频或视频文件都可以通过媒体浏览器访问。

管理本地媒体的最简单方法是使用浏览本地媒体文件夹时媒体浏览器工具栏中可用的工具。

## 使用自定义文件夹

也可以设置自定义和额外的媒体目录。为此，您需要调整[核心配置][basic-configuration]。

此示例将两个媒体文件夹添加到 Home Assistant：

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    media: /media
    recording: /mnt/recordings
```

上面的示例将两个媒体文件夹添加到 Home Assistant。它们将在媒体浏览器中显示为 "media" 和 "recording"。您可以根据需要添加任意数量的媒体文件夹，使用任何您想要的名称。

## Home Assistant 容器

如果您运行 Home Assistant 容器，您需要向 Home Assistant 容器添加 Docker 卷挂载，以挂载您的本地媒体。

Home Assistant 尝试使用的默认路径是 `/media`。

例如，如果您当前使用以下 Docker 命令：

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  ghcr.io/home-assistant/home-assistant:stable
```

您需要将其更改为：

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /PATH_TO_YOUR_MEDIA:/media \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  ghcr.io/home-assistant/home-assistant:stable
```

如果您使用 Docker compose，可以以与上面命令类似的方式向您的组合文件添加卷。
