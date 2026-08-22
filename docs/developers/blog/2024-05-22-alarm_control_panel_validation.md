---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
title: Alarm Control Panel entity 的 code 验证
---

`AlarmControlPanelEntity` 现在强制要求对 alarm control panel entity 的 code 进行验证，这些 entity 将 `code_arm_required` 设置为 `True`（默认行为）。当需要 code 但未提供 code 时，service calls 将失败。

以前这完全是可选的，用户无论集成是否需要，都可以跳过 code 输入（因此每个集成需要实现自己的检查）。

由于默认行为是需要 code，因此不需要 code 输入的自定义集成需要将 `code_arm_required` 设置为 `False`，否则用户将始终需要输入 code，无论 service calls 是否需要它。
