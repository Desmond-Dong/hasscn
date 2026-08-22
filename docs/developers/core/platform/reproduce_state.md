---
title: "重现状态"
sidebar_label: "重现状态"
---

Home Assistant 支持 scenes。Scenes 是一组（部分）entity 状态。当 scene 被激活时，Home Assistant 将尝试调用正确的 service actions 以使指定的 scene 处于其指定的状态。

集成负责向 Home Assistant 添加支持，以便能够调用正确的 service actions 来重现 scene 中的状态。

## 添加支持

为新集成添加 reproduce state 支持的最快方法是使用我们内置的 scaffold 模板。从 Home Assistant 开发环境运行 `python3 -m script.scaffold reproduce_state` 并按照说明操作。

如果你更喜欢手动方式，请在集成文件夹中创建一个名为 `reproduce_state.py` 的新文件，并实现以下方法：

```python
import asyncio
from collections.abc import Iterable
from typing import Any
from homeassistant.core import Context, HomeAssistant, State


async def async_reproduce_states(
    hass: HomeAssistant,
    states: Iterable[State],
    *,
    context: Context | None = None,
    reproduce_options: dict[str, Any] | None = None,
) -> None:
    """Reproduce component states."""
    # TODO reproduce states
```
