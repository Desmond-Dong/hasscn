# 状态

Home Assistant 会在状态机中跟踪实体的状态。状态机只有很少的要求：

* 每个状态都关联到一个由 entity id 标识的实体。这个 id 由 domain 和 object id 组成。例如 `light.kitchen_ceiling`。你可以自由组合 domain 和 object id，甚至覆盖已有状态。
* 每个状态都有一个主属性，用于描述实体的状态。以灯为例，可以是 `on` 和 `off`。你可以在状态中存储任意内容，只要它最终是字符串即可（如果不是字符串会被转换）。
* 你还可以通过设置 attributes 来存储关于实体的更多信息。Attributes 是一个字典，可以包含任何你想要的数据。唯一要求是它必须可被 JSON 序列化，因此你只能使用数字、字符串、字典和列表。

[状态对象说明。](https://www.home-assistant.io/docs/configuration/state_object/)

## 在你的组件中使用状态

下面是一个关于如何创建并设置状态的简单教程/示例。我们将在一个名为 `hello_state` 的组件中完成。这个组件的目的是在前端显示一段给定文本。

首先，创建文件 `<config dir>/custom_components/hello_state.py`，并复制下面的示例代码。

```python
"""
Support for showing text in the frontend.

For more details about this component, please refer to the documentation at
https://developers.home-assistant.io/docs/dev_101_states
"""
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = "hello_state"


def setup(hass, config):
    """Setup the Hello State component. """
    _LOGGER.info("The 'hello state' component is ready!")

    return True
```

1. 在文件头中，我们决定添加一些信息：简短描述以及文档链接。

2. 我们想做一些日志记录。因此导入 Python 的 logging 模块并创建一个别名。

3. 组件名称等于 domain 名称。

4. `setup` 函数将负责组件的初始化。
   该组件只会写入一条日志消息。请记住，日志级别有多种可选：

   * `_LOGGER.info(msg)`
   * `_LOGGER.warning(msg)`
   * `_LOGGER.error(msg)`
   * `_LOGGER.critical(msg)`
   * `_LOGGER.exception(msg)`

5. 如果一切正常，我们返回 `True`。

将该组件添加到你的 `configuration.yaml` 文件中。

```yaml
hello_state:
```

在 Home Assistant 启动或重启之后，该组件会在日志中创建一条记录。

```log
16-03-12 14:16:42 INFO (MainThread) [custom_components.hello_state] The 'hello state' component is ready!
```

下一步是引入配置选项。用户可以通过 `configuration.yaml` 向我们的组件传递配置项。要使用这些配置，我们将在 `setup` 方法中使用传入的 `config` 变量。

```python
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = "hello_state"

CONF_TEXT = "text"
DEFAULT_TEXT = "No text!"


def setup(hass, config):
    """Set up the Hello State component. """
    # Get the text from the configuration. Use DEFAULT_TEXT if no name is provided.
    text = config[DOMAIN].get(CONF_TEXT, DEFAULT_TEXT)

    # States are in the format DOMAIN.OBJECT_ID
    hass.states.set("hello_state.Hello_State", text)

    return True
```

要使用组件的最新功能，请更新 `configuration.yaml` 中的条目。

```yaml
hello_state:
  text: 'Hello, World!'
```

由于有 `DEFAULT_TEXT` 变量，即使 `configuration.yaml` 文件中未使用 `text:` 字段，该组件也能启动。很多情况下，有些变量是必填的。检查所有必需配置变量是否都已提供非常重要。如果没有提供，setup 应该失败。我们将使用 `voluptuous` 作为辅助工具来实现这一点。下面的代码片段展示了关键部分。

```python
import voluptuous as vol

import homeassistant.helpers.config_validation as cv

CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vol.Schema({vol.Required(CONF_TEXT): cv.string,})}, extra=vol.ALLOW_EXTRA
)
```

现在，如果配置中缺少 `text:`，Home Assistant 会提醒用户，并且不会设置你的组件。

在 Home Assistant 启动或重启之后，如果 `configuration.yaml` 文件是最新的，该组件就会在前端可见。

<p class='img'>
<img src='/developers/img/en/development/create-component01.png' />
</p>

若要为某个平台暴露 attributes，你需要在实体类上定义一个名为 `extra_state_attributes` 的属性，它会返回一个 attributes 字典：

```python
@property
def extra_state_attributes(self):
    """Return entity specific state attributes."""
    return self._attributes
```

:::tip
实体还有一个类似的属性 `state_attributes`，集成不应覆盖它。该属性由基础实体组件用来向状态添加标准属性集合。例如：light 组件会使用 `state_attributes` 将 brightness 添加到状态字典中。如果你正在设计一个新集成，应改为定义 `extra_state_attributes`。
:::

若要让你的集成被纳入 Home Assistant 发布版，请按照 [Submit your work](/developers/development_submitting.md) 部分所述步骤操作。基本上，你只需要将集成移动到你 fork 中的 `homeassistant/component/` 目录，并创建一个 Pull Request。
