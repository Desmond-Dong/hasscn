---
title: "设备动作"
sidebar_label: 动作
---

:::warning
我们目前正在探索 device automations 的替代方案。现有的 device automations 将继续工作，但新的 device automations 将不再被接受。
:::

Device actions 允许用户让设备执行某个操作。例如，打开一盏灯或打开一扇门。

Device actions 被定义为字典。这些字典由你的集成创建，并传回你的集成以生成一个执行该动作的函数。

Device actions 可以由提供该设备的集成（例如 ZHA、deCONZ）提供，也可以由设备拥有实体的实体集成（例如 light、switch）提供。
前者的例子可以是重启设备，而后者的例子可以是打开一盏灯。

如果动作需要静态的 `ACTION_SCHEMA` 无法提供的动态校验，可以实现一个 `async_validate_action_config` 函数。

```py
async def async_validate_action_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 提供了一个模板来帮助你开始编写 device actions。在开发环境中运行 `python3 -m script.scaffold device_action` 即可开始。

该模板会在你的集成文件夹中创建一个新的 `device_action.py` 文件和对应的测试文件。该文件包含以下函数和常量：

#### `ACTION_SCHEMA`

这是动作的 schema。基础 schema 应扩展自 `homeassistant.helpers.config_validation.DEVICE_ACTION_BASE_SCHEMA`。不要手动应用该 schema。如果动作 schema 被定义为集成 `device_action.py` 模块中的常量，核心会自动应用该 schema。

#### `async_get_actions`

```py
async def async_get_actions(hass: HomeAssistant, device_id: str) -> list[dict]:
    """List device actions for devices."""
```

返回该设备支持的动作列表。

#### `async_call_action_from_config`

```py
async def async_call_action_from_config(
    hass: HomeAssistant, config: dict, variables: dict, context: Context | None
) -> None:
    """Execute a device action."""
```

执行传入的动作。
