---
title: 流式更新
description: 前端在打开时可实时接收最新变更推送。
---

Home Assistant 学会了一个从服务端获取最新信息的新方式：流式更新。前端不再每 30 秒轮询一次，而是保持连接常开，在变更发生时立即接收推送。

侧边栏新增了一个开关，可启用或关闭流式更新。这个偏好会通过 local storage 按浏览器保存。若建立流连接时发生错误，开关也会显示状态，并自动回退到轮询模式。

<p class='img'><img src='/home-assistant/images/screenshots/streaming-updates.png' /></p>

<!--more-->

流式更新基于 HTML5 `EventSource` 实现。实现过程很直接，因为重连逻辑由 `EventSource` 自身处理。[服务端代码](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/integrations/api/__init__.py) 约 50 行，客户端代码约 80 行。

现在，服务端发生的所有事件都会发送到浏览器。这让任何正在运行 UI 的浏览器都成为 Home Assistant 的一个完整[从属实例](/home-assistant/developers/architecture/#multiple-connected-instances)。这也为完全运行在客户端的组件打开了新的可能性。

实现 EventSource 也并非没有挑战。我们解决了以下问题：

在 Chrome 中，连接可能会“悄悄失效”而不触发任何事件处理器。这通常发生在设备进入待机时。电脑上较少见，但手机上很常见。我们通过服务端定期发送 ping 解决了这个问题：当前端一段时间没收到通信时，会认为连接已失效。发送 ping 也有助于服务端发现并清理断开的连接。

我遇到的另一个问题是，Safari 和 Firefox 不会在连接建立时触发 `open` 事件，而是在收到第一条消息后才触发。为此，服务端现在会在连接建立后立即发送一次 ping。
