---
title: Google Assistant 技能正式上线！
description: Home Assistant Cloud 的 Google Assistant 集成现已向所有用户开放。
---

<p class='img'>
  <img
    src='/home-assistant/images/blog/2018-04-google-assistant/google-assistant-home-assistant.png'
    alt='Home Assistant logo and the Works with the Google Assistant badge'
  />
</p>

没错，我们的 Google Assistant Smart Home 技能已经上线！名字虽然有点长，但这意味着你现在可以通过任何支持 Google Assistant 的设备，用一句“Ok Google，打开灯”来控制 Home Assistant 设备。

快速开始：

 - [启用 Home Assistant Cloud](/home-assistant/cloud/#enabling-the-cloud)
 - 安装我们的 Google Assistant 技能。本文发布时直达链接还未生效：你可以打开 Google Home 应用 -> Home Control，点击右下角蓝色 `+`，然后在列表中找到 Hass.io。
 - 可选：[调整要暴露给 Google Assistant 的设备](/home-assistant/cloud/google_assistant/)。

注意事项：

 - 技能名称叫 Hass.io，但普通 Home Assistant 同样可用。这个命名是为了避免 Home Assistant、Google Assistant 和 Google Home 之间的混淆。
 - 支持 Home Assistant `0.65.6` 及以上版本。
 - 所有消息处理都在本地完成，且实现已[开源](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/google_assistant/trait.py)。
 - 如果你有带 Google Assistant 的 Android 设备，也可以控制家中设备。
 - Home Assistant `0.68` 会在 Cloud 配置面板加入一个按钮，用于触发可用设备同步。

Home Assistant Cloud 仍处于公开测试阶段，并且可免费使用。公开测试期已延长至 6 月 1 日。特别感谢 [Quadflight] 提供 Google 实机测试所用的树莓派，也感谢 [Arsaboo] 协助测试。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TQ3CoEHz5Xs" frameborder="0" allowfullscreen></iframe>
</div>

[Quadflight]: https://github.com/quadflight
[Arsaboo]: https://github.com/arsaboo
