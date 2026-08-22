---
author: L Boué
authorURL: https://github.com/lboue
authorTwitter: lboue
title: "WaterHeaterEntityDescription 名称已更改"
---

在 Water Heater 集成中发现了一个 entity description 的命名错误，我们现在在 2025.1 版本中将 `WaterHeaterEntityEntityDescription` 重命名为 `WaterHeaterEntityDescription`。
旧的 `WaterHeaterEntityEntityDescription` 已被 deprecated，并计划在 2026.1 中移除，建议开发者改用新的 `WaterHeaterEntityDescription`。

更多详情请参阅 core PR: [#132888](https://github.com/home-assistant/core/pull/132888)。