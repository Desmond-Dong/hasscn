---
title: "已认证的 WebView"
---

你的应用已经要求用户完成认证。这意味着当用户打开 Home Assistant UI 时，应用不应再次要求用户认证。

为实现这一点，Home Assistant UI 支持[外部认证](/developers/frontend/external-authentication)。这允许你的应用提供钩子，使前端能够向你的应用请求访问令牌。

Home Assistant 还支持通过[外部总线](/developers/frontend/external-bus)进一步打通前端与应用之间的集成。

请注意，此功能要求与实例建立直接连接。
