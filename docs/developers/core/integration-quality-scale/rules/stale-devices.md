---
title: "移除失效设备"
sidebar_label: 🥇 stale-devices
related_rules:
  - dynamic-devices
---
import RelatedRules from './_includes/related_rules.jsx'

## 原因

当设备从 hub 或账户中移除时，也应从 Home Assistant 中移除。
这样，用户界面就不会再显示已不可用的设备。

我们只应移除那些确定已不可用的设备。
如果无法确定设备是否仍可用，请务必实现 `async_remove_config_entry_device`。
这将允许用户手动从 device registry 中删除设备。

## 示例实现

在此示例中，我们有一个从服务获取数据的 coordinator。
当数据更新时，我们会检查是否有设备被移除。
如果有，我们会将它们从 device registry 中移除。
同时也会导致与该设备关联的所有实体被移除。

`coordinator.py`
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

为了展示一个用户可以手动从 device registry 中删除设备的示例，我们在 `__init__.py` 中实现 `async_remove_config_entry_device`。
定义此函数将在 UI 的设备页面上启用删除按钮。
在此示例中，集成只能获取设备的更新，而无法获取已连接设备的完整列表，因此无法自动删除设备。
在 `async_remove_config_entry_device` 中，我们应该实现一个函数来检查设备是否仍然可用。
如果不可用，我们返回 `True` 以允许用户手动删除设备。
此处，如果一段时间内没有收到设备的任何更新，则假设设备已无法工作。

`__init__.py`
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

## 更多资源

关于设备的更多信息，请查阅[device registry 文档](/developers/device_registry_index)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
