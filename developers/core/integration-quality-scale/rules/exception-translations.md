# 异常消息是可翻译的

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

有时会出现问题，我们希望向用户显示错误消息。
由于 Home Assistant 被世界各地的人们使用，因此这些错误消息的翻译性非常重要。
对于不使用英语的应用程序的人来说，这提高了 Home Assistant 的可用性。

Home Assistant 具有对翻译来自 `HomeAssistantError` 异常消息的内置支持。

## 实施示例

在此示例中，我们展示了注册为 Home Assistant 服务操作的函数。
引发异常时，会传递集成域和翻译密钥。
该异常应继承`HomeAssistantError`以支持翻译。
然后在集成 `strings.json` 文件中定义错误消息。

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

ZZ保护0ZZ:

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

## 其他资源

有关引发异常的更多信息，请检查[documentation](/developers/core/platform/raising_exceptions.md)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
