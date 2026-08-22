---
author: Jan-Philipp Benecke
authorURL: https://github.com/jpbede
authorImageURL: https://avatars.githubusercontent.com/u/3989428?s=96&v=4
title: "弃用 @bind_hass 和 hass.components 的使用"
---

自 Home Assistant 2024.3 起，我们弃用 `@bind_hass` decorator 的使用，因此也弃用 `hass.components` 的使用。
使用 `hass.components` 会在日志中发出警告。
建议自定义集成的作者在 Home Assistant 2024.9 之前更新代码，以避免任何问题。

自 Home Assistant 2024.9 起，`@bind_hass` decorator 和 `hass.components` 将被移除，并将不再可用。

## 使用 `@bind_hass` decorator

使用 `@bind_hass` decorator 的集成应进行更新，移除该 decorator，并将 `hass` 对象作为第一个参数传递给函数：

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.components.persistent_notification import async_create

def create_notification(hass: HomeAssistant, message: str):
    """Create a notification."""
    async_create(
        hass,
        message,
        title='Important notification'
    )

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    create_notification(hass, "You're already using the latest version!")
```

### 旧示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.loader import bind_hass
from homeassistant.components.persistent_notification import async_create

@bind_hass
def create_notification(hass: HomeAssistant, message: str):
    """Create a notification."""
    async_create(
        hass,
        message,
        title='Important notification'
    )

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    create_notification("You're already using the latest version!")
```

## 使用 `hass.components`

使用 `hass.components` 的集成应进行更新，从 integration 包中直接 import 函数和类，并将 `hass` 对象作为第一个参数传递。
请记住在 `manifest.json` 的 `dependencies` 下包含所 import 的组件。

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.components.persistent_notification import async_create

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    async_create(
        hass,
        "You're already using the latest version!",
        title='Important notification'
    )
```

### 旧示例

```python
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    hass.components.persistent_notification.async_create(
        "You're already using the latest version!",
        title='Important notification'
    )
```
