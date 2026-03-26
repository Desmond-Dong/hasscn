---
title: "创建平台的清单"
sidebar_label: 平台检查表
---

添加新平台时需要完成的检查清单。

:::info
并非所有现有平台都符合此清单中的要求，但这绝不是忽视这些要求的理由！
:::

### 0. 通用

1. 遵循我们的[开发指南](/developers/development_guidelines)
2. 使用现有常量 [`const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py)
   - 只有在某个新常量会被广泛使用时，才将其添加到 `const.py` 中；否则请保留在平台级别
   - 使用 `CONF_MONITORED_CONDITIONS`，不要使用 `CONF_MONITORED_VARIABLES`

### 1. 外部依赖

1. 在 [`manifest.json`](/developers/creating_integration_manifest) 中添加 `requirements`。`REQUIREMENTS` 常量已弃用。
2. 依赖版本必须固定，例如：`"requirements": ['phue==0.8.1']`
3. 我们不再希望依赖直接托管在 GitHub 上，请将其发布到 PyPI。
4. 每个依赖都应满足[库要求](/developers/api_lib_index#basic-library-requirements)。

### 2. 配置

1. 如果平台支持直接配置，请添加合理的[配置校验](/developers/development_validation) schema
2. 平台 schema 应从组件 schema 扩展
   （例如，`hue.light.PLATFORM_SCHEMA` 扩展 `light.PLATFORM_SCHEMA`）
3. 默认参数应在 voluptuous schema 中指定，而不是在 `setup_platform(...)` 中设置
4. 您的 `PLATFORM_SCHEMA` 应尽可能使用 `homeassistant.const` 中的通用配置键
5. 不要依赖用户在 `customize` 中添加内容来配置平台内部行为

```python
import voluptuous as vol

from homeassistant.const import CONF_FILENAME, CONF_HOST
from homeassistant.components.light import PLATFORM_SCHEMA
import homeassistant.helpers.config_validation as cv

CONF_ALLOW_UNREACHABLE = "allow_unreachable"
DEFAULT_UNREACHABLE = False

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_HOST): cv.string,
        vol.Optional(CONF_ALLOW_UNREACHABLE, default=DEFAULT_UNREACHABLE): cv.boolean,
        vol.Optional(CONF_FILENAME): cv.string,
    }
)
```

### 3. 设置平台

1. 验证传入配置（如 `user`、`pass`、`host`）是否有效。
2. 如果可能，请将调用集中在 `add_entities` 中。
3. 如果平台提供额外服务，格式应为 `<domain of your integration>.<service action name>`。例如，如果您的集成域为 `awesome_sauce`，并且您正在编写灯光平台，那么可以在 `awesome_sauce` 域下注册服务操作。请确保您的服务操作[验证权限](/developers/auth_permissions#checking-permissions)。

### 4. 实体

1. 从您要为其创建 UI 的集成实体类扩展。

    ```python
    from homeassistant.components.light import Light


    class HueLight(Light):
        """Hue light component."""
    ```

2. 不要将 `hass` 作为参数传递给实体。实体添加到 Home Assistant 后，`hass` 会自动设置到实体上，因此您可以在实体内部通过 `self.hass` 访问它。
3. 不要在构造函数中调用 `update()`，而应使用 `add_entities(devices, update_before_add=True)`。
4. 不要在属性中执行任何 I/O 操作，而应在 `update()` 中缓存值。
5. 处理时间时，状态和/或属性不应包含“自某事件发生以来经过了多久”这样的相对时间，而应存储 UTC 时间戳。
6. 使用[实体生命周期回调](/developers/core/entity#lifecycle-hooks)来附加事件监听器或清理连接。

### 5. 与设备/服务通信

1. 所有 API 特定代码都必须放在托管于 PyPI 的第三方库中。Home Assistant 应只与对象交互，而不是直接调用 API。

    ```python
    # bad
    status = requests.get(url("/status"))
    # good
    from phue import Bridge

    bridge = Bridge(...)
    status = bridge.status()
    ```

    [发布自己的 PyPI 包的教程](https://towardsdatascience.com/how-to-open-source-your-first-python-package-e717444e1da0)

其他值得参考的 Python 包发布资源：
    [Cookiecutter](https://cookiecutter.readthedocs.io/)  
    [Flit](https://flit.readthedocs.io/)  
    [Poetry](https://python-poetry.org/)  
