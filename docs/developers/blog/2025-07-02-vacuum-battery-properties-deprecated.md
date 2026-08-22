---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
authorImageURL: https://avatars.githubusercontent.com/u/62932417?v=4
authorTwitter: GJohansson
title: "Vacuum 电池属性已弃用"
---

自 Home Assistant Core 2025.8 起，`StateVacuumEntity` 中的两个电池属性 `battery_level` 和 `battery_icon` 已被弃用。

`battery_level` 和 `battery_icon` 属性应替换为一个独立的 sensor，使用该 sensor 的 `battery` device class，如果不需要 battery sensor device class 的默认图标，还可选择自定义图标。如果有需要，也可考虑提供一个 `charging` device class 的 binary sensor，以指示是否正在充电。

弃用期为一年，从 2026.8 起这两个电池属性将停止工作，以确保所有自定义集成作者有足够时间进行调整。

更多详情请参阅[架构决策](https://github.com/home-assistant/architecture/discussions/938)。