# 创建您的第一个集成

现在可以开始为您的第一个集成编写代码了。别担心，我们已经尽量把这个过程做得足够简单。在 Home Assistant 开发环境中，运行以下命令并按照提示操作：

```shell
python3 -m script.scaffold integration
```

这会为您生成一个可通过用户界面进行设置的集成所需的基础结构。更多集成示例可参考[示例仓库](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/)。

:::tip
该示例仓库展示的是位于 `<config_dir>/custom_components` 目录中的自定义集成。这类集成的[manifest 文件](/developers/creating_integration_manifest.md#版本)必须包含 `version` 字段。Core 集成位于 `homeassistant/components` 目录中，不需要 `version` 字段。两者的整体结构是相同的。
:::

## 最低

脚手架生成的集成内容会比“最低要求”更多。最低要求包括两部分：首先，定义一个保存集成域名的 `DOMAIN` 常量；其次，定义一个 setup 方法，并在设置成功时返回布尔值。

根据您的需求，使用下面两个代码块中的一个来创建 `homeassistant/components/hello_state/__init__.py`：

* 同步集成：

```python
DOMAIN = "hello_state"


def setup(hass, config):
    hass.states.set("hello_state.world", "Paulus")

    # Return boolean to indicate that initialization was successful.
    return True
```

* 如果您更倾向于异步集成：

```python
DOMAIN = "hello_state"


async def async_setup(hass, config):
    hass.states.async_set("hello_state.world", "Paulus")

    # Return boolean to indicate that initialization was successful.
    return True
```

此外，manifest 文件也是必需的，至少要包含以下键。请创建 `homeassistant/components/hello_state/manifest.json`。

```json
{
  "domain": "hello_state",
  "name": "Hello, state!"
}
```

要加载这个集成，请将 `hello_state:` 添加到 `configuration.yaml` 中。

## 脚手架提供什么

使用脚手架脚本时，生成内容会超过集成的最低要求。它通常还会包含 config flow、config flow 测试，以及为 config flow 提供国际化支持所需的基础翻译结构。
