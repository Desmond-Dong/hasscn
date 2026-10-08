## 摘要

Condition 和 script APIs 已经发生变更。

Conditions 现在是 condition classes 的实例，通过调用 `async_check` 方法进行求值，通过调用 `async_unload` 方法进行丢弃。此外，conditions 可以选择性地实现 `_async_setup` 或 `_async_unload` 方法。注意，condition 的使用者无需调用 condition 的 `async_setup` 方法。

在弃用期间（以 Home Assistant Core 2027.1 的发布结束），可以像 callable 一样使用 condition 对象。

Scripts 也拥有一个 `async_unload` 方法，当不再需要脚本时必须调用它。

## 对自定义集成的影响

### 创建 conditions 或 scripts 的自定义集成

创建 condition 对象的自定义集成应通过调用 `async_check` 方法来求值，并在不再需要该 condition 时调用 `async_unload` 方法。

示例：

```python
from homeassistant.helpers.condition import (
    async_condition_from_config,
    async_validate_condition_config,
)

# 验证 condition config
validated_config = await async_validate_condition_config(hass, config)

# 创建一个 condition
condition = await async_condition_from_config(hass, validated_config)

...

# 求值 condition
result = condition.async_check(...)
...

# 丢弃 condition
condition.async_unload()
```

创建 scripts 的自定义集成应在不再需要脚本时调用 `async_unload` 方法。

示例：

```python
from homeassistant.helpers.script import (
    Script,
    async_validate_actions_config,
)

# 验证 script config
validated_config = await async_validate_actions_config(hass, config)

# 创建一个 script
script = Script(hass, validated_config, ...)

...

# 执行 script
result = await script.async_run(...)
...

# 丢弃 script
await script.async_unload()
```

### 提供 condition platform 的自定义集成

提供 condition platform 的集成无需更改，但如果 platform 需要执行 async 初始化或 teardown，可以实现 `_async_setup` 和 `_async_unload` 方法。

示例：

```python

from homeassistant.core import HomeAssistant
from homeassistant.helpers.condition import (
    Condition,
    ConditionCheckParams,
    ConditionConfig,
)
from homeassistant.helpers.typing import ConfigType

class CustomCondition(Condition):
    """A custom condition."""

    @classmethod
    async def async_validate_config(
        cls, hass: HomeAssistant, config: ConfigType
    ) -> ConfigType:
        """Validate config."""
        ...

    def __init__(self, hass: HomeAssistant, config: ConditionConfig) -> None:
        """Initialize condition."""
        super().__init__(hass, config)
        ...

    async def _async_setup(self) -> None:
        """Set up the condition checker."""
        ...

    def _async_unload(self) -> None:
        """Clean up any resources held by the checker."""
        ...

    def _async_check(self, **kwargs: Unpack[ConditionCheckParams]) -> bool:
        """Check the condition."""
        ...
```
