添加新 platform 时需要完成的事项清单。

:::info
并非所有现有的 platforms 都遵循本清单中的要求。这不能作为不遵循它们的理由！
:::

### 0. Common

1. 遵循我们的 [Style guidelines](/developers/development_guidelines.md)
2. 使用 [`const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py) 中已有的常量
   * 只有当常量被广泛使用时才将其添加到 `const.py` 中。否则请将其保留在 platform 级别
   * 使用 `CONF_MONITORED_CONDITIONS` 代替 `CONF_MONITORED_VARIABLES`

### 1. External requirements

1. Requirements 已添加到 [`manifest.json`](/developers/creating_integration_manifest.md)。`REQUIREMENTS` 常量已弃用。
2. Requirement 版本应该被固定：`"requirements": ['phue==0.8.1']`
3. 我们不再希望 requirements 托管在 GitHub 上。请上传到 PyPi。
4. 每个 requirement 都满足 [library requirements](/developers/api_lib_index.md#basic-library-requirements)。

### 2. Configuration

1. 如果 platform 可以直接设置，添加一个 voluptuous schema 用于 [configuration validation](/developers/development_validation.md)
2. Voluptuous schema 扩展自 component 的 schema
   （例如，`hue.light.PLATFORM_SCHEMA` 扩展自 `light.PLATFORM_SCHEMA`）
3. 默认参数在 voluptuous schema 中指定，而不是在 `setup_platform(...)` 中
4. 你的 `PLATFORM_SCHEMA` 应尽可能多地使用来自 `homeassistant.const` 的通用 config keys
5. 永远不要依赖用户在 `customize` 中添加内容来配置你 platform 内部的行为。

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

### 3. Setup platform

1. 验证传入的配置（user/pass/host 等）是否有效。
2. 尽可能将你的 `add_entities` 调用分组。
3. 如果 platform 添加了额外的 actions，格式应为 `<your integration's domain>.<service action name>`。因此，如果你的 integration domain 是 "awesome\_sauce"，并且你正在制作一个 light platform，你会在 `awesome_sauce` domain 下注册 service actions。确保你的 service actions [verify permissions](/developers/auth_permissions.md#checking-permissions)。

### 4. Entity

1. 继承你要为其构建 platform 的 integration 的 entity。

   ```python
   from homeassistant.components.light import Light


   class HueLight(Light):
       """Hue light component."""
   ```

2. 避免将 `hass` 作为参数传递给 entity。`hass` 将在 entity 被添加到 Home Assistant 时被设置到 entity 上。这意味着你可以在 entity 内部通过 `self.hass` 访问 `hass`。

3. 不要在 constructor 中调用 `update()`，而是使用 `add_entities(devices, update_before_add=True)`。

4. 不要在 properties 中进行任何 I/O。改为在 `update()` 内部缓存值。

5. 处理时间时，state 和/或 attributes 不应包含某事发生以来的相对时间。相反，它应该存储 UTC timestamps。

6. 利用 [entity lifecycle callbacks](/developers/core/entity.md#lifecycle-hooks) 来附加 event listeners 或清理 connections。

### 5. 与 devices/services 通信

1. 所有与 API 相关的代码必须托管在 PyPi 上的第三方 library 的一部分。Home Assistant 应该只与 objects 交互，而不直接调用 API。

   ```python
   # bad
   status = requests.get(url("/status"))
   # good
   from phue import Bridge

   bridge = Bridge(...)
   status = bridge.status()
   ```

   [发布你自己的 PyPI package 的教程](https://towardsdatascience.com/how-to-open-source-your-first-python-package-e717444e1da0)

   其他值得注意的发布 python packages 的资源：
   [Cookiecutter Project](https://cookiecutter.readthedocs.io/)
   [flit](https://flit.readthedocs.io/)
   [Poetry](https://python-poetry.org/)
