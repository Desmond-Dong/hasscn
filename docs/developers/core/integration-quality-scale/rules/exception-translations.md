---
title: "异常消息可被翻译"
sidebar_label: 🥇 exception-translations
related_rules:
  - entity-translations
  - action-exceptions
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

有时会出现问题，我们想向用户显示错误消息。
由于 Home Assistant 被世界各地的人使用，确保这些错误消息可被翻译非常重要。
这提高了不使用英语的用户的 Home Assistant 可用性。

Home Assistant 内置了对来自 `HomeAssistantError` 异常的翻译消息的支持。

## 示例实现

在这个示例中，我们展示了一个注册为 Home Assistant 服务 action 的函数。
在抛出异常时，会传入集成 domain 和翻译的 key。
异常应继承自 `HomeAssistantError` 以支持翻译。
错误消息随后在集成的 `strings.json` 文件中定义。

```python {6-9,13-16} showLineNumbers
async def async_set_schedule(call: ServiceCall) -> ServiceResponse:
    """Set the schedule for a day."""
    start_date = call.data[ATTR_START_DATE]
    end_date = call.data[ATTR_END_DATE]
    if end_date < start_date:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="end_date_before_start_date",
        )
    try:
        await client.set_schedule(start_date, end_date)
    except MyConnectionError as err:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="cannot_connect_to_schedule",
        ) from err
```

`strings.json`：
```json
{
    "exceptions": {
        "end_date_before_start_date": {
            "message": "The end date cannot be before the start date."
        },
        "cannot_connect_to_schedule": {
            "message": "Cannot connect to the schedule."
        }
    }
}
```

## 补充资料

有关抛出异常的更多信息，请参阅 [documentation](/developers/core/platform/raising_exceptions)。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
