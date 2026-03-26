---
title: 集成 系统健康状况
sidebar_label: "系统健康状况"
---

系统运行状况 平台 允许 集成 提供帮助用户了解 集成 状态的信息。这可以包括端点的可用性、集成 连接到的当前服务器、仍有多少请求配额可用等详细信息。

用户可以通过转到 **设置** -> **系统** -> **修复** 并在右上角的三点菜单中选择 **系统信息** 来查找聚合的系统运行状况。

## 实施系统健康状况 平台

将 `system_health.py` 文件添加到 集成 并实现 `async_register` 方法，以注册信息回调：

```python
"""Provide info to system health."""

from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback

@callback
def async_register(hass: HomeAssistant, register: system_health.SystemHealthRegistration) -> None:
    """Register system health callbacks."""
    register.async_register_info(system_health_info)
```

信息回调应返回一个字典，其值可以是任何类型，包括协程。如果为字典条目设置了协程，则 前端 将显示等待指示器，并在协程完成并提供结果后自动更新。

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
system_health 组件提供了 `async_check_can_reach_url` 帮助器作为轻松实现检查 URL 可用性的方法。
:::


使用 `strings.json` 文件中的 `system_health` 部分翻译信息字典中的每个键，以提供良好的描述：

```json
  "system_health": {
    "info": {
      "can_reach_server": "Reach Example server",
      "remaining_requests": "Remaining allowed requests"
    }
  }
```
