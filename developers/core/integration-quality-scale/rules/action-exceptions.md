import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

执行 service action 时可能会出现意外情况。
当这种情况发生时，集成应引发异常以指示出了问题。
异常消息将显示在 UI 中给用户，可用于帮助诊断问题。
消息将从附加的 translation string 或异常参数中生成。

## 示例实现

当问题由使用不当引起时（例如输入错误或引用不存在的内容），应引发 `ServiceValidationError`。
当问题由 service action 本身的错误引起时（例如网络错误或服务中的 bug），应引发 `HomeAssistantError`。

:::note

此规则不仅限于集成注册自定义 service actions。
平台操作（例如切换 `switch` 或打开 `light`）也适用于此规则，并在遇到失败时应引发异常。

:::

在此示例中，我们展示了一个注册为 Home Assistant 中 service action 的函数。
如果输入不正确（当结束日期早于开始日期时），将引发 `ServiceValidationError`，如果无法连接到服务，则引发 `HomeAssistantError`。

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

## 附加资源

有关引发异常的更多信息，请参阅[文档](/developers/core/platform/raising_exceptions.md)。

## 例外

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
