# 服务操作在 async\_setup 中注册

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

集成可以将自己的服务操作添加到Home Assistant。
过去，他们经常在 `async_setup_entry` 方法中注册并在 `async_unload_entry` 方法中删除。
这样做的结果是，服务操作仅在存在加载的条目时才可用。
这并不理想，因为这样我们就无法验证用户创建的使用这些服务操作的自动化，因为配置条目可能无法加载。

我们更喜欢集成在 `async_setup` 方法中设置其服务操作。
这样，如果目标配置条目未加载，我们可以让用户知道服务操作不起作用的原因。
验证应在服务操作内进行，并且如果输入无效，则应引发 `ServiceValidationError`。

## 实施示例

下面的示例位于 `async_setup` 方法中注册服务操作的代码片段。
在此示例中，服务调用需要配置条目 id 作为参数。
这用于首先获取配置条目，然后检查它是否已加载。
如果配置条目不存在或我们找到的配置条目未加载，我们会向用户显示相关错误。
提供描述占位符以实现服务参数的转换，例如，引用外部资源（例如需要独立于服务描述进行本地化或更新文档 URL）。

ZZ保护0ZZ:

```python {13-20} showLineNumbers
async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up my integration."""

    async def async_get_schedule(call: ServiceCall) -> ServiceResponse:
        """Get the schedule for a specific range."""
        if not (entry := hass.config_entries.async_get_entry(call.data[ATTR_CONFIG_ENTRY_ID])):
            raise ServiceValidationError("Entry not found")
        if entry.state is not ConfigEntryState.LOADED:
            raise ServiceValidationError("Entry not loaded")
        client = cast(MyConfigEntry, entry).runtime_data
        ...

    hass.services.async_register(
        DOMAIN,
        SERVICE_GET_SCHEDULE,
        async_get_schedule,
        schema=SERVICE_GET_SCHEDULE_SCHEMA,
        supports_response=SupportsResponse.ONLY,
        description_placeholders={"example_url": "https://schedule.example.com"}
    )
```

## 其他资源

有关如何设置服务操作的更多信息，请参阅 [service documentation](/developers/dev_101_services.md)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
