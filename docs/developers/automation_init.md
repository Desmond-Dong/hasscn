---
title: "设备自动化"
sidebar_label: 简介
---

:::warning
我们目前正在探索设备自动化的替代方案。现有的设备自动化将继续工作，但不会接受新的设备自动化。
:::

设备自动化（Device Automations）在 Home Assistant 的核心概念之上，为用户提供了一层以设备为中心的抽象。在创建自动化时，用户不再需要处理诸如状态（states）和事件（events）等核心概念。相反，他们将能够选择一个设备，然后从预定义的触发器（triggers）、条件（conditions）和动作（actions）列表中进行选择。

集成可以通过暴露函数来生成预定义的触发器、条件、动作，并拥有能够监听触发器、检查条件以及执行动作的函数，来接入该系统。

设备自动化并没有暴露额外的功能，而是让用户无需学习新概念的一种方式。设备自动化在底层使用了事件、状态和服务动作（service action）辅助工具。

### 次要设备自动化

某些设备可能会暴露大量的设备自动化。为了避免给用户造成困扰，可以将某个设备自动化标记为次要（secondary）。被标记为次要的设备自动化仍然会向用户显示，但可能会在其他设备自动化之后显示，或者可能需要用户选择"显示更多"（show more）选项或类似选项。

如果设备自动化通过 `entity_id` 键引用了某个实体，则当被引用的实体被隐藏，或被引用实体的 entity category 不是 `None` 时，次要标志会自动设置为 `True`。下面的示例展示了如何将设备自动化标记为次要。

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
