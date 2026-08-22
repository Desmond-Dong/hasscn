---
title: "设备条件"
sidebar_label: 条件
---

:::warning
我们目前正在探索 device automations 的替代方案。现有的 device automations 将继续工作，但新的 device automations 将不再被接受。
:::

Device conditions 允许用户检查某个条件是否满足。例如，灯是否打开，或者地面是否潮湿。

Device conditions 被定义为字典。这些字典由你的集成创建，并传回你的集成以生成一个检查条件的函数。

Device conditions 可以由提供该设备的集成（例如 ZHA、deCONZ）提供，也可以由设备拥有实体的实体集成（例如 light、humidity sensor）提供。
后者的例子可以是检查灯是否打开，或地面是否潮湿。

如果条件需要静态的 `CONDITION_SCHEMA` 无法提供的动态校验，可以实现一个 `async_validate_condition_config` 函数。

```py
async def async_validate_condition_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 提供了一个模板来帮助你开始编写 device conditions。在开发环境中运行 `python3 -m script.scaffold device_condition` 即可开始。

该模板会在你的集成文件夹中创建一个新的 `device_condition.py` 文件和对应的测试文件。该文件包含以下函数和常量：

#### `CONDITION_SCHEMA`

这是条件的 schema。基础 schema 应扩展自 `homeassistant.helpers.config_validation.DEVICE_CONDITION_BASE_SCHEMA`。

#### `async_get_conditions`

```py
async def async_get_conditions(
    hass: HomeAssistant, device_id: str
) -> list[dict[str, str]]:
    """List device conditions for devices."""
```

返回该设备支持的条件列表。

#### `async_condition_from_config`

```py
@callback
def async_condition_from_config(
    config: ConfigType, config_validation: bool
) -> condition.ConditionCheckerType:
    """Create a function to test a device condition."""
```

根据配置创建一个条件函数。条件函数应当是一个 async 友好的 callback，用于评估条件并返回一个 `bool`。

`config_validation` 参数将被核心用来根据定义的 `CONDITION_SCHEMA` 有条件地应用配置校验。
