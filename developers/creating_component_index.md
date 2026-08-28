好了，是时候为你的集成编写第一段代码了。太棒了！不用担心，我们已经尽力让它尽可能简单。在 Home Assistant 开发环境中，输入以下命令并按照提示操作：

```shell
python3 -m script.scaffold integration
```

这将为你准备好通过用户界面设置集成所需的一切。更多的集成示例可从[我们的示例仓库](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/)中获得。

:::tip
这个示例仓库展示了存放在 `<config_dir>/custom_components` 目录中的自定义集成。它们必须在[清单文件](/developers/creating_integration_manifest.md#version)中包含 `version` 键。核心集成存放在 `homeassistant/components` 目录中，不需要 `version` 键。两种情况下的架构是相同的。
:::

## 最低要求

scaffold 集成比最低要求略多一些。最低要求是定义一个包含集成 domain 的 `DOMAIN` 常量。第二个部分是它需要定义一个 setup 方法，如果设置成功则返回一个布尔值。

根据你的需求，创建文件 `homeassistant/components/hello_state/__init__.py` 并使用以下两个代码块之一：

* 同步 component：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

DOMAIN = "hello_state"


def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.states.set("hello_state.world", "Paulus")

    # 返回布尔值表示初始化成功。
    return True
```

* 如果你更喜欢异步 component：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

DOMAIN = "hello_state"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.states.async_set("hello_state.world", "Paulus")

    # 返回布尔值表示初始化成功。
    return True
```

此外，还需要一个 manifest 文件，最低要求包含以下键。创建 `homeassistant/components/hello_state/manifest.json`。

```json
{
  "domain": "hello_state",
  "name": "Hello, state!"
}
```

要加载它，在 `configuration.yaml` 文件中添加 `hello_state:`。

## scaffold 提供的功能

使用 scaffold 脚本时，它将超过集成的最低要求。它将包含 config flow、config flow 的测试以及基本的翻译基础设施，为你的 config flow 提供国际化支持。
