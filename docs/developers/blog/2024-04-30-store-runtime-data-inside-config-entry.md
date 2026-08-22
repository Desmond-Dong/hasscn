---
author: Marc Mueller
authorURL: https://github.com/cdce8p
title: "在 config entry 中存储 runtime 数据"
---

集成通常需要设置和跟踪自定义数据，例如 coordinators、API 连接或代码对象。以前，这些都存储在 `hass.data` 中，这使得跟踪它们变得困难。

随着最近的更改，现在可以使用 `entry.runtime_data` 来存储这些数据。在设置 platform 时，config entry 已经可用，并且会自动清理。卸载后无需再从 `hass.data` 中删除 key。

它还更好地支持了 type-checking。`ConfigEntry` 现在是泛型的，因此可以传递数据类型。为此，请使用 `dataclass` 等类型化的数据结构。为简化注释，建议为其定义一个 type alias。

示例可能如下所示：
```py
# <integration>/__init__.py

# type alias 需要以 'ConfigEntry' 作为后缀
type MyConfigEntry = ConfigEntry[MyData]

@dataclass
class MyData:
    client: MyClient
    other_data: dict[str, Any]

async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,  # 使用 type alias 替代 ConfigEntry
) -> bool:
    client = MyClient(...)

    # 赋值 runtime_data
    entry.runtime_data = MyData(client, {...})
```

```py
# <integration>/switch.py

from . import MyConfigEntry

async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,  # 使用 type alias 替代 ConfigEntry
    async_add_entities: AddEntitiesCallback,
) -> None:
    # 从 config entry 访问 runtime data
    data = entry.runtime_data

    async_add_entities([MySwitch(data.client)])
```
