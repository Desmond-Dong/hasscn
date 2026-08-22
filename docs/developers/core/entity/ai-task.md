---
title: AI Task 实体
sidebar_label: AI Task
---

AI Task 实体为 Home Assistant 中的 AI 驱动任务执行提供了一个框架。它使集成能够为根据自然语言指令生成数据、内容或执行结构化任务提供 AI 能力。

AI Task 实体派生自 [`homeassistant.components.ai_task.AITaskEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/ai_task/entity.py)。实体状态会跟踪最后一次活动的时间戳，用于监控目的。

## 属性

_此实体没有属性。_

## 支持的功能

支持的功能通过使用 `AITaskEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值 | 描述
| ----- | -----------
| `GENERATE_DATA` | 实体可以根据自然语言指令生成数据。
| `SUPPORT_ATTACHMENTS` | 实体支持作为生成数据和图像任务一部分的附件。
| `GENERATE_IMAGE` | 实体可以根据自然语言指令生成图像。

## 方法

### 生成数据

此方法根据自然语言指令处理数据生成任务。

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

| 名称 | 类型 | 描述
| ---- | ---- | -----------
| `name` | `str` | 任务的名称/标识符
| `instructions` | `str` | 给 AI 的自然语言指令
| `structure` | `vol.Schema` \| `None` | 用于结构化输出验证的可选 schema
| `attachments` | `list[conversation.Attachment]` \| `None` | 包含在任务中的附件列表。

### 生成图像

此方法根据自然语言指令处理图像生成任务。只有当实体设置了 `AITaskEntityFeature.GENERATE_IMAGE` 功能时，才会调用此方法。

```python
from homeassistant.components.ai_task import AITaskEntity, GenImageTask, GenImageTaskResult

class MyAITaskEntity(AITaskEntity):
    """Represent an AI Task entity."""

    async def _async_generate_image(
        self, task: GenImageTask, chat_log: ChatLog
    ) -> GenImageTaskResult:
        """Handle a generate image task."""
        # Process the task instructions and generate the image.
        image_data = ...

        return GenImageTaskResult(
            conversation_id=chat_log.conversation_id,
            image_data=image_data,
            mime_type="image/png",
        )
```

`GenImageTask` 对象包含以下数据：

| 名称 | 类型 | 描述
| ---- | ---- | -----------
| `name` | `str` | 任务的名称/标识符
| `instructions` | `str` | 给 AI 的自然语言指令
| `attachments` | `list[conversation.Attachment]` \| `None` | 与指令一起包含的可选附件列表。

返回的 `GenImageTaskResult` 对象包含以下数据：

| 名称 | 类型 | 描述
| ---- | ---- | -----------
| `image_data` | `bytes` | 模型生成的原始图像数据
| `conversation_id` | `str` | 对话的唯一标识符
| `mime_type` | `str` | 生成图像的 MIME 类型
| `width` | `int` \| `None` | 生成图像的可选宽度
| `height` | `int` \| `None` | 生成图像的可选高度
| `model` | `str` \| `None` | 用于生成图像的可选模型
| `revised_prompt` | `str` \| `None` | 用于生成图像的可选修订提示词

## 结构化输出 schema

`structure` 参数允许你使用 Home Assistant 的 [selector 系统](https://www.home-assistant.io/docs/blueprint/selectors/) 来定义所生成数据的预期格式：

```python
{
    "yes_no_field": {
        "description": "Description of the field",
        "required": True/False,  # 可选，默认为 False
        "selector": {
            "boolean": {}  # Selector 类型
        }
    },
    "text_field": {
        "description": "Description of the text field",
        "required": True/False,  # 可选，默认为 False
        "selector": {
            "text": {}  # Selector 类型
        }
    },
    "number_field": {
        "description": "Description of the number field",
        "required": True/False,  # 可选，默认为 False
        "selector": {
            "number": {
                "min": 18,  # 可选的最小值
                "max": 100,  # 可选的最大值
            }
        }
    },
}
```
