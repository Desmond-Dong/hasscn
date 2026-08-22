---
title: "获取 Bluetooth 数据"
sidebar_label: "获取 Bluetooth 数据"
---

## 选择获取数据的方法

如果设备通知更新的主要方式是 Bluetooth advertisements，且其主要功能是 sensor、binary sensor 或触发事件：

- 如果所有 sensors 都通过 Bluetooth advertisements 更新：[`PassiveBluetoothProcessorCoordinator`](#passivebluetoothprocessorcoordinator)
- 如果某些 sensors 需要 active connection：[`ActiveBluetoothProcessorCoordinator`](#activebluetoothprocessorcoordinator)

如果设备通知更新的主要方式是 Bluetooth advertisements，且其主要功能**不是** sensor、binary sensor 或触发事件：

- 如果所有 entities 都通过 Bluetooth advertisements 更新：[`PassiveBluetoothCoordinator`](#passivebluetoothcoordinator)
- 如果需要 active connections：[`ActiveBluetoothDataUpdateCoordinator`](#activebluetoothcoordinator)

如果你的设备仅通过 active Bluetooth connection 通信而不使用 Bluetooth advertisements：

- [`DataUpdateCoordinator`](/developers/integration_fetching_data)

## BluetoothProcessorCoordinator

`ActiveBluetoothProcessorCoordinator` 和 `PassiveBluetoothProcessorCoordinator` 大幅减少了创建主要功能为 sensor、binary sensors 或触发事件的集成所需的代码。通过将传入 processor coordinators 的数据格式化为 `PassiveBluetoothDataUpdate` 对象，框架可以负责按需创建 entities，并允许使用最小的 `sensor` 和 `binary_sensor` platform 实现。

这些框架要求来自 library 的数据被格式化为 `PassiveBluetoothDataUpdate`，如下所示：

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

### PassiveBluetoothProcessorCoordinator

使用 `PassiveBluetoothProcessorCoordinator` 的集成 `__init__.py` 的 `async_setup_entry` 示例：

```python
import logging
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.components.bluetooth import BluetoothScanningMode
from homeassistant.components.bluetooth.passive_update_processor import (
    PassiveBluetoothProcessorCoordinator,
)
from homeassistant.const import Platform

PLATFORMS: list[Platform] = [Platform.SENSOR]

from your_library import DataParser

_LOGGER = logging.getLogger(__name__)

type ExampleConfigEntry = ConfigEntry[PassiveBluetoothProcessorCoordinator]


async def async_setup_entry(hass: HomeAssistant, entry: ExampleConfigEntry) -> bool:
    """Set up example BLE device from a config entry."""
    address = entry.unique_id
    data = DataParser()
    coordinator = PassiveBluetoothProcessorCoordinator(
        hass,
        _LOGGER,
        address=address,
        mode=BluetoothScanningMode.ACTIVE,
        update_method=data.update,
    )
    entry.runtime_data = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(
        # 仅在所有 platforms 都有机会订阅后才开始
        coordinator.async_start()
    )
    return True
```

`sensor.py` 示例：

```python
from homeassistant.components.bluetooth.passive_update_processor import (
    PassiveBluetoothDataProcessor,
    PassiveBluetoothDataUpdate,
    PassiveBluetoothEntityKey,
    PassiveBluetoothProcessorEntity,
)
from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import ExampleConfigEntry


def sensor_update_to_bluetooth_data_update(parsed_data):
    """Convert a sensor update to a Bluetooth data update."""
    # 此函数必须将 parsed_data
    # 从 library 的 update_method 转换为 `PassiveBluetoothDataUpdate`
    # 参见上面的结构
    return PassiveBluetoothDataUpdate(
        devices={},
        entity_descriptions={},
        entity_data={},
        entity_names={},
    )


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ExampleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the example BLE sensors."""
    coordinator = entry.runtime_data
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

### ActiveBluetoothProcessorCoordinator

`ActiveBluetoothProcessorCoordinator` 的功能与 `PassiveBluetoothProcessorCoordinator` 几乎相同，
但还会基于 `needs_poll_method` 和 `poll_method`
函数在设备的 Bluetooth advertisement 更改时建立 active connection 来轮询数据。`sensor.py` 的实现
与 `PassiveBluetoothProcessorCoordinator` 相同。

使用 `ActiveBluetoothProcessorCoordinator` 的集成 `__init__.py` 的 `async_setup_entry` 示例：

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
from homeassistant.const import Platform

from homeassistant.components.bluetooth.active_update_processor import (
    ActiveBluetoothProcessorCoordinator,
)
PLATFORMS: list[Platform] = [Platform.SENSOR]

from your_library import DataParser

_LOGGER = logging.getLogger(__name__)

type ExampleConfigEntry = ConfigEntry[ActiveBluetoothProcessorCoordinator]


async def async_setup_entry(hass: HomeAssistant, entry: ExampleConfigEntry) -> bool:
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
            # 我们没有可用于轮询该设备的 Bluetooth controller
            raise RuntimeError(
                f"No connectable device found for {service_info.device.address}"
            )
        return await data.async_poll(connectable_device)

    coordinator = ActiveBluetoothProcessorCoordinator(
        hass,
        _LOGGER,
        address=address,
        mode=BluetoothScanningMode.PASSIVE,
        update_method=data.update,
        needs_poll_method=_needs_poll,
        poll_method=_async_poll,
        # 我们将使用来自 non-connectable 设备的 advertisements，
        # 因为如果需要轮询它们，我们会用 BLEDevice 换取 connectable 的一个
        connectable=False,
    )
    entry.runtime_data = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(
        # 仅在所有 platforms 都有机会订阅后才开始
        coordinator.async_start()
    )
    return True
```

#### 请求 active 扫描节奏

`PassiveBluetoothProcessorCoordinator` 和 `ActiveBluetoothProcessorCoordinator` 接受两个可选的关键字参数 `scan_interval` 和 `scan_duration`，当 coordinator 启动时它们会被转发给 Bluetooth manager。它们请求任何 `AUTO` 模式 scanner 为该 coordinator 的 address 提供周期性 active scan window，以便设备持续发出包含完整 payload 的 advertisements，而无需永久将 scanner 切换为 `ACTIVE` 模式。

这对于在某些时间未被 actively scanned 后会回退到 connectable poll 的设备很有用；选择一个短于该回退时间的 `scan_interval` 和一个足够长的 `scan_duration` 以捕获下一个 advertisement。

```python
coordinator = ActiveBluetoothProcessorCoordinator(
    hass,
    _LOGGER,
    address=address,
    mode=BluetoothScanningMode.PASSIVE,
    update_method=data.update,
    needs_poll_method=_needs_poll,
    poll_method=_async_poll,
    connectable=False,
    # 请求 AUTO 模式的 scanners 每 165 秒为 ACTIVE 翻转 10 秒
    scan_interval=165.0,
    scan_duration=10.0,
)
```

两个参数都默认为 `None`，让底层调度器保持其内置 cadence。`PASSIVE` 和 `ACTIVE` scanners 是用户明确的选择，不受影响；只有 `AUTO` 模式的 scanners 会遵循该请求。

## BluetoothCoordinator

`ActiveBluetoothDataUpdateCoordinator` 和 `PassiveBluetoothCoordinator` coordinators 的功能类似于
`DataUpdateCoordinators`，只是它们由传入的 advertisement 数据驱动，而不是轮询。

:::note
`_async_handle_unavailable` 回调依赖于 Bluetooth 栈检测到设备已停止广播。在 macOS 上，CoreBluetooth 会缓存 advertisement 数据，可能不会将设备消失暴露给应用层，因此即使设备已停止广播，`_async_handle_unavailable` 也可能永远不会触发。
:::

### PassiveBluetoothCoordinator

以下是一个 `PassiveBluetoothDataUpdateCoordinator` 的示例。传入的数据通过 `_async_handle_bluetooth_event` 接收，并由集成的 library 处理。

```python
import logging
from typing import TYPE_CHECKING

from homeassistant.components import bluetooth
from homeassistant.components.bluetooth.active_update_coordinator import (
    PassiveBluetoothDataUpdateCoordinator,
)
from homeassistant.core import CoreState, HomeAssistant, callback

if TYPE_CHECKING:
    from bleak.backends.device import BLEDevice


class ExamplePassiveBluetoothDataUpdateCoordinator(
    PassiveBluetoothDataUpdateCoordinator[None]
):
    """Class to manage fetching example data."""

    def __init__(
        self,
        hass: HomeAssistant,
        logger: logging.Logger,
        ble_device: BLEDevice,
        device: YourLibDevice,
    ) -> None:
        """Initialize example data coordinator."""
        super().__init__(
            hass=hass,
            logger=logger,
            address=ble_device.address,
            mode=bluetooth.BluetoothScanningMode.ACTIVE,
            connectable=False,
        )
        self.device = device

    @callback
    def _async_handle_unavailable(
        self, service_info: bluetooth.BluetoothServiceInfoBleak
    ) -> None:
        """Handle the device going unavailable."""

    @callback
    def _async_handle_bluetooth_event(
        self,
        service_info: bluetooth.BluetoothServiceInfoBleak,
        change: bluetooth.BluetoothChange,
    ) -> None:
        """Handle a Bluetooth event."""
        # 你的设备应处理传入的 advertisement 数据

```

<a id="activebluetoothcoordinator"></a>
### ActiveBluetoothDataUpdateCoordinator

以下是一个 `ActiveBluetoothDataUpdateCoordinator` 的示例。传入的数据通过 `_async_handle_bluetooth_event` 接收，并由集成的 library 处理。

传递给 `needs_poll_method` 的方法在每次 Bluetooth advertisement 更改时被调用，以确定是否应调用传递给 `poll_method` 的方法来与设备建立 active connection 以获取额外数据。

```python
import logging
from typing import TYPE_CHECKING

from homeassistant.components import bluetooth
from homeassistant.components.bluetooth.active_update_coordinator import (
    ActiveBluetoothDataUpdateCoordinator,
)
from homeassistant.core import CoreState, HomeAssistant, callback

if TYPE_CHECKING:
    from bleak.backends.device import BLEDevice


class ExampleActiveBluetoothDataUpdateCoordinator(
    ActiveBluetoothDataUpdateCoordinator[None]
):
    """Class to manage fetching example data."""

    def __init__(
        self,
        hass: HomeAssistant,
        logger: logging.Logger,
        ble_device: BLEDevice,
        device: YourLibDevice,
    ) -> None:
        """Initialize example data coordinator."""
        super().__init__(
            hass=hass,
            logger=logger,
            address=ble_device.address,
            needs_poll_method=self._needs_poll,
            poll_method=self._async_update,
            mode=bluetooth.BluetoothScanningMode.ACTIVE,
            connectable=True,
        )
        self.device = device

    @callback
    def _needs_poll(
        self,
        service_info: bluetooth.BluetoothServiceInfoBleak,
        seconds_since_last_poll: float | None,
    ) -> bool:
        # 仅在 hass 正在运行、需要轮询、
        # 并且我们实际有办法连接到设备时才轮询
        return (
            self.hass.state == CoreState.running
            and self.device.poll_needed(seconds_since_last_poll)
            and bool(
                bluetooth.async_ble_device_from_address(
                    self.hass, service_info.device.address, connectable=True
                )
            )
        )

    async def _async_update(
        self, service_info: bluetooth.BluetoothServiceInfoBleak
    ) -> None:
        """Poll the device."""

    @callback
    def _async_handle_unavailable(
        self, service_info: bluetooth.BluetoothServiceInfoBleak
    ) -> None:
        """Handle the device going unavailable."""

    @callback
    def _async_handle_bluetooth_event(
        self,
        service_info: bluetooth.BluetoothServiceInfoBleak,
        change: bluetooth.BluetoothChange,
    ) -> None:
        """Handle a Bluetooth event."""
        # 你的设备应处理传入的 advertisement 数据

```
