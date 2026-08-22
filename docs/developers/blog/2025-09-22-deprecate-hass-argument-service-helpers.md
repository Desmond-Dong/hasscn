---
author: epenet
authorURL: https://github.com/epenet
title: "弃用 service helpers 中的 hass 参数"
---

### 变更摘要

向以下 service helpers 提供 `hass` 参数已被弃用：
`verify_domain_control`、`extract_entity_ids`、`async_extract_entities`、`async_extract_entity_ids` 和 `async_extract_config_entry_ids`。

自版本 `2025.1` 起（通过核心 PR [#133062](https://github.com/home-assistant/core/pull/133062)），
`HomeAssistant` 的引用可以作为 `ServiceCall` 对象的属性使用，
因此向上述 helper 传递 `hass` 对象变得多余。

要更新您的集成，只需移除 `hass` 参数。

对 `hass` 参数的支持将在 Home Assistant 2026.10 中移除。

### 示例

#### ID 提取 helper

```python
# 旧方式
# target_entry_ids = await async_extract_config_entry_ids(hass, service_call)
# entity_ids = await async_extract_entity_ids(hass, service_call)
# entities = await service.async_extract_entities(hass, platform_entities.values(), service_call)

# 新方式
target_entry_ids = await async_extract_config_entry_ids(service_call)
entity_ids = await async_extract_entity_ids(service_call)
entities = await service.async_extract_entities(platform_entities.values(), service_call)
```

#### 装饰器 helper

```python
# 旧方式
# @verify_domain_control(hass, DOMAIN)
# async def do_action(call: ServiceCall) -> None:
#     ...

# 新方式
@verify_domain_control(DOMAIN)
async def do_action(call: ServiceCall) -> None:
    ...
```