---
title: Home Assistant 的安全审计
description: Home Assistant 聘请了 Cure53 进行安全审计，作为我们常规安全评估的一部分。你是安全的，我们没有发现认证绕过问题。
---

_一句话总结：作为常规安全评估的一部分，Home Assistant 完成了两次安全审计。你是安全的，我们没有发现认证绕过问题。我们修复了一些与攻击者可能诱骗用户从而接管其实例相关的问题。所有修复都已包含在 Home Assistant 2023.9（2023 年 9 月 6 日发布）以及最新的 iOS 和 Android Home Assistant 应用中。请确保你已经更新到最新版本。_

对 Home Assistant 和 Nabu Casa 来说，安全一直都非常重要。作为开源项目，任何人都可以轻松审查我们的代码——而从报告的问题来看，确实有人在这样做。不过，你同样也需要聘请专业人员来执行真正的安全审计，以确保所有重要代码都被覆盖到。

订阅 [Home Assistant Cloud](https://www.nabucasa.com/) 为 Home Assistant 的持续开发和维护提供了资金支持，其中也包括外部安全审计。为了确保我们的安全性达到最高标准，Nabu Casa 聘请了 Cure53，对 Home Assistant 的关键部分进行了安全审计。[Cure53](https://cure53.de/) 是一家知名网络安全公司，过去曾发现过 [Mastodon](https://arstechnica.com/security/2023/07/mastodon-fixes-critical-tootroot-vulnerability-allowing-node-hijacking/) 和 [Ring 产品](https://foundation.mozilla.org/en/博客/mozilla-publishes-ring-doorbell-vulnerability-following-amazons-apathy/)中的漏洞。

Cure53 在 Home Assistant 中发现了一些问题，其中 3 个被标记为“严重”级别。这些严重问题可能允许攻击者诱骗用户并窃取登录凭据。所有报告的问题都已在 2023 年 9 月 6 日发布的 Home Assistant 2023.9 中修复。我们没有发现认证绕过问题。根据 Cure53 的报告：

> 总体而言，这个代码库的质量令人印象深刻；同时，在所有相关应用领域中所采用的架构与框架，也普遍体现出了具备韧性的设计范式。尤其是在前端安全方面，仍存在充分的加固空间，这一点也因已识别出的严重相关风险而更加突出。尽管如此，一旦这些问题得到缓解，实现卓越的安全态势无疑是完全可行的。

在 8 月，[GitHub Security Lab](https://securitylab.github.com/) 也对 Home Assistant 进行了审计。他们在 Home Assistant Core 以及我们的 iOS 和 Android 应用中发现了 6 个非严重问题，其中 2 个与 Cure53 的发现重复。所有报告的问题都已经修复并发布。

我们要感谢这两个团队所做的审计、提交的问题报告，以及他们为保障用户安全所做的努力 🙏

所有发现的问题都已经添加到[我们的安全页面](/home-assistant/security)。这个页面现已更新，包含持续维护的问题时间线、披露者信息，以及对应 GitHub 问题报告的链接。

_如果你认为自己发现了安全问题，请查看[我们的安全页面](/home-assistant/security)，了解如何向 Home Assistant 报告。_
