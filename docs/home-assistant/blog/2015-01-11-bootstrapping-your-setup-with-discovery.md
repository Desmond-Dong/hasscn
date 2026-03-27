---
title: 使用 Discovery 快速启动你的配置
description: '大多数人都不喜欢手动配置。大家希望开箱即用。我们即将介绍的新 discovery 组件，目标正是实现这一点。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 使用 Discovery 快速启动你的配置

大多数人都不喜欢手动配置。大家希望开箱即用。我们即将介绍的新 discovery 组件，目标正是实现这一点。

discovery 组件会定期扫描 WiFi 网络中的 zeroconf/mDNS 和 uPnP 设备。首个版本主要先把整体架构搭好，并支持发现网络中的 Belkin WeMo 开关和 Google Chromecast。发现后，它会加载并通知对应组件，几秒内即可使用。

大多数设备在被发现后，仍需要用户进行某种交互——可能是按下按钮，也可能是完成认证。这是我们未来会继续解决的挑战。

要启用 discovery 组件，请在 `home-assistant.conf` 中添加：

```text
[discovery]
```

我们已在“Adding a new platform”页面新增 [discovery 小节](/home-assistant/developers/add_new_platform/#discovery)，说明如何让你的平台支持被发现。
