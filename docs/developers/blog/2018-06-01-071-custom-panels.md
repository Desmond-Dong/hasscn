---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: "0.71：改进的 custom panels 和 custom UI 的少量变更"
---

现代化和本地化前端的努力正在全速推进。这篇博文将介绍 Home Assistant 0.71 即将推出的功能，该版本预计今天会进入 beta 通道，并计划一周后正式发布。

## 改进的 Custom Panel 支持

Custom panels 允许开发者构建可以嵌入到 Home Assistant 用户界面的面板，具备与我们其他面板（如 history、map 等）相同的扩展能力。Home Assistant 前端将负责管理认证和后端 state 的订阅，面板只需负责显示数据，并可为用户提供控制选项（调用 service 等）。

这项支持已经存在一段时间了，但上周我们花了一些时间 [打磨](https://github.com/home-assistant/core/pull/14708) 我们的支持，并增加了三个新特性：

第一个新特性是，我们现在支持从 JavaScript URL 导入 panel。这将是未来分发 panel 的首选方式。这也意味着你可以引用托管在外部服务器的 panel。外部 panel 在加载前需要用户批准。用户仍然可以将 panel 本地托管（无需批准），只需将其复制到 `<config dir>/www/your-panel.js` 并使用 `/local/your-panel.js` 作为 url。

第二个新特性是，我们现在可以将你的 panel 嵌入到 iFrame 中。这让 panel 开发者无需担心重复的 web components，并且可以使用 React 开发 panel。过去，React 面板无法工作，因为 React 在 Shadow DOM 中无法很好地工作（[更多信息](https://github.com/facebook/react/pull/12163)）。

第三个新特性是，我们现在提供了一个 [starter kit](https://github.com/home-assistant/custom-panel-starter-kit-react)，用于开始开发 React 面板！该工具包包含开发 React 面板所需的一切，并与社区分享。告诉我们你在构建什么吧！

## Custom UI：`<state-info>` 和 `<ha-relative-time>`

如果你正在构建 custom UI，那么你很可能在使用 `<state-info>` 和 `<ha-relative-time>`。虽然它们并未被官方支持为对外 API，但我们仍然想提前通知，以后需要传入 `hass` 对象。

这变得必要，是因为 `<ha-relative-time>` 现在可以实现本地化了，感谢 c727 在 [#1241](https://github.com/home-assistant/frontend/pull/1241)。