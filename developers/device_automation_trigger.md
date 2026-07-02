# 设备 触发器

:::warning
我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。
:::

设备 触发器是与特定 设备 以及事件或状态更改关联的自动化触发器。例如“灯打开”或“检测到水”。

设备 触发器可以由提供 设备（例如 ZHA、deCONZ）的 集成 或 设备 具有 实体 的 实体 集成（例如灯、开关）提供。前者的一个示例是与 ZX​​QPH4ZXQ 无关的事件，例如遥控器或触摸面板上的按键按下，而后者的一个示例可能是灯已打开。

要添加对 设备 触发器的支持，集成 需要有 `device_trigger.py` 以及：

* *定义一个`TRIGGER_SCHEMA`*：代表触发器的字典，比如设备和事件类型
* *创建触发器*：创建包含 设备 或 实体 以及架构定义的受支持事件或状态更改的字典。
* *附加触发器*：将触发器配置与事件或状态更改相关联，例如在事件总线上触发的消息。
* *添加文本和翻译*：为每个触发器指定一个人类可读的名称。

不要手动应用静态架构。如果触发器架构被定义为 集成 的 `device_trigger.py` 模块中的常量，则 Core 将应用该架构。

如果触发reqUIres动态验证静态`TRIGGER_SCHEMA`无法提供，则可以实现`async_validate_trigger_config`功能。

```py
async def async_validate_trigger_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 包含一个用于开始使用 设备 触发器的模板。首先，在开发环境 `python3 -m script.scaffold device_trigger` 中运行。

该模板将在您的 集成 文件夹中创建一个新文件 `device_trigger.py` 和一个匹配的测试文件。该文件包含以下函数和常量：

#### 定义一个`TRIGGER_SCHEMA`

设备 触发器被定义为字典。这些字典由您的 集成 创建，并由您的 集成 消耗以附加触发器。

这是一个华丽的模式，用于验证特定的触发器字典是否代表您的 集成 可以处理的配置。这应该从 `device_automation/__init__.py` 扩展 TRIGGER\_BASE\_SCHEMA。

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

此示例有一个 `type` 字段，指示支持的事件类型。

#### 创建触发器

`async_get_triggers` 方法返回 设备 或任何关联的 实体 支持的触发器列表。这些是向用户公开的用于创建自动化的触发器。

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

#### 连接触发器

连接它：给定 `TRIGGER_SCHEMA` 配置，确保触发触发器时调用 `action`。

例如，您可以将触发器和操作附加到[已触发的事件](/developers/integration_events.md)通过您的 集成 乘坐活动巴士。

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

返回值是一个分离触发器的函数。

#### 添加文本和翻译

自动化用户界面将在映射到事件类型的 设备 自动化中显示人类可读的字符串。  使用您支持的触发器类型和子类型更新 `strings.json`：

```json
{
   "device_automation": {
    "trigger_type": {
      "water_detected": "Water detected",
      "noise_detected": "Noise detected"
    }
}
```

要在开发过程中测试您的翻译，请运行 `python3 -m script.translations develop`。
