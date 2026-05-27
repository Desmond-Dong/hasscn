# 设备注册表

设备注册表是 Home Assistant 用于跟踪设备的注册表。一个设备会通过一个或多个实体在 Home Assistant 中表示。例如，电池供电的温度和湿度传感器可能会暴露温度、湿度和电池电量等实体。

<img class='invertDark'
src='/developers/img/en/device_registry/overview.png'
alt='设备注册表概述'
/>

## 什么是设备？

Home Assistant 中的设备代表具有自己控制单元的物理设备或服务。控制单元本身不必很智能，但它应该能够控制实际发生的事情。例如，带有 4 个房间传感器的 Ecobee 恒温器，在 Home Assistant 中会对应 5 个设备：1 个恒温器设备（包含其内部所有传感器），以及 4 个房间传感器设备。

如果将一个传感器连接到另一个设备来读取其部分数据，它仍应表示为两个不同的设备，因为传感器可能被移动去读取另一台设备的数据。

提供多个端点的设备可以拆分为多个独立设备，并通过 `via_device` 属性引用父设备。这样既可以把不同端点分配到建筑中的不同区域，也便于对实体进行逻辑分组。典型示例是智能电源板或多路智能墙壁开关：父设备会有表示网络连接状态、固件更新等信息的实体，子设备则会绑定到具体通道的实体分组，例如每个通道一个开关实体和一个能耗传感器。

:::info
虽然目前尚不可用，但未来可以考虑为用户提供合并设备的选项。
:::

## 设备属性

|属性|描述|
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|区域 ID|设备所在的区域。|
|配置条目|链接到此设备的配置条目。|
|配置网址|可用于配置该设备或服务的 URL，也可以使用 `homeassistant://<path>` 链接到 Home Assistant UI 内部路径。|
|连接|一组 `(connection_type, connection identifier)` 元组。连接类型在设备注册表模块中定义。集合中的每个项目都能唯一标识一个设备条目，这意味着另一个设备不能具有相同的连接。|
|默认制造商|如果设置了 `manufacturer`，则会覆盖设备的制造商。例如，这对显示网络中所有设备的集成很有用。|
|默认模型|如果设置了 `model`，则会覆盖设备的型号。例如，这对显示网络中所有设备的集成很有用。|
|默认名称|如果设置了 `name`，则会覆盖该设备的默认名称。例如，这对显示网络中所有设备的集成很有用。|
|条目类型|条目类型。可能的值为 `None` 和 `DeviceEntryType` 枚举成员（仅限 `service`）。|
|硬件版本|设备的硬件版本。|
|ID|设备的唯一ID（由Home Assistant生成）|
|标识符|`(DOMAIN, identifier)` 元组的集合，用于在外部识别设备，例如序列号。集合中的每个项目都能唯一标识一个设备条目，这意味着另一个设备不能具有相同的标识符。|
|姓名|设备名称。|
|用户名|设备的用户自定义名称。|
|制造商|设备的制造商。|
|模型|设备的型号名称。|
|型号\_id|设备的型号标识符。|
|序列号|设备的序列号。与 `identifiers` 中的序列号不同，它不需要是唯一的。|
|软件版本|设备 的固件版本。|
|via\_设备|在该设备与 Home Assistant 之间路由消息的设备标识符。此类设备的例子包括集线器或子设备的父设备。这用于展示 Home Assistant 中的设备拓扑。|

## 定义设备

### 通过实体自动注册

:::tip
仅当通过[配置条目](/developers/config_entries_index.md)加载实体，并且定义了 `unique_id` 属性时，才会读取实体设备信息。
:::

每个实体都可以通过 `device_info` 属性定义设备。当实体通过配置条目添加到 Home Assistant 时，会读取此属性。设备会通过提供的标识符或连接（例如序列号或 MAC 地址）与现有设备进行匹配。如果同时提供了标识符和连接，设备注册表会优先按标识符进行匹配。每个标识符和每个连接都会单独匹配，也就是说，只要其中一个连接匹配，就可以视为同一台设备。

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

除了设备属性外，`device_info` 还可以包含 `default_manufacturer`、`default_model`、`default_name`。如果尚未定义其他值，这些值会被添加到设备注册表中。这对那些掌握部分设备信息、但信息还不够具体的集成很有帮助，例如仅根据 MAC 地址识别设备的路由器集成。

### 手动注册

如果没有实体代表某个组件，该组件也可以注册设备。一个例子是与灯通信的集线器。

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

集成可以选择允许用户从 UI 中删除设备。为此，集成应在其 `__init__.py` 模块中实现 `async_remove_config_entry_device` 函数。

```py
async def async_remove_config_entry_device(
    hass: HomeAssistant, config_entry: ConfigEntry, device_entry: DeviceEntry
) -> bool:
    """Remove a config entry from a device."""
```

当用户点击设备的“删除设备”按钮并确认后，系统会等待 `async_remove_config_entry_device`。如果该函数返回 `True`，则会从设备中删除配置条目；如果这是该设备唯一的配置条目，则该设备也会从设备注册表中删除。

在 `async_remove_config_entry_device` 中，集成应执行设备移除前所需的准备步骤，并在成功时返回 `True`。如果集成更适合在其他地方做清理，也可以选择对 `EVENT_DEVICE_REGISTRY_UPDATED` 作出响应。

## 分类为 设备 信息

通过查找具有设备信息的所有键的第一个设备信息类型，将设备信息分为Link、Primary和Secondary。

|类别|按键|
| -------------------- | ---------------------|
|关联|`connections` 和 `identifiers`|
|基本的|`configuration_url`、`connections`、`entry_type`、`hw_version`、`identifiers`、`manufacturer`、`model`、`name`、`suggested_area`、`sw_version` 和 `via_device`|
|中学|`connections`、`default_manufacturer`、`default_model`、`default_name` 和 `via_device`|

该分类用于对配置条目进行排序，以定义 前端 使用的主 集成。

强制性地，设备 信息必须与其中一个类别匹配。
