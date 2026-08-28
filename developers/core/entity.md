关于实体的通用介绍，请参见 [entities architecture](/developers/architecture/devices-and-services.md)。

## 基础实现

下面是一个 switch entity 的示例，它在内存中跟踪其 state。
此外，示例中的 switch 代表设备的主要 feature，
意味着 entity 与其 device 同名。

请查阅 [Entity naming](#entity-naming) 了解如何为 entity 设置自己的名称。

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    def __init__(self):
        self._is_on = False
        self._attr_device_info = ...  # 用于自动 device 注册
        self._attr_unique_id = ...

    @property
    def is_on(self):
        """If the switch is currently on or off."""
        return self._is_on

    def turn_on(self, **kwargs):
        """Turn the switch on."""
        self._is_on = True

    def turn_off(self, **kwargs):
        """Turn the switch off."""
        self._is_on = False
```

构建一个 switch entity 就这么多内容！继续阅读以了解更多，或者查看 [视频教程](https://youtu.be/Cfasc9EgbMU?t=737)。

## 更新 entity

Entity 代表一个 device。有多种策略可以让你的 entity 与 device 的 state 保持同步，其中最常用的是 polling。

### 轮询

在 polling 模式下，Home Assistant 会定时（取决于 component 的更新间隔）向 entity 请求最新的 state。当 `should_poll` 属性返回 `True`（默认值）时，Home Assistant 会轮询该 entity。你可以使用 `update()` 或异步方法 `async_update()` 来实现更新逻辑。该方法应从 device 获取最新的 state，并将其存储在 instance variable 中，以便 properties 返回它。

### 订阅更新

当你订阅 updates 时，你的代码需要负责通知 Home Assistant 有新的更新可用。请确保 `should_poll` 属性返回 `False`。

每当通过订阅收到新的 state 时，你可以通过调用 `schedule_update_ha_state()` 或异步回调 `async_schedule_update_ha_state()` 来通知 Home Assistant 有更新可用。如果希望 Home Assistant 在将更新写入 Home Assistant 之前先调用你的 update method，请将布尔值 `True` 传入该方法。

## 通用属性

Entity 基类有一些在所有 Home Assistant entity 中通用的属性。这些属性可以添加到任何 entity 中，无论其类型如何。所有这些属性都是可选的，不需要实现。

这些属性在 state 写入 state machine 时总是会被调用。

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。

由于这些 properties 在 state 写入 state machine 时总是会被调用，因此在 property 中应尽可能少地执行工作。

为了避免在 property 方法中进行计算，请设置相应的 [entity 类属性或实例属性](#entity-class-or-instance-attributes)，或者如果值永不变化，请使用 [entity descriptions](#entity-description)。
:::

| Name                     | Type                          | Default | Description
| ------------------------ | ------------------------------| ------- | -----------
| assumed\_state            | `bool`                        | `False` | 如果 state 基于我们的假设而非从 device 读取，则返回 `True`。
| attribution              | `str \| None`  | `None`  | API 提供商要求的品牌 text。
| available                | `bool`                        | `True`  | 指示 Home Assistant 是否能够读取 state 或控制底层 device，更多详情请见 [entity-unavailable](/developers/core/integration-quality-scale/rules/entity-unavailable.md)。
| device\_class             | `str \| None`  | `None`  | 对 device 类型的额外分类。每个 domain 都有自己的定义。device class 可能附带对计量单位和受支持 features 的额外要求。
| entity\_picture           | `str \| None`  | `None`  | 用于显示 entity 的图片 URL。
| extra\_state\_attributes   | `dict \| None` | `None`  | 存储在 state machine 中的额外信息。它应该是进一步解释 state 的信息，而不应该是 firmware 版本之类的静态信息。
| has\_entity\_name          | `bool`                        | `False` | 如果 entity 的 `name` 属性代表 entity 本身（新集成所必需），则返回 `True`。下面有更详细的说明。
| name                     | `str \| None`  | `None`  | Entity 的名称。避免硬编码自然语言名称，请改用 [translated name](/developers/internationalization/core.md#name-of-entities)。
| should\_poll              | `bool`                        | `True`  | Home Assistant 是否应向 entity 检查更新的 state。如果设为 `False`，entity 需要通过调用其中一个 [schedule update 方法](integration_fetching_data.md#push-vs-poll) 来通知 Home Assistant 新更新。
| state                    | `str \| int \| float \| None` | `None` | Entity 的 state。在大多数情况下，这由 domain base entity 实现，集成不应自行实现。
| supported\_features       | `int \| None`  | `None`  | 标志 entity 支持的 features。各 domain 有自己的定义。
| translation\_key         | `str \| None`  | `None`  | 用于在集成的 `strings.json` 的 [`entity` section](/developers/internationalization/core.md#state-of-entities) 中查找 entity state 的 translations，并将 state 翻译为匹配的 [icon](#icons)。 |
| translation\_placeholders | `dict \| None` | `None`  | [translated entity name](/developers/internationalization/core.md#name-of-entities) 的占位符定义。

:::warning
允许更改 `device_class`、`supported_features` 或包含在 domain 的 `capability_attributes` 中的任何属性。但是，由于这些 entity 属性通常不应发生变化，且某些 entity consumers 可能无法以较高的速率更新它们，我们建议仅在绝对必要时更改它们，并保持适度的间隔。

例如，此类更改会导致 voice assistant 集成与支持它们的云服务重新同步。
:::

:::warning
产生大量 state 变更的 entity 在 `extra_state_attributes` 也频繁变化时，会迅速增加 database 的大小。通过移除非关键 attributes 或创建额外的 `sensor` entity，来最小化这些 entity 的 `extra_state_attributes` 数量。
:::

## Registry 属性

以下属性用于填充 entity 和 device registries。每次 entity 被添加到 Home Assistant 时都会读取它们。这些属性只有在 `unique_id` 不为 None 时才会生效。

| Name                            | Type                                    | Default | Description
| ------------------------------- | --------------------------------------- | ------- | -----------
| device\_info                     | `DeviceInfo \| None`                    | `None`  | [Device registry](/developers/device_registry_index.md) 描述符，用于 [automatic device registration](/developers/device_registry_index.md#automatic-registration-through-an-entity)。
| entity\_category                 | `EntityCategory \| None`                | `None`  | 非 primary entity 的分类。对于允许更改 device 配置的 entity（例如 switch entity，可以开启和关闭 switch 的背景照明），设为 `EntityCategory.CONFIG`。对于暴露 device 的配置参数或 diagnostics 但不允许更改的 entity（例如显示 RSSI 或 MAC address 的 sensor），设为 `EntityCategory.DIAGNOSTIC`。对于触发 device 识别机制的 button entity（使用 `IDENTIFY` device class），也请使用它。 |
| entity\_registry\_enabled\_default | `bool` | `True`                         | 指示 entity 首次添加到 entity registry 时应启用还是禁用。这包括快速变化的 diagnostic entity 或假定较少使用的 entity。例如，暴露 RSSI 或 battery voltage 的 sensor 通常应设为 `False`，以防止这些 entity 引起不必要的（记录的）state 变更或 UI 杂乱。 |
| entity\_registry\_visible\_default | `bool` | `True`                         | 指示 entity 首次添加到 entity registry 时应隐藏还是可见。 |
| unique\_id                       | `str \| None`            | `None`  | 该 entity 的唯一标识符。它必须在平台内（如 `light.hue`）唯一。它不应可由用户配置或更改。[了解更多。](entity_registry_index.md#unique-id-requirements) |

## 附加属性

以下属性也可用于 entity，但应谨慎使用。这些属性在 state 写入 state machine 时总是会被调用。

| Name                            | Type                         | Default | Description
| ------------------------------- | ---------------------------- | ------- | -----------
| capability\_attributes           | `dict \| None` | `None` | 存储在 entity registry 中的 state attributes。该属性由 domain base entity 实现，集成不应自行实现。
| force\_update                    | `bool`                       | `False` | 每次更新都写入 state machine，即使数据相同。示例用法：当你直接从连接的 sensor 读取值而不是从 cache 读取时。请谨慎使用，会频繁写入 state machine。 |
| icon                            | `str \| None` | `None`  | 在前端使用的 icon。不建议使用此属性。[关于使用 icons 的更多信息](#icons)。 |
| state\_attributes                | `dict \| None` | `None` | Base domain 的 state attributes。该属性由 domain base entity 实现，集成不应自行实现。
| unit\_of\_measurement             | `str \| None` |  entity state 所表示的计量单位。在大多数情况下（例如 `number` 和 `sensor` domain），这由 domain base entity 实现，集成不应自行实现。

## 系统属性

以下属性由 Home Assistant 使用和控制，集成不应 override。

| Name    | Type    | Default | Description
| ------- | ------- | ------- | -----------
| enabled | `bool`  | `True`  | 指示 entity 是否在 entity registry 中启用。如果平台不支持 entity registry，也返回 `True`。被禁用的 entity 不会添加到 Home Assistant。 |

## Entity 命名

避免将 entity 的名称设置为硬编码的英文字符串，而是，名称应该被 [translated](/developers/internationalization/core.md#name-of-entities)。名称不应被翻译的示例包括专有名词、model 名称以及由第三方库提供的名称。

一些 entity 会根据其 device class 自动命名，这包括 [`binary_sensor`](/developers/core/entity/binary-sensor.md)、[`button`](/developers/core/entity/button.md)、[`number`](/developers/core/entity/number.md) 和 [`sensor`](/developers/core/entity/sensor.md) entity，在许多情况下不需要命名。
例如，一个未命名且 device class 设为 `temperature` 的 sensor 将被命名为 "Temperature"。

:::note
如果 entity 提供了 entity name 的 translations，所使用的名称取决于创建时的系统（backend）语言，而不是用户的 UI 语言。例如，如果你的 backend 设为德语，新 entity 将以德语命名——即使用户后来将 UI 切换为法语。更改 backend 语言只影响更改后创建的 entity；现有 entity 保留其原始名称。
:::

### `has_entity_name` True（新集成必需）

Entity 的 name 属性只标识 entity 所代表的数据点，不应包含 device 名称或 entity 类型。因此，对于代表其 device 功耗的 sensor，这应该是 "Power usage"。

如果 entity 代表 device 的单一主要 feature，该 entity 的 name 属性通常应返回 `None`。
Device 的"主要 feature"例如是智能灯泡的 `LightEntity`。

`friendly_name` state attribute 通过将 entity name 与 device name 组合生成，规则如下：

* Entity 不是 device 的成员：`friendly_name = entity.name`
* Entity 是 device 的成员且 `entity.name` 不为 `None`：`friendly_name = f"{device.name} {entity.name}"`
* Entity 是 device 的成员且 `entity.name` 为 `None`：`friendly_name = f"{device.name}"`

`entity_id` 通过将 entity name 与 device name 组合生成，规则如下：

* Entity 不是 device 的成员，例如 helper "Everyone is home"：`entity_id = binary_sensor.everyone_is_home`
* Entity 是 device 的成员且 `entity.name` 不为 `None`，例如名为 "nightlight" 的 device 的电池：`entity_id = sensor.nightlight_battery`
* Entity 是 device 的成员且 `entity.name` 为 `None`，例如名为 "nightlight" 的 device 的 light：`entity_id = light.nightlight`

Entity name 应以大写开头，其余单词为小写（除非是专有名词或大写缩写）。

#### 作为 device 主要 feature 的 switch entity 示例

*注意：示例使用类属性实现 properties，其他实现方式请参见 [Property implementation](#property-implementation)。*
*注意：示例不完整，必须实现 `unique_id` 属性，并且 entity
必须 [与 device 注册](/developers/device_registry_index.md#defining-devices)。*

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True
    _attr_name = None

```

#### 作为非 device 主要 feature 或非 device 一部分的 switch entity 示例：

*注意：示例使用类属性实现 properties，其他实现方式*
*请参见 [Property implementation](#property-implementation)。*
*注意：如果 entity 是 device 的一部分，必须实现 `unique_id` 属性，并且 entity
必须 [与 device 注册](/developers/device_registry_index.md#defining-devices)。*

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    @property
    def translation_key(self):
        """Return the translation key to translate the entity's name and states."""
        return "my_switch"
```

#### 非翻译的 switch entity 示例（非 device 主要 feature 或非 device 一部分）：

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    @property
    def name(self):
        """Name of the entity."""
        return "Model X"
```

### `has_entity_name` 未实现或为 False（已弃用）

Entity 的 name 属性可以是 device 名称与 entity 所代表的数据点的组合。

## Property 实现

### Property 函数

为每个 property 编写 property method 只需要几行代码，
例如

```python
class MySwitch(SwitchEntity):

    @property
    def icon(self) -> str | None:
        """Icon of the entity."""
        return "mdi:door"

    ...
```

### Entity 类属性或实例属性

另一种较短的形式是，按照以下任一模式设置 Entity 类属性或实例属性：

```python
class MySwitch(SwitchEntity):

    _attr_icon = "mdi:door"

    ...
```

```python
class MySwitch(SwitchEntity):

    def __init__(self, icon: str) -> None:
        self._attr_icon = icon

    ...
```

这与第一个示例完全相同，但依赖于基类中 property 的默认
实现。该属性的名称以 `_attr_` 开头，后跟 property 名称。例如，默认
的 `device_class` property 返回 `_attr_device_class` 类属性。

并非所有 entity 类都支持使用 `_attr_` 属性来实现其 entity
特定属性，请参阅相应
entity 类的文档以获取详细信息。

:::tip
如果集成需要访问自己的 properties，应访问 property（`self.name`），而不是类属性或实例属性（`self._attr_name`）。
:::

### Entity 描述

设置 entity property 的第三种方法是使用 entity description。为此，请在 `Entity` 实例上设置一个名为 `entity_description` 的属性，其值为 `EntityDescription` 实例。Entity description 是一个 dataclass，其 attributes 对应于大多数可用的 `Entity` properties。每个支持 entity platform 的 entity 集成（例如 `switch` 集成）都会定义自己的 `EntityDescription` 子类，使用 entity descriptions 的实现 platform 应使用该子类。

默认情况下，`EntityDescription` 实例有一个必需的 attribute 名为 `key`。这是一个字符串，旨在对实现 platform 的所有 entity descriptions 保持唯一。该 attribute 的一个常见用例是将其包含在描述 entity 的 `unique_id` 中。

使用 entity descriptions 的主要好处是，它以一种声明式的方式定义了 platform 的不同 entity types，当存在许多不同 entity type 时，这使得代码更易读。

### 示例

下面的代码片段示例说明了何时应实现 property 函数、何时使用类属性或实例属性以及何时使用 entity descriptions 的最佳实践。

```py
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass

from example import ExampleDevice, ExampleException

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    EntityCategory,
    UnitOfElectricCurrent,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.typing import StateType

from .const import DOMAIN, LOGGER


@dataclass(kw_only=True)
class ExampleSensorEntityDescription(SensorEntityDescription):
    """Describes Example sensor entity."""

    exists_fn: Callable[[ExampleDevice], bool] = lambda _: True
    value_fn: Callable[[ExampleDevice], StateType]


SENSORS: tuple[ExampleSensorEntityDescription, ...] = (
    ExampleSensorEntityDescription(
        key="estimated_current",
        native_unit_of_measurement=UnitOfElectricCurrent.MILLIAMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda device: device.power,
        exists_fn=lambda device: bool(device.max_power),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Example sensor based on a config entry."""
    device: ExampleDevice = entry.runtime_data
    async_add_entities(
        ExampleSensorEntity(device, description)
        for description in SENSORS
        if description.exists_fn(device)
    )


class ExampleSensorEntity(SensorEntity):
    """Represent an Example sensor."""

    entity_description: ExampleSensorEntityDescription
    _attr_entity_category = (
        EntityCategory.DIAGNOSTIC
    )  # 这对所有 ExampleSensorEntity 实例是通用的

    def __init__(
        self, device: ExampleDevice, entity_description: ExampleSensorEntityDescription
    ) -> None:
        """Set up the instance."""
        self._device = device
        self.entity_description = entity_description
        self._attr_available = False  # 这会覆盖默认值
        self._attr_unique_id = f"{device.serial}_{entity_description.key}"

    def update(self) -> None:
        """Update entity state."""
        try:
            self._device.update()
        except ExampleException:
            if self.available:  # 读取当前 state，不需要加 _attr_ 前缀
                LOGGER.warning("Update failed for %s", self.entity_id)
            self._attr_available = False  # 设置 property 值
            return

        self._attr_available = True
        # 这里不需要检查 device 是否可用
        self._attr_native_value = self.entity_description.value_fn(
            self._device
        )  # 更新 "native_value" property
```

## 生命周期钩子

使用这些 lifecycle hooks 在发生某些事件时执行代码。所有 lifecycle hooks 都是异步方法。

### `async_added_to_hass()`

当 entity 被分配 entity\_id 和 hass 对象后，且第一次写入 state machine 之前调用。示例用途：恢复 state、订阅 updates 或设置 callback/dispatch function/listener。

### `async_will_remove_from_hass()`

当 entity 即将从 Home Assistant 移除时调用。示例用途：断开与 server 的连接或取消订阅 updates。

## 图标

Home Assistant 中的每个 entity 都有一个 icon，用作前端中更易识别 entity 的视觉指示器。Home Assistant 使用 [Material Design Icons](https://materialdesignicons.com/) icon 集。

在大多数情况下，Home Assistant 会根据 entity 的 domain、`device_class` 和 `state` 自动选择一个 icon。如果可能，优先使用默认 icon，以提供一致的体验并避免用户混淆。但是，也可以 override 默认值并为 entity 提供自定义 icon。

无论提供什么 icon，用户总可以在前端按照自己的喜好自定义 icon。

有两种方式为 entity 提供自定义 icon：通过提供 icon translations 或通过提供 icon identifier。

### 图标翻译

这是为 entity 提供自定义 icon 的首选方式。Icon translations 的工作方式类似于 [常规 translations](/developers/internationalization/core.md#state-of-entities)，但它们不是翻译 entity 的 state，而是将 entity 的 states 翻译为 icons。

请注意，translated states 必须像所有其他 translation key 一样是 `snake_case`。

Entity 的 `translation_key` 属性定义了要使用的 icon translation。该属性用于在集成的 `icons.json` 文件的 `entity` section 中查找 translation。

为了区分 entity 及其 translations，请提供不同的 translation keys。以下示例展示了 Moon domain `sensor` entity 的 `icons.json`，其 `translation_key` 属性设为 phase：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "default": "mdi:moon",
        "state": {
          "new_moon": "mdi:moon-new",
          "first_quarter": "mdi:moon-first-quarter",
          "full_moon": "mdi:moon-full",
          "last_quarter": "mdi:moon-last-quarter"
        }
      }
    }
  }
}
```

请注意，icons 以 `mdi:` 开头，后跟一个 [identifier](https://materialdesignicons.com/)。当 entity 的 state 不在 `state` section 中时，使用 `default` icon。`state` section 是可选的，如果未提供，`default` icon 将用于所有 states。

在前端显示 state attributes 的 icons 时，也可以为 entity state attributes 提供 icons。示例包括 climate presets 和 fan modes。无法为其他 state attributes 提供 icons。以下示例为 `climate` entity 提供 icons，其 `translation_key` 属性设为 `ubercool`。该 entity 有一个 `preset_mode` state attribute，可以设为 `vacation` 或 `night`。前端将在例如 climate card 中使用它们。

请注意，translated state attributes 必须像所有其他 translation key 一样是 `snake_case`。

```json
{
  "entity": {
    "climate": {
      "ubercool": {
        "state_attributes": {
          "preset_mode": {
            "default": "mdi:confused",
            "state": {
              "vacation": "mdi:umbrella-beach",
              "night": "mdi:weather-night"
            }
          }
        }
      }
    }
  }
}
```

### 图标属性

为 entity 提供 icon 的另一种方法是设置 entity 的 `icon` 属性，该属性返回一个引用 `mdi` icon 的字符串。由于该属性是一个 method，与 icon translations 不同，它可以根据自定义逻辑返回不同的 icons。例如，可以像下面示例中那样根据 state 计算 icon，或者根据不属于 entity state 的内容返回不同的 icons。

```python
class MySwitch(SwitchEntity):

    @property
    def icon(self) -> str | None:
        """Icon of the entity, based on time."""
        if now().hour < 12:
            return "mdi:weather-night"
        return "mdi:weather-sunny"

    ...
```

无法通过 `icon` 属性为 state attributes 提供 icons。请注意，不建议使用 `icon` 属性；优先使用上述的 icon translations。

## 从 recorder history 中排除状态属性

不适合进行 state history 记录的 state attributes 应通过将其包含在 `_entity_component_unrecorded_attributes` 或 `_unrecorded_attributes` 中来排除在 state history 记录之外。

* `_entity_component_unrecorded_attributes: frozenset[str]` 可在 base component 类中设置，例如在 `light.LightEntity` 中
* `_unrecorded_attributes: frozenset[str]` 可在集成的 platform 中设置，例如在 platform `hue.light` 中定义的 entity 类中。

`MATCH_ALL` 常量可用于排除所有 attributes，而无需逐一列出。对于提供未知 attributes 的集成，或者只是想排除所有而不逐一列出时，这非常有用。

使用 `MATCH_ALL` 常量不会停止对 `device_class`、`state_class`、`unit_of_measurement` 和 `friendly_name` 的记录，因为它们还可能服务于其他目的，因此不应排除在记录之外。

被排除在记录之外的 platform state attributes 示例包括 `image` entity 的 `entity_picture` attribute（一段时间后将会失效）和 `fan` entity 的 `preset_modes` attribute（不太可能变化）。
被排除在记录之外的集成特定 state attributes 示例包括 platform `trafikverket.camera` 中的 `description` 和 `location` state attributes（不会变化）。

:::tip
`_entity_component_unrecorded_attributes` 和 `_unrecorded_attributes` 必须声明为类属性；实例属性将被忽略。
:::

## 更改 entity model

如果你想为 entity 或其任何 subtype（light、switch 等）添加新 feature，你需要先在我们的 [architecture repo](https://github.com/home-assistant/architecture/discussions) 中提出。只考虑各种厂商通用的 features。
