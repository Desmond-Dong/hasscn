---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
authorImageURL: https://avatars.githubusercontent.com/u/62932417?v=4
authorTwitter: GJohansson
title: "Vacuum 新增 state 属性"
---

自 Home Assistant Core 2025.1 起，`StateVacuumEntity` 中用于返回 state 的常量已被 deprecated，并由 `VacuumActivity` enum 取代。

此外，随着这一变更，集成应设置 `activity` 属性，而不是直接设置 `state` 属性。

设有为期一年的 deprecation 期，这些常量将从 2026.1 起停止工作，以确保所有自定义集成作者都有时间进行调整。

### 示例

```python

from homeassistant.components.vacuum import VacuumActivity

class MyVacuumCleaner(StateVacuumEntity):
    """My vacuum cleaner."""

    @property
    def activity(self) -> VacuumActivity | None:
        """Return the state of the vacuum."""
        if self.device.is_cleaning():
            return VacuumActivity.CLEANING
        return VacuumActivity.DOCKED

```

更多详情请参阅 [vacuum 文档](/developers/core/entity/vacuum#states)。