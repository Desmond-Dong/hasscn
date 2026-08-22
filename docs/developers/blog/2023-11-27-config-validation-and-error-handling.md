---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: 配置处理与错误处理
---

## Component config 处理与错误处理的变更

Component YAML 配置的处理方式已发生改变。现在可以在发生错误时抛出异常。如果某些自定义集成使用了 `config.async_process_component_config`，它们可能会中断。现在它们可以改用 `config.async_process_component_and_handle_errors`。这个新方法支持在 config 处理过程中发生错误时抛出异常。

从现在起，失败将不再作为持久消息发出通知，因此集成需要实现错误处理，以便在发生失败时通知用户。在 setup 期间如果存在 config 问题，仍然会添加通知。

```python
async def async_process_component_and_handle_errors(
    hass: HomeAssistant,
    config: ConfigType,
    integration: Integration,
    raise_on_failure: bool = False,
) -> ConfigType | None:
...
```

在 reload 期间，集成可以使用 `helpers.reload.async_integration_yaml_config`。该 helper 现在在发生失败时也具备抛出异常的能力。

```python
async def async_integration_yaml_config(
    hass: HomeAssistant, integration_name: str, *, raise_on_failure: bool = False
) -> ConfigType | None:
...
```

## Config 验证异常（Exceptions）的翻译支持

引入了一种新的 `ConfigValidationError` 异常类。当 config 错误处理过程中发生错误且 `raise_on_failure` 设置为 `True` 时，将抛出此异常。如果该错误是在执行服务调用期间抛出的且不需要 stack trace，它可以被重新抛出为 `ServiceValidationError`。添加了翻译键以允许对错误消息进行本地化。

### 背景

- 背景[讨论](https://github.com/home-assistant/architecture/discussions/992)。
- 实现 [Core PR #102410](https://github.com/home-assistant/core/pull/102410)。
