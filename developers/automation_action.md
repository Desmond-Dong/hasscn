:::warning
我们目前正在探索设备自动化的替代方案。现有的设备自动化将继续工作，但不会接受新的设备自动化。
:::

设备动作允许用户让设备执行某个操作。例如，打开灯光或打开门。

设备动作用字典定义。这些字典由你的集成创建，并传递给你的集成以创建一个执行该动作的函数。

设备动作可以由提供该设备的集成（例如 ZHA、deCONZ）提供，也可以由该设备所属的实体集成提供（例如 light、switch）。前者的示例可以是重启设备，而后者的示例可以是打开灯光。

如果动作需要静态的 `ACTION_SCHEMA` 无法提供的动态验证，可以实现一个 `async_validate_action_config` 函数。

```py
async def async_validate_action_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 包含一个模板，供你开始编写设备动作。要开始使用，请在开发环境中运行 `python3 -m script.scaffold device_action`。

该模板会在你的集成文件夹中创建一个新的文件 `device_action.py` 以及一个对应的测试文件。该文件包含以下函数和常量：

#### `ACTION_SCHEMA`

这是动作的 schema。基础 schema 应扩展自 `homeassistant.helpers.config_validation.DEVICE_ACTION_BASE_SCHEMA`。不要手动应用 schema。如果动作 schema 被定义为集成 `device_action.py` 模块中的一个常量，核心会自动应用该 schema。

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
