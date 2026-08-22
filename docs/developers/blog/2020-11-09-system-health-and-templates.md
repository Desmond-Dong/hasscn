---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: System Health 和 Templates
---

在 Home Assistant 0.118 中，将有可能会影响你的 custom integration 的两项变更。

## 移除已弃用的 `helpers.template.extract_entities`

之前已弃用的来自 Template helper 的 `extract_entities` 方法已被移除（[PR 42601](https://github.com/home-assistant/core/pull/42601)）。不要提取 entities 然后手动监听 state 变化，请改用 Event helper 中的新 `async_track_template_result`。它将动态确保每个接触到的 entity 都被正确跟踪。

```python
from homeassistant.helpers.event import async_track_template_result, TrackTemplate

template = "{{ light.kitchen.state == 'on' }}"

async_track_template_result(
    hass,
    [TrackTemplate(template, None)],
    lambda event, updates: print(event, updates),
)
```

## 改进的 System Health

从 Home Assistant 0.118 开始，我们正在弃用为 integration 提供 system health 信息的旧方式。相反，请在你的 integration 中创建一个 `system_health.py` 文件（[PR 42785](https://github.com/home-assistant/core/pull/42785)）。

从这个版本开始，你还可以包含需要较长时间才能解析的健康检查（[PR 42831](https://github.com/home-assistant/core/pull/42831)），例如检查服务是否在线。结果将在准备好时传递给前端。

```python
"""Provide info to system health."""
from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN


@callback
def async_register(
    hass: HomeAssistant, register: system_health.RegisterSystemHealth
) -> None:
    """Register system health callbacks."""
    register.async_register_info(system_health_info)


async def system_health_info(hass):
    """Get info for the info page."""
    client = hass.data[DOMAIN]

    return {
      "server_version": client.server_version,
      "can_reach_server": system_health.async_check_can_reach_url(
          hass, client.server_url
      )
    }
```