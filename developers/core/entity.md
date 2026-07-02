# 实体

有关实体的一般介绍，请参阅[实体架构](/developers/architecture/devices-and-services.md)。

## 基本实现

下面是一个示例开关实体，用于在内存中跟踪状态。
示例中的开关代表设备的主要功能，
因此实体与设备具有相同的名称。

请参阅[实体命名](#实体命名)，了解如何为实体设置名称。

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    def __init__(self):
        self._is_on = False
        self._attr_device_info = ...  # For automatic device registration
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

这就是构建开关实体所需的全部内容！继续阅读以了解更多信息或查看[视频教程](https://youtu.be/Cfasc9EgbMU?t=737)。

## 更新实体

一个实体代表一个设备。有多种策略可以使您的实体与设备状态保持同步，最流行的一种是轮询。

### 轮询

通过轮询，Home Assistant 会不时地（取决于组件的更新间隔）要求实体获取最新状态。当 `should_poll` 属性返回 `True`（默认值）时，Home Assistant 将轮询实体。您可以使用 `update()` 或异步方法 `async_update()` 实现更新逻辑。此方法应从设备获取最新状态并将其存储在实例变量中，以便属性返回它。

### 订阅更新

当您订阅更新时，您的代码负责让 Home Assistant 知道有可用更新。确保您有 `should_poll` 属性返回 `False`。

每当您从订阅中收到新状态时，您都可以通过调用 `schedule_update_ha_state()` 或异步回调 `async_schedule_update_ha_state()` 告诉 Home Assistant 有可用更新。如果您希望 Home Assistant 在将更新写入 Home Assistant 之前调用您的更新方法，请将布尔值 `True` 传递给该方法。

## 通用属性

实体基类具有所有 Home Assistant 实体共有的一些属性。这些属性可以添加到任何实体，无论其类型如何。所有这些属性都是可选的，不需要实现。

当状态写入状态机时，始终会调用这些属性。

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。

由于在将状态写入状态机时始终会调用这些属性，因此在属性中执行尽可能少的工作非常重要。

要避免在属性方法中进行计算，请设置相应的[实体类或实例属性](#实体类或实例属性)，或者如果值永远不会更改，请使用[实体描述](#实体描述)。
:::

| 名称 | 类型 | 默认值 | 说明
| ------------------------ | ------------------------------| ------- | -----------
| assumed\_state | `bool` | `False` | 如果状态基于我们的假设而不是从设备读取，则返回 `True`。
| attribution | <code>str | None</code> | `None` | API 提供商所需的品牌文本。
| available | `bool` | `True` | 指示 Home Assistant 是否能够读取状态或控制底层设备，请参阅[实体不可用](/developers/core/integration-quality-scale/rules/entity-unavailable.md) 了解更多详细信息。
| device\_class | <code>str | None</code> | `None` | 设备的额外分类。每个域都定义自己的设备类别。设备类别可能对测量单位和支持功能有额外要求。
| entity\_picture | <code>str | None</code> | `None` | 要为实体显示的图片的 URL。
| extra\_state\_attributes | <code>dict | None</code> | `None` | 要存储在状态机中的额外信息。它需要是进一步解释状态的信息，它不应该是固件版本之类的静态信息。
| has\_entity\_name | `bool` | `False` | 如果实体的 `name` 属性代表实体本身（新集成所需），则返回 `True`。下面对此进行更详细的解释。
| name | <code>str | None</code> | `None` | 实体名称。避免对自然语言名称进行硬编码，而应使用[国际化文档](/developers/internationalization/core.md)中介绍的译名机制。
| should\_poll | `bool` | `True` | Home Assistant 是否应主动轮询实体状态。如果设置为 `False`，实体需要通过调用[数据获取文档](/developers/integration_fetching_data.md)中介绍的方法来通知 Home Assistant 有新更新。
| state | <code>str | int | float | None</code> | `None` | 实体的状态。在大多数情况下，这是由域基础实体实现的，不应通过集成来实现。
| supported\_features | <code>int | None</code> | `None` | 标记实体支持的功能。域指定自己的域。
| translation\_key | <code>str | None</code> | `None` | 用于在[集成 `strings.json` 的 `entity` 部分](/developers/internationalization/core.md)中查找实体状态翻译，并将状态映射到匹配[图标](#图标)的键。 |
| translation\_placeholders | <code>dict | None</code> | `None` | 翻译后实体名称所需的占位符定义，详见[国际化文档](/developers/internationalization/core.md)。

:::warning
允许更改 `device_class`、`supported_features` 或域的 `capability_attributes` 中包含的任意属性。但是，这些实体属性通常默认不会变化，而且某些实体消费者可能不会及时感知更新，因此建议仅在确有必要时、以适度频率更改。

例如，此类更改将导致语音助手集成与支持的云服务重新同步。
:::

:::warning
当 `extra_state_attributes` 也频繁更改时，生成大量状态更改的实体可以快速增加数据库的大小。通过删除非关键属性或创建其他 `sensor` 实体，最大限度地减少这些实体的 `extra_state_attributes` 数量。
:::

## 注册表属性

以下属性用于填充实体和设备注册表。每次将实体添加到 Home Assistant 时都会读取它们。仅当 `unique_id` 不为 None 时，这些属性才有效。

| 名称 | 类型 | 默认值 | 说明
| ------------------------------- | --------------------------------------- | ------- | -----------
| device\_info | <code>DeviceInfo | None</code> | `None` | 用于[设备注册表](/developers/device_registry_index.md)自动注册设备的描述信息
| entity\_category | <code>EntityCategory | None</code> | `None` | 非主要实体的分类。对于允许修改设备配置的实体（例如控制背光开关的开关实体），应设置为 `EntityCategory.CONFIG`。对于公开设备配置参数或诊断信息、但不允许修改这些值的实体，例如显示 RSSI 或 MAC 地址的传感器，应设置为 `EntityCategory.DIAGNOSTIC`。它也可用于触发设备识别机制的按钮实体（带有 `IDENTIFY` 设备类）。 |
| entity\_registry\_enabled\_default | `bool` | `True` | 指示首次添加到实体注册表时是否应启用或禁用实体。这包括快速变化的诊断实体或假设不太常用的实体。例如，暴露 RSSI 或电池电压的传感器通常应设置为 `False`；以防止这些实体进行不必要的（已记录的）状态更改或 UI 混乱。 |
| entity\_registry\_visible\_default | `bool` | `True` | 指示首次添加到实体注册表时实体应隐藏还是可见。 |
| unique\_id | <code>str | None</code> | `None` | 该实体的唯一标识符。它必须在平台内唯一（例如 `light.hue`），且不应由用户配置或更改。更多信息请参阅[实体注册表](/developers/entity_registry_index.md)。 |

## 高级属性

以下属性也可用于实体。然而，它们仅供高级使用，应谨慎使用。当状态写入状态机时，始终会调用这些属性。

| 名称 | 类型 | 默认值 | 说明
| ------------------------------- | ---------------------------- | ------- | -----------
| capability\_attributes | <code>dict | None</code> | `None` | 存储在实体注册表中的状态属性。此属性由域基础实体实现，不应由集成实现。
| force\_update | `bool` | `False` | 每次更新都写入状态机，即使数据没有变化。示例：值直接来自已连接传感器而非缓存。请谨慎使用，否则会产生大量状态写入。 |
| icon | <code>str | None</code> | `None` | 在前端使用的图标。不建议使用此属性。[有关图标的更多信息](#图标)。 |
| state\_attributes | <code>dict | None</code> | `None` | 状态基类实体提供的属性。此属性由域基础实体实现，不应由集成实现。
| unit\_of\_measurement | <code>str | None</code> | `None` | 实体状态所使用的测量单位。在大多数情况下，例如 `number` 和 `sensor` 域，此属性由域基础实体实现，不应由集成实现。

## 系统属性

以下属性由 Home Assistant 使用和控制，不应被集成覆盖。

| 名称 | 类型 | 默认值 | 说明
| ------- | ------- | ------- | -----------
| enabled | `bool` | `True` | 指示实体注册表中是否启用了实体。如果平台不支持实体注册表，它还会返回 `True`。禁用实体不会添加到 Home Assistant。 |

## 实体命名

避免将实体名称写死为英文字符串；名称应使用[国际化机制](/developers/internationalization/core.md)进行翻译。不应翻译的名称包括专有名词、型号名以及第三方库提供的名称。

某些实体会根据其设备类别自动命名，其中包括 [`binary_sensor`](/developers/core/entity/binary-sensor.md)、[`button`](/developers/core/entity/button.md)、[`number`](/developers/core/entity/number.md) 和 [`sensor`](/developers/core/entity/sensor.md) 实体，并且在许多情况下不需要命名。
例如，设备类别设置为 `temperature` 的未命名传感器将被命名为“Temperature”。

:::note
如果实体提供实体名称的翻译，则使用的名称取决于创建时的系统（后端）语言，而不是用户的 UI 语言。例如，如果您的后端设置为德语，则新实体将以德语命名 - 即使用户稍后将其 UI 切换为法语。更改后端语言只会影响更改后创建的实体；现有实体保留其原始名称。
:::

### `has_entity_name` True（新集成必需）

实体的名称属性仅标识实体所代表的数据点，不应包含设备的名称或实体的类型。因此，对于代表其设备的电量使用情况的传感器，这将是“电量使用情况”。

如果实体代表设备的单个主要功能，则实体的名称属性通常应返回 `None`。
例如，设备的“主要功能”是智能灯泡的 `LightEntity`。

`friendly_name` 状态属性由实体名称和设备名称组合生成，规则如下：

* 该实体不是设备的成员：`friendly_name = entity.name`
* 该实体是设备的成员，并且 `entity.name` 不是 `None`：`friendly_name = f"{device.name} {entity.name}"`
* 该实体是设备的成员，`entity.name` 是 `None`: `friendly_name = f"{device.name}"`

`entity_id` 由实体名称和设备名称组合生成，规则如下：

* 该实体不是设备的成员，例如辅助实体“大家都在家”：`entity_id = binary_sensor.everyone_is_home`
* 该实体是设备的成员，并且 `entity.name` 不是 `None`，例如名为“夜灯”的设备的电池：`entity_id = sensor.nightlight_battery`
* 该实体是设备的成员，`entity.name` 是 `None`，例如名为“夜灯”的设备的灯光：`entity_id = light.nightlight`

实体名称应以大写字母开头，其余单词均小写（当然除非它是专有名词或大写缩写）。

#### 作为设备主要功能的开关实体示例

*注：此示例使用类属性实现实体属性；其他实现方式请参阅[属性实现](#属性实现)。*
*注意：示例并不完整，必须实现 `unique_id` 属性，并且实体必须已在[设备注册表](/developers/device_registry_index.md)中注册。*

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True
    _attr_name = None

```

#### 开关实体示例：该实体不是设备的主要功能，或不属于某个设备：

*注：此示例使用类属性实现实体属性；其他实现方式请参阅[属性实现](#属性实现)。*
*注意：如果实体属于某个设备，则必须实现 `unique_id` 属性，并且实体必须已在[设备注册表](/developers/device_registry_index.md)中注册。*

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    @property
    def translation_key(self):
        """Return the translation key to translate the entity's name and states."""
        return my_switch
```

#### 未翻译的开关实体示例：该实体不是设备的主要功能，或不属于某个设备：

```python
from homeassistant.components.switch import SwitchEntity


class MySwitch(SwitchEntity):
    _attr_has_entity_name = True

    @property
    def name(self):
        """Name of the entity."""
        return "Model X"
```

### `has_entity_name` 未实现或 False（已弃用）

实体的名称属性可以是设备名称和实体所表示的数据点的组合。

## 属性实现

### 属性方法

为每个属性编写一个属性方法通常只需要几行代码，例如：

```python
class MySwitch(SwitchEntity):

    @property
    def icon(self) -> str | None:
        """Icon of the entity."""
        return "mdi:door"

    ...
```

### 实体类或实例属性

或者，也可以用更简洁的方式设置实体类属性或实例属性，例如：

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

这与第一个示例完全等价，但依赖于基类中属性的默认实现。
这些属性名以 `_attr_` 开头，后接实际属性名。例如，默认的
`device_class` 属性返回 `_attr_device_class` 类属性。

并非所有实体类都支持通过 `_attr_` 设置对应的实体属性。
具体支持哪些属性，请参考各实体类的文档。

:::tip
如果集成需要访问自己的属性，则应访问属性 (`self.name`)，而不是类或实例属性 (`self._attr_name`)。
:::

### 实体描述

设置实体属性的第三种方式是使用实体描述。为此，需要在 `Entity` 实例上设置名为 `entity_description` 的属性，并将其赋值为一个 `EntityDescription` 实例。实体描述是一个数据类，其字段对应大多数可用的 `Entity` 属性。每个支持实体平台的实体集成（例如 `switch` 集成）都会定义自己的 `EntityDescription` 子类，供希望使用实体描述的实现平台使用。

默认情况下，`EntityDescription` 实例有一个名为 `key` 的必填属性。它是一个字符串，对于该实现平台的所有实体描述都必须唯一。常见做法是将它包含在所描述实体的 `unique_id` 中。

使用实体描述的主要好处是它以声明的方式定义平台的不同实体类型，使得当存在许多不同的实体类型时代码更容易阅读。

### 示例

下面的代码片段给出了何时实现属性函数、何时使用类或实例属性以及何时使用实体描述的最佳实践示例。

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
    device: ExampleDevice = hass.data[DOMAIN][entry.entry_id]
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
    )  # This will be common to all instances of ExampleSensorEntity

    def __init__(
        self, device: ExampleDevice, entity_description: ExampleSensorEntityDescription
    ) -> None:
        """Set up the instance."""
        self._device = device
        self.entity_description = entity_description
        self._attr_available = False  # This overrides the default
        self._attr_unique_id = f"{device.serial}_{entity_description.key}"

    def update(self) -> None:
        """Update entity state."""
        try:
            self._device.update()
        except ExampleException:
            if self.available:  # Read current state, no need to prefix with _attr_
                LOGGER.warning("Update failed for %s", self.entity_id)
            self._attr_available = False  # Set property value
            return

        self._attr_available = True
        # We don't need to check if device available here
        self._attr_native_value = self.entity_description.value_fn(
            self._device
        )  # Update "native_value" property
```

## 生命周期挂钩

使用这些生命周期挂钩在实体发生某些事件时执行代码。所有生命周期挂钩都是异步方法。

### `async_added_to_hass()`

当实体首次写入状态机之前分配了实体 ID 和 hass 对象时调用。示例用途：恢复状态、订阅更新或设置回调/调度函数/侦听器。

### `async_will_remove_from_hass()`

当实体即将从 Home Assistant 中删除时调用。使用示例：与服务器断开连接或取消订阅更新。

## 图标

Home Assistant 中的每个实体都有一个图标，作为视觉提示，便于在前端识别实体。Home Assistant 使用[Material Design Icons](https://materialdesignicons.com/) 图标集。

在大多数情况下，Home Assistant 会根据实体的域、`device_class` 和 `state` 自动选择图标。如果可能，最好使用默认图标，以提供一致的体验并避免用户混淆。但是，可以覆盖默认值并为实体提供自定义图标。

无论提供什么图标，用户始终可以在前端根据自己的喜好自定义图标。

有两种方式可以为实体提供自定义图标：提供图标翻译，或直接提供图标标识符。

### 图标翻译

这是为实体提供自定义图标的首选方式。图标翻译的工作方式与[常规国际化机制](/developers/internationalization/core.md)类似，但它不是将实体状态翻译成文本，而是将实体状态映射到对应图标。

请注意，状态翻译键必须使用 `snake_case`，与其他翻译键保持一致。

实体的 `translation_key` 属性定义要使用的图标翻译键。该属性用于在集成的 `icons.json` 文件的 `entity` 部分中查找翻译。

为了区分实体及其翻译，请使用不同的翻译键。下面的示例展示了 Moon 域 `sensor` 实体的 `icons.json`，其 `translation_key` 属性设置为 `phase`：

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

请注意，图标值以 `mdi:` 加上[图标标识符](https://materialdesignicons.com/)组成。当实体状态未出现在 `state` 部分时，将使用 `default` 图标。`state` 部分是可选的；如果未提供，则所有状态都使用 `default` 图标。

如果前端支持显示状态属性图标，还可以为实体的状态属性提供图标。示例包括气候预设和风扇模式；其他状态属性则不能这样做。下面的示例为 `climate` 实体提供图标，其 `translation_key` 属性设置为 `ubercool`。该实体具有 `preset_mode` 状态属性，可设置为 `vacation` 或 `night`；前端会在气候卡等位置使用这些图标。

请注意，状态属性翻译键必须使用 `snake_case`，与其他翻译键保持一致。

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

为实体提供图标的另一种方法是设置实体的 `icon` 属性，该属性返回引用 `mdi` 图标的字符串。由于此属性是一种方法，因此可以根据自定义逻辑返回不同的图标，这与图标翻译不同。例如，可以根据状态计算图标，如下例所示，或者根据不属于实体状态的内容返回不同的图标。

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

无法使用 `icon` 属性为状态属性提供图标。请注意，不鼓励使用 `icon` 属性；优先使用上述图标翻译。

## 从记录器历史记录中排除状态属性

不适合状态历史记录的状态属性应通过将其包含在 `_entity_component_unrecorded_attributes` 或 `_unrecorded_attributes` 中而从状态历史记录中排除。

* `_entity_component_unrecorded_attributes: frozenset[str]` 可以在基本组件类中设置，例如在 `light.LightEntity` 中
* `_unrecorded_attributes: frozenset[str]` 可以设置在集成平台中，例如在平台 `hue.light` 中定义的实体类中。

`MATCH_ALL` 常量可用于排除所有属性，而不必逐个列出。这对于会提供未知属性的集成，或只想一次性排除全部属性的场景非常有用。

使用 `MATCH_ALL` 常量不会停止 `device_class`、`state_class`、`unit_of_measurement` 和 `friendly_name` 的记录，因为它们还可能用于其他目的，因此不应被排除在记录之外。

从记录中排除的平台状态属性示例包括 `image` 实体的 `entity_picture` 属性（过一段时间后会失效）以及 `fan` 实体的 `preset_modes` 属性（通常不会变化）。
从记录中排除的集成特定状态属性示例包括平台 `trafikverket.camera` 中不会变化的 `description` 和 `location` 状态属性。

:::tip
`_entity_component_unrecorded_attributes` 和 `_unrecorded_attributes` 必须声明为类属性；实例属性将被忽略。
:::

## 更改实体模型

如果您想为实体或其任意子类型（灯、开关等）添加新功能，需要先在我们的[架构仓库](https://github.com/home-assistant/architecture/discussions)中发起讨论。只有不同厂商之间通用的功能才会被考虑纳入。
