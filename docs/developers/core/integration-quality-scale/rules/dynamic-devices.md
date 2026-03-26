---
title: "集成设置后添加的设备"
related_rules:
  - stale-devices
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

正如规则 [stale-devices](/developers/core/integration-quality-scale/rules/stale-devices) 中所解释的，当我们应该确定设备不再连接时，设备被自动删除。
这个规则的另一面也解释了，一旦有新设备连接，我们应该自动为该设备创建相关实体。

这使得用户体验更好，因为用户只需将设备添加到集成中，它就会自动显示在 Home Assistant 中。

## 实施示例

在下面的示例中，我们使用协调器从服务中获取所有数据。
更新 `_check_device` 都会检查是否有新设备可以创建实体并将其添加到 Home Assistant。

ZZ保护0ZZ
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

ZZ保护0ZZ
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

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>