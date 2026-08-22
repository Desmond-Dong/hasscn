---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: 为 MQTT subscription 添加状态回调
---

## 为 MQTT subscription 添加状态回调

使用 MQTT 的集成可能需要等待 subscription 完成后再执行操作。默认行为是 subscription 会被排队并去抖，因此调用者通常不会等待 broker 确认。某些集成必须保证 broker 已完成 subscription。

新的 `mqtt.async_on_subscribe_done` helper 可用于监控 MQTT subscription，以允许执行额外任务。
请确保使用与 MQTT subscription 相同的 QoS。

示例：

```python
from homeassistant.components import mqtt

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Setup integration MQTT subscription monitoring."""

    def _on_subscribe_status() -> None:
        """Handle subscription ready signal."""
        # Do stuff

    # Handle subscription ready status update
    await mqtt.async_on_subscribe_done(
        hass,
        "myintegration/status",
        qos=1,
        on_subscribe_status=_on_subscribe_status,
    )

    # Do stuff
```