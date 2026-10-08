Conversation 实体允许用户与 Home Assistant 对话。

Conversation 实体派生自 [`homeassistant.components.conversation.ConversationEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/conversation/entity.py)。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| supported\_languages | `list[str]` | `Literal["*"]` | **必填** | 服务支持的语言。如果支持所有语言，则返回 `"*"`。

## 支持的功能

支持的功能通过使用 `ConversationEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值                      | 描述
| -------------------------- | -------------------------------------------------------------------------------------------
| `CONTROL`       | 实体能够控制 Home Assistant。

## 方法

### 处理消息

此方法用于处理传入的聊天消息。

```python
from homeassistant.components.conversation import ChatLog, ConversationEntity

class MyConversationEntity(ConversationEntity):
    """Represent a conversation entity."""

    async def _async_handle_message(
        self,
        user_input: ConversationInput,
        chat_log: ChatLog,
    ) -> ConversationResult:
        """Call the API."""
        # Add the response to the chat log.
        chat_log.async_add_assistant_content_without_tools(
            AssistantContent(
                agent_id=user_input.agent_id,
                content="Test response",
            )
        )
        response = intent.IntentResponse(language=user_input.language)
        response.async_set_speech("Test response")
        return agent.ConversationResult(
            conversation_id=None,
            response=response,
            continue_conversation=False,
        )
```

`ConversationInput` 对象包含以下数据：

| 名称 | 类型 | 描述
| ---- | ---- | -----------
| `text` | `str` | 用户输入
| `context` | `Context` | 附加到 HA 中操作的 HA context
| `conversation_id` | `Optional[str]` | 可用于跟踪多轮对话。如果不支持则返回 None
| `language` | `str` | 文本的语言。如果用户未提供，则设置为 HA 配置的语言。

*我们曾将 `async_process` 作为处理消息的方法来推荐。现已更改为 `_async_handle_message` 以自动包含 chat log。此更改向后兼容。*

#### 聊天记录

chat log 对象允许 conversation 实体读取对话历史，并向其中添加消息和工具调用。

有关完整的类型化 API，请参阅 [Python 接口](https://github.com/home-assistant/core/blob/dev/homeassistant/components/conversation/chat_log.py)。

### 准备

一旦 Home Assistant 知道请求即将到来，我们将让 conversation 实体为之做好准备。这可用于加载语言模型或其他资源。此函数为可选项。

```python
class MyConversationEntity(ConversationEntity):
    """Represent a conversation entity."""

    async def async_prepare(self, language: str | None = None) -> None:
        """Prepare a language for processing."""
```
