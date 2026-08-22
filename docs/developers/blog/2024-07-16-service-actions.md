---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorImageURL: /img/profile/frenck.png
authorTwitter: frenck
title: Services 现在称为 Actions
---

"Services" 一词让许多用户感到困惑，因为它并不能立即明确指代什么；它可能是 web 或 STT service，但在 Home Assistant 的上下文中，它意味着完全不同的东西（service calls）。

在 Home Assistant 2024.8 中，"Services"（即 service calls）将被重命名为"Actions"。此更改是我们持续努力使 Home Assistant 更用户友好、更容易让新用户理解的一部分。该术语与我们在过去几个月一直实施的 UI 更改相符（在我们的 automations 和 script 编辑器中不再存在 call services）。实际上，用户在自己的 automations 中执行的是 actions。

此更改将反映在 Home Assistant UI、文档以及使用"Services"一词的其他地方。例如，Developer Tools 中的 **"Services"** 选项卡将重命名为 **"Actions"**。

对于开发者而言，无需担心此变更。在开发者文档中，我们将把所有对"services"的引用更新为"service actions"，因为我们在后端有不同种类的 actions（例如 device actions）。底层功能将保持不变，过渡是无缝的。

这只是一个术语变更，就像面向终端用户的变更一样。
