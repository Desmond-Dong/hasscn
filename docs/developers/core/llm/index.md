---
title: "面向大型语言模型的 Home Assistant API"
sidebar_label: "LLM API"
---

Home Assistant 可以与大型语言模型（LLMs）交互。通过将 Home Assistant API 暴露给 LLM，LLM 可以获取数据或控制 Home Assistant 以更好地协助用户。Home Assistant 自带内置的 LLM API，但 custom integrations 可以注册自己的 API 以提供额外功能。

## 内置 Assist API

Home Assistant 具有内置的 API，可将 Assist API 暴露给 LLMs。此 API 允许 LLMs 通过 [intents](../../intent_builtin) 与 Home Assistant 交互，并可以通过注册 intents 来扩展。

Assist API 等同于内置 conversation agent 也能访问的 capabilities 和 exposed entities。无法执行任何管理任务。

## 贡献工具

集成可以向 LLM API 贡献 tools，而无需拥有完整的 API。`llm` 集成发现 `<integration>/llm.py` platform，该 platform 暴露 `async_get_tools` hook。该 platform 被延迟导入，仅在 LLM 请求需要其 tools 时才被查询。

`async_get_tools` 是一个回调，对每个请求根据请求的 `LLMContext` 和被组装 API 的 `api_id` 进行评估。它返回要暴露的 tools，以及一个与该 tools 一起传输的可选 prompt fragment；如果集成没有为某个 API 贡献内容，则返回 `None`。因为它按请求运行，所以它可以根据上下文返回不同的 tools 集合，例如发起请求的 assistant 或 device，或所选 API。

```python
# example_integration/llm.py
from homeassistant.components import llm
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.llm import LLMContext


@callback
def async_get_tools(
    hass: HomeAssistant, llm_context: LLMContext, api_id: str
) -> llm.LLMTools | None:
    """Return the tools to expose to the LLM."""
    return llm.LLMTools(
        tools=[MyTool()],
        prompt="Use MyTool to ...",  # Optional prompt fragment
    )
```

该 hook 仅在 `llm` 集成设置完成后才被调用，因此 platform 本身不需要依赖于 `llm`。

请参阅 [Tools](#tools) 了解如何实现 platform 返回的 `Tool` 对象。

## 支持 LLM API

LLM API 需要在集成中的两个位置进行集成。用户需要能够配置使用哪些 APIs，并在与 LLM 交互时将 APIs 提供的 tools 传递给 LLM。

### 选项流程

所选的 API 应存储在 config entry options 中。它应持有所选 API ID 的字符串或列表（如有）。如果没有选择 API，则必须省略该 key。

在 options flow 中，应向用户提供 selector 以选择使用哪个 API。

```python
from types import MappingProxyType

from homeassistant.const import CONF_LLM_HASS_API
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import llm
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
)


@callback
def async_get_options_schema(
    hass: HomeAssistant,
    options: MappingProxyType[str, Any],
) -> vol.Schema:
    """Return the options schema."""
    apis: list[SelectOptionDict] = [
        SelectOptionDict(
            label=api.name,
            value=api.id,
        )
        for api in llm.async_get_apis(hass)
    ]

    return vol.Schema(
        {
            vol.Optional(
                CONF_LLM_HASS_API,
                description={"suggested_value": options.get(CONF_LLM_HASS_API)},
            ): SelectSelector(SelectSelectorConfig(options=apis, multiple=True)),
        }
    )
```


### 获取工具

在与 LLM 交互时，提供的 `ChatLog` 将从所选 API 提供任何 selected tools，conversation entity 应将它们与 API 提供的额外 prompt 一起传递给 LLM。

```python
from homeassistant.const import CONF_LLM_HASS_API, CONF_PROMPT
from homeassistant.core import HomeAssistant, callback
from homeassistant.components import conversation
from homeassistant.helpers import intent, llm
from .const import DOMAIN


class MyConversationEntity(conversation.ConversationEntity):

    def __init__(self, entry: ConfigEntry) -> None:
        """Initialize the agent."""
        self.entry = entry

    ...

    async def _async_handle_message(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
    ) -> conversation.ConversationResult:
        """Call the API."""

        try:
            await chat_log.async_provide_llm_data(
                user_input.as_llm_context(DOMAIN),
                self.entry.options.get(CONF_LLM_HASS_API),
                self.entry.options.get(CONF_PROMPT),
                user_input.extra_system_prompt,
            )
        except conversation.ConverseError as err:
            return err.as_conversation_result()

        tools: list[dict[str, Any]] | None = None
        if chat_log.llm_api:
            tools = [
                _format_tool(tool)  # TODO format the tools as your LLM expects
                for tool in chat_log.llm_api.tools
            ]

        messages = [
            m
            for content in chat_log.content
            for m in _convert_content(content)  # TODO format messages
        ]

        # 与 LLM 交互并传递 tools
        request = user_input.text
        for _iteration in range(10):
            response = ... # 向 LLM 发送请求并获取流式响应

            messages.extend(
                [
                    _convert_content(content)  # TODO format messages
                    async for content in chat_log.async_add_delta_content_stream(
                        user_input.agent_id, _transform_stream(response)  # TODO call tools and stream responses
                    )
                ]
            )

            if not chat_log.unresponded_tool_results:
                break

        # 向用户发送最终响应
        intent_response = intent.IntentResponse(language=user_input.language)
        intent_response.async_set_speech(chat_log.content[-1].content or "")
        return conversation.ConversationResult(
            response=intent_response,
            conversation_id=chat_log.conversation_id,
            continue_conversation=chat_log.continue_conversation,
        )
```

## 创建你自己的 API

要创建自己的 API，需要创建一个继承自 `API` 的类，并实现 `async_get_api_instance` 方法。它返回一个 `APIInstance`，其中包含代表你想要暴露给 LLM 的功能的 `Tool` 对象列表，以及告诉 LLM 如何使用它们的 prompt。

### 工具

`llm.Tool` 类表示 LLM 可以调用的工具。

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers import llm
from homeassistant.helpers.llm import LLMContext, ToolInput
from homeassistant.util import dt as dt_util
from homeassistant.util.json import JsonObjectType


class TimeTool(llm.Tool):
    """Tool to get the current time."""

    name = "GetTime"
    description = "Returns the current time."

    # 可选。输入参数的 voluptuous schema。
    parameters = vol.Schema({
      vol.Optional('timezone'): str,
    })

    async def async_call(
        self, hass: HomeAssistant, tool_input: ToolInput, llm_context: LLMContext
    ) -> JsonObjectType:
        """Call the tool."""
        if "timezone" in tool_input.tool_args:
            tzinfo = dt_util.get_time_zone(tool_input.tool_args["timezone"])
        else:
            tzinfo = dt_util.DEFAULT_TIME_ZONE

        return {"time": dt_util.now(tzinfo).isoformat()}
```

`llm.Tool` 类具有以下属性：

| Name                | Type       | Description                                                                                                    |
|---------------------|------------|----------------------------------------------------------------------------------------------------------------|
| `name`              | string     | 工具的名称。必需。                                                                                              |
| `description`       | string     | 工具的描述，帮助 LLM 理解何时以及如何调用它。可选，但推荐。                                                      |
| `parameters`        | vol.Schema | 参数的 voluptuous schema。默认为 vol.Schema({})                                                                 |

`llm.Tool` 类具有以下方法：

#### `async_call`

当被 LLM 调用时执行工具的实际操作。这必须是一个 async 方法。其参数为 `hass`、`llm.ToolInput` 实例以及请求的 `llm.LLMContext`。

响应数据必须是 dict 且可序列化为 JSON [`homeassistant.util.json.JsonObjectType`](https://github.com/home-assistant/core/blob/dev/homeassistant/util/json.py)。

错误必须作为 `HomeAssistantError` 异常（或其子类）抛出。响应数据不应包含用于错误处理的错误代码。

`ToolInput` 具有以下属性：

| Name              | Type    | Description                                                                                             |
|-------------------|---------|---------------------------------------------------------------------------------------------------------|
| `tool_name`       | string  | 正在调用的工具的名称                                                                                      |
| `tool_args`       | dict    | LLM 提供的参数。使用 `parameters` schema 进行转换和验证。                                                 |
| `id`              | string  | 工具调用的唯一标识符。默认为新生成的 ULID。                                                                |
| `external`        | bool    | 工具调用是否在 Home Assistant 之外执行（例如由 model provider 执行）。External 工具调用不会分发给 API 的 tools。默认为 `False`。 |

在请求的所有 tools 之间共享的上下文（conversation agent、请求的 device 等）作为 `async_call` 的 `llm.LLMContext` 单独提供。

`LLMContext` 具有以下属性：

| Name              | Type    | Description                                                                                             |
|-------------------|---------|---------------------------------------------------------------------------------------------------------|
| `platform`        | string  | 处理 LLM 请求的 conversation agent 的 DOMAIN                                                              |
| `context`         | Context | 请求的 `homeassistant.core.Context`                                                                      |
| `language`        | string  | conversation agent 的语言，或 "*" 表示任意语言                                                            |
| `assistant`       | string  | 用于控制 exposed entities 的 assistant 名称。目前仅支持 `conversation`。                                   |
| `device_id`       | string  | 用户用来发起对话的 device 的 device_id。                                                                  |

### API

API 对象允许创建 API instances。API Instance 代表一组将提供给 LLM 的 tools。

```python
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import llm
from homeassistant.helpers.llm import APIInstance, LLMContext
from homeassistant.util import dt as dt_util
from homeassistant.util.json import JsonObjectType


class MyAPI(llm.API):
    """My own API for LLMs."""

    async def async_get_api_instance(self, llm_context: LLMContext) -> APIInstance:
        """Return the instance of the API."""
        return APIInstance(
            api=self,
            api_prompt="Call the tools to fetch data from Home Assistant.",
            llm_context=llm_context,
            tools=[TimeTool()],
        )


async def async_setup_api(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Register the API with Home Assistant."""
    # 如果 API 与 Config Entry 关联，则当 config entry 卸载时，必须注销 LLM API。
    unreg = llm.async_register_api(
        hass,
        MyAPI(
            hass=hass,
            id=f"my_unique_key-{entry.entry_id}",
            name=entry.title,
        ),
    )
    entry.async_on_unload(unreg)
```

`llm.API` 类具有以下属性：

| Name              | Type          | Description                                                                                             |
|-------------------|---------------|---------------------------------------------------------------------------------------------------------|
| `hass`            | HomeAssistant | Home Assistant 实例。必需。                                                                             |
| `id`              | string        | API 的唯一标识符。必需。                                                                                 |
| `name`            | string        | API 的名称。必需。                                                                                       |

所有字段都是仅关键字的，因此 API 必须使用关键字参数实例化。

`llm.APIInstance` 类具有以下属性：

| Name                 | Type        | Description                                                                                             |
|----------------------|-------------|---------------------------------------------------------------------------------------------------------|
| `api`                | API         | API 对象。必需。                                                                                        |
| `api_prompt`         | string      | 对 LLM 如何使用 LLM tools 的说明。必需。                                                                 |
| `llm_context`        | LLMContext  | 工具调用的上下文。必需。                                                                                  |
| `tools`              | list[Tool]  | 此 API 中可用的 tools。必需。                                                                            |
| `custom_serializer`  | Callable    | 可选函数，用于将 voluptuous schemas（如 selectors）转换为 LLM 期望的 JSON schema。默认为 `None`。        |

## 通过 MCP 暴露 API

你无需执行任何特殊操作即可使 API 通过 [Model Context Protocol (MCP)](https://modelcontextprotocol.io) 可用。一旦用户设置好 [MCP Server 集成](https://www.home-assistant.io/integrations/mcp_server/)，每个已注册的 LLM API 都会自动通过 MCP 提供。

每个 API 都可以访问自己的 Streamable HTTP endpoint，通过其 API ID 寻址：

```text
/api/mcp/<API ID>
```

例如，内置的 Assist API 在 `/api/mcp/assist` 可用，而使用 `llm.async_register_api` 注册的 custom API 在 `/api/mcp/<your API ID>` 可用。

这些 per-API endpoints 需要 admin access token（Assist API 除外）。MCP Server 集成还在 `/api/mcp` 暴露单个配置的 API，供不通过 ID 指向特定 API 的 clients 使用。

### 列出已注册的 API

由于这些 endpoints 是通过 API ID 寻址的，clients 需要一种方式来查找哪些 ID 存在。已注册的 APIs 可以通过 [WebSocket API](../../api/websocket) 列出：

```json
{
  "id": 1,
  "type": "llm/api/list"
}
```

server 以注册顺序响应每个已注册 API 的 ID 和名称：

```json
{
  "id": 1,
  "type": "result",
  "success": true,
  "result": {
    "apis": [
      {
        "id": "assist",
        "name": "Assist"
      }
    ]
  }
}
```

API 的 `id` 是 `/api/mcp/<API ID>` 中使用的值，而 `name` 是向用户显示的名称。此命令需要 admin 用户。
