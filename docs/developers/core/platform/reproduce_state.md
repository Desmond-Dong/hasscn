---
title: "重现状态"
---

Home Assistant 支持场景。场景是一组（部分）实体状态。当场景被激活时，Home Assistant 会尝试调用正确的服务操作，使这些实体进入场景中指定的状态。

集成负责为 Home Assistant 提供支持，以便能够调用正确的服务操作来重现场景中的状态。

## 添加支持

为新集成添加重现状态支持的最快方式，是使用内置脚手架模板。在 Home Assistant 开发环境中，运行 `python3 -m script.scaffold reproduce_state` 并按照提示操作。

如果你更希望手动完成，请在集成目录中创建一个名为 `reproduce_state.py` 的新文件，并实现以下方法：

```python
import asyncio
from typing import Iterable, Optional
from homeassistant.core import Context, HomeAssistant, State


async def async_reproduce_states(
    hass: HomeAssistant, states: Iterable[State], context: Optional[Context] = None
) -> None:
    """Reproduce component states."""
    # TODO reproduce states
```
