---
title: "First Run (Authentication)"
---

# 初始身份验证设置

访问 Music Assistant 用户界面 (UI) 需要登录名和密码。

首次启动时，用户看到的内容取决于安装类型和访问方式。如果 Music Assistant 服务器作为应用安装在 Home Assistant 中，并且通过 HA Ingress 访问 MA UI，则管理员账户将在 Music Assistant 中自动设置，用户将直接进入设置页面。在所有其他情况下，用户将看到初始身份验证设置对话框。非常重要的一点是，不要忘记首先设置的管理员用户和密码，因为以后无法获取。如果忘记了这些，则需要重建 MA 服务器（docker 用户可以删除 auth.db）。

> [!NOTE]
| 使用 Home Assistant 登录时，这需要打开一个弹出浏览器标签页，因此请确保在设置中允许此操作（尤其是 iOS 上的 Safari）

初始身份验证设置对话框将如下所示

<a href="/assets/screenshots/auth-flow.png" target="_blank"><img src="/assets/screenshots/auth-flow.png" alt="预览图片" style="width: 256px;"  loading="lazy" /></a>

成功登录后，管理员需要执行的首要操作是为[音乐源](/music-assistant/music-providers/)和[播放器](/music-assistant/player-support/)添加提供者。此横幅显示以支持此操作

!<a href="/assets/screenshots/setup-banner.png" target="_blank"><img src="/assets/screenshots/setup-banner.png" alt="预览图片" loading="lazy" style="max-width: 100%;" /></a>