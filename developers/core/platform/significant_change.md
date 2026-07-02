# 重大变化

Home Assistant 不仅会收集数据，还会将数据导出到各种服务。但并非所有服务都关心每一次状态变化。为了帮助这些服务过滤无关紧要的变更，你的实体集成可以添加“重大变化”支持。

要添加此支持，请创建 `significant_change.py` 平台文件，并实现 `async_check_significant_change` 函数。

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

该函数接收上一次被认定为“重大变化”的状态，以及当前的新状态。它并不一定总是接收最近的两个已知状态。如果函数能够判断变化是否重大，应返回布尔值；如果无法判断，则应返回 `None`。

在判断变化是否重大时，请确保考虑所有已知属性。可使用设备类来区分不同的实体类型。

以下是一些不应视为重大变化的示例：

* 电池电量下降 0.1%
* 温度传感器变化 0.1 摄氏度
* 灯的亮度变化 2

Home Assistant 将自动处理 `unknown` 和 `unavailable` 等情况。

要为实体集成添加重大变化支持，请运行 `python3 -m script.scaffold significant_change`。
