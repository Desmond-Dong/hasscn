---
title: "设备触发器"
sidebar_label: 触发器
---

:::warning
我们目前正在探索 device automations 的替代方案。现有的 device automations 将继续工作，但新的 device automations 将不再被接受。
:::

Device triggers 是与特定设备和 event 或 state change 关联的自动化触发器。例如，"灯被打开"或"检测到水"。

Device triggers 可以由提供该设备的集成（例如 ZHA、deCONZ）提供，也可以由设备拥有实体的实体集成（例如 light、switch）提供。前者的例子是不与实体关联的 event，例如遥控器或触摸面板上的按键；后者的例子则可能是灯被打开。

若要添加 Device Triggers 支持，一个集成需要包含一个 `device_trigger.py` 文件，并完成以下工作：

- *定义 `TRIGGER_SCHEMA`*：一个代表触发器的字典，例如设备和 event 类型
- *创建触发器*：创建包含设备或实体以及按 schema 定义所支持的 event 或 state change 的字典。
- *关联触发器*：将触发器配置与一个 event 或 state change 关联，例如在 event bus 上触发的消息。
- *添加文本和翻译*：为每个触发器提供一个人类可读的名称。

不要手动应用静态 schema。如果触发器 schema 被定义为集成 `device_trigger.py` 模块中的常量，核心会自动应用该 schema。

如果触发器需要静态的 `TRIGGER_SCHEMA` 无法提供的动态校验，可以实现一个 `async_validate_trigger_config` 函数。

```py
async def async_validate_trigger_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 提供了一个模板来帮助你开始编写 device triggers。在开发环境中运行 `python3 -m script.scaffold device_trigger` 即可开始。

该模板会在你的集成文件夹中创建一个新的 `device_trigger.py` 文件和对应的测试文件。该文件包含以下函数和常量：


#### 定义 `TRIGGER_SCHEMA`

Device triggers 被定义为字典。这些字典由你的集成创建，并被你的集成消费以关联触发器。

这是一个 voluptuous schema，用于验证某个特定的触发器字典是否表示你的集成可以处理的配置。它应该扩展自 `device_automation/__init__.py` 中的 TRIGGER_BASE_SCHEMA。

```python
from homeassistant.const import (
    CONF_ENTITY_ID,
    CONF_TYPE,
)

TRIGGER_TYPES = {"water_detected", "noise_detected"}

TRIGGER_SCHEMA = TRIGGER_BASE_SCHEMA.extend(
    {
        vol.Required(CONF_TYPE): vol.In(TRIGGER_TYPES),
    }
)
```

该示例有一个 `type` 字段，指示所支持的事件类型。

#### 创建触发器

`async_get_triggers` 方法返回该设备或其关联实体所支持的触发器列表。这些是向用户暴露以供创建自动化的触发器。

```python
from homeassistant.const import (
    CONF_DEVICE_ID,
    CONF_DOMAIN,
    CONF_PLATFORM,
    CONF_TYPE,
)
from homeassistant.helpers import device_registry as dr

async def async_get_triggers(hass, device_id):
    """Return a list of triggers."""

    device_registry = dr.async_get(hass)
    device = device_registry.async_get(device_id)

    triggers = []

    # Determine which triggers are supported by this device_id ...

    triggers.append({
        # Required fields of TRIGGER_BASE_SCHEMA
        CONF_PLATFORM: "device",
        CONF_DOMAIN: "mydomain",
        CONF_DEVICE_ID: device_id,
        # Required fields of TRIGGER_SCHEMA
        CONF_TYPE: "water_detected",
    })

    return triggers
```

#### 关联触发器

要进行接线：给定一个 `TRIGGER_SCHEMA` 配置，确保在触发器被触发时调用 `action`。

例如，你可以将触发器和 action 关联到你的集成在 event bus 上触发的[事件](integration_events.md)。

```python
async def async_attach_trigger(hass, config, action, trigger_info):
    """Attach a trigger."""
    event_config = event_trigger.TRIGGER_SCHEMA(
        {
            event_trigger.CONF_PLATFORM: "event",
            event_trigger.CONF_EVENT_TYPE: "mydomain_event",
            event_trigger.CONF_EVENT_DATA: {
                CONF_DEVICE_ID: config[CONF_DEVICE_ID],
                CONF_TYPE: config[CONF_TYPE],
            },
        }
    )
    return await event_trigger.async_attach_trigger(
        hass, event_config, action, trigger_info, platform_type="device"
    )
```

返回值是一个用于解除触发器关联的函数。

#### 添加文本和翻译

Automation 用户界面会显示一个映射到 event 类型的人类可读字符串。用你支持的 trigger 类型和子类型更新 `strings.json`：

```json
{
   "device_automation": {
    "trigger_type": {
      "water_detected": "Water detected",
      "noise_detected": "Noise detected"
    }
}
```

在开发过程中测试你的翻译，请运行 `python3 -m script.translations develop`。
