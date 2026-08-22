---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "Vacuum entity 集成更新"
---

Vacuum entity 最近发生了一些变更：
- `VacuumEntity` 基类已被 `StateVacuumEntity` 取代（由 [PR 15573](https://github.com/home-assistant/core/pull/15573) 实现，于 2018 年 8 月合并），现计划在 Home Assistant Core 2024.2.0 中移除。所有 core 集成均已更新，但自定义组件的集成作者需要更新自己的集成。[PR 95920](https://github.com/home-assistant/core/pull/95920) 是最近一个从 `VacuumEntity` 迁移到 `StateVacuumEntity` 的示例。
- `VacuumEntity` 与 `StateVacuumEntity` 所支持的服务有所不同，但文档此前表述有些模糊，导致部分集成实现了来自错误基类的服务。现在 [PR 95833](https://github.com/home-assistant/core/pull/95833) 已对此进行了限制。所有 core 集成均已更新，但自定义组件的集成作者需要更新自己的集成。
- `battery_icon` 与 `battery_level` state 属性已被弃用。集成可以通过在同一 device 上添加一个 device class 为 `battery` 的 `sensor` 来报告电池状态，详情请见架构讨论 [938](https://github.com/home-assistant/architecture/discussions/938)。
- `map` state 属性已被弃用。集成可以通过在同一 device 上添加一个 `image` entity 来提供地图图片，详情请见架构讨论 [939](https://github.com/home-assistant/architecture/discussions/939)。

更多详情，请参阅[`vacuum` 文档](/developers/core/entity/vacuum)。
