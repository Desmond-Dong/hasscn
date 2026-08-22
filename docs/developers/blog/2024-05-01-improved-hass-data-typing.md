---
author: Marc Mueller
authorURL: https://github.com/cdce8p
title: "改进 hass.data 的 typing"
---

在过去，`hass.data` 面临的挑战之一是正确分配类型信息。由于它的类型为 `dict[str, Any]`，唯一的选择是 annotation assignments 或类似 `cast` 的方式：

```py
data: MyData = hass.data[SOME_KEY]
```

这有几个缺点。不仅需要为每个赋值添加注释，而且 type checker 基本上还会假定该注释总是正确的。特别是在重构过程中，很容易遗漏某个实例，虽然 type-checking 仍然通过，但实际代码却已经损坏。

为了解决这个问题，现在可以使用两个新的 key 类型 `HassKey` 和 `HassEntryKey`。借助一点"魔法"，type checker 现在能够推断类型并确保其正确性。甚至在存储数据时也是如此。

示例可能如下所示：
```py
# <integration>/__init__.py
from homeassistant.util.hass_dict import HassKey

MY_KEY: HassKey["MyData"] = HassKey(DOMAIN)

@dataclass
class MyData:
    client: MyClient
    other_data: dict[str, Any]

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    client = MyClient(...)

    hass.data[MY_KEY] = MyData(client, {...})
    hass.data[MY_KEY] = 1  # mypy error
```

```py
# <integration>/switch.py
from . import MY_KEY

async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    data = hass.data[MY_KEY]
    reveal_type(data)  # MyData

    async_add_entities([MySwitch(data.client)])
```

按 `entry.entry_id` 将数据存储在 dict 中？通常直接将数据存储到 `ConfigEntry` 中会更好。请参见关于此的近期[博客文章](/developers/blog/2024-04-30-store-runtime-data-inside-config-entry)。如果这不是一个选项，请使用 `HassEntryKey`。

```py
# <integration>/__init__.py
from homeassistant.util.hass_dict import HassEntryKey

MY_KEY: HassEntryKey["MyData"] = HassEntryKey(DOMAIN)

async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    client = MyClient(...)

    hass.data.setdefault(MY_KEY, {})[entry.entry_id] = MyData(client, {...})
```
