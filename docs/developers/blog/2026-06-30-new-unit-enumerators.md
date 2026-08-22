---
author: epenet
authorURL: https://github.com/epenet
title: "引入新的 unit enumerators"
---

从 Home Assistant Core 2026.7 开始，以下 unit 常量已被弃用，并由相应的 enum 替代：

  - `UnitOfDensity` enumerator 替代了质量除以体积的 `CONCENTRATION_***` 常量
    （`"g/m³"`、`"mg/m³"`、`"μg/m³"`、`"μg/ft³"`）
  - `UnitOfRatio` enumerator 替代了无单位的比率 `CONCENTRATION_***` 常量
    （`"ppm"`、`"ppb"`）

`CONCENTRATION_PARTS_PER_CUBIC_METER` 仅被单个集成使用，已弃用且没有替代 unit。

请注意，将 `PERCENTAGE` 常量用作测量单位时也已弃用，即使常量本身并未弃用。
