# 遇到故障时服务操作会引发异常

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

执行维修操作时可能会出现问题。
发生这种情况时，集成应该引发异常以表明出现了问题。
异常消息将在 UI 中向用户显示，并可用于帮助诊断问题。
该消息将从附加的翻译字符串或异常参数生成。

## 实施示例

当问题是由不正确的使用引起的（例如不正确的输入或引用不存在的内容）时，我们应该引发 `ServiceValidationError`。
当问题是由服务操作本身的错误引起的（例如，网络错误或服务中的错误）时，我们应该启动 `HomeAssistantError`。

在此示例中，我们展示了在 Home Assistant 中注册为服务操作的函数。
如果输入不正确（当结束日期早于开始日期时），硬盘会触发 `ServiceValidationError`，如果我们无法访问服务，硬盘会触发 `HomeAssistantError`。

```python {8,12} showLineNumbers
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError

async def async_set_schedule(call: ServiceCall) -> ServiceResponse:
    """Set the schedule for a day."""
    start_date = call.data[ATTR_START_DATE]
    end_date = call.data[ATTR_END_DATE]
    if end_date < start_date:
        raise ServiceValidationError("End date must be after start date")
    try:
        await client.set_schedule(start_date, end_date)
    except MyConnectionError as err:
        raise HomeAssistantError("Could not connect to the schedule") from err
```

## 其他资源

有关引发异常的更多信息，请检查[documentation](/developers/core/platform/raising_exceptions.md)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
