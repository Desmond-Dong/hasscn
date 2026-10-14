从 Home Assistant 2024.5 起，我们弃用 `hass.helpers` 的使用。
使用 `hass.helpers` 将在日志中发出警告。
建议自定义集成的作者在 Home Assistant 2024.11 之前更新代码，以防止出现问题。

从 Home Assistant 2024.11 起，`hass.helpers` 将被移除，并且不再可用。

使用 `hass.helpers` 的集成应更新为直接从集成包中导入函数和类，并将 `hass` 对象作为第一个参数传入。

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

async def async_setup(hass: HomeAssistant, config):
    """设置组件。"""
    client = async_get_clientsession(hass)
```

### 旧示例

```python
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config):
    """设置组件。"""
    client = hass.helpers.aiohttp_client.async_get_clientsession()
```
