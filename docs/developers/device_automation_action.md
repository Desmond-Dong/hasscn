---
title: "设备 动作"
description: '我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 行动
---
# 设备 动作

:::warning
我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。
:::

设备 操作允许用户让 设备 执行某些操作。例如打开灯或打开门。

设备 操作被定义为字典。这些字典由您的 集成 创建，并传递给您的 集成 以创建执行操作的函数。

设备 动作可以由提供 设备（例如 ZHA、deCONZ）的 集成 或 设备 具有 实体 的 实体 集成（例如灯、开关）来提供。
前者的示例可以是重新启动 设备，而后者的示例可以是打开灯。

如果静态`ACTION_SCHEMA`无法提供action reqUIres动态验证，则可以实现`async_validate_action_config`功能。

```py
async def async_validate_action_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 包含一个用于开始使用 设备 操作的模板。首先，在开发环境 `python3 -m script.scaffold device_action` 中运行。

该模板将在您的 集成 文件夹中创建一个新文件 `device_action.py` 和一个匹配的测试文件。该文件包含以下函数和常量：

#### `ACTION_SCHEMA`

这是操作的架构。基本模式应从 `homeassistant.helpers.config_validation.DEVICE_ACTION_BASE_SCHEMA` 扩展。不要手动应用架构。如果操作模式在 集成 的 `device_action.py` 模块中定义为常量，则 Core 将应用该模式。

#### `async_get_actions`

```py
async def async_get_actions(hass: HomeAssistant, device_id: str) -> list[dict]:
    """List device actions for devices."""
```

返回此 设备 支持的操作列表。

#### `async_call_action_from_config`

```py
async def async_call_action_from_config(
    hass: HomeAssistant, config: dict, variables: dict, context: Context | None
) -> None:
    """Execute a device action."""
```

执行传入的操作。
