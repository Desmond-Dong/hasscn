# AI 任务实体

AI 任务实体为 Home Assistant 中的 AI 驱动的任务执行提供了框架。它使集成能够提供人工智能功能，用于生成数据、内容或基于自然语言指令执行结构化任务。

AI 任务实体源自[`homeassistant.components.ai_task.AITaskEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/ai_task/entity.py)。实体状态跟踪上次活动的时间戳以进行监控。

## 特性

*该实体没有属性。*

## 支持的功能

支持的功能通过使用 `AITaskEntityFeature` 枚举中的值来定义，并使用按位或 (`|`) 运算符进行组合。

| 值 | 说明
| ----- | -----------
| `GENERATE_DATA` | 该实体可以基于自然语言指令生成数据。

## 方法

### 生成数据

该方法基于自然语言指令处理数据生成任务。

```python
from homeassistant.components.ai_task import AITaskEntity, GenDataTask, GenDataTaskResult

class MyAITaskEntity(AITaskEntity):
    """Represent an AI Task entity."""

    async def _async_generate_data(
        self, task: GenDataTask, chat_log: ChatLog
    ) -> GenDataTaskResult:
        """Handle a generate data task."""
        # Process the task instructions and generate appropriate data
        # Use the chat_log to maintain conversation context. A common
        # pattern is to share an implementation between conversation and AI
        # task entities to process the chat log.
        # await self._async_handle_chat_log(
        #  chat_log,
        #  task.structure,
        #  task.attachments
        # )

        text = ...
        if not task.structure:
            return GenDataTaskResult(
                conversation_id=chat_log.conversation_id,
                data=text
            )

        data = ... # process the text to match the structure
        return GenDataTaskResult(
            conversation_id=chat_log.conversation_id,
            data=data
        )

```

`GenDataTask` 对象包含以下数据：

| 名称 | 类型 | 说明
| ---- | ---- | -----------
| `task_name` | `str` | 任务的名称/标识符
| `instructions` | `str` | AI 的自然语言指令
| `structure` | `vol.Schema` \ | `None` | Optional schema for structured output validation
| `attachments` | `list[PlayMediaWithId]` | 要包含在任务中的附件列表。

## 结构化输出模式

`structure` 参数允许您使用 Home Assistant 的 [选择器系统](https://www.home-assistant.io/docs/blueprint/selectors/) 定义生成数据的预期格式：

```python
{
    "yes_no_field": {
        "description": "Description of the field",
        "required": True/False,  # Optional, defaults to False
        "selector": {
            "boolean": {}  # Selector type
        }
    },
    "text_field": {
        "description": "Description of the text field",
        "required": True/False,  # Optional, defaults to False
        "selector": {
            "text": {}  # Selector type
        }
    },
    "number_field": {
        "description": "Description of the number field",
        "required": True/False,  # Optional, defaults to False
        "selector": {
            "number": {
                "min": 18,  # Optional minimum value
                "max": 100,  # Optional maximum value
            }
        }
    },
}
```
