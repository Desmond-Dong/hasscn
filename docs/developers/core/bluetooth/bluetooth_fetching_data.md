---
title: "获取蓝牙数据"
---

## 选择数据获取方式

如果设备主要通过 Bluetooth 广播来通知更新，且其核心功能是传感器、二进制传感器或触发事件：

- 如果所有传感器都通过 Bluetooth 广播更新：[`PassiveBluetoothProcessorCoordinator`](#passivebluetoothprocessorcoordinator)
- 如果部分传感器需要主动连接：[`ActiveBluetoothProcessorCoordinator`](#activebluetoothprocessorcoordinator)

如果设备主要通过 Bluetooth 广播来通知更新，但其核心功能**不是**传感器、二进制传感器或触发事件：

- 如果所有实体都通过 Bluetooth 广播更新：[`PassiveBluetoothCoordinator`](#passivebluetoothcoordinator)
- 如果需要主动连接：[`ActiveBluetoothDataUpdateCoordinator`](#activebluetoothcoordinator)

如果你的设备仅通过 Bluetooth 连接通信，而不使用 Bluetooth 广播：

- [`DataUpdateCoordinator`](/developers/integration_fetching_data)

## Bluetooth 处理器协调器

`ActiveBluetoothProcessorCoordinator` 和 `PassiveBluetoothProcessorCoordinator` 能显著减少为以传感器、二进制传感器或触发事件为主的集成编写初始化代码的工作量。只要把库返回的数据整理为 `PassiveBluetoothDataUpdate` 对象，框架就可以按需创建设备实体，并将 `sensor` 与 `binary_sensor` 平台实现简化到最少。

这些框架要求将来自库的数据整理成如下格式的 `PassiveBluetoothDataUpdate`：

```python
@dataclasses.dataclass(frozen=True)
class PassiveBluetoothEntityKey:
    """Key for a passive bluetooth entity.

    Example:
    key: temperature
    device_id: outdoor_sensor_1
    """

    key: str
    device_id: str | None

@dataclasses.dataclass(frozen=True)
class PassiveBluetoothDataUpdate(Generic[_T]):
    """Generic bluetooth data."""

    devices: dict[str | None, DeviceInfo] = dataclasses.field(default_factory=dict)
    entity_descriptions: Mapping[
        PassiveBluetoothEntityKey, EntityDescription
    ] = dataclasses.field(default_factory=dict)
    entity_names: Mapping[PassiveBluetoothEntityKey, str | None] = dataclasses.field(
        default_factory=dict
    )
    entity_data: Mapping[PassiveBluetoothEntityKey, _T] = dataclasses.field(
        default_factory=dict
    )
```

<a id="passivebluetoothprocessorcoordinator"></a>
### PassiveBluetoothProcessorCoordinator

下面是集成在 `__init__.py` 中使用 `PassiveBluetoothProcessorCoordinator` 的 `async_setup_entry` 示例：

```python
import logging
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.components.bluetooth import BluetoothScanningMode
from homeassistant.components.bluetooth.passive_update_processor import (
    PassiveBluetoothProcessorCoordinator,
)
from .const import DOMAIN
from homeassistant.const import Platform

PLATFORMS: list[Platform] = [Platform.SENSOR]

from your_library import DataParser

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up example BLE device from a config entry."""
    address = entry.unique_id
    data = DataParser()
    coordinator = hass.data.setdefault(DOMAIN, {})[
        entry.entry_id
    ] = PassiveBluetoothProcessorCoordinator(
        hass,
        _LOGGER,
        address=address,
        mode=BluetoothScanningMode.ACTIVE,
        update_method=data.update,
    )
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(
        # only start after all platforms have had a chance to subscribe
        coordinator.async_start()
    )
    return True
```

示例 `sensor.py`：

```python
from homeassistant import config_entries
from homeassistant.components.bluetooth.passive_update_processor import (
    PassiveBluetoothDataProcessor,
    PassiveBluetoothDataUpdate,
    PassiveBluetoothEntityKey,
    PassiveBluetoothProcessorCoordinator,
    PassiveBluetoothProcessorEntity,
)
from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import DOMAIN


def sensor_update_to_bluetooth_data_update(parsed_data):
    """Convert a sensor update to a Bluetooth data update."""
    # This function must convert the parsed_data
    # from your library's update_method to a `PassiveBluetoothDataUpdate`
    # See the structure above
    return PassiveBluetoothDataUpdate(
        devices={},
        entity_descriptions={},
        entity_data={},
        entity_names={},
    )


async def async_setup_entry(
    hass: HomeAssistant,
    entry: config_entries.ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the example BLE sensors."""
    coordinator: PassiveBluetoothProcessorCoordinator = hass.data[DOMAIN][
        entry.entry_id
    ]
    processor = PassiveBluetoothDataProcessor(sensor_update_to_bluetooth_data_update)
    entry.async_on_unload(
        processor.async_add_entities_listener(
            ExampleBluetoothSensorEntity, async_add_entities
        )
    )
    entry.async_on_unload(coordinator.async_register_processor(processor))


class ExampleBluetoothSensorEntity(PassiveBluetoothProcessorEntity, SensorEntity):
    """Representation of an example BLE sensor."""

    @property
    def native_value(self) -> float | int | str | None:
        """Return the native value."""
        return self.processor.entity_data.get(self.entity_key)

```

<a id="activebluetoothprocessorcoordinator"></a>
### ActiveBluetoothProcessorCoordinator

`ActiveBluetoothProcessorCoordinator` 的工作方式与 `PassiveBluetoothProcessorCoordinator` 基本相同，但它还会根据 `needs_poll_method` 和 `poll_method` 主动建立连接进行轮询，以便在设备的 Bluetooth 广播变化时获取额外数据。其 `sensor.py` 实现与 `PassiveBluetoothProcessorCoordinator` 相同。

下面是集成在 `__init__.py` 中使用 `ActiveBluetoothProcessorCoordinator` 的 `async_setup_entry` 示例：

```python
import logging
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import CoreState, HomeAssistant
from homeassistant.components.bluetooth import BluetoothScanningMode

from homeassistant.components.bluetooth import (
    BluetoothScanningMode,
    BluetoothServiceInfoBleak,
    async_ble_device_from_address,
)
from .const import DOMAIN
from homeassistant.const import Platform

from homeassistant.components.bluetooth.active_update_processor import (
    ActiveBluetoothProcessorCoordinator,
)
PLATFORMS: list[Platform] = [Platform.SENSOR]

from your_library import DataParser

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up example BLE device from a config entry."""
    address = entry.unique_id
    assert address is not None
    data = DataParser()

    def _needs_poll(
        service_info: BluetoothServiceInfoBleak, last_poll: float | None
    ) -> bool:
        return (
            hass.state == CoreState.running
            and data.poll_needed(service_info, last_poll)
            and bool(
                async_ble_device_from_address(
                    hass, service_info.device.address, connectable=True
                )
            )
        )

    async def _async_poll(service_info: BluetoothServiceInfoBleak):
        if service_info.connectable:
            connectable_device = service_info.device
        elif device := async_ble_device_from_address(
            hass, service_info.device.address, True
        ):
            connectable_device = device
        else:
            # We have no Bluetooth controller that is in range of
            # the device to poll it
            raise RuntimeError(
                f"No connectable device found for {service_info.device.address}"
            )
        return await data.async_poll(connectable_device)

    coordinator = hass.data.setdefault(DOMAIN, {})[
        entry.entry_id
    ] = ActiveBluetoothProcessorCoordinator(
        hass,
        _LOGGER,
        address=address,
        mode=BluetoothScanningMode.PASSIVE,
        update_method=data.update,
        needs_poll_method=_needs_poll,
        poll_method=_async_poll,
        # We will take advertisements from non-connectable devices
        # since we will trade the BLEDevice for a connectable one
        # if we need to poll it
        connectable=False,
    )
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(
        # only start after all platforms have had a chance to subscribe
        coordinator.async_start
