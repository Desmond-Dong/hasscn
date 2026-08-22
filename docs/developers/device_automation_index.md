---
title: "设备自动化"
sidebar_label: 介绍
---

:::warning
我们目前正在探索 device automations 的替代方案。现有的 device automations 将继续工作，但新的 device automations 将不再被接受。
:::

Device Automations 在 Home Assistant 的核心概念之上为用户提供了以设备为中心的抽象层。在创建自动化时，用户不再需要直接处理 state 和 event 等核心概念。相反，他们可以选择一个设备，然后从预定义的 trigger、condition 和 action 列表中进行选择。

集成可以通过暴露生成预定义 trigger、condition、action 的函数，以及能够监听 trigger、检查 condition 并执行 action 的函数来接入该系统。

Device automations 并未提供额外的功能，而是让用户无需学习新概念的一种方式。Device automations 在底层使用了 event、state 和 service action 的辅助工具。

### 次要设备自动化

某些设备可能会暴露大量的 device automation。为了避免给用户带来过多负担，可以将某个 device automation 标记为 secondary。被标记为 secondary 的 device automation 仍然会展示给用户，但可能会在其他 device automation 之后展示，或者要求用户选择"显示更多"选项或类似操作。

如果 device automation 通过 `entity_id` 键引用了一个实体，那么当被引用的实体被隐藏时，或者当被引用实体的 entity category 不是 `None` 时，secondary 标志将自动设置为 `True`。下面的示例展示了如何将 device automation 标记为 secondary。

```python
from homeassistant.const import (
    CONF_DEVICE_ID,
    CONF_DOMAIN,
    CONF_PLATFORM,
    CONF_TYPE,
)
from homeassistant.helpers import device_registry as dr

async def async_get_triggers(hass, device_id):
    """Return a list of triggers."""

    device_registry = dr.async_get(hass)
    device = device_registry.async_get(device_id)

    triggers = []

    # Determine which triggers are supported by this device_id ...

    triggers.append({
        # Required fields of TRIGGER_BASE_SCHEMA
        CONF_PLATFORM: "device",
        CONF_DOMAIN: "mydomain",
        CONF_DEVICE_ID: device_id,
        # Required fields of TRIGGER_SCHEMA
        CONF_TYPE: "less_important_trigger",
        # Mark the trigger as secondary
        "metadata": {"secondary": True},
    })

    return triggers
```
