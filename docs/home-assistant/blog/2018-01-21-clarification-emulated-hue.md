---
title: 关于 Emulated Hue 的说明
description: Emulated Hue 集成不会被移除，我们也不会为了推动你订阅 Community
  Support Package 而删除 Home Assistant 的任何功能。
---

最近社区里对 Emulated Hue 集成的未来有一些误解，我想在这里把事情说明白。**Emulated Hue 集成不会被移除，我们也不会为了推动你通过订阅 Community Support Package 来支持 Home Assistant 项目，而删除 Home Assistant 的任何功能。**

大家之所以担心 Emulated Hue 的未来，是因为一条弃用提示里的措辞不够准确。这条提示是在[一年前引入][pr2]的，当时我们弃用了 Emulated Hue 的 `type: alexa` 配置项：

> Alexa type is deprecated and will be removed in a future 版本

这个配置项本来就不应该叫 `type: alexa`，而应该叫 `mode: legacy`。你想想看，既然是“模拟”设备，为什么要根据使用方不同而区分不同模拟模式？这实际上意味着两种模式里有一种是错误的。

旧实现并不是 100% 正确。它对 Alexa（最初目标）来说足够可用，但对 Google Home 不正确。我们在修复 Emulated Hue 时，加入了 `type: alexa`，用来重新启用旧实现，这样大家就不需要重新添加 Alexa 设备。这个选项被标记为弃用，原意是未来会移除这套不正确的模拟实现。但后来我们忘了真正推进这件事。

我们的另一个失误，是把正确模式命名为 `google_home`，尽管它其实和 Google Home 本身无关。这让很多人产生了误解，继续在配置中添加 `type: alexa`，从而触发了弃用警告。

从 Home Assistant 0.62 开始，这条警告会更新，并且会附上本文链接。

更多信息：

- 想了解 Emulated Hue 第一版到底哪里不正确，可以看修复它的 PR：[Re-org emulated_hue and fix google home][pr1]
- 查看[如何配置 Emulated Hue 的文档][eh-conf]

[pr1]: https://github.com/home-assistant/home-assistant/pull/4708
[pr2]: https://github.com/home-assistant/home-assistant/pull/5549
[eh-conf]: /integrations/emulated_hue/#配置
