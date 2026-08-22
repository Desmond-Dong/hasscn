---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "显示 sensor state 时使用的小数位数现在可配置"
---

显示 sensor state 时展示的小数位数现在可由用户配置。集成可以通过设置 `suggested_display_precision` 属性来建议
小数位数。鼓励集成移除 display rounding，改为设置 `suggested_display_precision` 属性。

Presentation rounding 由 frontend 完成，同时也由 [core PR #87619](https://github.com/home-assistant/core/pull/87619) 中引入的新 template 函数完成。

显示的小数位数受单位转换影响：
  - 从小单位转换到大单位会增加 display precision
  - 从大单位转换到小单位会减小 display precision（前提是集成已设置 `suggested_display_precision`）
  - 从大单位转换到小单位时的最小 precision 为 0，即不会 round 到十位、百位等

如果用户自行设置了 display precision，则显示的小数位数不受单位转换影响。

注意：
类似的概念（即对 sensor state 进行 rounding）已在[较早的博客文章](/developers/blog/2023-01-25-sensor_rounding)中详细介绍，但该变更已被回退。