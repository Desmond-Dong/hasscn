---
title: "状态"
---

Home Assistant 通过 state machine 跟踪 entities 的 states。State machine 的要求非常少：

- 每个 state 都与一个由 entity id 标识的 entity 相关联。这个 id 由 domain 和 object id 组成。例如 `light.kitchen_ceiling`。你可以任意组合 domain 和 object id，甚至可以覆盖现有的 states。
- 每个 state 都有一个主要属性，用于描述 entity 的 state。对于 light 来说，这可能是 "on" 和 "off"。你可以在 state 中存储任何你想要的内容，只要它是一个字符串（如果不是字符串，会被转换）。
- 你可以通过设置 attributes 来存储更多关于 entity 的信息。Attributes 是一个字典，可以包含你想要的任何数据。唯一的约束是它必须是 JSON 可序列化的，所以你只能使用数字、字符串、字典和列表。

[state 对象的描述。](https://www.home-assistant.io/docs/configuration/state_object/)

## 在 component 中使用 states

这是一个简单的教程/示例，介绍如何创建和设置 states。我们将在一个名为 "hello_state" 的 component 中进行操作。这个 component 的目的是在 frontend 中显示给定的文本。

要开始，创建文件 `<config dir>/custom_components/hello_state.py` 并复制下面的示例代码。

```python
"""
Support for showing text in the frontend.

For more details about this component, please refer to the documentation at
https://developers.home-assistant.io/docs/dev_101_states
"""
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

_LOGGER = logging.getLogger(__name__)

DOMAIN = "hello_state"


def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Hello State component."""
    _LOGGER.info("The 'hello state' component is ready!")

    return True
```

1. 在文件头部我们决定添加一些细节：一个简短的描述和指向文档的链接。
2. 我们需要做一些 logging。这意味着我们导入 Python logging 模块并创建一个别名。
3. Component 名称与 domain 名称相同。
4. `setup` 函数负责初始化我们的 component。
   该 component 只写入一条 log message。请记住以后你有多个严重性级别可选：

   - `_LOGGER.info(msg)`
   - `_LOGGER.warning(msg)`
   - `_LOGGER.error(msg)`
   - `_LOGGER.critical(msg)`
   - `_LOGGER.exception(msg)`

5. 如果一切正常，我们返回 `True`。

将 component 添加到你的 `configuration.yaml` 文件。

```yaml
hello_state:
```

在 Home Assistant 启动或重启后，该 component 会在 log 中创建一条记录。

```log
16-03-12 14:16:42 INFO (MainThread) [custom_components.hello_state] The 'hello state' component is ready!
```

下一步是引入 configuration options。用户可以通过 `configuration.yaml` 将 configuration options 传递给我们的 component。要使用它们，我们将使用传入 `setup` 方法的 `config` 变量。

```python
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

_LOGGER = logging.getLogger(__name__)

DOMAIN = "hello_state"

CONF_TEXT = "text"
DEFAULT_TEXT = "No text!"


def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Hello State component. """
    # Get the text from the configuration. Use DEFAULT_TEXT if no name is provided.
    text = config[DOMAIN].get(CONF_TEXT, DEFAULT_TEXT)

    # States are in the format DOMAIN.OBJECT_ID
    hass.states.set("hello_state.Hello_State", text)

    return True
```

要使用我们 component 的最新特性，请更新 `configuration.yaml` 文件中的条目。

```yaml
hello_state:
  text: 'Hello, World!'
```

得益于 `DEFAULT_TEXT` 变量，即使 `configuration.yaml` 文件中没有使用 `text:` 字段，该 component 也能正常启动。很多时候有些变量是必需的。重要的是检查所有必需的 configuration variables 是否都已提供。如果没有，setup 应该失败。我们将使用 `voluptuous` 作为 helper 来实现这一点。下面的列表展示了关键部分。

```python
import voluptuous as vol

import homeassistant.helpers.config_validation as cv

CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vol.Schema({vol.Required(CONF_TEXT): cv.string,})}, extra=vol.ALLOW_EXTRA
)
```

现在，当 config 中缺少 `text:` 时，Home Assistant 会提醒用户，而不会 setup 你的 component。

在 Home Assistant 启动或重启后，如果 `configuration.yaml` 文件已更新，该 component 将在 frontend 中可见。

<p class='img'>
<img src='/img/en/development/create-component01.png' />
</p>

要为一个 platform 暴露 attributes，你需要在 entity 类上定义一个名为 `extra_state_attributes` 的 property，它会返回一个 attributes 字典：

```python
@property
def extra_state_attributes(self):
    """Return entity specific state attributes."""
    return self._attributes
```

:::tip
Entities 也有一个类似的 property `state_attributes`，integration 不应覆盖它。该 property 由 base entity components 使用，用于向 state 添加标准的一组 attributes。例如：light component 使用 `state_attributes` 向 state 字典中添加亮度。如果你在设计一个新的 integration，你应该改为定义 `extra_state_attributes`。
:::

要让你的 integration 被包含在 Home Assistant 的 releases 中，请按照 [Submit your work](development_submitting.md) 部分描述的步骤操作。基本上你只需要将 integration 移动到你 fork 的 `homeassistant/component/` 目录，并创建一个 Pull Request。