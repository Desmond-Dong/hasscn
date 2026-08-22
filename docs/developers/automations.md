---
title: "自动化工具"
---

:::warning
此页面的功能仍在非常积极地开发中，集成目前不应使用。API 可能会在没有弃用通知的情况下发生变化。
:::

## 触发器

Triggers 基于事件、状态更改或条件启动 automations。通过创建并注册 trigger 类，在你的集成 `trigger` platform（`trigger.py`）中实现它们。

### 触发器类

每个 trigger 必须继承自 `homeassistant.helpers.trigger.Trigger`，并实现 `async_validate_config` 和 `async_attach_runner`。
`async_validate_config` 验证 trigger 的 configuration dict，而
`async_attach_runner` 设置 trigger，以便在每次 trigger 触发时调用所提供的 action runner `run_action`。

需要等待 action 完成的 integrations 可以 `await` 由 `run_action` 返回的 `Task`：`await run_action(...)`。

```python
from typing import TYPE_CHECKING, cast

import voluptuous as vol

from homeassistant.const import CONF_TARGET
from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.trigger import Trigger, TriggerActionRunner, TriggerConfig
from homeassistant.helpers.typing import ConfigType

_CONFIG_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_TARGET): cv.TARGET_FIELDS,
    }
)


class OccupancyClearedTrigger(Trigger):
    """Trigger when occupancy is cleared."""

    @classmethod
    async def async_validate_config(
        cls, hass: HomeAssistant, config: ConfigType
    ) -> ConfigType:
        """Validate trigger-specific config."""
        return cast(ConfigType, _CONFIG_SCHEMA(config))

    def __init__(self, hass: HomeAssistant, config: TriggerConfig) -> None:
        """Initialize trigger."""
        super().__init__(hass, config)
        if TYPE_CHECKING:
            assert config.target is not None
        self._target = config.target

    async def async_attach_runner(
        self, run_action: TriggerActionRunner
    ) -> CALLBACK_TYPE:
        """Attach the trigger."""

        @callback
        def async_remove() -> None:
            """Remove trigger."""
            # 你的代码以注销 trigger

        @callback
        def async_on_cleared(entity_id: str) -> None:
            """Handle occupancy cleared."""
            payload = {"entity_id": entity_id}
            description = f"Occupancy cleared for {entity_id}"
            run_action(payload, description)

        # 一个虚示例方法，用于为目标 entity 注册你的 listener
        register_for_occupancy_cleared(self._target, async_on_cleared)

        return async_remove
```


### 注册触发器

在 `trigger` platform 中实现 `async_get_triggers` 以注册该集成的所有 triggers。
每个 trigger 由一个唯一字符串标识（例如上面示例中的 `"occupancy_cleared"`）。

```python
async def async_get_triggers(hass: HomeAssistant) -> dict[str, type[Trigger]]:
    """Return triggers provided by this integration."""
    return {
        "occupancy_cleared": OccupancyClearedTrigger,
    }
```

### 触发器描述

Triggers 的描述应放在 `triggers.yaml` 文件中。该描述指定了 trigger 的结构，并被前端等使用。

以下片段显示一个接受具有特定 device class 的目标 binary sensor 的 trigger。

```yaml
occupancy_cleared:
  target:
    entity:
      domain: binary_sensor
      device_class: presence
```

### 命名触发器

一致地为 triggers 命名有助于用户预测每个集成的行为。一个学会了一种集成如何命名其 triggers 的用户，应该能够猜出另一种集成是如何做的。

核心原则是：trigger 命名一个刚刚发生的事件。它以 entity type 开头，读起来像一个陈述。

在整个集成的 triggers、conditions 和 actions 中，使用单一且一致的 entity type。这是面向人类描述设备种类的名称，例如 "light"、"fan"、"cover"、"lock"、"alarm"、"media player"、"vacuum cleaner"、"climate-control device" 或 "lawn mower"。不要混用诸如 "vacuum" 和 "vacuum cleaner" 的变体，并且始终包含 entity type，即使是 sensor 风格或 zone 风格的条目。

#### 标题

以 entity type 开头，然后描述事件，遵循模式 `[Entity type] [event]`。选择适合事件类型的子模式，而不要将所有事件都强行套用一般过去时。

- **瞬时转换** — 一般过去时，用于瞬时状态变化："Light turned on"、"Door opened"、"Lock locked"、"Alarm armed"、"Button pressed"。
- **正在进行活动的开始或结束** — `started` / `stopped` / `paused` 加上现在分词，用于设备随时间执行的活动。一般过去时会被错误地暗示活动已结束（"Vacuum cleaned" 听起来是已完成，而 "Vacuum cleaner started cleaning" 则不然）："Climate-control device started cooling"、"Lawn mower started mowing"、"Vacuum cleaner paused cleaning"、"Battery started charging"。
- **测量值变化或阈值** — `[measurement] changed` 或 `[measurement] crossed threshold`："Temperature changed"、"Battery level crossed threshold"、"Light brightness changed"。
- **检测（binary sensors）** — `[phenomenon] detected` 或 `[phenomenon] cleared`："Motion detected"、"Smoke cleared"。
- **状态阈值** — `[Entity type] became [status]` 或 `[Entity type] no longer [status]`，用于设备进入或离开一个没有自然过去时动词的状态。不要将其留作裸形容词（如 "Battery low"），因为它读起来像状态而不是事件："Battery became low"、"Battery no longer low"、"Update became available"、"Satellite became idle"。

即使是 sensor 和 zone triggers，也应以 entity type 开头。比起 "Selection changed"，更偏向 "Dropdown selection changed"；比起 "Entered zone"，更偏向 "Zone entered"。

#### 描述

遵循模式 `Triggers when one or more [entity type plural] [present tense verb phrase].`

- "Triggers when one or more lights turn on."
- "Triggers when one or more lawn mowers start mowing."
- "Triggers when one or more locks lock."

规则：

- 以 "Triggers when" 开头。trigger 在事件发生的瞬间触发，所以 "when" 比 "after" 更自然、更准确。
- 使用 "one or more [plural]"，而不是 "a" 或单数名词。
- 使用现在时动词（"turn on"、"ring"、"return"），即使标题是过去时。
- 以句号结尾。

#### 键名

Keys 为小写 snake_case，且 key 应与其 title 的含义相匹配。

- **瞬时转换**：`turned_on`、`turned_off`、`opened`、`closed`、`locked`、`armed`、`pressed`。
- **活动开始或结束**：`started_cooling`、`started_mowing`、`paused_cleaning`、`started_charging`、`stopped_charging`。
- **测量值**：`level_changed`、`level_crossed_threshold`、`target_temperature_changed`、`target_temperature_crossed_threshold`。
- **检测**：`detected`、`cleared`。
- **状态阈值**：`became_low`、`no_longer_low`、`became_available`。不要使用裸 `low` 或 `not_low`；应匹配标题中 "became" 的措辞。
- **Subtypes** 将前缀放在名词前：`awning_opened`、`blind_closed`、`co2_changed`。

不要在 key 中重复 domain。在 update domain 中使用 `became_available`，而不是 `update_became_available`。不要使用如 `_` 这样的占位符 key。

## 条件

当 automation 被触发时，它可能有一些必须满足的条件才能执行 action。
Conditions 通过在你的集成 `condition` platform（`condition.py`）中创建并注册 condition 类来定义。

### 条件类

Conditions 继承自 `homeassistant.helpers.condition.Condition`，并且必须实现 `async_validate_config` 和 `_async_check`。
与 [trigger class](#trigger-class) 一样，`async_validate_config` 用于验证 condition configuration。
`_async_check` 在需要检查 condition 时被调用，应返回 condition 是否满足。

在下面的片段中，我们创建一个 condition，可以配置为仅当 `binary_sensor.front_door` 具有所配置的期望状态时才通过。

```python
from typing import TYPE_CHECKING, Any, override

import voluptuous as vol

from homeassistant.const import (
    CONF_OPTIONS,
    CONF_STATE,
    STATE_OFF,
    STATE_ON,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.condition import Condition, ConditionConfig
from homeassistant.helpers.typing import ConfigType, TemplateVarsType

STATE_CONDITION_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_OPTIONS, default={}): {
            vol.Required(CONF_STATE): vol.In([STATE_ON, STATE_OFF]),
        },
    }
)


class DoorStateCondition(Condition):
    """State condition."""

    @classmethod
    @override
    async def async_validate_config(
        cls, hass: HomeAssistant, config: ConfigType
    ) -> ConfigType:
        """Validate config."""
        return STATE_CONDITION_SCHEMA(config)

    def __init__(self, hass: HomeAssistant, config: ConditionConfig) -> None:
        """Initialize condition."""
        super().__init__(hass, config)
        if TYPE_CHECKING:
            assert config.options
        self._state = config.options[CONF_STATE]

    @override
    def _async_check(
        self, variables: TemplateVarsType = None, **kwargs: Any
    ) -> bool:
        """Check the condition."""

        # 在此执行你的 condition 检查
        return get_example_state() == self._state
```

### 注册条件

要在该集成的 `condition` platform 中注册 conditions，应实现 `async_get_conditions`。
每个 condition 由一个唯一字符串标识（例如下面示例中的 `"door_state"`）。

```python
async def async_get_conditions(hass: HomeAssistant) -> dict[str, type[Condition]]:
    """Return the door state conditions."""
    return {
        "door_state": DoorStateCondition,
    }
```

### 条件模式

Home Assistant 使用 `conditions.yaml` 文件来了解 condition 的结构。
该文件类似于 `triggers.yaml` 和 `services.yaml`。

例如，下面的片段展示了前面示例中描述的 `door_state` condition。

```yaml
door_state:
  fields:
    state:
      required: true
      selector:
        select:
          options:
            - "on"
            - "off"
```

### 命名条件

Conditions 遵循与 [triggers](#naming-triggers) 相同的 consistency 原则，重用集成的单一、一致的 entity type。不同之处在于，condition 测试的是当前状态，而不是命名一个事件。它以 entity type 开头，读起来像一个陈述。

#### 标题

遵循模式 `[Entity type] is [state]`：

- "Light is on"
- "Climate-control device is cooling"
- "Lock is locked"

对于否定，使用 `[Entity type] is not [state]`，例如 "Media player is not playing"。

对于基于值的 condition，使用变体 `[Entity type] [property]`，例如 "Climate-control device target temperature" 或 "Media player volume"。即使是值 condition 也应包含 entity type，并避免裸 property 名称（如 "Volume"）。

#### 描述

遵循模式 `Tests if one or more [entity type plural] are [state].`

- "Tests if one or more lights are on."
- "Tests if one or more locks are locked."

对于基于值的变体，使用 `Tests the [property] of one or more [entity type plural].`，例如 "Tests the temperature of one or more entities."

#### 键名

对所有 condition 使用 `is_` 前缀。这使得 condition 在视觉上与 triggers 和 actions 有所区分。

- **Boolean**：`is_on`、`is_off`、`is_locked`、`is_cooling`、`is_detected`。
- **Negation**：`is_not_<state>`，例如 `is_not_playing`、`is_not_low`、`is_not_detected`。
- **Mode 或特定值**：`is_hvac_mode`、`is_operation_mode`、`is_option_selected`。
- **基于值**：`is_<property>`，例如 `is_target_temperature`、`is_brightness`、`is_value`。这里也要保留 `is_` 前缀。
- **Subtypes**：`[subtype]_is_[state]`，例如 `awning_is_closed`、`blind_is_open`。
