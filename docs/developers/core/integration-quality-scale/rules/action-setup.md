---
title: "Service actions 在 async_setup 中注册"
sidebar_label: 🥉 action-setup
related_rules:
  - action-exceptions
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

集成可以向 Home Assistant 添加自己的 service actions。
过去，它们经常在 `async_setup_entry` 方法中注册，并在 `async_unload_entry` 方法中移除。
这导致 service actions 仅在存在已加载的 entry 时才可用。
这并不理想，因为这样我们无法验证用户使用这些 service actions 创建的 automations，因为可能存在 configuration entry 无法加载的情况。

我们更倾向于集成在 `async_setup` 方法中设置它们的 service actions。
这样，如果目标 configuration entry 未加载，我们可以让用户知道 service action 为什么不工作。
验证应在 service action 内部进行，如果输入无效应引发 `ServiceValidationError`。

## 示例实现

以下是 service action 在 `async_setup` 方法中注册的代码片段。
在此示例中，service call 需要 configuration entry id 作为参数。
这用于首先获取 configuration entry，然后检查它是否已加载。
如果 configuration entry 不存在或找到的 configuration entry 未加载，我们将引发相关错误并显示给用户。
提供 description placeholders 以启用 service 参数的翻译，例如，引用需要独立于 service 描述进行本地化或更新的外部资源（如文档 URL）。

`__init__py`:
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

## 附加资源

有关如何设置 service actions 的更多信息，请参阅[service 文档](/developers/dev_101_services)。

## 例外

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>