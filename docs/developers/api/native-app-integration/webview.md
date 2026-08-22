---
title: "已认证的 WebView"
---

你的应用程序已经要求用户进行了认证。这意味着当用户打开 Home Assistant UI 时，你的应用不应该再次要求用户认证。

为了实现这一点，Home Assistant UI 支持[外部认证](frontend/external-authentication.md)。这允许你的应用提供 hooks，使前端向你的应用请求 access tokens。

Home Assistant 还支持前端与应用之间的进一步集成，通过[外部总线](frontend/external-bus.md)实现。

注意，此功能需要直接连接到实例。