Home Assistant 不仅收集数据，还将数据导出到各种服务。并非所有这些服务都对每一次变更感兴趣。为了帮助这些服务过滤不重要的变更，你的 entity 集成可以添加重要变更支持。

此支持通过创建一个包含 `async_check_significant_change` 函数的 `significant_change.py` platform 文件来实现。

```python
from typing import Any, Optional
from homeassistant.core import HomeAssistant, callback

@callback
def async_check_significant_change(
    hass: HomeAssistant,
    old_state: str,
    old_attrs: dict,
    new_state: str,
    new_attrs: dict,
    **kwargs: Any,
) -> bool | None:
```

该函数接收之前被认为是重要的 state 和新的 state。它传递的不仅仅是最近 2 个已知 state。函数应返回布尔值，表示是否重要，或者返回 `None` 表示函数无法判断。

在判断重要性时，务必考虑所有已知 attributes。使用 device classes 来区分 entity 类型。

以下是一些不重要的变更示例：

* 电池电量减少 0.1%
* 温度传感器变化 0.1 摄氏度
* 灯光亮度变化 2

Home Assistant 将自动处理 `unknown` 和 `unavailable` 等情况。

要为 entity 集成添加重要 state 支持，运行 `python3 -m script.scaffold significant_change`。
