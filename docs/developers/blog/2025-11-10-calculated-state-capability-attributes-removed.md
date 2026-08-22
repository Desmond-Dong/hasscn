---
author: Artur Pragacz
authorURL: https://github.com/arturpragacz
title: "CalculatedState 中的 capability_attributes 字段已移除"
---

`capability_attributes` 字段已从 `CalculatedState` 中移除。Capability attributes 仍然包含在所有 attributes 中，这些 attributes 在 `CalculatedState` 中仍然可用。

`CalculatedState` 是包含 state 和 attributes 的容器，由 `Entity._async_calculate_state` 返回。

更多详情请参阅 [core PR 151672](https://github.com/home-assistant/core/pull/151672)。