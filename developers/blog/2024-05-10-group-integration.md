## 使用 group integration 设置 entity platform 的变更

默认情况下，`group` 集成允许将 entity 分组。如果 entity 的默认 `ON`/`OFF` state 分别为 `on` 和 `off`，则默认支持 `grouping`。但是，对于可以分组但具有替代状态的 Entity platform（例如 `cover`（`open`/`closed`）或 `person`（`home`/`not_home`）），或者意图排除的 platform（如 `sensor`），设置方式有所不同。这些 entity platform 必须在 `group.py` 模块中实现 `async_describe_on_off_states`。

在 `async_describe_on_off_states` 中，`domain` 需要是传递给 `registry` 方法 `on_off_states` 和 `exclude_domain` 的第一个参数。在使用 `registry.on_off_state` 注册替代 `ON`/`OFF` state 时，除了 `ON` states 之外，还需要传递默认的 `ON` state。

### 注册替代状态的示例

`registry.on_off_states` 的新签名：

```python
    @callback
    def on_off_states(
        self, domain: str, on_states: set[str], default_on_state:str, off_state: str
    ) -> None:
        """为当前 domain 注册 on 和 off states。"""
    ...
```

`vacuum` entity platform 的 `group.py` 示例，注册替代的 `ON`/`OFF` state。请注意，第一个 `ON` state 现在被视为默认的 `ON` state。

```python
"""描述 group states。"""

from typing import TYPE_CHECKING

from homeassistant.const import STATE_OFF, STATE_ON
from homeassistant.core import HomeAssistant, callback

if TYPE_CHECKING:
    from homeassistant.components.group import GroupIntegrationRegistry

from .const import DOMAIN, STATE_CLEANING, STATE_ERROR, STATE_RETURNING


@callback
def async_describe_on_off_states(
    hass: HomeAssistant, registry: "GroupIntegrationRegistry"
) -> None:
    """描述 group on off states。"""
    registry.on_off_states(
        DOMAIN,  # domain
        # 包含所有 group ON states 的 set
        {
            STATE_ON,
            STATE_CLEANING,
            STATE_RETURNING,
            STATE_ERROR,
        },
        STATE_ON, # 默认 group ON state
        STATE_OFF, # Group OFF state
    )
```

### 从 group entity 中排除 entity platform 的示例

`registry.exclude_domain` 的新签名：

```python
    @callback
    def exclude_domain(self, domain: str) -> None:
        """排除当前 domain。"""
        ...
```

`sensor` entity platform 的 `group.py` 示例，从 `group` entity 中排除 sensor entity。

```python
"""描述 group states。"""

from typing import TYPE_CHECKING

from homeassistant.core import HomeAssistant, callback

if TYPE_CHECKING:
    from homeassistant.components.group import GroupIntegrationRegistry

from .const import DOMAIN


@callback
def async_describe_on_off_states(
    hass: HomeAssistant, registry: "GroupIntegrationRegistry"
) -> None:
    """描述 group on off states。"""
    registry.exclude_domain(DOMAIN)
```
