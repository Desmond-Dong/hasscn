---
title: "设备注册表"
---

Device registry 是 Home Assistant 用于跟踪设备的注册表。一个设备在 Home Assistant 中通过一个或多个 entity 来表示。例如，一个电池供电的温度和湿度传感器可能会暴露温度、湿度和电池电量的 entity。

<img class='invertDark'
  src='/img/en/device_registry/overview.png'
  alt='Device registry overview'
/>

## 什么是设备？

Home Assistant 中的设备代表一个拥有独立控制单元的物理设备，或者一项服务。控制单元本身不需要是智能的，但它应该掌控所发生的事情。例如，一个带有 4 个房间传感器的 Ecobee 温控器在 Home Assistant 中等于 5 个设备，其中一个是包含其内部所有传感器的温控器，另一个对应每个房间传感器。

如果你将一个传感器连接到另一个设备来读取它的一些数据，它仍然应该被表示为两个不同的设备。这样做的原因是，传感器可能被移动去读取另一个设备的数据。

一个提供多个 endpoint 的设备，可以被拆分为单独的设备，并通过 `via_device` 属性指向父设备。这样可以将不同的 endpoint 分配给建筑物中不同的 area，也便于对 entity 进行逻辑分组。典型的需要拆分为父设备和多个子设备的例子包括智能排插或多路墙壁开关。父设备将拥有表示排插或多路开关状态的 entity，例如网络连接状态和固件更新。子设备则将绑定到某一个通道的 entity 进行分组，例如每个通道一个开关 entity 和能耗 sensor。

:::info
虽然目前尚未可用，但我们可以考虑为用户提供合并设备的选项。
:::

## Device 属性

| Attribute            | Description                                                                                                                                                                                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| area_id              | 设备所在的 area。                                                                                                                                                                                                                       |
| config_entries       | 与此设备关联的 config entries。                                                                                                                                                                                                         |
| configuration_url    | 可以在其上配置设备或服务的 URL，链接到 Home Assistant UI 内部的路径可以通过使用 `homeassistant://<path>` 来完成。                                                                                                                        |
| connections          | `(connection_type, connection identifier)` 元组的集合。connection types 定义在 device registry 模块中。集合中的每一项都唯一地定义了一个设备条目，这意味着另一个设备不能拥有相同的 connection。                                            |
| default_manufacturer | 设备的制造商，如果设置了 `manufacturer` 则会被覆盖。例如，对于显示网络上所有设备的集成非常有用。                                                                                                                                        |
| default_model        | 设备的型号，如果设置了 `model` 则会被覆盖。例如，对于显示网络上所有设备的集成非常有用。                                                                                                                                                |
| default_name         | 此设备的默认名称，如果设置了 `name` 则会被覆盖。例如，对于显示网络上所有设备的集成非常有用。                                                                                                                                            |
| entry_type           | 条目的类型。可能的值为 `None` 和 `DeviceEntryType` 枚举成员（仅 `service`）。                                                                                                                                                            |
| hw_version           | 设备的硬件版本。                                                                                                                                                                                                                        |
| id                   | 设备的唯一 ID（由 Home Assistant 生成）                                                                                                                                                                                                 |
| identifiers          | `(DOMAIN, identifier)` 元组的集合。identifiers 用于在外部世界中识别设备。例如序列号。集合中的每一项都唯一地定义了一个设备条目，这意味着另一个设备不能拥有相同的 identifier。                                                             |
| name                 | 此设备的名称                                                                                                                                                                                                                            |
| name_by_user         | 用户配置的设备名称。                                                                                                                                                                                                                    |
| manufacturer         | 设备的制造商。                                                                                                                                                                                                                          |
| model                | 设备的型号名称。                                                                                                                                                                                                                        |
| model_id             | 设备的型号标识符。                                                                                                                                                                                                                      |
| serial_number        | 设备的序列号。与 `identifiers` 集合中的序列号不同，此字段不需要唯一。                                                                                                                                                                   |
| sw_version           | 设备的固件版本。                                                                                                                                                                                                                        |
| via_device           | 在此设备与 Home Assistant 之间路由消息的设备标识符。这类设备的例子包括 hub 或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。                                                                                                   |

## 定义设备

### 通过 entity 自动注册

:::tip
仅当 entity 通过 [config entry](config_entries_index.md) 加载且定义了 `unique_id` 属性时，才会读取 entity 的 device info。
:::

每个 entity 都能够通过 `device_info` 属性来定义一个设备。当 entity 通过 config entry 添加到 Home Assistant 时，会读取该属性。设备会通过提供的 identifiers 或 connections（如序列号或 MAC 地址）与现有设备进行匹配。如果同时提供了 identifiers 和 connections，device registry 会先尝试通过 identifiers 进行匹配。每个 identifier 和每个 connection 都会被单独匹配（例如，只需要匹配一个 connection 就会被视为同一个设备）。

```python
# Definition of DeviceInfo TypedDict
class DeviceInfo(TypedDict, total=False):
    """Entity device information for device registry."""

    configuration_url: str | URL | None
    connections: set[tuple[str, str]]
    created_at: str
    default_manufacturer: str
    default_model: str
    default_name: str
    entry_type: DeviceEntryType | None
    identifiers: set[tuple[str, str]]
    manufacturer: str | None
    model: str | None
    model_id: str | None
    modified_at: str
    name: str | None
    serial_number: str | None
    suggested_area: str | None
    sw_version: str | None
    hw_version: str | None
    translation_key: str | None
    translation_placeholders: Mapping[str, str] | None
    via_device: tuple[str, str]

# Inside a platform
class HueLight(LightEntity):
    @property
    def device_info(self) -> DeviceInfo:
        """Return the device info."""
        return DeviceInfo(
            identifiers={
                # Serial numbers are unique identifiers within a specific domain
                (hue.DOMAIN, self.unique_id)
            },
            name=self.name,
            manufacturer=self.light.manufacturername,
            model=self.light.productname,
            model_id=self.light.modelid,
            sw_version=self.light.swversion,
            via_device=(hue.DOMAIN, self.api.bridgeid),
        )
```

除了 device 属性之外，`device_info` 还可以包含 `default_manufacturer`、`default_model`、`default_name`。如果尚未定义其他值，这些值将被添加到 device registry 中。对于了解一些信息但不够具体的集成，这非常有用。例如，一个根据 MAC 地址识别设备的路由器。

### 手动注册

当没有实体代表某些设备时，component 也能够注册设备。例如，一个与灯具通信的 hub。

```python
# Definition of DeviceRegistry.async_get_or_create:
class DeviceRegistry(BaseRegistry[dict[str, list[dict[str, Any]]]]):
    ...

    @callback
    def async_get_or_create(
        self,
        *,
        config_entry_id: str,
        config_subentry_id: str | None | UndefinedType = UNDEFINED,
        configuration_url: str | URL | None | UndefinedType = UNDEFINED,
        connections: set[tuple[str, str]] | None | UndefinedType = UNDEFINED,
        created_at: str | datetime | UndefinedType = UNDEFINED,  # will be ignored
        default_manufacturer: str | None | UndefinedType = UNDEFINED,
        default_model: str | None | UndefinedType = UNDEFINED,
        default_name: str | None | UndefinedType = UNDEFINED,
        # To disable a device if it gets created
        disabled_by: DeviceEntryDisabler | None | UndefinedType = UNDEFINED,
        entry_type: DeviceEntryType | None | UndefinedType = UNDEFINED,
        hw_version: str | None | UndefinedType = UNDEFINED,
        identifiers: set[tuple[str, str]] | None | UndefinedType = UNDEFINED,
        manufacturer: str | None | UndefinedType = UNDEFINED,
        model: str | None | UndefinedType = UNDEFINED,
        model_id: str | None | UndefinedType = UNDEFINED,
        modified_at: str | datetime | UndefinedType = UNDEFINED,  # will be ignored
        name: str | None | UndefinedType = UNDEFINED,
        serial_number: str | None | UndefinedType = UNDEFINED,
        suggested_area: str | None | UndefinedType = UNDEFINED,
        sw_version: str | None | UndefinedType = UNDEFINED,
        translation_key: str | None = None,
        translation_placeholders: Mapping[str, str] | None = None,
        via_device: tuple[str, str] | None | UndefinedType = UNDEFINED,
    ) -> DeviceEntry:
        ...

# Inside a component
from homeassistant.helpers import device_registry as dr

device_registry = dr.async_get(hass)

device_registry.async_get_or_create(
    config_entry_id=entry.entry_id,
    connections={(dr.CONNECTION_NETWORK_MAC, config.mac)},
    identifiers={(DOMAIN, config.bridgeid)},
    manufacturer="Signify",
    suggested_area="Kitchen",
    name=config.name,
    model=config.modelname,
    model_id=config.modelid,
    sw_version=config.swversion,
    hw_version=config.hwversion,
)
```

## 删除设备

集成可以选择允许用户从 UI 中删除设备。为此，集成应在其 `__init__.py` 模块中实现函数 `async_remove_config_entry_device`。

```py
async def async_remove_config_entry_device(
    hass: HomeAssistant, config_entry: ConfigEntry, device_entry: DeviceEntry
) -> bool:
    """Remove a config entry from a device."""
```

当用户点击设备的删除按钮并确认时，会等待 `async_remove_config_entry_device` 执行，如果返回 `True`，config entry 将从该设备中移除。如果它是该设备唯一的 config entry，设备将从 device registry 中删除。

在 `async_remove_config_entry_device` 中，集成应采取必要的步骤为设备移除做准备，并在成功时返回 `True`。集成也可以根据 `EVENT_DEVICE_REGISTRY_UPDATED` 进行操作（如果这比在 `async_remove_config_entry_device` 中清理更方便的话）。
