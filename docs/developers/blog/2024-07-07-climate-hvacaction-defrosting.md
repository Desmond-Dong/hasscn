---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
title: "新的 HVACAction DEFROSTING"
---

`ClimateEntity` 有一个 `hvac_action` 属性，它描述了 climate entity 当前正在做什么（这与它的 mode 不同）。

我们添加了 `DEFROSTING` 作为 `HVACAction` 的一种可能值，用于表示 entity 当前正在除霜。

除霜是指系统反向运行一段时间以融化积聚的冰块。它通常发生在较冷的环境中，不应与例如通过加热车窗来除霜的汽车混淆。

```python
from homeassistant.components.climate.const import HVACAction

class MyClimateEntity(ClimateEntity):
    """我的 climate entity 的实现。"""

    def hvac_action(self) -> HVACAction | None:
        """如果支持，返回当前正在运行的 hvac 操作。"""
        return HVACAction.DEFROSTING

```

更多详情请参阅 [climate entity 文档](/developers/core/entity/climate#hvac-action)。

原始更改的背景在 [architecture discussion #1090](https://github.com/home-assistant/architecture/discussions/1090) 中。
