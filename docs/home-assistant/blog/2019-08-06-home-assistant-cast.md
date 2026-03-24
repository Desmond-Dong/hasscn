---
title: Home Assistant Cast
description: 在 Chromecast 或带屏 Google Assistant 设备上显示 Home Assistant。
---

<p class='img'>
<img src='/home-assistant/images/blog/2019-08-home-assistant-cast/hero.png' alt='Picture of a Google Nest Hub with the Home Assistant UI on it.'>
</p>

家庭自动化本身从来不是 Home Assistant 的最终目标。它只是一个工具，让技术改善我们以及身边人的生活。我在 [3.5 年前](https://www.home-assistant.io/博客/2016/01/19/perfect-home-automation/)写过这件事，而这也一直是我们构建 Home Assistant 的指导原则。

今天我们推出 Home Assistant Cast 来推进这个目标。借助 Home Assistant Cast，家里的人可以快速查看房屋和成员状态，并迅速调整最重要的设置。它运行在你家里现有的 Chromecast 屏幕设备上，比如 Google Nest Hub 和电视。

你可以通过访问 [**Home Assistant Cast 启动站点**](https://cast.home-assistant.io) 来启动 Home Assistant Cast。它支持过去一年发布的任意 Home Assistant 版本。Home Assistant Cast 可以显示任意 Lovelace 视图，也支持自定义卡片和主题。没有配置 Lovelace？别担心，我们会自动生成并展示一个视图。

如需体验演示，也可以直接访问 [Home Assistant Cast 启动站点](https://cast.home-assistant.io)。如果你有任何疑问，请查看[常见问题](https://cast.home-assistant.io/常见问题.html)。

## 工作原理

你需要授权 Home Assistant Cast 访问你的 Home Assistant 实例。授权完成后，你就可以在 Chromecast 设备上启动 Home Assistant Cast。随后，Chromecast 设备会与 Home Assistant 实例建立直连，并让你选择要显示的视图。

Home Assistant Cast 可以：

- 渲染 Lovelace 视图，包括自定义卡片。
- 通过实时数据流，确保 UI 始终显示家中最新状态。
- 通过实体卡片中的 navigate 动作或网页链接在视图间跳转。
- 当你更新 Lovelace 配置时，投屏中的 Lovelace UI 会立即更新。

## 关于触控

我们已经让 Google Nest Hub 和其他带屏 Google Assistant 设备支持了触控操作。用于声明“这是触控优化应用”的相关配置选项[并没有生效](https://github.com/home-assistant/home-assistant-polymer/blob/98b882d5991e05fae7962d96e5d0f7a5ae773a5b/cast/src/receiver/entrypoint.ts#L18-L30)。不过，我们仍通过[修改代码](https://github.com/home-assistant/home-assistant-polymer/blob/98b882d5991e05fae7962d96e5d0f7a5ae773a5b/cast/src/receiver/layout/hc-main.ts#L200-L206)实现了触控功能，这段代码会在 Chromecast 运行接收端应用时注入到 Home Assistant Cast 网站中。

我们无法保证触控功能会一直可用，它可能会被封锁。它可能这周失效、下个月失效、明年失效，也可能一直可用。

我希望通过发布带触控功能的版本，向 Google 证明这是人们真正需要、也愿意为之投入的能力。

**为了让更多人看到它，我鼓励大家在 Twitter、Facebook、YouTube 等社交媒体分享 Home Assistant Cast 的使用照片和视频，并带上 `#homeassistantcast` 话题。一起把这份热爱传递出去！**

## 即将到来与未来计划

8 月 7 日将发布 Home Assistant 0.97。这个版本将允许你直接从 Home Assistant 前端启动 Home Assistant Cast。你可以在实体卡片中加入新的 `cast` 行来实现。

```yaml
# Example entities card configuration
type: entities
entities:
  - type: cast
    name: Lights
    # The path of the view (or number)
    view: lights
    hide_if_unavailable: true
```

这是 Home Assistant Cast 的首次发布，所以我们先聚焦在足够可用的最小功能集上。后续还有更多计划：

- 支持从 Home Assistant 本体（而非浏览器）启动 Home Assistant Cast，作为自动化或脚本的一部分。[该功能已在 Home Assistant 0.99 上线。](/home-assistant/integrations/cast/#home-assistant-cast)
- 将 Home Assistant Cast 作为文本转语音目标（灵感来自 [@thomasloven 的 Lovelace-browser-commander](https://github.com/thomasloven/Lovelace-browser-commander)）。
