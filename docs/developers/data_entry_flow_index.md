---
title: 数据录入流程
---

Data Entry Flow 是 Home Assistant 的一套数据录入流程框架。数据录入通过数据录入流程（data entry flow）完成。一个流程（flow）既可以表示简单的登录表单，也可以表示集成的多步骤设置向导。流程管理器（Flow Manager）负责管理所有进行中的流程，并处理新流程的创建。

在 Home Assistant 中，Data Entry Flow 用于登录、创建配置条目（config entry）、处理选项流程（options flow）以及修复问题。

## Flow manager

这是用于管理进行中流程（flow）的类。实例化时，需要传入两个异步回调：

```python
async def async_create_flow(handler, context=context, data=data):
    """Create flow."""
```

管理器会将配置流程处理器（config flow handler）的实例化委托给这个异步回调。这样，管理器的上层就可以自行定义如何查找处理器，以及在实例化前如何准备处理器。例如，对于配置条目管理器（config entry manager），它会确保依赖项和 requirements 已准备就绪。

```python
async def async_finish_flow(flow, result):
    """Finish flow."""
```

当某个流程（flow）完成或中止时，会调用这个异步回调，也就是 `result['type'] in [FlowResultType.CREATE_ENTRY, FlowResultType.ABORT]` 的情况。回调函数可以修改 `result` 并将其返回；如果结果类型被改成 `FlowResultType.FORM`，流程就会继续运行，并显示另一个表单。

如果结果类型是 `FlowResultType.FORM`，result 应如下所示：

```python
{
    # The result type of the flow
    "type": FlowResultType.FORM,
    # the id of the flow
    "flow_id": "abcdfgh1234",
    # handler name
    "handler": "hue",
    # name of the step, flow.async_step_[step_id] will be called when form submitted
    "step_id": "init",
    # a voluptuous schema to build and validate user input
    "data_schema": vol.Schema(),
    # an errors dict, None if no errors
    "errors": errors,
    # a detail information about the step
    "description_placeholders": description_placeholders,
}
```

如果结果类型是 `FlowResultType.CREATE_ENTRY`，result 应如下所示：

```python
{
    # Data schema version of the entry
    "version": 2,
    # The result type of the flow
    "type": FlowResultType.CREATE_ENTRY,
    # the id of the flow
    "flow_id": "abcdfgh1234",
    # handler name
    "handler": "hue",
    # title and data as created by the handler
    "title": "Some title",
    "result": {
        "some": "data"
    },
}
```

如果结果类型是 `FlowResultType.ABORT`，result 应如下所示：

```python
{
    # The result type of the flow
    "type": FlowResultType.ABORT,
    # the id of the flow
    "flow_id": "abcdfgh1234",
    # handler name
    "handler": "hue",
    # the abort reason
    "reason": "already_configured",
}
```

## Flow handler

流程处理器（Flow handler）负责处理单个流程（flow）。一个流程包含一个或多个步骤（step）。当流程被实例化后，会调用 `FlowHandler.init_step` 这一步。每一步都可能返回以下几种结果：

- [显示表单](#show-form)
- [创建条目](#create-entry)
- [中止](#abort)
- [外部步骤](#external-step--external-step-done)
- [显示进度](#show-progress--show-progress-done)
- [显示菜单](#show-menu)

至少，每个流程处理器都需要定义一个版本号和一个步骤。这个步骤不一定非得是 `init`，因为 `async_create_flow` 可以根据当前流程上下文指定 `init_step`；例如在配置流程（config flow）中，`context.source` 会被用作 `init_step`。

例如，一个最小化的配置流程（config flow）如下：

```python
from homeassistant import data_entry_flow

@config_entries.HANDLERS.register(DOMAIN)
class ExampleConfigFlow(data_entry_flow.FlowHandler):

    # The schema version of the entries that it creates
    # Home Assistant will call your migrate method if the version changes
    # (this is not implemented yet)
    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle user step."""
```

Data Entry Flow 依赖翻译来显示各个步骤中的文本。翻译存放位置取决于数据录入流程管理器（data entry flow manager）的上层。对于配置流程（config flow）和选项流程（option flow），它们分别存放在 `strings.json` 的 `config` 和 `option` 下。

有关 `strings.json` 的更详细说明，请参阅[后端翻译](/developers/internationalization/core)页面。

### Show form

这种结果类型会向用户显示一个需要填写的表单。你需要定义当前步骤、数据模式（schema，可结合 voluptuous 和/或 [selectors](https://www.home-assistant.io/docs/blueprint/selectors/) 使用），以及一个可选的错误字典。

```python
from homeassistant.data_entry_flow import section
from homeassistant.helpers.selector import selector

class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_user(self, user_input=None):
        # Specify items in the order they are to be displayed in the UI
        data_schema = {
            vol.Required("username"): str,
            vol.Required("password"): str,
            # Items can be grouped by collapsible sections
            vol.Required("ssl_options"): section(
                vol.Schema(
                    {
                        vol.Required("ssl", default=True): bool,
                        vol.Required("verify_ssl", default=True): bool,
                    }
                ),
                # Whether or not the section is initially collapsed (default = False)
                {"collapsed": False},
            )
        }

        if self.show_advanced_options:
            data_schema[vol.Optional("allow_groups")] = selector({
                "select": {
                    "options": ["all", "light", "switch"],
                }
            })

        return self.async_show_form(step_id="init", data_schema=vol.Schema(data_schema))
```

#### 输入字段分组

如上例所示，输入字段可以在视觉上按 section 进行分组。

每个 section 都有一个[可翻译的名称和描述](#labels--descriptions)，并且还可以指定图标。

按 section 对输入字段分组，既会影响输入项在界面中的展示方式，也会影响用户输入的数据结构。上面的示例中，用户输入会是这样的结构：

```python
{
    "username": "user",
    "password": "hunter2",
    "ssl_options": {
        "ssl": True,
        "verify_ssl": False,
    },
}
```

只允许单层 section；不能在 section 里面再嵌套 section。

如果要为 section 指定图标，请按以下示例更新 `icons.json`：

```json
{
  "config": {
    "step": {
      "user": {
        "sections": {
          "ssl_options": "mdi:lock"
        }
      }
    }
  }
}
```

#### 标签与描述

表单的翻译应添加到 `strings.json` 中，以 `step_id` 为 key。该对象可以包含以下 key：

|        Key         |       Value         | Notes                                                                                                                                        |
| :----------------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
|      `title`       |      表单标题       | 不要包含你的品牌名。系统会自动从 manifest 中注入。 |
|   `description`    |      表单说明       | 可选。不要链接文档，因为文档会自动链接。也不要写诸如“你可以在这里设置 X”这样的“基础”说明。 |
|       `data`       |      字段标签       | 保持简洁，并在合适时与其他集成保持一致，以获得最佳用户体验。 |
| `data_description` |      字段描述       | 可选。显示在字段下方的说明文字。 |
|     `section`      |    分组翻译         | section 的翻译。每个 section 可以有 `name`、`description`，以及其字段的 `data` 和 `data_description`。 |

有关数据录入流程（data entry flow）翻译的更多细节，请参阅[核心翻译文档](/developers/internationalization/core)。

字段标签和描述使用一个字典提供，其 key 与你的 schema 对应。下面是一个简单示例：

```json
{
  "config": {
    "step": {
      "user": {
          "title": "Add Group",
          "description": "Some description",
          "data": {
              "entities": "Entities"
          },
          "data_description": {
              "entities": "The entities to add to the group"
          },
          "sections": {
              "additional_options": {
                  "name": "Additional options",
                  "description": "A description of the section",
                  "data": {
                      "advanced_group_option": "Advanced group option"
                  },
                  "data_description": {
                      "advanced_group_option": "A very complicated option which does abc"
                  },
              }
          }
      }
    }
  }
}
```

#### 启用浏览器自动填充

假设你的集成正在收集浏览器或密码管理器可以自动填写的表单数据，例如登录凭据或联系方式。为了获得最佳用户体验和可访问性，应尽可能启用自动填充。可通过两种方式启用。

第一种方式是使用前端可识别的数据 key 的 Voluptuous schema。前端会识别键名 `"username"` 和 `"password"`，并分别添加 HTML `autocomplete` 属性值 `"username"` 和 `"current-password"`。目前自动填充支持仅限于 `"username"` 和 `"password"` 字段，主要用于让许多收集这些字段的集成无需把 schema 转成 selector 也能快速启用自动填充。

第二种方式是使用 [text selector](https://www.home-assistant.io/docs/blueprint/selectors/#text-selector)。Text selector 可以完全控制输入类型，并允许为 `autocomplete` 指定任意允许的值。一个用于收集可自动填写数据的假想 schema 如下：

```python
import voluptuous as vol
from homeassistant.const import CONF_PASSWORD, CONF_USERNAME
from homeassistant.helpers.selector import (
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_USERNAME): TextSelector(
            TextSelectorConfig(type=TextSelectorType.EMAIL, autocomplete="username")
        ),
        vol.Required(CONF_PASSWORD): TextSelector(
            TextSelectorConfig(
                type=TextSelectorType.PASSWORD, autocomplete="current-password"
       
