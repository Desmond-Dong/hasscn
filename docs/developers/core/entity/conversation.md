---
title: 对话实体
sidebar_label: 对话
---

对话实体允许用户与 Home Assistant 对话。

对话实体源自[`homeassistant.components.conversation.ConversationEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/conversation/entity.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| supported_languages | `list[str]` \ | `Literal["*"]` | @@格式0@@ | The supported languages of the service. Return `"*"` if you support all.

## 支持的功能

支持的功能通过使用 `ConversationEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明
| -------------------------- | -------------------------------------------------------------------------------------------
| `CONTROL` | 该实体能够控制Home Assistant。

## 方法

### 处理消息

该方法用于处理传入的聊天消息。

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

| 名称 | 类型 | 说明
| ---- | ---- | -----------
| `text` | `str` | 用户输入
| `context` | `Context` | 附加到 HA 中的操作的 HA 上下文
| `conversation_id` | `Optional[str]` | 可用于跟踪多轮对话。如果不支持则返回 None
| `language` | `str` | 文本的语言。如果用户未提供，则将其设置为 HA 配置的语言。
| `continue_conversation` | `bool` | 如果代理期望用户做出响应。如果未设置，则假定为 False。

_我们曾经推广`async_process`作为处理消息的方法。已更改为 `_async_handle_message` 以自动包含聊天日志。更改是向后兼容的。_

#### 聊天记录 {#chat-log}

聊天日志对象允许对话实体读取对话历史并向其添加消息和工具调用。

有关完整类型化 API，请参阅[Python 接口](https://github.com/home-assistant/core/blob/dev/homeassistant/components/conversation/chat_log.py)。

### 准备

一旦 Home Assistant 知道有请求到来，我们就会让对话实体做好准备。这可用于加载语言模型或其他资源。该功能是可选实现的。

```python
class MyConversationEntity(ConversationEntity):
    """Represent a conversation entity."""

    async def async_prepare(self, language: str | None = None) -> None:
        """Prepare a language for processing."""
```
