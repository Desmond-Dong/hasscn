---
title: "设备 自动化"
description: '我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 介绍
---
# 设备 自动化

:::warning
我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。
:::

设备 自动化在 Home Assistant 的 Core 概念之上为用户提供了一个以 设备 为中心的层。创建自动化时，用户不再需要处理状态和事件等 Core 概念。相反，他们将能够选择 设备，然后从预定义的触发器、条件和操作列表中进行选择。

集成 可以通过公开函数来生成预定义的触发器、条件、操作并具有可以侦听触发器、检查条件并执行操作的函数来挂钩该系统。

设备 自动化不会暴露额外的功能，而是用户不必学习新概念的一种方式。 设备 自动化在幕后使用事件、状态和服务操作助手。

### 二次 设备 自动化

某些 设备 可能会暴露大量 设备 自动化。为了不让用户感到不知所措，可以将 设备 自动化标记为次要自动化。标记为次要的 设备 自动化仍将向用户显示，但可能会在其他 设备 自动化之后显示，或者可能要求用户选择“显示更多”选项或类似选项。

如果 设备 自动化通过 `entity_id` 键引用 实体，并且引用的 实体 被隐藏或者引用的 实体 的 实体 类别不是 `None`，则辅助标志将自动设置为 `True`。下面的示例显示如何将 设备 自动化标记为辅助自动化。

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
