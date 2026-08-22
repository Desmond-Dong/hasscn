---
title: Integration system health
sidebar_label: "System health"
---

system health platform 允许集成为用户提供帮助了解集成状态的信息。这可以包括诸如 endpoint 的可用性、集成当前连接到的 server、还剩多少请求配额等详细信息。

用户可以通过前往 **设置** -> **系统** -> **维修**，然后在上部右侧三点菜单中选择 **系统信息** 来查看聚合的系统健康信息。

## Implementing the system health platform

向集成添加 `system_health.py` 文件，并实现 `async_register` 方法，以注册 info 回调：

```python
"""Provide info to system health."""

from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback

@callback
def async_register(hass: HomeAssistant, register: system_health.SystemHealthRegistration) -> None:
    """Register system health callbacks."""
    register.async_register_info(system_health_info)
```

info 回调应返回一个字典，其值可以是任何类型，包括 coroutine。如果字典条目设置了 coroutine，frontend 将显示等待指示器，并在 coroutine 完成并提供结果后自动更新。

```python
async def system_health_info(hass: HomeAssistant) -> dict[str, Any]:
    """Get info for the info page."""
    config_entry: ExampleConfigEntry = hass.config_entries.async_entries(DOMAIN)[0]
    quota_info = await config_entry.runtime_data.async_get_quota_info()

    return {
        "consumed_requests": quota_info.consumed_requests,
        "remaining_requests": quota_info.requests_remaining,
        # checking the url can take a while, so set the coroutine in the info dict
        "can_reach_server": system_health.async_check_can_reach_url(hass, ENDPOINT),
    }
```

:::tip
system_health 组件提供 `async_check_can_reach_url` helper 作为一种轻松实现检查 URL 可用性的方式。
:::

使用 `strings.json` 文件中的 `system_health` 部分翻译 info 字典中的每个 key，以提供良好的描述：

```json
  "system_health": {
    "info": {
      "can_reach_server": "Reach Example server",
      "remaining_requests": "Remaining allowed requests"
    }
  }
```
