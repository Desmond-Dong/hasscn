---
title: "设备触发器"
sidebar_label: 触发器
---

:::warning
我们目前正在探索设备自动化的替代方案。现有的设备自动化将继续工作，但不会接受新的设备自动化。
:::

设备触发器是与特定设备和某个事件或状态变更绑定的自动化触发器。例如"灯光被打开"或"检测到水"。

设备触发器可以由提供该设备的集成（例如 ZHA、deCONZ）提供，也可以由该设备所属的实体集成提供（例如 light、switch）。前者的示例是不与某个实体绑定事件，例如遥控器上的按键或触摸面板上的触摸事件；后者的示例则是灯光被打开。

要添加对设备触发器的支持，集成需要有一个 `device_trigger.py` 文件，并且需要：

- *定义一个 `TRIGGER_SCHEMA`*：一个代表触发器的字典，例如某个设备和一个事件类型
- *创建触发器*：创建包含设备或实体以及由 schema 定义的支持事件或状态变更的字典。
- *挂载触发器*：将一个触发器配置与某个事件或状态变更关联，例如事件总线（event bus）上发出的消息。
- *添加文本和翻译*：为每个触发器赋予一个人类可读的名称。

不要手动应用静态 schema。如果触发器 schema 被定义为集成 `device_trigger.py` 模块中的一个常量，核心会自动应用该 schema。

如果触发器需要静态的 `TRIGGER_SCHEMA` 无法提供的动态验证，可以实现一个 `async_validate_trigger_config` 函数。

```py
async def async_validate_trigger_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 包含一个模板，供你开始编写设备触发器。要开始使用，请在开发环境中运行 `python3 -m script.scaffold device_trigger`。

该模板会在你的集成文件夹中创建一个新的文件 `device_trigger.py` 以及一个对应的测试文件。该文件包含以下函数和常量：


#### 定义一个 `TRIGGER_SCHEMA`

设备触发器被定义为字典。这些字典由你的集成创建，并被你的集成消费，用于挂载触发器。

这是一个 voluptuous schema，用于验证某个特定的触发器字典是否代表你的集成可以处理的配置。它应该扩展自 `device_automation/__init__.py` 中的 TRIGGER_BASE_SCHEMA。

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

此示例只有一个 `type` 字段，表示所支持的事件类型。

#### 创建触发器

`async_get_triggers` 方法返回由设备或任何关联实体支持的触发器列表。这些是向用户暴露的、用于创建自动化的触发器。

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

#### 挂载触发器

要将其连接起来：给定一个 `TRIGGER_SCHEMA` 配置，确保当触发器被触发时，会调用 `action`。

例如，你可以将触发器和动作挂载到你的集成在事件总线上发出的[事件](integration_events.md)上。

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

返回值是一个用于解除触发器挂载的函数。

#### 添加文本和翻译

自动化用户界面会在设备自动化中，显示一个映射到事件类型的人类可读字符串。用你支持的触发器类型和子类型更新 `strings.json`：

```json
{
   "device_automation": {
    "trigger_type": {
      "water_detected": "Water detected",
      "noise_detected": "Noise detected"
    }
}
```

要在开发过程中测试你的翻译，请运行 `python3 -m script.translations develop`。
