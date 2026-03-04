---
title: 故障排除
description: 常见问题和修复
---

# 首先尝试的事情和如何报告问题

查看日志并尝试解决您在那里看到的任何错误，特别是与<a href="https://music-assistant.io/music-providers/filesystem/#tagging-files" target="_blank" rel="noopener noreferrer">标记</a>相关的错误。连接错误是网络问题（包括 Adguard 或 pi-hole 阻止）或容器配置错误的症状。

可能最常见的问题是人们尝试在复杂的网络设置下运行 MA。在 VPN 后、跨子网或 VLAN、防火墙后、本地 SSL、使用反向代理或在容器内（使用我们推荐的 docker compose 时除外）运行不受支持（可能可以工作，但我们无法为您排除故障，因为 MA 由一个小团队运营，他们没有资源帮助处理非 MA 问题）。核心中已添加了一些选项来帮助运行非标准设置的用户，但这些是在不支持的基础上提供的。在 Discord 中搜索这些问题，因为用户经常报告这些问题并发现是他们的设置导致了故障；他们的解决方案可能对您有帮助。

我们越来越多地看到由用户使用 AdGuard、Pi-hole、pfSense 等工具导致的报告。如果您的问题与无法流式传输或日志中有与无法访问的地址或超时相关的错误，请在寻求帮助之前禁用所有这些工具。仅应用规则是不够的，问题必须在这些工具完全禁用的情况下仍然存在。

为明确起见，运行 HAOS 或简单 docker 以外的安装选项和/或更复杂的网络设置风险自负，我们没有能力提供直接支持（例如 Kubernetes 不受支持）。

MA 设置>>核心>>流服务器>>配置>>高级中有一些设置可能会帮助您，如果您有非标准设置。如果您在自己的 docker 容器中运行 MA，请确保您有正确的发布 IP 地址和绑定到 IP/接口设置。确保容器处于 HOST 网络模式，并注意[示例 docker 命令](/music-assistant/installation/#docker-image)中的额外权限。

大多数播放器使用 mDNS（广播）发现，所以如果您的播放器没有被发现，这意味着您的网络阻止了该流量（例如 IGMP 或多播侦听或过滤）。如果多播被阻止，您必须检查您的设置（例如 WiFi 设置）。商业解决方案倾向于尽可能阻止多播流量，因为当有许多客户端时会损害性能。在家庭设置中，必须启用多播，因为所有家庭设备都依赖多播。Ubiquiti 设备用户必须确保设置 `Multicast to Unicast` 已关闭。

确保 HA 内部 URL 设置正确。HA 设置>>系统>>网络>>Home Assistant URL>>本地网络（设置为自动或使用您的内部 HA IP）。如果是自动的，您可以尝试将其更改为 http://your.internal.ip:8123/

MA 以高质量流式传输，这可能会使糟糕的网络连接达到极限。如果可能，为 MA 播放器使用有线连接。输入编解码器并不总是与输出编解码器相同（默认通常为 FLAC），因此播放低质量 MP3 不会改变明显性能。如果您在有线的播放器或靠近接入点的播放器上没有遇到卡顿或其他中断播放问题，那么糟糕的 Wi-Fi 可能是原因。您需要改善 Wi-Fi 覆盖。播放器有一个使用有损编解码器的选项，这将降低带宽要求，这在播放器的高级设置中可用。

检查物理设备设置。有许多报告表明问题实际上是 MA 外部的设置，例如接收器设置为重复音轨或 ESP 设备安装时传递了错误的参数。

确保本地文件<a href="https://music-assistant.io/music-providers/filesystem/#tagging-files" target="_blank" rel="noopener noreferrer">标记正确</a>。

如果是播放问题，请在特定播放器的设置中打开队列流模式（如果可用）。

如果是音乐提供商问题且提供商需要认证，请清除认证并重新登录。

如果是前端问题或与登录需要重定向到另一个网站的提供商相关，请尝试不同的浏览器。如果您在移动设备上尝试，请在笔记本电脑或 PC 上尝试。Firefox 和 Safari 已知有缺陷。

查看适用的播放器或音乐提供商文档，看是否有已知问题或特定的故障排除步骤或修复。

对于语音问题，请参阅<a href="https://music-assistant.io/integration/voice/#troubleshooting" target="_blank" rel="noopener noreferrer">语音故障排除</a>。如果您没有使用 HOME ASSISTANT 作为对话代理，您必须先在 HA 论坛中寻求帮助。如果他们将您引导回此项目，请在报告中明确说明您正在使用 LLM 作为对话代理，并包括 HA 支持网络无法帮助的原因。

如果物理播放器无法连接或没有声音，请尝试重新启动。

检查 GitHub Issues 和 Discord 看看是否是已知问题。如果不是，请尝试重启 MA，尝试重启 HA，并尝试完全主机重启（按此顺序）。如果是集成问题，请尝试通过 HA 设置将其删除，然后重启 HA，然后重新安装。

在提出问题之前[先阅读此内容](/music-assistant/support/)。使用模板报告问题，并提供尽可能多的详细信息。帖子通常不清楚确切在哪里输入了什么、如何配置某些内容或选择了哪些菜单序列。截图可能会有帮助。

从 MA 设置>>核心下载并附加完整日志。如果默认级别没有提供有用信息，启用调试日志是可以的。不建议在日常使用中以全局级别运行调试日志，因为它有资源开销；仅在有问题时这样做。不要在全局级别使用详细日志级别，因为它使日志几乎无法阅读。如果确实需要，但仅应开发人员要求，可以在每个提供商的基础上启用详细日志。

当您有前端问题时，您也可以查看浏览器控制台，在 Chrome 浏览器中是 --> F12 开发者工具 --> 控制台。

以下内容在所有报告中都是必需的，因为 MA 团队很小，您需要在提出问题之前缩小问题范围：

- 观察到问题时正在使用什么音乐提供商？您尝试过什么其他音乐提供商（如果没有其他提供商，请说明清楚——您总是可以尝试广播电台）
- 观察到问题时正在使用什么播放器提供商？您尝试过什么其他播放器提供商（如果没有其他提供商，请说明清楚——您总是可以使用 Sendspin）
- 播放器是否已分组？
- 播放是如何发起的（例如自动化或通过 UI）
- 如果您没有使用 HAOS，那么您是如何安装 MA 的
- 什么在工作（例如播放器与音乐提供商 X 配合工作但与 Y 不配合）
- 您从此页面尝试过什么没有帮助（这非常重要！）

> [!NOTE]
> 您可以通过转到 MA 设置并点击核心来检索完整的 MA 日志

## 提供商不工作

导航到 MA 设置并检查提供商条目。如果旁边有一个带感叹号的红色圆圈，请将鼠标悬停在该图标上查看错误消息。

!<a href="/assets/screenshots/setup_error.png" target="_blank"><img src="/assets/screenshots/setup_error.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 为什么音轨/专辑在提供商之间不匹配

在流媒体提供商之间匹配项目是具有挑战性的，因为它们并不都提供相同或唯一的元数据来明确识别匹配。如果您认为有一个明显的匹配（例如相同的艺术家和音轨和专辑），请提交问题报告。有关 MA 如何以各种方式使用元数据的更多信息，请参阅这里 https://github.com/music-assistant/support/discussions/543

## 我的媒体播放器不可用或不播放

首先检查播放器是否已被发现但只是没有出现在[播放器列表](/music-assistant/ui/#player-list)中。通过导航到 MA 设置>>播放器来执行此操作。如果播放器在那里，请查找条目旁边的沙漏 ⧖，这表明由于某种原因播放器不可用。还要查看单个播放器的通用设置，以确定在什么情况下播放器将在 UI 中隐藏。

如果播放器未显示在 MA 设置的播放器列表中，请查看播放器提供商列表。如果您的设备不支持列出的协议之一，它目前将无法工作。查看 <a href="https://github.com/orgs/music-assistant/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> 看看其他人是否请求了支持并加入对话。

如果您的设备确实支持受支持的协议之一，请查看该播放器提供商的文档以获取已知问题和故障排除提示。

如果您的设备仍然不工作且您认为它应该工作，请查看完整日志以获取发现信息和错误。查看本页顶部的首先尝试的事情，因为通常如果您走到这一步还没有确定播放器为什么不工作，那将是网络或非标准安装问题，通常您需要自己解决。搜索 Github <a href="https://github.com/music-assistant/support/issues" target="_blank" rel="noopener noreferrer">Issues</a>、<a href="https://github.com/orgs/music-assistant/discussions" target="_blank" rel="noopener noreferrer">Discussions</a> 和 <a href="https://discord.gg/kaVm8hGpne" target="_blank" rel="noopener noreferrer">Discord</a>），因为可能有人以前问过您的问题。

## 我的媒体全部丢失

确保收藏筛选器已关闭。每个视图顶部都有一个 ❤️。确保它是空心的。

如果您尝试通过 HA 媒体视图查看播放列表，您应该注意只有收藏的播放列表才会显示，此外您需要选择一个 MA 播放器才能看到 MA 库。HA 的媒体浏览器没有任何筛选或排序选项，如 MA 前端所拥有的。

## 我看不到流媒体提供商上艺术家的任何音轨或专辑

请参阅[使用和音乐提供商说明](/music-assistant/usage/)

## 我的本地专辑封面没有被识别

嵌入在音轨中的艺术作品总是会被识别，但只有当文件夹名称与专辑**完全**匹配时，folder.jpg 图像才会被导入（除了文件夹名称中禁止的任何字符。例如 / ）

## 我的音乐没有任何元数据

对于本地文件，您可以完全标记您的音乐（这是首选，建议使用 <a href="https://picard.musicbrainz.org/" target="_blank" rel="noopener noreferrer">Picard</a>）或者在艺术家文件夹中有 artist.nfo（就像图像一样），这将被优先使用。只有在没有本地数据时才会查询在线元数据提供商。https://kodi.wiki/view/NFO_files

## 某些播放列表丢失

对于某些提供商（Spotify 是一个已知示例），使用的认证方法可能会影响某些类型播放列表的可见性。对于 Spotify 提供商，请参阅<a href="https://www.music-assistant.io/music-providers/spotify/#known-issues-notes" target="_blank" rel="noopener noreferrer">这里</a>的详细信息

## 我已更新但 MA 看起来像旧版本或不工作

可能您的浏览器正在使用前端缓存版本。尝试强制刷新 Chrome、Firefox 或 Edge for Windows：按 Ctrl+F5（如果不起作用，尝试 Shift+F5 或 Ctrl+Shift+R）。

如果上述不起作用，请查看<a href="https://www.webinstinct.com/faq/how-to-disable-browser-cache" target="_blank" rel="noopener noreferrer">这里了解更多选项</a>

对于 iOS 应用，请参阅<a href="https://community.home-assistant.io/t/anyone-know-how-to-clear-cache-in-the-ios-app/64569/10" target="_blank" rel="noopener noreferrer">这里</a>

## 我的放大器的第二个区域不被 MA 识别或 MA 无法打开我的放大器

MA 是您放大器的输入。因此您需要打开放大器，然后选择 MA 正在流式传输到的输入（例如 AirPlay、DLNA、Chromecast）。因此，MA 看不到放大器区域，它只看到放大器的兼容输入。

某些放大器可能会在检测到信号时自动打开，因此请检查放大器选项。如果此功能不可用，您需要通过其他方式打开放大器，这可以通过[将 HA 实体分配给播放器控制](/music-assistant/settings/individual-player/#player-controls)来完成。

## 我的本地音乐没有被导入或我在日志中看到缺少 ID3 标签警告

这可能是标记问题。请参阅[这里](/music-assistant/music-providers/filesystem/#tagging-files)

## MA 正在干扰我的 Spotify Connect 或其他流媒体应用

如果 MA 播放器从 MA UI 中"打开"，MA 理解它被允许控制播放器。即使您已通过另一个应用开始播放但没有通过 MA 开始播放，这也可能发生。要避免这种情况，"关闭" MA 播放器。

## MA 无法启动

如果在日志中看到以下错误（或类似）：
  ```
  File "/app/venv/lib/python3.12/site-packages/zeroconf/_utils/net.py", line 293, in add_multicast_member
      listen_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, _value)
  OSError: [Errno 105] No buffer space available
  ```
  这可能是由于达到主机系统上的多播组限制。请参阅 https://unix.stackexchange.com/questions/23832/is-there-a-way-to-increase-the-20-multicast-group-limit-per-socket 了解更多信息

如果上述不是问题，则以安全模式启动 MA：

- 使用 HA 应用，选择配置中的切换开关
- 使用 Docker，运行容器时将环境变量 MASS_SAFE_MODE 设置为布尔值 true，例如"1"或"true"

如果 MA 现在启动，您可以通过在设置中点击"重新加载"来启动任何提供商（点击三个点）。如果某个特定提供商导致 MA 崩溃，请打开包含详细信息的问题。

