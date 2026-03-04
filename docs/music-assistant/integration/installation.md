---
title: "Installation"
---

# 安装 <img src="/assets/icons/installation-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

> [!NOTE]
| 在尝试通过集成将 MA 链接到 HA 之前，请确保 MA 服务器已正确启动并运行，并已添加音乐和播放器提供者

## HA 集成安装

将 Music Assistant 连接到 Home Assistant 的集成作为 HA 核心中的官方组件提供。

- MA 服务器通常会被 HA 自动发现，并通过单击配置进行安装。
- 如果由于某种原因需要手动添加集成，请转到 HA 设置 >> 设备与服务 >> 集成，然后单击大`+ 添加集成`按钮。搜索 Music Assistant 并单击添加它。您需要添加服务器 IP 和端口（通常为 8095）。在服务器日志中搜索相关行。例如，`Starting server on 172.30.32.1:8095`。
- 单击提交，Music Assistant 集成即可使用。

> [!NOTE]
| HA 集成将为 MA 原生支持的播放器类型创建新的 media_player 实体。要查看这些播放器的名称，请转到`HA 设置 >> 设备与服务 >> 集成 >> MUSIC ASSISTANT`并查看实体。这些是需要在自动化和脚本中作为目标的播放器

## 操作

Music Assistant 提供（除了标准媒体播放器操作外）几个自定义操作来控制播放器和媒体。有关信息，请参阅 <a href="https://www.home-assistant.io/integrations/music_assistant/#additional-actions" target="_blank" rel="noopener noreferrer">Home Assistant 文档</a>。

常见问题 / 附加信息

- [music_assistant.play_media](/music-assistant/faq/massplaymedia/)
- [music_assistant.play_annnouncement](/music-assistant/faq/massannounce/)
- [music_assistant.transfer_queue](/music-assistant/faq/masstransfer/)
- [music_assistant.search](/music-assistant/faq/masssearch/)
- [music_assistant.get_library](/music-assistant/faq/get_library/)
- [music_assistant.get_queue](/music-assistant/faq/get_queue/)