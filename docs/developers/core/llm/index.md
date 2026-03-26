---
title: "面向大型语言模型的 Home Assistant API"
sidebar_label: "LLM API"
---

Home Assistant 可以与大型语言模型（LLM）交互。通过向 LLM 暴露 Home Assistant API，LLM 可以获取数据或控制 Home Assistant，从而更好地协助用户。Home Assistant 自带一个内置 LLM API，而自定义集成也可以注册自己的 API，以提供更高级的能力。

## 内置 Assist API

Home Assistant 内置了一个 API，会将 Assist API 暴露给 LLM。这个 API 允许 LLM 通过[意图](/developers/intent_builtin)与 Home Assistant 交互，并且可以通过注册新的意图进行扩展。

Assist API 提供的能力与内置对话代理可访问的能力和已暴露实体相同，但不允许执行管理类任务。

## 接入 LLM API

在你的集成中，需要在两个位置集成 LLM API。用户需要能够配置要使用哪些 API，并且在与 LLM 交互时，应把这些 API 提供的工具传递给 LLM。

### 选项流程

所选 API 应存储在配置条目的 `options` 中。这里应保存一个字符串或所选 API ID 的列表（若有多个）。如果未选择 API，则必须省略该 key。

在你的 options flow 中，应向用户提供一个 selector，让其选择要使用的 API。

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

与 LLM 交互时，提供的 `ChatLog` 会让所选 API 中的所有工具可用；而对话实体应将这些工具连同 API 提供的额外提示词（prompt）一起传递给 LLM。

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

        # Interact with LLM and pass tools
        request = user_input.text
        for _iteration in range(10):
            response = ... # Send request to LLM and get streaming response

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

        # Send the final response to the user
        intent_response = intent.IntentResponse(language=user_input.language)
        intent_response.async_set_speech(chat_log.content[-1].content or "")
        return conversation.ConversationResult(
            response=intent_response,
            conversation_id=chat_log.conversation_id,
            continue_conversation=chat_log.continue_conversation,
        )
```

## 创建你自己的 API

要创建自己的 API，你需要创建一个继承自 `API` 的类，并实现 `async_get_tools` 方法。`async_get_tools` 方法应返回一个 `Tool` 对象列表，用来表示你希望暴露给 LLM 的功能。

### 工具

`llm.Tool` 类表示一个可由 LLM 调用的工具。

```python
from homeassistant.core import HomeAssistant
from homeassistant.helper import llm
from homeassistant.util import dt as dt_util
from homeassistant.util.json import JsonObjectType


class TimeTool(llm.Tool):
    """Tool to get the current time."""

    name = "GetTime"
    description: "Returns the current time."

    # Optional. A voluptuous schema of the input parameters.
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

        return dt_util.now(tzinfo).isoformat()
```

`llm.Tool` 类具有以下属性：

| 名称 | 类型 | 说明 |
|------|------|------|
| `name` | string | 工具名称。必填。 |
| `description` | string | 对工具的说明，帮助 LLM 理解应在何时以及如何调用它。可选，但推荐提供。 |
| `parameters` | vol.Schema | 参数的 voluptuous schema。默认为 `vol.Schema({})`。 |

`llm.Tool` 类具有以下方法：

#### `async_call`

当 LLM 调用该工具时，此方法会执行工具的实际操作。它必须是异步方法。参数为 `hass` 和一个 `llm.ToolInput` 实例。

响应数据必须是 `dict`，并且可序列化为 JSON [`homeassistant.util.json.JsonObjectType`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/util/json.py)。

错误必须通过抛出 `HomeAssistantError` 异常（或其子类）来表示。响应数据中不应包含专门用于错误处理的错误码。

`ToolInput` 具有以下属性：

| 名称 | 类型 | 说明 |
|------|------|------|
| `tool_name` | string | 被调用工具的名称。 |
| `tool_args` | dict | LLM 提供的参数。这些参数会通过 `parameters` schema 进行转换和校验。 |
| `platform` | string | 使用该工具的对话代理的 `DOMAIN`。 |
| `context` | Context | 对话对应的 `homeassistant.core.Context`。 |
| `user_prompt` | string | 触发工具调用的原始文本输入。 |
| `language` | string | 对话代理使用的语言，或 `*` 表示任意语言。 |
| `assistant` | string | 用于控制已暴露实体的 assistant 名称。目前仅支持 `conversation`。 |
| `device_id` | string | 用户发起对话时所用设备的 `device_id`。 |

### API

API 对象用于创建 API 实例。API 实例表示一组会提供给 LLM 的工具集合。

```python
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helper import llm
from homeassistant.util import dt as dt_util
from homeassistant.util.json import JsonObjectType


class MyAPI(API):
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
    # If the API is associated with a Config Entry, the LLM API must be
    # unregistered when the config entry is unloaded.
    unreg = llm.async_register_api(
        hass,
        MyAPI(hass, f"my_unique_key-{entry.entry_id}", entry.title)
    )
    entry.async_on_unload(unreg)
```

`llm.API` 类具有以下属性：

| 名称 | 类型 | 说明 |
|------|------|------|
| `hass` | HomeAssistant | Home Assistant 实例。 |
| `id` | string | API 的唯一 ID。 |
| `name` | string | API 的显示名称。 |
