---
title: Home Assistant 治理 [已更新]
description: 'After feedback from the community we have updated the CLAcla and the license that Home Assistant is distributed under. For the CLA。'
---
# Home Assistant 治理 [已更新]

### 更新 JAN 28, 2017

After feedback from the community we have updated [the CLA][cla] and the license that Home Assistant is distributed under. For the CLA, instead of enforcing requirements on the grants and code, we now require contributions to be licensed under the Apache 2.0 license. Special thanks to [Matthew Garrett][mjg59] for his feedback and advice.

Starting with 发布 0.37, Home Assistant will re-license the current code under [the Apache 2.0 license][license]. This is the license that will be used moving forward for all projects under our organization.

---

在过去三年里，Home Assistant 项目和社区经历了巨大的成长。许多志愿者每天不知疲倦地努力，才让你看到今天这一切出色成果。这里面涉及的工作，远比很多人意识到的要多。除了编写 Home Assistant 本身的代码之外，志愿者还持续维护相关项目、更新文档、发布示例、撰写博客文章，以及管理论坛和聊天社区。即使在我们不断成长的过程中，我们也希望这一切依然安全、健康且持续运转。

从今天开始，我们宣布推出几项新举措，以帮助保护我们的用户、贡献者和社区成员。

<!--more-->
## 行为准则

每天都有更多人认识并喜爱 Home Assistant，我们的社区也在不断壮大。我们的社区由来自世界各地、拥有不同背景的人组成，我们希望 Home Assistant 能成为一个让每个人都感到自在的地方。为此，我们将引入一份行为准则。行为准则会说明哪些行为是不可接受的、我们会如何执行，以及应当向哪里报告事件。

今后，这份行为准则将适用于 Home Assistant 组织下的所有项目。

[阅读行为准则][coc]

[coc]: /developers/code_of_conduct/

## 贡献者许可协议

今后，我们还将要求所有向任何项目提交贡献的人，都需要以电子方式签署我们的[贡献者许可协议（CLA）][cla]。~~我们采用了 GitHub 在其项目中使用的 CLA~~（见顶部更新说明）。目前，我们没有计划追溯性地要求历史贡献补签 CLA，这一要求只适用于今后的贡献。

在签署好的 CLA 记录归档之前，你的拉取请求不会被审核或接受。当你提交新的拉取请求时，如果系统里还没有你的 CLA 记录，我们的机器人会引导你完成整个流程。

**我们计划从下一个版本（0.37）开始，要求所有贡献者都签署电子版贡献者许可协议。目前该版本计划于 2017 年 1 月 28 日（星期六，也就是从今天起一周后）发布。** 今天起，CLA 将被加入所有代码仓库中。

CLA 不太容易简单说明，不过 GitHub 对它的解释非常出色，因此下面这部分内容摘自 [https://cla.github.com][gh-cla]：

### 什么是贡献者许可协议？

贡献者许可协议，也就是 CLA，会要求贡献者确认以下两点：

1. 任何人都可以在任何地方永久免费地使用你的贡献。
2. 你的贡献不会侵犯任何其他人的权利。

GitHub 的 CLA 有助于确保他们所维护的开源项目能够顺利运行并持续可用。

### 为什么需要 CLA？

这取决于所在司法辖区，但在美国，贡献内容通常归作者本人或其雇主所有。当某项贡献被接纳后，整个项目就成为一组衍生作品的集合。要维持完整项目的分发，以及维持任何许可协议，就需要所有贡献者的同意。

### 开源许可证不就是为了解决这个问题吗？

大多数开源许可证处理的是原始代码的使用问题，而不会涉及贡献内容，或由原始代码衍生出的作品。

### CLA 如何保护一个项目？

如果某项贡献的所有者决定不希望该贡献继续成为项目或某个分发版本的一部分，那么法律往往会站在他们那一边。项目本身、贡献者以及用户都可能因此面临法律行动。这可能导致需要支付赔偿，也可能在问题解决之前阻止项目继续使用或接受新的贡献。

即使没有真的进入司法程序，过多的模糊空间也可能危及甚至毁掉一个项目，因为那些无法承担法律风险的人将不会愿意参与其中。

### 为什么看起来只有“企业”项目才有 CLA？

许多并非由企业拥有的项目也会使用 CLA，甚至使用版权转让协议，比如 jQuery 和 Eclipse。不过，获得资金支持的项目的确更容易成为目标，因此它们对法律层面的模糊风险容忍度通常也更低。

## 安全要求

随着越来越多协作者参与 Home Assistant，我们面临的风险也随之增加，因为拥有写权限的人变多了。因此，我们将采取以下措施。

  1. 自 2016 年 11 月 3 日起，所有协作者都必须在自己的 GitHub 账户上启用双重身份验证（2FA）。
  2. 今后，我们会不定期进行审查，如果某位协作者在较长时间内没有贡献，我们会移除其写权限。这绝不是为了把谁赶走；当你未来想再次开始贡献时，完全可以重新获得权限。

## 许可协议

现在起，我们会确保 Home Assistant 组织下的所有项目都包含 `LICENSE.md` 文件，并且使用的是 [OSI 批准的开源许可证](https://opensource.org/licenses) 或 [Creative Commons](https://creativecommons.org) 许可证。

### 代码许可证

Home Assistant 组织下所有代码项目所采用的许可证是 [Apache 2.0 许可证][license]。

### 文档许可证

home-assistant.io 上的所有内容，以及 Home Assistant 组织下其他所有文档和资源类项目，都将采用 Creative Commons 许可证，具体为[署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/)。

## 致谢贡献者

我们现在已经基本实现了 [Credits](/home-assistant/developers/credits/) 页面更新的自动化，这样贡献者就能更快获得署名致谢。

## 最后

我们希望你能理解，这些变更的出发点只是为了帮助保护围绕 Home Assistant 建立起来的这个出色社区。如果你有任何问题，请通过电子邮件、[Twitter][twitter] 或 [Discord][discord] 与我们联系。

[cla]: /developers/cla/
[mjg59]: https://twitter.com/mjg59
[gh-cla]: https://cla.github.com/
[license]: /developers/license/
[twitter]: https://twitter.com/home_assistant
[discord]: https://discord.gg/c5DvZ4e
