---
title: "设备 条件"
description: '我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 状况
---
# 设备 条件

:::warning
我们目前正在探索 设备 自动化的替代方案。现有的 设备 自动化将继续工作，但新的 设备 自动化将不被接受。
:::

设备 条件允许用户检查是否满足特定条件。例如，灯亮着或地板湿了。

设备 条件被定义为字典。这些字典由您的 集成 创建，并传递给您的 集成 以创建检查条件的函数。

设备 条件可由提供 设备（例如 ZHA、deCONZ）的 集成 或 设备 具有 实体 的 实体 集成（例如光、湿度传感器）提供。
后者的一个示例是检查灯是否亮着或地板是否潮湿。

如果静态`CONDITION_SCHEMA`无法提供条件reqUIres动态验证，则可以实现`async_validate_condition_config`功能。

```py
async def async_validate_condition_config(hass: HomeAssistant, config: ConfigType) -> ConfigType:
    """Validate config."""
```

Home Assistant 包含一个用于开始使用 设备 条件的模板。首先，在开发环境 `python3 -m script.scaffold device_condition` 中运行。

该模板将在您的 集成 文件夹中创建一个新文件 `device_condition.py` 和一个匹配的测试文件。该文件包含以下函数和常量：

#### `CONDITION_SCHEMA`

这是条件的架构。基本模式应从 `homeassistant.helpers.config_validation.DEVICE_CONDITION_BASE_SCHEMA` 扩展。

#### `async_get_conditions`

```py
async def async_get_conditions(
    hass: HomeAssistant, device_id: str
) -> list[dict[str, str]]:
    """List device conditions for devices."""
```

返回此 设备 支持的条件列表。

#### `async_condition_from_config`

```py
@callback
def async_condition_from_config(
    config: ConfigType, config_validation: bool
) -> condition.ConditionCheckerType:
    """Create a function to test a device condition."""
```

从函数创建条件函数。条件函数应该是一个异步友好的回调，它评估条件并返回 `bool`。

Core 将使用 `config_validation` 参数来根据定义的 `CONDITION_SCHEMA` 有条件地应用配置验证。
