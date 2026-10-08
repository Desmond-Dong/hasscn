从 recording 中排除 state attribute 的方式在 2023 年 9 月之前已经更改过。

之前的实现存在局限性，因为没有方法可以处理动态 attribute，也没有简单的方法来简单地排除所有 attribute，而不是逐一列出它们。

现在可以在集成中使用 `MATCH_ALL` 常量来告诉 recording 不要记录任何 attribute，这将自动从 recording 中移除所有 attribute，但 `device_class`、`state_class`、`unit_of_measurement` 和 `friendly_name` 除外。

```python
from homeassistant.const import MATCH_ALL

class ExampleEntity(Entity):
    """一个 entity 的实现。"""

    _unrecorded_attributes = frozenset({MATCH_ALL})

```

更多详情请参阅 [entity 文档](/developers/core/entity.md#excluding-state-attributes-from-recorder-history)。

原始更改的背景在 [architecture discussion #964](https://github.com/home-assistant/architecture/discussions/964) 中。
