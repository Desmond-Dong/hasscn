### 变更摘要

Core config 类的定义——其实例可通过 [`hass.config`](https://developers.home-assistant.io/docs/dev_101_hass/#the-hass-object) 访问——已从 `homeassistant/core.py` 移至 `homeassistant/core_config.py`。迁移是为了让 core 代码更容易阅读和理解。当前从 `homeassistant.core` 导入 `Config` 的自定义集成需要更新为从 `homeassistant.core_config` 导入。

:::info
通常集成不需要使用 core `Config` 类。但有些自定义集成的类型注解有误，将传入集成 `async_setup` 的 `config` 对象标注为了 `Config` 实例：

```py
from homeassistant.core import Config

async def async_setup(hass: HomeAssistant, config: Config) -> bool:
    """Set up the integration."""
```

正确的类型注解应该是这样：

```py
from homeassistant.helpers.typing import ConfigType

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration."""
```

:::

### 向后兼容性

直到 Home Assistant Core 2025.11，仍可从 `homeassistant.core` 导入，但这样做会记录一条警告，提示用户在该自定义集成的 bug tracker 上提 issue。
