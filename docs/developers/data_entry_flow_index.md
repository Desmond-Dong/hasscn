---
title: 数据条目流程
---

Data Entry Flow 是 Home Assistant 的一部分，一个数据录入框架。数据录入通过 data entry flows 完成。一个 flow 可以表示一个简单的登录表单，也可以表示为 component 提供的多步骤 setup wizard。Flow Manager 管理所有进行中的 flows，并处理新 flows 的创建。

Data Entry Flow 在 Home Assistant 中用于登录、创建 config entries、处理 options flow、修复 issues。

## Flow 管理器

这是一个管理进行中 flows 的类。在实例化它时，你需要传入两个 async callbacks：

```python
async def async_create_flow(handler, context=context, data=data):
    """Create flow."""
```

该 manager 通过此 async callback 将 config flow handlers 的实例化委托给调用方。这让 manager 的父级可以定义自己的方式来查找 handlers 并为实例化准备 handler。例如，在 config entry manager 的情况下，它会确保 dependencies 和 requirements 已设置好。

```python
async def async_finish_flow(flow, result):
    """Finish flow."""
```

当一个 flow 完成或被中止时，会调用此 async callback，即 `result['type'] in [FlowResultType.CREATE_ENTRY, FlowResultType.ABORT]`。该 callback 函数可以修改 result 并将其返回，如果 result type 变成了 `FlowResultType.FORM`，flow 会继续运行，显示另一个表单。

如果 result type 是 `FlowResultType.FORM`，result 应如下所示：

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

如果 result type 是 `FlowResultType.CREATE_ENTRY`，result 应如下所示：

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

如果 result type 是 `FlowResultType.ABORT`，result 应如下所示：

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

## Flow 处理器

Flow handlers 处理单个 flow。一个 flow 包含一个或多个 steps。当一个 flow 被实例化时，会调用 `FlowHandler.init_step` step。每个 step 都有几种可能的结果：

- [显示表单（Show Form）](#show-form)
- [创建条目（Create Entry）](#create-entry)
- [中止（Abort）](#abort)
- [外部步骤（External Step）](#external-step--external-step-done)
- [显示进度（Show Progress）](#show-progress--show-progress-done)
- [显示菜单（Show Menu）](#show-menu)

每个 flow handler 至少需要定义一个版本号和一个 step。这个 step 不一定是 `init`，因为 `async_create_flow` 可以根据当前工作流分配 `init_step`，例如在 configuration 中，`context.source` 会被用作 `init_step`。

例如，最基本的 config flow 如下：

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

Data entry flows 依赖 translations 来显示 steps 中的文本。这取决于 data entry flow manager 的父级决定存储在哪里。对于 config 和 option flows，分别存储在 `strings.json` 的 `config` 和 `option` 下。

关于 `strings.json` 的更详细解释，请参阅 [backend translation](/developers/internationalization/core) 页面。

### 显示表单（Show form）

这种 result type 会向用户显示一个需要填写的表单。你定义当前 step、数据 schema（使用 voluptuous 和/或 [selectors](https://www.home-assistant.io/docs/blueprint/selectors/) 的混合）以及可选的错误字典。

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

#### 输入字段的分组

如上例所示，输入字段可以在 sections 中按视觉进行分组。

每个 section 都有一个 [可翻译的 name 和 description](#labels--descriptions)，还可以指定一个 icon。

将输入字段按 section 分组会影响向用户展示输入的方式，也会影响用户输入的 structure。
在上面的例子中，用户输入的 structure 如下：

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

只允许单层 sections；不允许在 section 内嵌套 section。

要为某个 section 指定 icon，请按照下面的示例更新 `icons.json`：

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

表单的 translations 添加到 `strings.json` 中，key 为对应的 `step_id`。该 object 可以包含以下 keys：

|        Key         |       Value         | Notes                                                                                                                                        |
| :----------------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
|      `title`       |    Form heading     | 不要包含你的品牌名称，它会自动从 manifest 中注入。                                                                                          |
|   `description`    | Form instructions   | 可选。不要链接到文档，因为那会自动链接。不要包含 "可以在这里设置 X" 这类的基本信息。                |
|       `data`       |    Field labels     | 保持简洁，并在适当的时候与其他 integrations 保持一致，以提供最佳的用户体验。                        |
| `data_description` | Field descriptions  | 可选的说明文本，显示在字段下方。                                                                                                             |
|     `section`      | Section translation | Sections 的 translations，每个 section 可以有该 section 的 `name` 和 `description`，以及其字段的 `data` 和 `data_description`。             |

关于翻译 data entry flows 的更多细节，可以在 [core translations documentation](/developers/internationalization/core) 中找到。

字段 labels 和 descriptions 以一个字典形式提供，其 keys 对应你的 schema。下面是一个简单的示例：

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

假设你的 integration 正在收集表单数据，而这些数据可以由浏览器或密码管理器自动填充，比如登录凭据或联系信息。你应该尽可能启用自动填充，以提供最佳的用户体验和可访问性。有两种方式可以启用它。

第一种方式是使用 Voluptuous，并使用 frontend 可识别的 data keys。Frontend 会识别 `"username"` 和 `"password"` keys，并分别添加值为 `"username"` 和 `"current-password"` 的 HTML `autocomplete` 属性。Autocomplete 的支持仅限于 `"username"` 和 `"password"` 字段，主要是为了让许多收集这些字段的 integrations 能够快速启用自动填充，而不需要将它们的 schemas 转换为 selectors。

第二种方式是使用 [text selector](https://www.home-assistant.io/docs/blueprint/selectors/#text-selector)。Text selector 可以完全控制 input type，并允许指定 `autocomplete` 的任何允许值。一个收集特定可填充数据的假设 schema 可能如下：

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
            )
        ),
        vol.Required("postal_code"): TextSelector(
            TextSelectorConfig(type=TextSelectorType.TEXT, autocomplete="postal-code")
        ),
        vol.Required("mobile_number"): TextSelector(
            TextSelectorConfig(type=TextSelectorType.TEL, autocomplete="tel")
        ),
    }
)
```

#### 默认值与建议值

如果你想在表单中预填数据，你有两种选择。第一种是使用 `default` 参数。这既会预填该字段，又会在用户留空该字段时作为默认值。

```python
    data_schema = {
        vol.Optional("field_name", default="default value"): str,
    }
```

另一种选择是使用 suggested value——这也会预填表单字段，但允许用户在需要时将其留空。

```python
    data_schema = {
        vol.Optional(
            "field_name", description={"suggested_value": "suggested value"}
        ): str,
    }
```

你也可以将两者混合使用——通过 `suggested_value` 预填，并在字段留空时使用另一个 `default` 值，但这可能会让用户感到困惑，请谨慎使用。

使用 suggested values 还可以声明一个静态 schema，并从现有输入中合并 suggested values。`add_suggested_values_to_schema` helper 可以做到这一点：

```python
OPTIONS_SCHEMA = vol.Schema(
    {
        vol.Optional("field_name", default="default value"): str,
    }
)

class ExampleOptionsFlow(config_entries.OptionsFlow):
    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        return self.async_show_form(
            data_schema = self.add_suggested_values_to_schema(
                OPTIONS_SCHEMA, self.entry.options
            )
        )
```

注意：对于 select 类型的输入（由 `vol.In(...)` schema 创建），如果没有指定 `default`，则 frontend 会默认选择第一个选项。

#### 显示只读信息

某些 integrations 的 options 在初始配置后会被冻结。在显示 options flow 时，你可以以只读方式展示这些信息，以便用户记住在初始配置时选择了哪些 options。为此，像往常一样定义一个可选 selector，但将 `read_only` 标志设置为 `True`。

```python
# Example Config Flow Schema
DATA_SCHEMA_SETUP = vol.Schema(
    {
        vol.Required(CONF_ENTITY_ID): EntitySelector()
    }
)

# Example Options Flow Schema
DATA_SCHEMA_OPTIONS = vol.Schema(
    {
        vol.Optional(CONF_ENTITY_ID): EntitySelector(
            EntitySelectorConfig(read_only=True)
        ),
        vol.Optional(CONF_TEMPLATE): TemplateSelector(),
    }
)
```

这会在启动 options flow 时，将初始配置中选中的 entity 作为只读属性显示。

#### 验证

用户填写完表单后，step 方法会被再次调用，并传入用户输入。只有当用户输入通过你的 data schema 时，你的 step 才会被调用。当用户传入 data 时，你需要对 data 进行额外的验证。例如，你可以验证传入的 username 和 password 是否有效。

如果有问题，你可以返回一个包含 errors 的字典。错误字典中的每个 key 都对应包含错误信息的字段名称。如果你想显示一个与特定字段无关的错误，请使用 key `base`。所指定的 errors 需要引用 translation 文件中的一个 key。

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_user(self, user_input=None):
        errors = {}
        if user_input is not None:
            # Validate user input
            valid = await is_valid(user_input)
            if valid:
                # See next section on create entry usage
                return self.async_create_entry(...)

            errors["base"] = "auth_error"

        # Specify items in the order they are to be displayed in the UI
        data_schema = {
            vol.Required("username"): str,
            vol.Required("password"): str,
        }

        return self.async_show_form(
            step_id="init", data_schema=vol.Schema(data_schema), errors=errors
        )
```

#### 多步骤 flows

如果用户输入通过了验证，你可以再次返回其中一种可能的 step types。如果你要引导用户进入下一个 step，请返回该 step 的返回值：

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_init(self, user_input=None):
        errors = {}
        if user_input is not None:
            # Validate user input
            valid = await is_valid(user_input)
            if valid:
                # Store info to use in next step
                self.init_info = user_input
                # Return the form of the next step
                return await self.async_step_account()

        ...
```

### 创建条目（Create entry）

当 result 为 "Create Entry" 时，会创建一个条目并传递给 flow manager 的父级。会向用户显示一条成功消息，flow 即告完成。你通过传入 title、data 以及可选的 options 来创建条目。Title 可以在 UI 中用于向用户指示这是哪个条目。Data 和 options 可以是任何数据类型，只要它们可 JSON 序列化。Options 用于可变 data，例如 radius。而 Data 用于不会在 entry 中更改的不可变 data，例如 location data。

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_user(self, user_input=None):
        return self.async_create_entry(
            title="Title of the entry",
            data={
                "username": user_input["username"],
                "password": user_input["password"]
            },
            options={
                "mobile_number": user_input["mobile_number"]
            },
        )
```

注意：用户可以更改密码，这在技术上是可变 data，但对于更改 authentication credentials，你需要使用 [reauthentication](/developers/core/integration/config_flow#reauthentication)，它可以修改 config entry data。

### 中止（Abort）

当一个 flow 无法完成时，你需要中止它。这会结束 flow 并通知用户 flow 已完成。一个 flow 无法完成的原因可能是设备已经被配置，或者与 Home Assistant 不兼容。

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_user(self, user_input=None):
        return self.async_abort(reason="not_supported")
```

### 外部步骤 & 外部步骤完成（External step & external step done）

有时用户需要通过在外部网站上执行操作来完成 config flow。例如，通过重定向到外部网页来设置一个 integration。这通常由使用 OAuth2 来授权用户的 integrations 使用。

_这个示例是关于 config entries 的，但同样适用于使用 data entry flows 的其他部分。_

流程如下：

1. 用户在 Home Assistant 中启动 config flow。
2. Config flow 提示用户在外部网站上完成 flow。
3. 用户打开外部网站。
4. 外部步骤完成后，用户的浏览器会被重定向到 Home Assistant 的一个 endpoint，以传递响应。
5. Endpoint 验证响应，验证通过后，将外部步骤标记为完成，并返回用于关闭窗口：`<script>window.close()</script>` 的 JavaScript 代码。

    为了能够将外部步骤的结果路由到 Home Assistant endpoint，你需要确保 config flow ID 包含在内。如果你的外部步骤是一个 OAuth2 flow，你可以利用 oauth2 state 来实现这一点。这是一个不被 authorization 页面解释、而是原样传递给 Home Assistant endpoint 的变量。

6. 窗口关闭，Home Assistant 带有 config flow 的用户界面会再次显示给用户。
7. 当外部步骤被标记为完成时，config flow 会自动推进到下一个 step。用户会被提示进入下一个 step。

包含外部步骤的示例 configuration flow。

```python
from homeassistant import config_entries

@config_entries.HANDLERS.register(DOMAIN)
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    VERSION = 1
    data = None

    async def async_step_user(self, user_input=None):
        if not user_input:
            return self.async_external_step(
                step_id="user",
                url=f"https://example.com/?config_flow_id={self.flow_id}",
            )

        self.data = user_input
        return self.async_external_step_done(next_step_id="finish")

    async def async_step_finish(self, user_input=None):
        return self.async_create_entry(title=self.data["title"], data=self.data)
```

在返回 `async_mark_external_step_done` 之前，不要根据外部步骤的 data 执行工作。相反，应该在标记外部步骤完成时，将其作为 `next_step_id` 引用的那个 step 中执行工作。这会在执行工作期间在 UI 中显示一个 spinner，从而提供更好的用户体验。

如果你把工作在 authorize callback 内部执行，用户会一直盯着空白屏幕，直到数据转发完成，窗口突然关闭。如果你在标记外部步骤完成之前执行工作，用户仍然会看到带有 "Open external website" 按钮的表单，同时后台工作正在进行。这也令人不快。

用于标记外部步骤为完成的示例代码：

```python
from homeassistant import data_entry_flow


async def handle_result(hass, flow_id, data):
    result = await hass.config_entries.async_configure(flow_id, data)

    if result["type"] == data_entry_flow.FlowResultType.EXTERNAL_STEP_DONE:
        return "success!"
    else:
        return "Invalid config flow specified"
```

### 显示进度 & 显示进度完成（Show progress & show progress done）

如果一个 data entry flow step 需要相当长的时间才能完成，我们应该告知用户。

_这个示例是关于 config entries 的，但同样适用于使用 data entry flows 的其他部分。_

流程如下：

1. 用户在 Home Assistant 中启动 config flow。
2. Config flow 创建一个 `asyncio.Task` 来执行长时间运行的任务。
3. Config flow 通过调用 `async_show_progress` 并传入 `asyncio.Task` object 来告知用户一个任务正在进行中，并且需要一些时间才能完成。Flow 应该将一个与任务特定的字符串作为 `progress_action` 参数传递，以表示提示信息的翻译文本。
4. 任务完成后，config flow 会被自动调用，但也可以在任务完成之前被调用，例如当 frontend 重新加载时。
   * 如果任务尚未完成，flow 不应再创建另一个任务，而是再次调用 `async_show_progress`。
   * 如果任务已完成，flow 必须调用 `async_show_progress_done`，指示下一个 step
5. 每次我们调用 show progress 或 show progress done 时，frontend 都会更新。
6. 当 progress 被标记为完成时，config flow 会自动推进到下一个 step。用户会被提示进入下一个 step。
7. 任务可以选择性地调用 `async_update_progress(progress)`，其中 progress 是一个介于 0 和 1 之间的 float，表示任务的完成程度。

包含两个顺序 progress 任务的示例 configuration flow。

```python
import asyncio

from homeassistant import config_entries
from .const import DOMAIN

class TestFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1
    task_one: asyncio.Task | None = None
    task_two: asyncio.Task | None = None

    async def async_step_user(self, user_input=None):
        uncompleted_task: asyncio.Task[None] | None = None

        if not self.task_one:
            coro = asyncio.sleep(10)
            self.task_one = self.hass.async_create_task(coro)
        if not self.task_one.done():
            progress_action = "task_one"
            uncompleted_task = self.task_one
        if not uncompleted_task:
            if not self.task_two:
                self.async_update_progress(0.5) # tell frontend we are 50% done
                coro = asyncio.sleep(10)
                self.task_two = self.hass.async_create_task(coro)
            if not self.task_two.done():
                progress_action = "task_two"
                uncompleted_task = self.task_two
        if uncompleted_task:
            return self.async_show_progress(
                progress_action=progress_action,
                progress_task=uncompleted_task,
            )

        return self.async_show_progress_done(next_step_id="finish")

    async def async_step_finish(self, user_input=None):
        if not user_input:
            return self.async_show_form(step_id="finish")
        return self.async_create_entry(title="Some title", data={})
```

### 显示菜单（Show menu）

这会将一个 navigation menu 显示给用户，方便选择下一个 step。Menu labels 可以通过指定一个 `{step_id: label}` 字典硬编码，或者在指定一个列表时，通过 `strings.json` 中的 "menu_options" 进行翻译。此外，menu descriptions 可以通过 `strings.json` 中的 "menu_option_descriptions" 提供。

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_user(self, user_input=None):
        return self.async_show_menu(
            step_id="user",
            menu_options=["discovery", "manual"],
            description_placeholders={
                "model": "Example model",
            }
        )
        # Example showing the other approach
        return self.async_show_menu(
            step_id="user",
            menu_options={
                "option_1": "Option 1",
                "option_2": "Option 2",
            }
        )
```

```json
{
  "config": {
    "step": {
      "user": {
        "menu_options": {
          "discovery": "Discovery",
          "manual": "Manual ({model})",
        },
        "menu_option_descriptions": {
          "discovery": "Description of discovery",
          "manual": "Description of manual",
        }
      }
    }
  }
}
```

向 `async_show_menu` 传递 `sort=True` 还会按照用户语言对 menu items 的 label 进行排序。

## 从外部源初始化 config flow

你可能希望通过编程方式初始化一个 config flow。例如，当我们在网络上发现一个需要用户交互才能完成 setup 的设备时。为此，在初始化 flow 时传入一个 source 参数以及可选的用户输入：

```python
await flow_mgr.async_init(
    "hue", context={"source": data_entry_flow.SOURCE_DISCOVERY}, data=discovery_info
)
```

Config flow handler 不会从 `init` step 开始。相反，它会用一个与 source 相等的 step 名称来实例化。该 step 应该遵循与正常 step 相同的返回值。

```python
class ExampleConfigFlow(data_entry_flow.FlowHandler):
    async def async_step_discovery(self, info):
        """Handle discovery info."""
```

Config flow 的 source 在 `FlowHandler` 上以 `self.source` 的形式提供。