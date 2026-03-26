---
title: "陈旧设备已被删除"
related_rules:
  - dynamic-devices
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

当设备从集线器或帐户中删除时，它也应该从 Home Assistant 中删除。
这样，用户界面将不会显示不再可用的设备。

我们应该只删除我们确定不再可用的设备。
如果您无法确定设备是否仍然可用，请务必实施 `async_remove_config_entry_device`。
这允许用户手动从设备注册表中删除设备。

## 实施示例

在此示例中，我们有一个从服务获取数据的协调器。
更新数据后，我们会检查是否有任何设备已被删除。
如果是这样，我们会将它们从设备注册表中删除。
这也会导致与该设备关联的所有实体被删除。

ZZ保护0ZZ
```python {13,20-30} showLineNumbers
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
        self.previous_devices: set[str] = set()

    async def _async_update_data(self) -> dict[str, MyDevice]:
        try:
            data = await self.client.get_data()
        except MyException as ex:
            raise UpdateFailed(f"The service is unavailable: {ex}")
        current_devices = set(data)
        if (stale_devices := self.previous_devices - current_devices):
            device_registry = dr.async_get(self.hass)
            for device_id in stale_devices:
                device = device_registry.async_get_device(identifiers={(DOMAIN, device_id)})
                if device:
                    device_registry.async_update_device(
                        device_id=device.id,
                        remove_config_entry_id=self.config_entry.entry_id,
                    )
        self.previous_devices = current_devices
        return data
```

为了展示第二个示例，其中有人可以手动从设备注册表中删除设备，我们在 `__init__.py` 中实现 `async_remove_config_entry_device`。
定义此函数将启用 UI 中设备页面上的删除按钮。
在此示例中，集成只能获取设备的更新，而无法获取已连接设备的完整列表，因此它无法自动删除设备。
在 `async_remove_config_entry_device` 中，我们应该实现一个函数来检查设备是否仍然可用。
如果不是，我们返回 `True` 以允许用户手动删除设备。
在这里，如果我们一段时间没有收到任何更新，我们假设该设备无法工作。

ZZ保护0ZZ
```python showLineNumbers
async def async_remove_config_entry_device(
    hass: HomeAssistant, config_entry: MyConfigEntry, device_entry: dr.DeviceEntry
) -> bool:
    """Remove a config entry from a device."""
    return not any(
        identifier
        for identifier in device_entry.identifiers
        if identifier[0] == DOMAIN
        and identifier[1] in config_entry.runtime_data.data
    )
```

## 其他资源

有关设备的更多信息，请查看[设备注册表文档](/developers/device_registry_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
