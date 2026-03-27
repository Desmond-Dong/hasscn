---
title: 'New NetDaemon Release: Use C# to automate Home Assistant'
description: NetDaemon just released a new version of their .Net platform for Home
  Assistant
---
# New NetDaemon Release: Use C# to automate Home Assistant

<img src='/home-assistant/images/blog/2021-11-NetDaemon/NetDaemonLogo.png' style='border: 0;box-shadow: none; width: 25%; height: 25%; float: right;'>

对于偏好使用 C# 开发的 Home Assistant 用户来说，这是个好消息：[NetDaemon](https://netdaemon.xyz/) 刚刚发布了其开源平台的新版本，让你可以使用基于 .NET 6 的 C# 10 来为 Home Assistant 编写应用程序或自动化。

本次发布包含了一个名为 [`HassModel`](https://netdaemon.xyz/docs/hass_model/hass_model) 的新 API，让你可以比以往更轻松地在 .NET 中与 Home Assistant 交互。它会根据你自己 Home Assistant 实例中的实体、它们的属性，以及所有可用服务和对应参数，自动生成强类型接口。你还可以直接在 IDE 中借助 Intellisense 发现所有实体和可用服务。

[查看文档并了解如何开始使用 NetDaemon](https://netdaemon.xyz/)

_这个项目与 Home Assistant 没有关联，但它使用了我们的[开放 API](https://开发者.home-assistant.io/docs/api/websocket)。_
