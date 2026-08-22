---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
title: "Climate entity 的辅助加热器已弃用"
---

从 Home Assistant Core 2024.4 起，`ClimateEntity` 中的辅助加热器功能已被弃用。

当前实现了 `is_aux_heat` 属性以及 `turn_aux_heat_on`/`turn_aux_heat_off` 方法的集成需要移除这些方法和属性，并转而实现其他 entity（例如 `SwitchEntity`）来提供必要的功能；如果是只读属性，则可使用 `BinarySensorEntity`。

您可以在[这里](https://github.com/home-assistant/architecture/discussions/932)阅读有关此决定的更多信息。
