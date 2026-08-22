---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
authorImageURL: https://avatars.githubusercontent.com/u/62932417?v=4
authorTwitter: GJohansson
title: "弃用 Media Player 相关常量"
---

自 Home Assistant Core 2022.5 起，`MediaPlayerEntity` 中使用的 feature flag 常量已被 deprecated，并由 `MediaPlayerEntityFeature` enum 取代。随后在 2022.10 中，repeat mode、media type 和 media class 常量也被 deprecated，并分别由 `RepeatMode`、`MediaType` 和 `MediaClass` 取代。

然而，当时并没有执行正确的 deprecation 流程，因此现在在 2024.10 中我们正式开始为期一年的 deprecation 期，这些常量将从 2025.10 起停止工作，以确保所有自定义集成作者都有时间进行调整。