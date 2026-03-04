---
title: Installation
description: Music Assistant 安装指南
---

# 安装服务器 <img src="/assets/icons/installation-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant（简称 MA）设计为与 Home Assistant 并行使用，并以自动化为设计理念。推荐的安装方法是将服务器作为 Home Assistant 应用运行，然后可选择<a href="https://music-assistant.io/integration/installation/" target="_blank" rel="noopener noreferrer">添加 HA 集成</a>。对于不使用 Home Assistant Operating System (HAOS) 的用户，还有 docker 选项。

## Home Assistant 应用

<img src="/assets/label-easiest.png" alt="最简单标签" style="width: 128px;"  loading="lazy" />

这仅在运行完整版 Home Assistant 时可用，其中包括 <a href="https://developers.home-assistant.io/docs/operating-system/" target="_blank" rel="noopener noreferrer">Home Assistant Operating System (HAOS)</a>。由于其易用性和完整功能，运行 Home Assistant Operating System 是运行 Home Assistant 和 Music Assistant 的推荐方式。

Music Assistant 应用程序仓库在 Home Assistant 中可用。浏览 Home Assistant 中的应用商店进行安装，或单击以下按钮：

[![将 Music Assistant 作为应用添加到 Home Assistant。](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=d5369777_music_assistant&repository_url=https%3A%2F%2Fgithub.com%2Fmusic-assistant%2Fhome-assistant-addon)

无论是在专用硬件上运行还是在虚拟机 (VM) 中运行，HAOS 安装都完全受 MA 团队支持。唯一的其他要求是 HA/MA 主机和所有播放器设备必须在同一个扁平网络中，没有 VLAN。

## Docker 镜像

<img src="/assets/label-expert.png" alt="专家标签" style="width: 128px;"  loading="lazy" />

运行 Music Assistant 服务器的另一种方式是运行 docker 镜像：

```
docker run -v <dir>:/data --network host --cap-add=DAC_READ_SEARCH --cap-add=SYS_ADMIN --security-opt apparmor:unconfined ghcr.io/music-assistant/server
```

您必须以**主机网络模式**运行 docker 容器。数据卷是 `/data` - 将 `<dir>` 替换为可写目录以确保数据卷在更新之间持久化。如果您想从 MA 内访问本地音乐文件，请确保也挂载该本地目录，例如 /media。

请注意，从 MA 内部使用 SMB 文件提供者完成访问远程 (SMB) 共享。
只有在 Music Assistant 中使用远程 (Samba/NFS) 共享时才需要额外的权限。

**Docker compose:**

```
services:
  music-assistant-server:
    image: ghcr.io/music-assistant/server:latest # <<< 在此处填写所需的发布版本（或使用 beta 获取最新的测试版本）
    container_name: music-assistant-server
    restart: unless-stopped
    # 网络模式必须设置为主机，以便 MA 正确工作
    network_mode: host
    volumes:
      - ${USERDIR:-$HOME}/docker/music-assistant-server/data:/data/
    # 在容器内挂载 smb 文件夹需要特权 caps（和 security-opt）
    cap_add:
      - SYS_ADMIN
      - DAC_READ_SEARCH
    security_opt:
      - apparmor:unconfined
    environment:
      # 提供日志级别作为环境变量。
      # default=info, possible=(critical, error, warning, info, debug)
      - LOG_LEVEL=info

```

所需的发布版本可以在 <a href="https://github.com/music-assistant/server/pkgs/container/server" target="_blank" rel="noopener noreferrer">容器镜像发布页面</a> 找到

MA 团队将支持按上述说明安装的 docker 安装。为了明确起见，要获得 MA 团队的支持：

- docker 安装必须是一个简单的独立容器（例如不使用 kubernetes）
- MA、HA 和所有播放器必须在同一个扁平网络（或 VLAN）上
- Music Assistant 需要直接（第 2 层）访问网络以正确发现播放器并流式传输到播放器。因此，主机网络或 macvlan 网络是 docker 容器的强制性要求

其他所有内容都被视为不支持。如果您运行不支持的安装，我们有权关闭支持请求，或者我们可能会要求您尝试在我们支持的安装类型之一上重现问题。

如果您在使用 docker 安装与推荐/标准 Home Assistant 应用时遇到任何问题，您可以尝试在您的计算机或备用 RPi 上的 VM 上简单地运行 Home Assistant OS，看看您是否可以用该设置重现问题。

---
## 服务器说明

- MA 需要 64 位操作系统和以下最低硬件：
    - 较新的 64 位 Intel CPU（最长 10 年，虽然 15 年可能仍然可以工作）
    - 较新的 AMD CPU（最长 5 年，虽然 10 年可能仍然可以工作）
    - 单板计算机：Raspberry Pi 4 或更新版本，或同等产品
    - Home Assistant 支持的其他基于 aarch64 的 CPU（例如 Rockchip）
    - 物理设备或容器上至少 2GB RAM（如果运行其他任何东西，建议物理设备/容器有 4GB+）

- 如果 MA 无法启动且 CPU 超出上面列出的最大年限，则不受支持

- 由于服务器严重依赖多播技术（如 mDNS 和 uPnP）来发现网络上的播放器，它必须与播放器设备在同一个第 2 层网络中运行

- 服务器本身托管一个 webserver 以将音频流式传输到设备。此 web 界面必须可以通过 IP 地址从本地播放器通过 HTTP 访问。在启动时查看服务器的日志记录以查看服务器是否正确自动检测到本地 IP

- 服务器的 web 界面可以在 TCP 端口 8095 上访问。对于基于 HAOS 的安装，webserver 可通过 Ingress 访问，这意味着它受到 HA 身份验证的保护（您还可以免费获得侧边栏快捷方式！）

- 要通过反向代理访问前端，反向代理必须配置为指向端口 8095 并将其暴露给所需的内容（并添加 SSL 证书）。其工作方式因每个实现而异。

> [!TIP]
> 通过让插件（如安装的那样）直接与内部 docker 网络上的 webserver 通信，可以使服务器更安全。在这种情况下，插件的内部 DNS 名称将是，例如，`http://YOUR_HA_IP_ADDRESS:8123/d5369777_music_assistant`

## 使用和说明

- 如果 Music Assistant 在单独的 docker 容器中运行，则需要在 `http://YOUR_MA_IP_ADDRESS:8095` 访问 web 界面。可以在 MA 设置中更改端口。如果其他东西正在使用端口 8095，则必须关闭它直到 MA 端口被更改

- 最初没有安装任何提供者。必须通过导航到 MA 设置然后单独添加每个所需的提供者（音乐和播放器）

- 来自音乐源的音乐将自动加载到 [Music Assistant 媒体库](/music-assistant/usage/#the-library) 中。如果有多个源，它们将合并为一个媒体库

- Music Assistant UI 以[媒体库](/music-assistant/usage/#the-library)概念为中心，即您最感兴趣的艺术家、专辑、曲目、播放列表、有声读物、播客和电台。可以浏览或搜索各种提供者以将其他项目添加到媒体库。

- 请注意，在首次启动时，可能需要一段时间才能获得数据（首次同步），Music Assistant UI 将指示正在进行的任务。可以通过 MA 设置中音乐提供者条目旁边的此符号 !<a href="/assets/icons/sync-icon.png" target="_blank"><img src="/assets/icons/sync-icon.png" alt="icon" loading="lazy" style="max-width: 100%;" /></a> 看到

- 音乐源以固定间隔同步（可以在设置中更改）

- MA 设计为在同时运行 Home Assistant 的 Raspberry Pi (4+) 上工作。因此，它对资源的要求不大。此外，用于艺术品和其他元数据的免费 API 调用有限制。结果是，大型媒体库的初始同步可能需要很长时间。后续同步应该明显更快

- 如果一首歌在多个提供者之间[链接](/music-assistant/ui/#provider-details)（例如 Spotify 和磁盘上的 FLAC 文件），在开始流时始终首选质量最高的文件/流。最高质量基于采样率、位深和编解码器，如果质量相等，本地始终优先于云端。

- Music Assistant 使用自定义流端口（默认 TCP 8097）将音频流式传输到播放器。播放器必须能够访问 Home Assistant 实例和此端口。如果您运行的是推荐的 HAOS 安装方法之一，这一切都会为您处理，否则您必须确保以 HOST 网络模式运行 MA，并具有上面示例 docker compose 中显示的权限。注意：如果默认端口 8097 被占用，将尝试下一个端口，依此类推
- 不支持限制可用端口（例如尝试通过防火墙运行 MA），因为像 AirPlay 这样的协议会打开随机的 TCP 和/或 UDP 端口
- 尝试创建或操作包含超过一千个项目的播放列表或队列可能会导致无响应或高资源使用，具体取决于主机的资源

[repository-badge]: https://img.shields.io/badge/Add%20repository%20to%20my-Home%20Assistant-41BDF5?logo=home-assistant&style=for-the-badge
[repository-url]: https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fmusic-assistant%2Fhome-assistant-addon