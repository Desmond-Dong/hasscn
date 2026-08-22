---
title: "集成设置后添加的设备"
sidebar_label: 🥇 dynamic-devices
related_rules:
  - stale-devices
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

正如规则 [stale-devices](/developers/core/integration-quality-scale/rules/stale-devices) 所解释的，当我们可以确定设备不再连接时，设备应被自动移除。
本规则解释的是另一面：一旦新设备连接，我们应该自动为该设备创建相应的 entity。

这能改善用户体验，因为用户只需将设备添加到集成中，它就会自动出现在 Home Assistant 中。

## 示例实现

在下面的示例中，我们使用 coordinator 从服务获取所有数据。
每次更新时，`_check_device` 都会检查是否有需要创建 entity 的新设备，并将它们添加到 Home Assistant。

`coordinator.py`
```python showLineNumbers
class MyCoordinator(DataUpdateCoordinator[dict[str, MyDevice]]):
    """Class to manage fetching data."""

    def __init__(self, hass: HomeAssistant, client: MyClient) -> None:
        """Initialize coordinator."""
        super().__init__(
            hass,
            logger=LOGGER,
            name=DOMAIN,
            update_interval=timedelta(minutes=1),
        )
        self.client = client

    async def _async_update_data(self) -> dict[str, MyDevice]:
        try:
            return await self.client.get_data()
        except MyException as ex:
            raise UpdateFailed(f"The service is unavailable: {ex}")
```

`sensor.py`
```python {9,11-16,18-21} showLineNumbers
async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up My integration from a config entry."""
    coordinator = entry.runtime_data

    known_devices: set[str] = set()

    def _check_device() -> None:
        current_devices = set(coordinator.data)
        new_devices = current_devices - known_devices
        if new_devices:
            known_devices.update(new_devices)
            async_add_entities([MySensor(coordinator, device_id) for device_id in new_devices])

    _check_device()
    entry.async_on_unload(
        coordinator.async_add_listener(_check_device)
    )
```

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
